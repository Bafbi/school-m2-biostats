######################################################################################################################################
# Nom : 
# Prénom : 
# Date : 
# Module Exponential regression
# Goal : 
# Tip : 
######################################################################################################################################

# Load packages
library(tidyverse)
library(caret)
library(MASS)
set.seed(123)

# Load the data
Year <- seq(1,20)
Population <- c(500, 550, 610, 680, 760, 850, 950, 1060, 1180, 1320, 1470, 
                1640, 1830, 2040, 2280, 2540, 2830, 3140, 3480, 3850)

df <- data.frame(Year, Population)

# Plot the evolution of population through time



# Fit exponential model



# Plot residuals



# Plot predictions of model on plot



# Predict the population expected when x = 25