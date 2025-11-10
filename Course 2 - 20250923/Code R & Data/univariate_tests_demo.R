######################################################################################################################################
# Module univariate tests
# Goal : Test some hypotheses on data
######################################################################################################################################

# Load data
library(nycflights13)
library(stats)
library(ggpubr)
library(dplyr)
library(outliers)

airlines <- nycflights13::airlines
airports <- nycflights13::airports
flights <- nycflights13::flights
planes <- nycflights13::planes
weather <- nycflights13::weather

# Check the normality of temperature in january (ggqqplot and shapiro.test)

temp_janvier <- weather %>%
  filter(month==1) %>%
  select(temp)
  
shapiro.test(temp_janvier$temp)
ggqqplot(temp_janvier$temp,conf.int = T)
hist(temp_janvier$temp)
skewness(temp_janvier$temp)
kurtosis(temp_janvier$temp)

# Compare the temperature of january with 30°F (median and mean)

median(temp_janvier$temp)
wilcox.test(temp_janvier$temp,mu = 30,alternative = "greater")

# Check outliers in flights arr_delay (grubbs.test)

boxplot(flights$arr_delay)
outliers::grubbs.test(flights$arr_delay,opposite = T)

# Checking normality of simulated data

data_normal <- rnorm(100, mean = 5, sd = 3)
shapiro.test(data_normal)
ggqqplot(data_normal,conf.int = T)

data_unif <- runif(5000,min = 0,max = 1)
shapiro.test(data_unif)
ggqqplot(data_unif,conf.int = T)
