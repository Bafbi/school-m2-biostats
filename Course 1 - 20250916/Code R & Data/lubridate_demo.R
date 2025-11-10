######################################################################################################################################
# Nom : 
# Prénom : 
# Date : 
# Module DPLYR
# Goal : Use the functionalities of lubridate package to process dates
# Tip : 
######################################################################################################################################

# Load data
library("nycflights13")
library("lubridate")
library("dplyr")

# nycflights13 dataset resumes the flights at departure of the three New-York airports (EWR : Newark Liberty Intl ; LGA : La Guardia and JFK : John F Kennedy Intl)
# in 2013 and is composed by five tables : 

# 1 - airlines : 16 airlines
# 2 - airports : 1458 destination airports 
# 3 - flights : 336776 flights
# 4 - planes : 3322 planes
# 5 - weather : hourly weather for each airport in 2013

flights <- nycflights13::flights %>% select(-c(time_hour))
weather <- nycflights13::weather %>% select(-c(time_hour))

# Create a datetime variable in flights dataset




# Extract components from datetime variable in weather dataset


































flights_updated <- flights %>%
  mutate(date_time=lubridate::ymd_hm(paste0(year,"-",month,"-",day," ",hour,":",minute)))
