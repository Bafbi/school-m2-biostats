######################################################################################################################################
# Nom : 
# Prénom : 
# Date : 
# Module Decision trees
# Goal : 
# Tip : 
######################################################################################################################################

install.packages("vip")
# Load packages
library(tidyverse)
library(factoextra)
library(FactoMineR)
library(ggplot2)
library(psych)
library(MASS)
library(caret)
library(rpart.plot)
library(rpart)
library(vip)
set.seed(123)

# Load the data
# Housing Values in Suburbs of Boston
# Variables : 
# crim :  per capita crime rate by town.
# zn :  proportion of residential land zoned for lots over 25,000 sq.ft.
# indus : proportion of non-retail business acres per town.
# chas : Charles River dummy variable (= 1 if tract bounds river; 0 otherwise).
# nox : nitrogen oxides concentration (parts per 10 million).
# rm : average number of rooms per dwelling.
# age : proportion of owner-occupied units built prior to 1940.
# dis : weighted mean of distances to five Boston employment centres.
# rad : index of accessibility to radial highways.
# tax : full-value property-tax rate per $10,000.
# ptratio : pupil-teacher ratio by town.
# black : the proportion of blacks by town (per 1000 inhabitants)
# lstat : lower status of the population (percent).
# medv : median value of owner-occupied homes in $1000s.

data <- Boston 

# Train & test data partition
# Hint : use sample function (base package)



# Tree : modelization of medv (median value of owner-occupied homes in $1000s.)
# Hint : use rpart function (package rpart)


# Create a variable importance plot
# Hint : use vip function (package vip)



# Predict on test dataset and plot the scatter plot real vs predicted values on train and test datasets

