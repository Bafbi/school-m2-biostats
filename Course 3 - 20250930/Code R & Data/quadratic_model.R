######################################################################################################################################
# Nom : 
# Prénom : 
# Date : 
# Module Quadratic regression
# Goal : 
# Tip : 
######################################################################################################################################

# Load packages
library(dplyr)
library(datasets)
library(stats)
library(car)
library(corrplot)
library(MASS)
library(mvnormtest)
library(outliers)
library(rstatix)
library(datarium)
library(UsingR)
library(ggplot2)
library(rstatix)

# Import Dataset quadratic_data.csv
# The dataset is organized in a tabular format and contains two columns.
# The first column represents the temperature values, which serve as the independent variable in the regression analysis.
# The temperature values are typically measured in degrees Celsius or Fahrenheit.
# The second column corresponds to the number of units of ice cream sold, which is the dependent variable in the regression analysis.
# Hint : use read.csv2 function

data <- read.csv2(file = "C:/Users/machu/Documents/Documents/Cours Junia 2025/Cours 2025/T3 2025/Cours 3/Data/quadratic_data.csv",sep = ",",dec = ".")

# Plot relationship between the two variables
# Hint : use 


# Launch a linear model explaining the number of units of ice cream sold by the temperature
# Hint : use lm function


# Assess quality of this model (residuals, R²...)
# Hint : use residuals function


# Add a quadratic term in the equation
# Hint : use lm function


# Plot the quadratic function in the scatterplot
# Hint : use ggplot and geom_smooth

# Predict data
