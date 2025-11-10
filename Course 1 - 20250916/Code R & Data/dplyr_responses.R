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

# Use dplyr package to print in the console the characteristics of the airport line 345 in table airports

airports %>% 
  slice(345)

# Use dplyr package to print in the console the wind characteristics (direction, speed and gust) of 2023-12-10 at 10pm at JFK airport

weather %>% 
  filter(origin=="JFK" & month==12 & day==10 & hour==22) %>% 
  select(wind_speed,wind_dir,wind_gust)

# Use dplyr package to summarise for each departure airport the number of flights, minimum distance, maximum distance, average distance and standard-deviation
# (Hint : use mean(), min(), max(), sd() base functions with a group_by)

flights  %>%
  group_by(origin) %>%
  summarise(n_flights=n(),
            min_distance=min(distance,na.rm=T),
            mean_distance=mean(distance,na.rm=T),
            sd_distance=sd(distance,na.rm=T),
            max_distance=max(distance,na.rm=T))

# Use dplyr package to calculate the speed in miles/hour of each flight in a new variable called speed in table flights

flights <- flights %>%
  mutate(speed=60*(distance/(hour*60+minute)))

# What was the average departure delay in each month ?
# Save this as a data frame `dep_delay_by_month`
# Hint: you'll have to perform a grouping operation then summarizing your data

dep_delay_by_month <- flights  %>%
  group_by(month) %>%
  summarise(n_flights=n(),
            mean_dep_delay=mean(dep_delay,na.rm=T))

# Which month had the greatest average departure delay?

dep_delay_by_month %>%
  dplyr::arrange(desc(mean_dep_delay)) %>%
  slice(1)

# To which destinations were the average arrival delays the highest?
# Hint: you'll have to perform a grouping operation then summarize your data
# You can use the `head()` function to view just the first few rows
# Hint: merge with airports dataset to get name of airport

flights  %>%
  group_by(dest) %>%
  summarise(n_flights=n(),
            mean_arr_delay=mean(arr_delay,na.rm=T)) %>%
  merge(airports,by.x = "dest",by.y = "faa") %>%
  dplyr::arrange(desc(mean_arr_delay)) %>%
  head(1)

# Which city was flown to with the highest average speed?
# Hint: merge with airports dataset to get name of airport

flights  %>%
  group_by(dest) %>%
  summarise(n_flights=n(),
            mean_speed=mean(speed,na.rm=T)) %>%
  merge(airports,by.x = "dest",by.y = "faa") %>%
  dplyr::arrange(desc(mean_speed)) %>%
  head(1)

