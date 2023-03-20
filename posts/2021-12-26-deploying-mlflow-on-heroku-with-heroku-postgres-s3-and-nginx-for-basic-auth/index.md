---
title: Deploying MLFlow on Heroku (with Heroku Postgres, S3, and nginx for basic auth)
author: Matt Kaye
date: '2021-12-26'
categories: [mlops]
toc: true
---

Disclaimer: I followed [this guide](https://www.mikulskibartosz.name/how-to-deploy-mlflow-on-heroku/) to setting up MLFlow on Heroku initially. However, there were certain aspects of it that are either outdated or do not work, so this post remedies those issues.

## MLFlow

[MLFlow](https://www.mlflow.org/) is an open source tool for the entire machine learning lifecycle. It lets you create and experiment with models, write notes and descriptions, track parameters, metrics, and artifacts, and deploy to production all through an easy-to-use API and an intuitive UI. You can make calls to a running MLFlow service through the [R API](https://www.mlflow.org/docs/latest/R-api.html), the [Python API](https://www.mlflow.org/docs/latest/python_api/index.html), the [Java API](https://www.mlflow.org/docs/latest/java_api/index.html), or via the command line (cURL) or your favorite language by interacting with the [REST API](https://www.mlflow.org/docs/latest/rest-api.html).

## Overview

MLFlow is surprisingly easy to set up and deploy to Heroku. There are a few steps to follow to get everything running: 1. Dockerize an MLFlow instance 2. Set up an artifact store 3. Set up a database 4. Secure the instance with basic auth

## Prerequisites

This guide assumes you already have AWS (specifically S3) set up. It also assumes some knowledge of shell scripting, Docker, and Heroku.

## Creating a Heroku App

First, let's create a Heroku app from the CLI. For the purposes of this example, I'm going to call the app `my-mlflow-example`. You'll need to choose your own app name.

``` bash
heroku create my-mlflow-example
```

Next, let's attach a Heroku Postgres instance.

``` bash
heroku addons:create heroku-postgresql:hobby-dev --app my-mlflow-example
```

Creating this hobby-dev Heroku Postgres instance will also automatically set the `DATABASE_URL` environment variable in your app's configuration.

Next, we'll need some other environment variables to be set. You can set your config like this:

``` bash
heroku config:set \
  S3_URI=s3://YOUR-S3-URI \
  AWS_SECRET_ACCESS_KEY=YOUR-SECRET \
  AWS_ACCESS_KEY_ID=YOUR-KEY \
  AWS_DEFAULT_REGION=YOUR-REGION \
  MLFLOW_TRACKING_USERNAME=YOUR-USERNAME \
  MLFLOW_TRACKING_PASSWORD=YOUR-PASSWORD \
  --app my-mlflow-example
```

You can repeat fewer lines of code by creating a `.env` file that looks like this:

``` text
S3_URI=s3://YOUR-S3-URI AWS_SECRET_ACCESS_KEY=YOUR-SECRET ...
```

and then using `heroku config:set .env --app my-mlflow-example`.

Great! At this point, your Heroku app should be all set up. Now all we need to do is create the Docker image that will run MLFlow.

## Setup

First thing's first, let's create a folder called `my-mlflow-example` where we'll store all the files we'll need. I'll do that with:

``` bash
mkdir my-mlflow-example && cd my-mlflow-example
```

Next, let's create a few files we'll need:

``` bash
touch Dockerfile run.sh requirements.txt nginx.conf_template
```

You'll also want to make your `run.sh` script executable.

``` bash
chmod +x run.sh
```

Great, now we've to all the files we'll need to deploy our MLFlow instance!

### The `Dockerfile`

The [Dockerfile](https://www.docker.com/) will contain all of the library installs and files you need to run your MLFlow instance. The Dockerfile you'll need to write for MLFlow should look something like this:

```bash
FROM continuumio/miniconda3

## Copy files into the image
COPY run.sh run.sh
COPY requirements.txt requirements.txt
COPY nginx.conf_template /etc/nginx/sites-available/default/nginx.conf_template

## Install Postgres
RUN apt-get -y update && \
  apt-get -y upgrade && \
  apt-get install -y postgresql

## Install nginx and dependencies
RUN apt-get -y update && \
  apt-get install -y make vim \
  automake gcc g++ subversion \
  musl-dev nginx gettext apache2-utils

## Install pip and dependencies
RUN conda install -c anaconda pip && \
  pip install --upgrade pip && \
  pip install -r requirements.txt && \
  conda update -n base -c defaults conda && \
  conda env list && \
  pip freeze list

## Run your `run.sh` script on container boot
CMD ./run.sh
```

### The `requirements.txt` File

Next, copy the following lines into your `requirements.txt`:

``` txt
mlflow
psycopg2-binary
boto3
```

This file will tell `pip` which libraries to install in your docker image in the `RUN pip install -r requirements.txt` line above.

### The `nginx` Template

Next, we'll create a template for the `nginx.conf` file that we'll eventually use in the container for basic auth. One important issue here: This file is a ***template*** because Heroku randomly assigns a port on dyno start, which means we can't hard code any ports for `nginx` (since we don't know them ahead of time). Instead of hard-coding, we specify a couple of placeholders: `$HEROKU_PORT` and `$MLFLOW_PORT`. We'll replace these with the proper ports on container startup.

Your `nginx.conf_template` should look like this:

```bash
events {}
http {
  server {
        listen $HEROKU_PORT;

        access_log /var/log/nginx/reverse-access.log;
        error_log /var/log/nginx/reverse-error.log;

        location / {
            auth_basic "Restricted Content";
            auth_basic_user_file /etc/nginx/.htpasswd;

            proxy_pass                          http://127.0.0.1:$MLFLOW_PORT/;
            proxy_set_header Host               $host;
            proxy_set_header X-Real-IP          $remote_addr;
            proxy_set_header X-Forwarded-For    $proxy_add_x_forwarded_for;
        }
    }
}
```

### Run Script

Finally, let's create a script, `run.sh`, which will run when the Heroku dyno starts.

```bash
export HEROKU_PORT=$(echo "$PORT")
export MLFLOW_PORT=5000

envsubst '$HEROKU_PORT,$MLFLOW_PORT' < /etc/nginx/sites-available/default/nginx.conf_template > /etc/nginx/sites-available/default/nginx.conf

htpasswd -bc /etc/nginx/.htpasswd $MLFLOW_TRACKING_USERNAME $MLFLOW_TRACKING_PASSWORD

killall nginx

mlflow ui \
  --port $MLFLOW_PORT \
  --host 127.0.0.1 \
  --backend-store-uri $(echo "$DATABASE_URL" | sed "s/postgres/postgresql/") \
  --default-artifact-root $S3_URI &

nginx -g 'daemon off;' -c /etc/nginx/sites-available/default/nginx.conf
```

There are a few things happening here: 1. We set the `HEROKU_PORT` environment variable from the randomly assigned `PORT` that Heroku creates on dyno startup 2. We assign `MLFLOW_PORT` to `5000`. The chances that Heroku assigns *exactly* port `5000` are low. If you want, you can add a few more lines to first check if Heroku assigns `5000` as the port, and if it does, choose any other port instead (e.g. `1000`). 3. We substitute the port placeholder variables in our `nginx.conf_template` file with the actual environment variable values for the ports, so that `nginx` knows where to listen and direct traffic. 4. We create a new `.htpasswd` file from the `MLFLOW_TRACKING_USERNAME` and `MLFLOW_TRACKING_PASSWORD` environment variables that we set in the Heroku config. This file will be used by `nginx` to check inputted usernames and passwords against. 5. We start the MLFlow UI in the background, telling it to run on the `MLFLOW_PORT` variable we created, and pointing it to our Heroku Postgres instance for the backend store and our S3 bucket for artifact storage. **Note: By default, Heroku Postgres provides a URL that begins with `postgres`. This is not compatible with `SQLAlchemy`, so we substitute `postgresql` (which is compatible) for `postgres`.** 6. We start `nginx` for basic auth.

## Deploying

Deployment is simple, and can be done with a few lines of `bash`:

``` bash
heroku login
heroku container:login
heroku container:push web --app my-mlflow-example
heroku container:release web --app my-mlflow-example
```

And that's it! Running those four lines should build your Docker image, push it to Heroku, and release it as your app. Once it releases, Heroku will boot up a dyno and you should be able to go to `my-mlflow-example.herokuapp.com` and see the MLFlow UI.

## Using MLFlow

Now that your instance is deployed, you should have no problem using MLFlow for your whole ML lifecycle. For example, in R you might want to create a new experiment. You could do something like this:

``` r
## install.packages("mlflow")

library(mlflow)

## Set up some environment variables
## This way, your R session will know where to
##  look for your MLFlow instance and will have
##  the proper credentials set up
Sys.setenv(
  MLFLOW_TRACKING_URI = "https://my-mlflow-example.herokuapp.com"
  MLFLOW_TRACKING_USERNAME = "YOUR-USERNAME",
  MLFLOW_TRACKING_PASSWORD = "YOUR-PASSWORD"
)

mlflow_create_experiment("my-first-experiment")
```

And with that, you should be able to harness all of the awesome power of MLFlow for all of your ML lifecycle needs!
