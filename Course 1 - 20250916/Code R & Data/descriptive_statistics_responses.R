######################################################################################################################################
# Module DPLYR
# Goal : Use the functionalities of dplyr package to transform, filter, re-arrange and summarise data
# Tip : 
######################################################################################################################################

# Install package -------------------------------------------------------------
install.packages(c("nycflights13","dplyr"))

# Load data & install packages -------------------------------------------------------------
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








































# Answers -------------------------------------------------------------

# Merge into a dataset named data with dplyr functions the dataset flights with airlines 
# and planes in order to have all information in the same dataset

data <- merge(flights,airlines,by = "carrier") %>%
  merge(airports,by.x="origin",by.y="faa") %>%
  rename("Company"="name.x",
         "Airport"="name.y")

# Summarise all quantitative data with dplyr
# Hint : use select and where dplyr functions and summarise function from base)

data %>%
  select(where(is.numeric)) %>%
  base::summary(.)

# store in a summary dataset called stats_weather the statistical moment
# (number of records, number of missing values, minimum, Q1, median, Q3, maximum, mean, standard-deviation)
# by month for parameters temp and wind_gust in the
# Hint : use dplyr package

stats_temp <- weather %>%
  group_by(month) %>%
  summarise(n=sum(!is.na(temp)),
            n_miss=sum(is.na(temp)),
            min=min(temp,na.rm = T),
            q1=quantile(temp,na.rm = T,probs = 0.25),
            med=quantile(temp,na.rm = T,probs = 0.5),
            q3=quantile(temp,na.rm = T,probs = 0.75),
            max=max(temp,na.rm = T),
            mean=mean(temp,na.rm=T),
            sd=sd(temp,na.rm=T)) %>%
  mutate(Parameter="Temperature")

stats_wind_gust <- weather %>%
  group_by(month) %>%
  summarise(n=sum(!is.na(wind_gust)),
            n_miss=sum(is.na(wind_gust)),
            min=min(wind_gust,na.rm = T),
            q1=quantile(wind_gust,na.rm = T,probs = 0.25),
            med=quantile(wind_gust,na.rm = T,probs = 0.5),
            q3=quantile(wind_gust,na.rm = T,probs = 0.75),
            max=max(wind_gust,na.rm = T),
            mean=mean(wind_gust,na.rm=T),
            sd=sd(wind_gust,na.rm=T)) %>%
  mutate(Parameter="Wind gust")

stats_weather <- rbind(stats_temp,stats_wind_gust)
rm(stats_temp,stats_wind_gust)

# Calculate the number of records and % of flights by airport destination (dest) in flights dataset and select the top 5
# Merge the flights dataset with airports for getting the real name of the airport

stats <- flights %>%
  merge(airports,by.x = "dest",by.y = "faa") %>%
  group_by(name,tzone) %>%
  summarise(n=n(),
            pct=(n/nrow(flights)*100)) %>%
  arrange(desc(pct))


# Calculate the Spearman's correlation between dep_delay and arr_delay (dataset flights) for the month of January 2013
# Hint : use cor function from stats package


correlation <- cor(x = flights[flights$month==1,"dep_delay"],
                   y = flights[flights$month==1,"arr_delay"],
                   use = "complete.obs",
                   method = "spearman")

# Plot this relationship and color the points by distance with ggplot2 and add a linear regression curve colored in red

ggplot(data=flights[flights$month==1,],
       mapping = aes(x = dep_delay,
                     y = arr_delay,
                     color = distance))+
  geom_point(alpha=0.5) + 
  geom_smooth(method = "lm",color="red") + 
  scale_colour_gradient(low = "blue",high = "green") + 
  xlab("Delay at departure (minutes)")+
  ylab("Delay at arrival (minutes)")+
  theme_bw() + 
  scale_x_continuous(n.breaks = 10)+
  scale_y_continuous(n.breaks = 10)

