######################################################################################################################################
# Module LUBRIDATE
# Goal : Use the functionalities of lubridate package to process dates
# Tip : 
######################################################################################################################################

# Install package -------------------------------------------------------------
install.packages("lubridate")

# Load package -------------------------------------------------------------
library("lubridate")

# Load data -------------------------------------------------------------
games <- lubridate::lakers # details of the season 2008 - 2009 of Los Angeles Lakers NBA team (34624 records)

# Exercises -------------------------------------------------------------

# Change the date format (from integer to date) in order to process data
# Hint : use ymd function and as_date function


# Extract the day in a new variable called day



# Extract the month in a new variable called month



# Extract the month in a new variable called year



# Create a new variable called date_time which concatenate date and time
# Hint : use ymd_hm function with paste0 function






































# Answers -------------------------------------------------------------

# Change the date format (from integer to date) in order to process data
# Hint : use ymd function and as_date function

games$date <- lubridate::as_date(ymd(games$date), origin = lubridate::origin)

# Extract the day in a new variable called day
games$day <- day(games$date)

# Extract the month in a new variable called month
games$month <- month(games$date)

# Extract the month in a new variable called year
games$year <- year(games$date)

# Create a new variable called date_time which concatenate date and time
# Hint : use ymd_hm function with paste0 function
games$date_time <- ymd_hm(paste0(games$date,games$time))

