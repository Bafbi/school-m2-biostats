######################################################################################################################################
# Nom : 
# Prénom : 
# Date : 
# Module Logistic regression
# Goal : 
# Tip : 
######################################################################################################################################

# install.packages("mlbench")
# install.packages("pROC")
# install.packages("oddsratio")

# Load packages
library(tidyverse)
library(caret)
library(MASS)
library(datarium)
library(ggplot2)
library(mlbench)
library(pROC)
library(oddsratio)
library(plotROC)
set.seed(123)

# Data import

data("PimaIndiansDiabetes2", package = "mlbench")

# Variables : 
#   pregnant : Number of times pregnant
#   glucose	: Plasma glucose concentration (glucose tolerance test)
#   pressure : Diastolic blood pressure (mm Hg)
#   triceps : Triceps skin fold thickness (mm)
#   insulin	2-Hour serum insulin (mu U/ml)
#   mass : Body mass index
#   pedigree : Diabetes pedigree function
#   age : Age (years)
#   diabetes : Class variable (test for diabetes)

# Goal : predict diabete status (diabetes : pos vs neg) from other parameters



# Study relationship between diabetes and other variables



# Split dataset into train (80% of data) and test set
# Hint : use sample function to generate IDs


# Clean datasets : remove missing values


# Check homogeneity of the two datasets on the parameters (diabetes status...)


# Launch a logistic regression model on train dataset
# Hint : use glm function


# Predict diabete class on train and test dataset
# Hint : use predict function with type="response" option


# Confusion matrix


# AUC



# ROC



# Test dataset


# Confusion matrix


# AUC


# ROC


# ROC curves of test and train with ggplot2
