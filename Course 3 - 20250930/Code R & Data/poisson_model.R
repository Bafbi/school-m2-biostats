######################################################################################################################################
# Nom : 
# Prénom : 
# Date : 
# Module Poisson regression
# Goal : 
# Tip : 
######################################################################################################################################

install.packages("AER")
# Load packages
library(tidyverse)
library(caret)
library(MASS)
library(ggplot2)
library(datasets) 
library(AER)
set.seed(123)

# Data import
# There are n=601 observations and 9 variables in the reduced dataset.
# The variable ‘affairs’ is the number of extramarital affairs in the past year and is our response variable.
# We will include as covariates the variables ‘gender’, ‘age’, ‘yearsmarried’, ‘children’, ‘religiousness’, ‘education’ and ‘rating’ in our analysis.
# ‘religiousness’ ranges from 1 (anti) to 5 (very) and ‘rating’ is a self rating of the marriage, ranging from 1 (very unhappy) to 5 (very happy).

data(Affairs, package = 'AER')

summary(Affairs)


# Check if mean(affairs) = std(affairs)
# Hint : use the t.test or wilcoxon test 

# Histogram


# Build a train and a test dataset (80% of data in train set)
# Hint : use sample function


# Plot relationship between the number of affairs and other parameters on train dataset
# Hint : use glm function with poisson family



# Study overdispersion from model



# Use quasipoisson model



# Reduce the number of variables with stepAIC function



# Predict values with final model with test dataset
