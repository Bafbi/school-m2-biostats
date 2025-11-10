######################################################################################################################################
# Module descriptive statistics
# Goal : Summarize data with stats package
# Tip : 
######################################################################################################################################

# Load data
library("nycflights13")
library(dplyr)
# library("stats")

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

# Describe a dataset

table(flights$carrier)
summary(flights$distance)

# Get overall mean +/- sd of distance by carrier parameters with dplyr in flights dataset

stats <- flights %>%
  dplyr::group_by(carrier) %>%
  dplyr::summarise(n_flights=n(),
                   mean_distance=mean(distance,na.rm = T),
                   sd_distance=sd(distance,na.rm = T))

# Calculate the coefficient of correlation between arr_delay and distance in flights dataset

cor(flights$arr_delay,flights$distance,method = "spearman",use = "complete.obs")

# Calculate the quartiles : 0.05, 0.25, 0.5 (median), 0.75 and 0.95 of parameter temp in weather dataset

quantile(flights$arr_delay,probs=c(0.25,0.5,0.75),na.rm=T)

# Calculate the number and % of flight by origin and carrier with dplyr in flights dataset

stats <- flights %>%
  group_by(origin,carrier) %>%
  summarise(n_flights=n(),
            pct=n_flights/sum(n_flights))
