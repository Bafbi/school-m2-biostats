######################################################################################################################################
# Nom : 
# Prénom : 
# Date : 
# Module DPLYR
# Goal : Use the functionalities of dplyr package to transform, filter, re-arrange and summarise data
# Tip : 
######################################################################################################################################

# Load data ---------------------------------------------------------
library("nycflights13")
library("dplyr")

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

# Demo %>% -------------------------

flights_august <- flights %>%
  dplyr::filter(month==8) %>%
  dplyr::arrange(desc(day))

# Demo group_by

stats_august <- flights_august %>%
  dplyr::group_by(dest) %>%
  dplyr::summarise(n_dest=n()) %>%
  dplyr::arrange(desc(n_dest))

# Demo mutate & case_when

flights <- flights %>%
  dplyr::mutate(new_var=sched_dep_time-dep_time)

# Demo select

flights <- flights %>%
  dplyr::select(year,month,day)

# Demo filter

# Demo arrange

# Demo summarise



