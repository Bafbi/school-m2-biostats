######################################################################################################################################
# Nom : 
# Prénom : 
# Date : 
# Module ggplot2
# Goal : Use the functionalities of ggplot2 package to visualize data
# Tip : 
######################################################################################################################################

# Install package
# install.packages("ggplot2")

# Load data
library("nycflights13")
library("dplyr")
library(ggplot2)
library(Cairo)

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

# Histogram of arr_delay in December 2013

flights %>%
  filter(month==12) %>%
  ggplot() +
  ggplot2::geom_histogram(mapping = aes(x = arr_delay)) +
  theme_bw()

# Boxplot of altitude of airports by timezone

airports %>%
  ggplot() +
  ggplot2::geom_boxplot(mapping = aes(x = tzone,
                                      y = alt)) +
  theme_bw() +
  xlab("Time zone") +
  ylab("Altitude") +
  ggtitle("Beautiful plot")

# Add elements to plot : a regression line to a scatter plot


# Add layout themes


# Rename legend, title and axis


# Change colors



# Save plot in PNG with Cairo package
