######################################################################################################################################
# Nom : 
# Prénom : 
# Date : 
# Module Decision trees
# Goal : 
# Tip : 
######################################################################################################################################

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
set.seed(123)

# Load the data

Titanic <- carData::TitanicSurvival

# Train & test

ids <- sample(nrow(Titanic),
              floor(nrow(Titanic)*0.8))

train <- data[ids,]
test <- data[-ids,]

tree <- rpart(survived ~ .,data=train)

rpart::plotcp(tree)
rpart.plot(tree)

# Predict on test dataset

predict(tree,test)

# Confusion matrix and accuracy – training data

predictions <- predict(tree,train) %>%
  as.data.frame() %>%
  mutate(predicted=case_when(
    no > 0.5 ~ "no",
    yes > 0.5 ~ "yes"))

predictions <- data.frame(
  real=train$survived,
  predicted=predictions$predicted
)

caret::confusionMatrix(table(predictions$real,
                             predictions$predicted))

# Confusion matrix and accuracy – test data

predictions <- predict(tree,test) %>%
  as.data.frame() %>%
  mutate(predicted=case_when(
    no > 0.5 ~ "no",
    yes > 0.5 ~ "yes"))

predictions <- data.frame(
  real=test$survived,
  predicted=predictions$predicted
)

caret::confusionMatrix(table(predictions$real,
                             predictions$predicted))
