error_400 <- function(res, msg) {
  code <- 400L

  res$status <- code
  res$body <- list(
    status_code = code,
    message = msg
  )
}

#* Double a number
#*
#* @param n:int The number to double
#* @serializer unboxedJSON
#*
#* @get /double
function(req, res, n) {
  n <- as.integer(n)
  if (!is.integer(n) || is.na(n)) {
    error_400(res, "N must be an integer.")
  } else {
    return(n * 2)
  }
}
