---
title: Unit Testing dbt Models
preview: Letting yourself sleep at night by ensuring your SQL is correct
author: Matt Kaye
date: "2023-07-09"
categories: [dbt, analytics engineering, python]
toc: true
toc-depth: 4
code-annotations: hover
---

## Introduction

Our team adopted [dbt](https://www.getdbt.com/) about a year ago, and it's become an integral part of our data stack. dbt is a major component of the so-called "[modern data stack](https://www.fivetran.com/blog/what-is-the-modern-data-stack)" and has exploded onto the scene in the past few years.

The basic gist is this: You use an ELT tool like [Fivetran](https://www.fivetran.com/) or [Airbyte](https://airbyte.com/) to ingest raw data from any number of sources -- think a Postgres database, a [Salesforce](https://www.salesforce.com/) instance, [Segment](https://segment.com/) or a similar analytics platform, or a product management tool like [Asana](https://app.asana.com/), among many, many others -- into your data warehouse (Redshift, Snowflake, etc.). Then, you use dbt to transform the raw data in the warehouse into a format that's friendly for downstream users like data scientists and analysts, so that they can generate insights more quickly and with a higher degree of confidence.

dbt is the transformation tool (the "T" in "ELT") in that stack: It runs SQL inside of your data warehouse and abstracts away the often boilerplate DDL code, so that you can focus on writing transformations as `SELECT` statements and spend your time on driving business value. dbt also allows you to easily write documentation and tests, write macros for often-reused code, and so on. The testing bit of dbt is what this post will focus on. In short, dbt sells itself as a tool that lets you bring software engineering best practices to ELT pipelines.

> If you're not familiar with dbt, I would recommend reading some of [their documentation](https://docs.getdbt.com/) before continuing this post. It will not cover many dbt basics.

## Tests in dbt

[dbt has lots of support for tests](https://docs.getdbt.com/docs/build/tests). It ships with a few -- uniqueness, not-null, enums, and "relationships" (which test foreign key relationships) -- out of the box. All you need to do is add a line like the following to one of your `schema.yml` files where a model is defined, as follows:

```yml
## schema.yml

version: 2

models:
  - name: fct_pageviews
    columns:
      - name: event_id
        tests:
          - unique
          - not_null
      - name: user_id
        tests:
          - not_null
      ...
```

This bit of yaml does a few things: It defines a table called `fct_pageviews`, that has at least two columns: the `event_id` and the `user_id`. The `event_id` column has both a `unique` and a `not_null` test, and the `user_id` also must be non-null (but not unique, since users can view many pages).

These tests are great, since they enforce a number of data quality expectations that we want to make sure are followed when shipping data to production. Since dbt generates a DAG from the tests and models you define, you can run these tests upstream of production and catch any failures before they hit production.

dbt makes it easy to write [arbitrary tests](https://docs.getdbt.com/docs/build/tests#generic-tests) as macros, which you can then add to a yaml file to apply to a model. You can also use a package like [dbt-expectations](https://github.com/calogica/dbt-expectations) to greatly expand upon dbt's built-in testing capabilities. In conjunction, all of these testing capabilities should give you lots of confidence that the data you're shipping to production meets virtually any data quality bar you can set.

But this post doesn't end here, so what's wrong? It's simple: These tests, useful as they may be, are not unit tests.

## Unit Testing

A [unit test](https://learn.microsoft.com/en-us/visualstudio/test/unit-test-basics?view=vs-2022) is a test that checks the correctness of a single _unit_ of code. Generally, you would try to test the smallest components you can to ensure that each individual component of a larger codebase is doing what is expected of it. For instance, if you have the following method that adds two numbers:

```python
def add(x: float, y: float) -> float:
  return x + y
```

You could write the following tests:

```python
def test_add():

  ## Commutativity
  assert add(1, 2) == add(2, 1)

  ## Associativity
  assert add(1, add(2, 3)) == add(add(1, 2), 3)

  ## Correctness
  assert add(2, 2) == 4
  assert add(2, -10) == -8
  assert add(2.5, 3.5) == 6
```

These are some very basic tests you might write to ensure that your `add` method is correctly adding the two numbers you supply it. Of course, these tests are not exhaustive, but you get the idea.

## Unit Testing _SQL_

Writing unit tests for SQL code -- in dbt or otherwise -- is much less common than writing unit tests for application code, for instance. In fact, until I started working on unit testing our dbt models (the topic of this post), I had never seen _any_ unit tests for SQL logic. There's also relatively little written about best practices for unit testing in dbt, and I've often heard and seen the data quality checks outlined a bit above mistaken for unit tests. This is unfortunate, since they're two entirely separate aspects to any data pipeline: Unit tests check that your SQL is correct and does what you think it does, and data quality checks ensure that the data flowing through your system meets your expectations. _Both_ of these types of tests should be important parts of your ELT pipelines.

The trickiest part of unit testing SQL queries is the actual mechanics of it. Unit testing SQL requires seeding data into a database, then running a query, and then comparing the results of that query on the seed data to some expectations. For instance, consider the following query that selects page views from the previous week using the `fct_pageviews` table we defined above:

```sql
SELECT event_id, user_id, page_viewed_at
FROM fct_pageviews
WHERE page_viewed_at > (GETDATE() - INTERVAL '7 days')
```

Of course, this query is trivial. But you might imagine wanting to write a unit test that checks if the oldest page view occurred less than seven days ago. You might write some SQL like this to achieve that:

```sql
WITH query AS (
  SELECT event_id, user_id, page_viewed_at
  FROM fct_pageviews
  WHERE page_viewed_at > (GETDATE() - INTERVAL '7 days')
)

SELECT MIN(page_viewed_at) > 'some date' AS test_passed
FROM query
```

You could also, for instance, pull your query result into R and run the assertions from there:

```r
conn <- DBI::dbConnect("some", "credentials")

result <- DBI::dbGetQuery(
  conn,
  "
  SELECT event_id, user_id, page_viewed_at
  FROM fct_pageviews
  WHERE page_viewed_at > (GETDATE() - INTERVAL '7 days')
  "
)

checkmate::assert_true(min(result$page_viewed_at) > "some date")
```

But now you need to determine how to actually run the assertion and what to do if it fails. Not only that, but you probably don't want to be running unit tests against production data. It would be better, for instance, to seed some data into your database to run the test against. Some seed data might look like this:

| event_id | user_id |   page_viewed_at    |
| :------: | :-----: | :-----------------: |
|    1     |    1    | 2023-07-01 23:59:59 |
|    2     |    1    | 2023-07-02 00:01:01 |

Then, after running the SQL, you might expect the following:

| event_id | user_id |   page_viewed_at    |
| :------: | :-----: | :-----------------: |
|    1     |    1    | 2023-07-01 23:59:59 |

If that's your expectation, you could write assertions like:

```python
## assume x is a data frame with the result of the query

assert len(x) == 1
assert x["page_viewed_at"][0] == "2023-07-01 23:59:59"

## and so on
```

This approach could actually work quite well! If you have a query to test, you can strategically create seed data for individual test cases to test different bits of the logic.

So now, the question is: How do we actually implement and orchestrate these types of tests within dbt?

## dbt + pytest

dbt actually has a lesser-known feature that does exactly what we want, which leverages [pytest fixtures](https://docs.pytest.org/en/latest/how-to/fixtures.html#how-to-fixtures). The long-and-short of it is this: dbt [provides a framework for adapter developers to test their adapters](https://docs.getdbt.com/guides/dbt-ecosystem/adapter-development/4-testing-a-new-adapter), and we can jerry-rig the same framework to let us test our models!

### Background

Before getting into the nuts and bolts, there's some important context to include here.

We use [Redshift](https://aws.amazon.com/redshift/) as our data warehouse. But for testing, we don't want to make a ton of round trips to a Redshift cluster to set up the tests, seed raw data, run transformations and queries, and clean up at the end. Doing all of that would dramatically slow down the testing process, and it'd also be expensive. Unfortunately, we also can't run Redshift locally (like you can MySQL, for instance). So our hands are tied.

Or are they? Redshift, fortunately, is a fork of Postgres 8, and shares a lot of user-facing features with Postgres, even if the guts of how it works are completely different. This, in combination with the [handy cross-database macros that dbt provides](https://docs.getdbt.com/reference/dbt-jinja-functions/cross-database-macros) let us solve our performance problems from above. Instead of using Redshift for our unit tests, we use Postgres instead. We can run Postgres locally, it's easy to spin up and down on local and in a CI/CD environment, and it's fast: Our test suite runs some 100x faster against a local Postgres instance than it does against Redshift. This is a massive win.

In short: We have a bash script that runs our unit tests, and it does four things:

1. Sets up environment variables that we need for running Postgres and dbt
2. Start up Postgres in Docker with `docker run postgres ...`
3. Run our unit test suite with `poetry run pytest ...`
4. Spin down Postgres with `docker stop ...`

And that's it! We can run the exact same script on local and in CI.

We run Postgres in Docker as follows:

```bash
docker run \
    --name dbt_test_postgres \
    -p $TEST_DB_PORT:5432 \
    -e POSTGRES_PASSWORD=$TEST_DB_PASSWORD \
    -e POSTGRES_USER=$TEST_DB_USER \
    -e POSTGRES_DB=$TEST_DB_NAME \
    -d \
    postgres:11
```

Now that you have a sense for the infrastructure, on to the tests themselves.

### Our Framework

Since the dbt documentation is so great, I would recommend starting there for getting a sense for how to use dbt to test your models. But since it's not exactly geared towards this particular use case, I'll start by explaining a bit how we organize unit tests for our dbt models.

It's actually quite simple: At the top level in our dbt project, we have a `unit-tests` directory. The contents of that directory look like this:

```markdown
.
├── README.md
├── common
├── conftest.py
├── poetry.lock
├── pyproject.toml
└── tests
```

A few notes:

1. We use [Poetry](https://python-poetry.org/) for managing dependencies, so our unit testing rig is a very basic Poetry project. We only have a few dependencies defined: `pytest`, `dbt-postgres`, `pandas`, and `sqlalchemy`.
2. We have the tests themselves living inside of `tests/`.
3. We have shared helper code living inside of `common/`.
4. We have a script at the top level of our dbt project that runs our tests, as described above.

#### The `conftest` File

Let's start with the `conftest.py` file, which looks like this:

```python
## conftest.py

import pytest
import os

# Import the standard functional fixtures as a plugin
# Note: fixtures with session scope need to be local
pytest_plugins = ["dbt.tests.fixtures.project"]

# The profile dictionary, used to write out profiles.yml
# dbt will supply a unique schema per test, so we do not specify "schema" here
@pytest.fixture(scope="class")
def dbt_profile_target():
    return {
        "type": "postgres",
        "dbname": os.environ.get("TEST_DB_NAME"),
        "threads": 8,
        "host": "localhost",
        "port": int(os.environ.get("TEST_DB_PORT")),
        "user": os.environ.get("TEST_DB_USER"),
        "password": os.environ.get("TEST_DB_PASSWORD")
    }
```

What we're doing here is pretty simple. First, we import the plugin we need for running dbt with pytest, as [is recommended in the docs](https://docs.getdbt.com/guides/dbt-ecosystem/adapter-development/4-testing-a-new-adapter#set-up-and-configure-pytest). Next, we add a pytest fixture that represents the `profiles.yml` you'd find at the root of a dbt project, where we specify connection details to our Postgres test database. And that's it!

#### The Tests

Once the `conftest.py` file is set up, the basic process is to add a new test at a path inside of `tests/` that matches the location of the corresponding model you're testing inside of `models/`. For instance, if you have `models/int/int_users.sql`, then you would also have `tests/int/test_int_users.py`. Let's imagine we have a model called `stg_users` that our `int_users` selects from, and one of the transformations we want to do in the intermediate layer is remove any internal users. Maybe our SQL looks like this:

```sql
-- int_users.sql

SELECT *
FROM {{ ref("stg_users") }}
WHERE NOT is_internal
```

Great! Now let's test it.

```python
## tests/int/test_int_users.py

import pytest
import pandas as pd

from dbt.tests.util import run_dbt

## Importing helper code from `common`
##
## * `load_sql` that returns a string with the
##     SQL for a model based on the model's name
## * `connect_to_test_db` makes a connection to our
##     Postgres test database so that we can query it
##     from pandas
## * `convert_dicts_to_csv` writes a list of Python dictionaries
##     representing rows in a table to a CSV string.
from common import load_sql, connect_to_test_db, convert_dicts_to_csv

MODEL_NAME = "int_users"


mock_stg_users = convert_dicts_to_csv([
    {"user_id": 1, "is_internal": True, "created_at": "2023-04-13 00:00:00"},
    {"user_id": 2, "is_internal": False, "created_at": "2023-04-14 00:00:00"},
    {"user_id": 3, "is_internal": False, "created_at": "2023-04-15 00:00:00"}
])


class TestIntUsers():

    @pytest.fixture(scope="class")
    def seeds(self):
        return {"stg_users": mock_stg_users}

    @pytest.fixture(scope="class")
    def models(self):
        ## See comment in imports for note on this method
        return {"actual.sql": load_sql(MODEL_NAME)}

    @pytest.fixture(scope="class")
    def actual(self):
        build_result = run_dbt(["build"])

        ## Extract the temporary schema generated by dbt + pytest
        schema = build_result.results[0].node.schema

        ## See comment in imports for note on this method
        engine = connect_to_test_db()

        actual = pd.read_sql(
            sql = f"SELECT * FROM {schema}.actual ORDER BY user_id",
            con = engine
        )

        return actual

    def test_int_users_dimensions(self, project, actual):
        assert actual.shape = (2, 3)

    def test_user_ids(self, project, actual):
        assert actual["user_id"].to_list() == [1, 2]
```

And that's it! Since `actual` is a Pandas DataFrame, you can write arbitrary assertions using whatever Python logic you please. Then, you just need to run `pytest` (or `poetry run pytest`, in our case) to run your test suite, assuming that you have Postgres running in the background already. If you don't, you'll need to spin it up first.

### A More Complicated Example

Let's get into a more complicated example, since the value of unit testing isn't in testing trivial cases like above.

#### Sessionization

A very common task for an analytics engineer is "sessionizing" events. In other words, converting actions that users take -- such as viewing pages -- into some notion of a _session_ on a site. For example, if a user visits your site both today and tomorrow, you might consider those two visits to be separate sessions.

But some user tracking tools don't give you sessions for free. Instead, you need to create them. Let's imagine we have a table called `stg_pageviews` that comes from [Segment](https://segment.com/), which you might use for event tracking. The table has the following columns: `event_id`, which uniquely identifies each page view, `url`, which is the URL of the page viewed, `anonymous_id`, which is Segment's user ID that works for both anonymous and logged-in users, and `timestamp`, which is the timestamp of when the user viewed the page. Then, we might create sessions as follows

```sql
-- int_sessions.sql

-- Set the max session idle time, in minutes
{% set max_session_idle_time_minutes = 30 %}


-- First, we figure out how long passes between each (consecutive) pair
-- of page views for a user.
WITH pageviews_with_previous AS (
    SELECT
        event_id,
        url,
        anonymous_id,
        timestamp,
        LAG(timestamp, 1) OVER(
            PARTITION BY anonymous_id
            ORDER BY timestamp
        ) AS previous_timestamp
    FROM {{ ref("stg_pageviews") }}
),
new_session_labels AS (
    SELECT
        event_id,
        url,
        anonymous_id,
        timestamp,
        CASE
            -- If the previous page was viewed less than `max_session_idle_time_minutes` ago
            -- then it should be considered part of a new session
            WHEN {{ datediff("previous_timestamp", "timestamp", "minute") }} <= {{ max_session_idle_time_minutes }} THEN 0
            ELSE 1
        END AS new_session
    FROM pageviews_with_previous
),

-- Next, we create the session by taking a cumulative sum of the `new_session` values.
--
-- The basic idea is that `new_session` is 1 if {{ max_session_idle_time_minutes }} have
--  passed since the last page view, and zero otherwise. That means that if you view
--  three pages one after another in quick succession, the first one will get a value of 1
--  for `new_session` since it's the first pageview _ever_ for you, and the others
--  get a value of zero, since not enough time has passed since your last page view.
--  If you then leave for an hour, come back, and view one page, that page gets a `new_session`
--  value of one. And then you do it again, and the newest page view also gets a `new_session`
--  value of one.
--
-- Then, when we do the cumulative sum over `new_session`, all of the values for a single "session"
-- are 1 until we hit the fourth row (where there's another `new_session` value of 1) at which point
-- the cumulative sum becomes 2. And then we hit the next row, and it becomes 3.
--
-- Here's an example of how it looks for the example above:
--
-- event_id     time     new_session  session_id
--    1          00:00:00       1           1
--    2          00:00:10       0           1
--    3          00:00:20       0           1
--    4          08:00:00       1           2
--    5          14:00:00       1           3
session_numbers AS (
    SELECT
        *,
        SUM(new_session) OVER(
            PARTITION BY anonymous_id
            ORDER BY timestamp
            ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
        ) AS session_number
    FROM new_session_labels
)

SELECT
    {{ dbt_utils.generate_surrogate_key(['anonymous_id', 'session_number']) }} AS session_id,
    event_id,
    url,
    timestamp
FROM session_numbers
```

Hopefully the comments in the code help with following along. The goal here at the end of the day is to create a table that we can join back to the page views table with our newly created sessions. Then we can use sessions to easily analyze things like conversion rates, bounce rates, common landing and exit pages, and so on.

But this isn't a blog post about sessionization, it's about testing. So let's write some tests!

```python
## tests/int/test_int_sessions.py

import pytest
import pandas as pd
from dbt.tests.util import run_dbt
from common import load_sql, convert_dicts_to_csv, connect_to_test_db

MODEL_NAME = "int_sessions"

mock_stg_pageviews = convert_dicts_to_csv([
    {"event_id": 1, "url": "www.example.com", "anonymous_id": "foobar", "timestamp": "2023-04-13 15:00:31"},
    {"event_id": 2, "url": "www.example.com/foo/bar", "anonymous_id": "foobar", "timestamp": "2023-04-13 15:00:41"},
    {"event_id": 3, "url": "www.example.com/baz", "anonymous_id": "foobar", "timestamp": "2023-04-13 15:00:59"},
    {"event_id": 4, "url": "www.example.com", "anonymous_id": "foobar", "timestamp": "2023-04-13 16:00:00"},
    {"event_id": 5, "url": "www.example.com/baz", "anonymous_id": "foobar", "timestamp": "2023-04-13 17:00:00"},
    {"event_id": 6, "url": "www.example.com/baz", "anonymous_id": "foobar", "timestamp": "2023-04-13 17:29:59"},
    {"event_id": 7, "url": "www.example.com/baz", "anonymous_id": "foobar", "timestamp": "2023-04-13 18:00:00"},
])

expected = pd.DataFrame([{"event_id": i} for i in range(1, 8)])

actual = load_sql(MODEL_NAME)


class TestIntSessions():
    @pytest.fixture(scope="class")
    def seeds(self):
        return {
            "stg_pageviews.csv": mock_stg_pageviews
        }

    @pytest.fixture(scope="class")
    def models(self):
        return {
            "actual.sql": actual
        }

    @pytest.fixture(scope="class")
    def packages(self):
        return """
        packages:
          - package: dbt-labs/dbt_utils
            version: "1.0.0"
        """

    @pytest.fixture(scope="class")
    def actual(self):
        run_dbt(["deps"])
        build_result = run_dbt(["build"])

        schema = build_result.results[0].node.schema

        engine = connect_to_test_db()

        actual = pd.read_sql(
            sql = f"SELECT * FROM {schema}.actual ORDER BY event_id",
            con = engine
        )

        return actual

    def extract_session_id(self, actual):
        return actual["session_id"].tolist()

    def test_event_ids_are_unmodified_by_model(self, project, actual):
        ## Test that the pageview IDs and the landing pages match our expectations
        assert actual["event_id"].tolist() == expected["event_id"].tolist()

    def test_first_session_correctly_created(self, project, actual):
        session_ids = self.extract_session_id(actual)

        ## In the data above, there should be four unique sessions created.
        ## They should correspond to page views 1-3, page view 4, page views 5-6, and page view 7
        ## The first three rows should all be the same session
        assert session_ids[0] == session_ids[1]
        assert session_ids[1] == session_ids[2]
        assert session_ids[0] == session_ids[2]

        ## The rest of the rows should be different sessions
        assert session_ids[0] not in session_ids[3:]

    def test_second_session_one_row(self, project, actual):
        session_ids = self.extract_session_id(actual)

        ## The fourth row should be its own session
        assert session_ids[3] not in session_ids[:3]
        assert session_ids[3] not in session_ids[4:]

    def test_twenty_nine_min_fifty_nine_seconds_later_is_same_session(self, project, actual):
        session_ids = self.extract_session_id(actual)

        # ## The fifth and sixth rows should be their own session
        assert session_ids[4] == session_ids[5]
        assert session_ids[4] not in session_ids[:4]
        assert session_ids[4] not in session_ids[6:]

    def test_thirty_minutes_and_one_second_later_is_new_session(self, project, actual):
        session_ids = self.extract_session_id(actual)

        # ## The seventh row should be its own session
        assert session_ids[6] not in session_ids[:6]
```

That was a lot of code to process, but the basic gist is the same as before: First, we define some "seed" data in stringified CSV (converted from a list of dictionaries) that we load into our database. We then run our dbt model on the seed data, we query the result, and we run assertions against the result to guarantee that our code is actually behaving how we want.

Note that in the spirit of unit testing, we can get very granular here. For instance, in these tests we're checking things like individual session IDs for pageviews that occurred one second before and after a specified timestamp being different from each other, and that different users have different session IDs, and so on. This is of course just an example, but you can make this logic as involved as you like. At the end of the day, the goal is to help you sleep at night with the knowledge that your code, which might be feeding into ML models, underpinning business decisions, and so on, is _correct_.

## Wrapping Up

This was a bit of an in the weeds, technical post. The goal was to shed some light on something that, from what I've heard, not many people are talking about, and likely even fewer are actually _doing_. My hope is that every analytics engineering team will write unit tests for their dbt pipelines, and my goal in writing this post was to make setting up your test suite more approachable. The main takeaway is this: Since dbt plays so nicely with pytest, it should be fast and simple to get your unit test suite off the ground! And once you're in the habit of writing unit tests, you can have significantly more confidence in the correctness of the SQL that's running in your dbt builds. After all: dbt sells itself as bringing software engineering practices to data pipelines, and unit testing is maybe the best of those best practices.

## Appendix

### `common` Code

I'm going to leave some of the code we have in our `common` module here, for others to copy.

First, connecting to our test database:

```python
from sqlalchemy import create_engine
from sqlalchemy.engine.url import URL
import os

def connect_to_test_db():
    url = URL.create(
        "postgresql",
        username = os.environ.get("TEST_DB_USER"),
        password = os.environ.get("TEST_DB_PASSWORD"),
        host = "localhost",
        database = os.environ.get("TEST_DB_NAME"),
        port = int(os.environ.get("TEST_DB_PORT"))
    )

    return create_engine(url)
```

Next, converting a list of dictionaries to a stringified CSV:

```python
import pandas as pd

def convert_dict_to_csv(data):
    df = pd.DataFrame.from_dict(data)
    return df.to_csv(index = False)
```

And finally, loading models and macros. Note that this is much more involved, and there's certainly a way to do this with a macro that relies on the [dbt graph context variable](https://docs.getdbt.com/reference/dbt-jinja-functions/graph), but that was far more involved than this.

```python
from dbt.tests.util import read_file
import glob

def load_sql(basename):
    model_sql_name = basename + ".sql"
    model_regex = f'../models/**/{model_sql_name}'
    model_matches = glob.glob(model_regex, recursive=True)

    if not model_matches:
        raise Exception(
            f"""
            Could not find a model named '{model_sql_name}'.
            Does the path to your test exactly match the path to the model you're testing?

            For example, to test model
                'models/staging/foo/bar/baz.sql'

            You would put your test in:
                'tests/staging/foo/bar/test_baz.sql'
            """
        )

    if len(model_matches) > 1:
        raise Exception(
            f"""
            Your path matched multiple models. Did you accidentally create a duplicate model?

            The following paths were matched: {model_matches}
            """
        )

    return read_file(model_matches[0])
```
