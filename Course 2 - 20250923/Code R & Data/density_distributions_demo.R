######################################################################################################################################
# Module Density distributions
# Goal : Check distribution characteristics on data
######################################################################################################################################

# install.packages("parameters")

# Load data
library("nycflights13")
library("dplyr")
library("parameters")
library("ggplot2")

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

# Check skewness and kurtosis of the parameter humid in weather dataset for JFK airport

weather %>%
  filter(origin=="JFK") %>%
  select(humid) %>%
  as.data.frame()

skewness(weather[weather$origin=="JFK","humid"])
kurtosis(weather[weather$origin=="JFK","humid"])

temp_JFK <- weather %>%
  filter(origin=="JFK")

hist(temp_JFK$humid)

# Generate a variable called normal with the following properties : number of observations : 1500, mean = 15, sd = 5
# and plot this distribution

normal <- rnorm(n = 1500,mean = 15,sd = 5)
hist(normal)

# Generate a variable called binomial with the following properties : number of observations : 250, number of observations in each trial = 100, 
# probability of success = 0.75 and plot this distribution

binomal <- rbinom(n = 250,size = 100,prob = 0.75)
hist(binomal)

# Test normality of parameter temperature in april and november

temp_april_november <- weather %>% 
  as.data.frame() %>%
  filter(month %in% c(7,12))

ggplot() +
  geom_histogram(data = temp_april_november,bins = 10,
               aes(x=temp,
                   fill=as.factor(month)))

shapiro.test(temp_april_november[temp_april_november$month==4,"temp"])
qqnorm(temp_april_november[temp_april_november$month==4,"temp"])

shapiro.test(temp_april_november[temp_april_november$month==11,"temp"])
qqnorm(temp_april_november[temp_april_november$month==11,"temp"])

