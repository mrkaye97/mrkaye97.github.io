library(plumber)

api <- plumb("posts/2023-06-29-lessons-learned-from-running-r-in-production/plumber-types-example/plumber.R")

api$run()
