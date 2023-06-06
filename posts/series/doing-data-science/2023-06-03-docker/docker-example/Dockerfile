FROM rocker/r-ver:4.2.0

ARG GITHUB_PAT

## Don't actually do this
## It's just for an example
RUN echo "$GITHUB_PAT"

COPY example.R example.R
COPY renv /renv
COPY .Rprofile .Rprofile
COPY renv.lock renv.lock

RUN Rscript -e "renv::restore()"

CMD ["Rscript", "example.R"]
