######################################################################################################################################
# Module multivariate
# Goal : use statistical tests to compare data between groups or assess the relationship between continuous variables
######################################################################################################################################

# Load data
library("plotly")
library("ggplot2")
library(htmlwidgets)
library(datasets)

# 1 - airlines : 16 airlines
# 2 - airports : 1458 destination airports 
# 3 - flights : 336776 flights
# 4 - planes : 3322 planes
# 5 - weather : hourly weather for each airport in 2013

cars <- datasets::cars
airlines <- nycflights13::airlines
airports <- nycflights13::airports
flights <- nycflights13::flights
planes <- nycflights13::planes
weather <- nycflights13::weather

# Correlation between speed and distance need to stop in cars dataset : correlation and plot (add linear regression line with geom_smooth)


# Compare the distance variability in flights dataset between the three New-York airports in july 2013 and plot the boxplots


# Compare the mean (or median) distances of flights in july 2013 between the three airports


# Compare the mean (or median) distances of flights between the five most active companies (number of flights) in 2013


# Calculate and compare the average age of planes mean (or median) between the five most active companies (number of flights) in 2013 and plot the boxplots


# Calculate and compare % of tzones which contains "America" on the number of flights between the three airports (dataset airports) between the three New-York airports and plot the stacked
# bar chart with ggplot2 and / or plotly
# Hint : use table function to transform raw data into a contingency table