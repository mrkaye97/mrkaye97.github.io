library(glue)

print(glue('Github PAT: {Sys.getenv("GITHUB_PAT")}'))

print(glue('Database URL: {Sys.getenv("DATABASE_URL")}'))

print(glue('Hello from Docker! I am running R version {Sys.getenv("R_VERSION")}.'))
