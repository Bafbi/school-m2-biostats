######################################################################################################################################
# Module univariate tests
# Goal : Test some hypotheses on data
######################################################################################################################################

# Load data
library(nycflights13)
library(stats)
library(dplyr)
library(outliers)

airlines <- nycflights13::airlines
airports <- nycflights13::airports
flights <- nycflights13::flights
planes <- nycflights13::planes
weather <- nycflights13::weather

# Check the normality of departure delay in airport JFK during the 10 first days of october in dataset flights (ggqqplot and shapiro.test)





# Compare the humidity (humid) of november in airport LGA with the level of 50%





# Check outliers in arr_delay for flights to Honolulu (HNL) in march (grubbs.test)


