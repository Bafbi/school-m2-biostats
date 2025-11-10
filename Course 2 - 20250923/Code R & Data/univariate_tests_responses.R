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

# Check the normality of departure delay in airport JFK during the 10 first days of october in 
# dataset flights (ggqqplot and shapiro.test)

dep_delay_october_JFK <- flights %>%
  filter(origin=="JFK" & month==10 & day %in% c(1:10))

ggqqplot(dep_delay_october_JFK$dep_delay)
hist(dep_delay_october_JFK$dep_delay,breaks = 30)
shapiro.test(dep_delay_october_JFK$dep_delay)

rm(dep_delay_october_JFK)

# Compare the humidity (humid) of november in airport LGA with the level of 50%

humidity_november_LGA <- weather %>%
  filter(origin=="LGA" & month==11)

summary(humidity_november_LGA$humid)

ggqqplot(humidity_november_LGA$humid)
hist(humidity_november_LGA$humid,breaks = 30)
shapiro.test(humidity_november_LGA$humid)

wilcox.test(humidity_november_LGA$humid,
            mu=50)

rm(humidity_november_LGA)

# Check outliers in arr_delay for flights to Honolulu (HNL) in march (grubbs.test)

flights_HNL <- flights %>%
  filter(dest=="HNL" & month==3)

grubbs.test(flights_HNL$arr_delay)
boxplot(flights_HNL$arr_delay)


