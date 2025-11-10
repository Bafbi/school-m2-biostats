######################################################################################################################################
# Nom : 
# Prénom : 
# Date : 
# Module Polynomial regression
# Goal : 
# Tip : 
######################################################################################################################################

# Load packages
library(tidyverse)
library(caret)
library(MASS)
set.seed(123)

# Dataset Boston : Housing Values in Suburbs of Boston
# Variables : 
#   crimper : capita crime rate by town
#   zn : proportion of residential land zoned for lots over 25,000 sq.ft.
#   indus : proportion of non-retail business acres per town.
#   chas : Charles River dummy variable (= 1 if tract bounds river; 0 otherwise).
#   nox : nitrogen oxides concentration (parts per 10 million).
#   rm : average number of rooms per dwelling.
#   age : proportion of owner-occupied units built prior to 1940.
#   dis : weighted mean of distances to five Boston employment centres.
#   rad : index of accessibility to radial highways.
#   tax : full-value property-tax rate per $10,000.
#   ptratio : pupil-teacher ratio by town.
#   black : proportion of black people / 1000 inhabitants
#   lstat : lower status of the population (percent).
#   medv : median value of owner-occupied homes in $1000s. => Variable to explain

data <- MASS::Boston

# Summarize data


# Plot relationship between lstat and medv

# Plot relationship between crimer and medv

# Build polynomial models (2 to 6 orders) explaining medv by lstat
# Hint : split the dataset into test and train set with function sample : 80% of points in train set

# Plotting distributions

# Evaluate quality of models (R², RMSE)
# Hint : use RMSE function in caret package

# Quadratic model

# Cubic model

# Degré 4 model

# Choose the relevant model and plot predictions on train dataset
# Hint : plot the evolution of RMSE vs order of polynoms or use anova function in order to compare models

# Degré 4 model

# Predictions on test dataset
