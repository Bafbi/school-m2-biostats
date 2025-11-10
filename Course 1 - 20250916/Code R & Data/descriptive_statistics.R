######################################################################################################################################
# Module DPLYR
# Goal : Use the functionalities of dplyr package to transform, filter, re-arrange and summarise data
# Tip : 
######################################################################################################################################

# Install package -------------------------------------------------------------
install.packages(c("nycflights13","dplyr"))

# Load data -------------------------------------------------------------
library("nycflights13")
library("dplyr")

# Exercises -------------------------------------------------------------

# nycflights13 dataset resumes the flights at departure of the three New-York airports (EWR : Newark Liberty Intl ; LGA : La Guardia and JFK : John F Kennedy Intl)
# in 2013 and is composed by five tables : 

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

# Merge into a dataset named data with dplyr functions the dataset flights with airlines 
# and planes in order to have all information in the same dataset

# Summarise all quantitative data with dplyr
# Hint : use select and where dplyr functions and summarise function from base)


# store in a summary dataset called stats_weather the statistical moment
# (number of records, number of missing values, minimum, Q1, median, Q3, maximum, mean, standard-deviation)
# by month for parameters temp and wind_gust in the
# Hint : use dplyr package


# Calculate the number of records and % of flights by airport destination (dest) in flights dataset and select the top 5
# Merge the flights dataset with airports for getting the real name of the airport


# Calculate the Spearman's correlation between dep_delay and arr_delay (dataset flights) for the month of January 2013
# Hint : use cor function from stats package


# Plot this relationship and color the points by distance with ggplot2 and add a linear regression curve colored in red



