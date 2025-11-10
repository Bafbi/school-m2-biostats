######################################################################################################################################
# Module Density distributions
# Goal : Check distribution characteristics on data
######################################################################################################################################

install.packages("parameters")

# Load data
library("nycflights13")
library("dplyr")
library("parameters")

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

# Check skewness and kurtosis of the parameter temp in weather dataset for EWR airport


# Plot with ggplot2 the density of temperature of this airport
# Hint : use geom_density function



# Plot with ggplot2 the histogram of humidity of this airport with 30 bins, with color blue and fill color white
# Hint : use geom_histogram function


# Generate a dataset called normal_1 with two variables : category="Normal 1" and a normally distributed variable with the following
# properties : number of observations : 1500, mean = 15, sd = 5


# Generate a dataset called normal_2 with two variables : category="Normal 1" and a normally distributed variable with the following
# properties : number of observations : 750, mean = 25, sd = 10


# Merge the two datasets into a dataset called "normal" and plot the histograms of these two parameters in the same plot with ggplot2
# And the represent the mean of each category with a vertical line
# Hint : use geom_vline function of ggplot2
