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

# Exercices ---------------------------------------------------------

airlines <- nycflights13::airlines
airports <- nycflights13::airports
flights <- nycflights13::flights
planes <- nycflights13::planes
weather <- nycflights13::weather

# Check skewness and kurtosis of the parameter temp in weather dataset for EWR airport

skewness(weather[weather$origin=="EWR","temp"])
kurtosis(weather[weather$origin=="EWR","temp"])

temp <- weather[weather$origin=="EWR","temp"]
hist(temp$temp,breaks = 30)

# Plot with ggplot2 the density of temperature of this airport
# Hint : use geom_density function

ggplot(data=weather[weather$origin=="EWR",],
       aes(temp)) +
  geom_density() +
  theme_bw()

# Plot with ggplot2 the histogram of humidity of this airport with 30 bins, with color blue and fill color white
# Hint : use geom_histogram function

ggplot(data=weather[weather$origin=="EWR",],
       aes(humid)) +
  geom_histogram(bins = 30,color="blue", fill="white") +
  theme_bw()

skewness(weather[weather$origin=="EWR","humid"])
kurtosis(weather[weather$origin=="EWR","humid"])

# Generate a dataset called normal_1 with two variables : category="Normal 1" and a normally distributed variable with the following
# properties : number of observations : 1500, mean = 15, sd = 5

normal_1 <- data.frame(
  category=rep("Normal 1",1500),
  values=rnorm(n = 1500,mean = 15,sd = 5)
)

# Generate a dataset called normal_2 with two variables : category="Normal 1" and a normally distributed variable with the following
# properties : number of observations : 750, mean = 25, sd = 10

normal_2 <- data.frame(
  category=rep("Normal 2",750),
  values=rnorm(n = 750,mean = 25,sd = 10)
)

# Merge the two datasets into a dataset called "normal" and plot the histograms of these two parameters in the same plot with ggplot2
# And the represent the mean of each category with a vertical line
# Hint : use geom_vline function of ggplot2

normal <- rbind(normal_1,normal_2)
rm(normal_1,normal_2)

ggplot(data=normal,aes(x = values,fill=category)) +
  # geom_histogram(bins = 30,alpha=0.5) +
  geom_density() +
  geom_vline(xintercept = mean(normal[normal$category=="Normal 1","values"],na.rm = T),color="red") +
  geom_vline(xintercept = mean(normal[normal$category=="Normal 2","values"],na.rm = T),color="blue") +
  theme_bw()

ggplot(data=normal,
       aes(x = values,fill=category)) +
  geom_density() +
  theme_bw()

# Test distribution
skewness(normal[normal$category=="Normal 1","values"])
kurtosis(normal[normal$category=="Normal 1","values"])

skewness(normal[normal$category=="Normal 2","values"])
kurtosis(normal[normal$category=="Normal 2","values"])
