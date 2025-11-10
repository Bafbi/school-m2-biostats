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

summary(PimaIndiansDiabetes2)

# Goal : predict diabete status (diabetes : pos vs neg) from other parameters

data <- PimaIndiansDiabetes2 %>%
  dplyr::select(-c("triceps","insulin"))

# Study relationship between diabetes and other variables

corrplot::corrplot.mixed(cor(data[,-7],
                             use = "complete.obs"))

# Split dataset into train (80% of data) and test set
# Hint : use sample function to generate IDs

ID <- sample(768,
             614,
             replace = F)

train <- data[ID,]
test <- data[-ID,]

# Descriptive statistics

summary(train)
summary(test)

# Clean datasets
train_clean <- train %>% filter(complete.cases(.))
test_clean <- test %>% filter(complete.cases(.))

# Check homogeneity of the two datasets on the parameters (diabetes status...)

summary(train)
summary(test)

# Launch a logistic regression model on train dataset
# Hint : use glm function

logistic_train <- glm(diabetes ~ .,
                      data = train,
                      family = "binomial")

summary(logistic_train)

oddsratio::or_glm(data = train,
                  model = logistic_train,
                  incr = list(
                    pregnant=1,
                    glucose=10,
                    pressure=1,
                    mass=1,
                    pedigree=1,
                    age=1))

# Sans données manquantes

logistic_train <- glm(diabetes ~ .,
                      data = train_clean,
                      family = "binomial")

summary(logistic_train)

final_model <-stepAIC(object = logistic_train,direction = "both")

# Predict diabete class on train and test dataset
# Hint : use predict function with type="response" option

predicted <- predict.glm(object = final_model,
                         type = "response")

# Confusion matrix

predicted_train <- data.frame(
  real_class=train_clean$diabetes,
  probability=predicted
) %>%
  mutate(predicted_class=case_when(
    probability<0.5 ~ "neg",
    probability>=0.5 ~ "pos"
  ))

caret::confusionMatrix(table(predicted_train$real_class,
                             predicted_train$predicted_class),positive = "pos")

# AUC

auc(predicted_train$real_class, predicted)

# ROC

roc_train <- roc(real_class ~ probability, data = predicted_train)

pROC::plot.roc(roc_train)

# Test dataset

predicted <- predict.glm(object = logistic_train,
                         newdata = test_clean[,-7],
                         type = "response")

# Confusion matrix

predicted_test <- data.frame(
  real_class=test_clean$diabetes,
  probability=predicted
) %>%
  mutate(predicted_class=case_when(
    probability<0.5 ~ "neg",
    probability>=0.5 ~ "pos"
  ))

caret::confusionMatrix(table(predicted_test$real_class,
                             predicted_test$predicted_class),positive = "pos")

# AUC

auc(predicted_test$real_class, predicted)

# ROC

roc_test <- roc(real_class ~ probability, data = predicted_test)

pROC::plot.roc(roc_test)

# ROC curves with ggplot2

df <- rbind(data.frame(predictor = predicted_train$probability,
                       known.truth = predicted_train$real_class,
                       model = "train"),
            data.frame(predictor = predicted_test$probability,
                       known.truth = predicted_test$real_class,
                       model = "test"))

ggplot(df, aes(d = known.truth, m = predictor, color = model)) + 
  geom_roc(n.cuts = 0) +
  geom_abline(slope = 1,intercept = 0) +
  theme_bw()
