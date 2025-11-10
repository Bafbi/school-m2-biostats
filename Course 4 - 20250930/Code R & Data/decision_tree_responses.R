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

ids <- sample(506,400)

train <- Boston[ids,]
test <- Boston[-ids,]

# Tree : modelization of medv (median value of owner-occupied homes in $1000s.)
# Hint : use rpart function (package rpart)

tree <- rpart(medv ~ .,data=train)

rpart::plotcp(tree)
rpart.plot(tree)

# Create a variable importance plot
# Hint : use vip function (package vip)

var_importance <- vip::vip(tree,
                           num_features = 10)
print(var_importance)

# Predict on test dataset and plot the scatter plot real vs predicted values on train and test datasets

data_pred <- data.frame(
  predicted=predict(tree,train),
  real=train$medv
)

model <- lm(predicted ~ real, data=data_pred)
summary(model)$r.squared

ggplot(data=data_pred,
       aes(x=real,y=predicted)) +
  geom_point() + 
  geom_smooth(method = "lm",color="red") +
  ggtitle(paste0("Train data set - R² = ",round(summary(model)$r.squared,2)))

data_pred <- data.frame(
  predicted=predict(tree,test),
  real=test$medv
)

model <- lm(predicted ~ real, data=data_pred)
summary(model)$r.squared

ggplot(data=data_pred,
       aes(x=real,y=predicted)) +
  geom_point() + 
  geom_smooth(method = "lm",color="red") +
  ggtitle(paste0("Test data set - R² = ",round(summary(model)$r.squared,2)))

