######################################################################################################################################
# Module multivariate
# Goal : use statistical tests to compare data between groups or assess the relationship between continuous variables
######################################################################################################################################

# Load data
library("plotly")
library("ggplot2")
library(htmlwidgets)
library(ggpubr)

# 1 - airlines : 16 airlines
# 2 - airports : 1458 destination airports 
# 3 - flights : 336776 flights
# 4 - planes : 3322 planes
# 5 - weather : hourly weather for each airport in 2013

airlines <- nycflights13::airlines
airports <- nycflights13::airports
flights <- nycflights13::flights
planes <- nycflights13::planes
weather <- nycflights13::weather

# Correlation between temperature and wind speed in february : correlation and plot

data_february <- weather %>%
  filter(month==2)

shapiro.test(data_february$temp)
hist(data_february$temp)
ggqqplot(data_february$temp,conf.int = T)

cor.test(data_february$temp,data_february$wind_speed,method = "spearman")
plot(data_february$temp,data_february$wind_speed)

# Compare the departure delay variability between the three New-York airports

bartlett.test(dep_delay ~ origin,data=flights)
kruskal.test(dep_delay ~ origin,data=flights)
boxplot(dep_delay ~ origin,data=flights)

# Compare the temperature mean or median between the three New-York airports in august

weather_august <- weather %>%
  filter(month==8)

bartlett.test(temp ~ origin,data=weather)
kruskal.test(temp ~ origin,data=weather)
boxplot(temp ~ origin,data=weather)