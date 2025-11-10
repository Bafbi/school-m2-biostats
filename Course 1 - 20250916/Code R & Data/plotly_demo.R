######################################################################################################################################
# Nom : 
# Prénom : 
# Date : 
# Module ggplot2
# Goal : Use the functionalities of ggplot2 package to visualize data
# Tip : 
######################################################################################################################################

# Load data
library("plotly")
library("ggplot2")
library(htmlwidgets)
library(dplyr)

weather <- nycflights13::weather

# Boxplot by origin

plot_ly(
        x =weather$origin,
        y=weather$humid,
        type = "box" )


# Scatter plot of temperature and humidity


# 3D plot : relationship between wind, humidity and temperature


# Save plot in a HTML document with htmlwidgets::saveWidget()


# Plot the relationship between the average temperature and the month with ggplot2 and transform it into a plotly object