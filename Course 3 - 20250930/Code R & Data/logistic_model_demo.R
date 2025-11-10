######################################################################################################################################
# Nom : 
# Prénom : 
# Date : 
# Module Logistic regression
# Goal : 
# Tip : 
######################################################################################################################################

# Load packages
library(tidyverse)
library(caret)
library(MASS)
library(datarium)
library(ggplot2)
library(pROC)
library(oddsratio)
library(plotROC)
set.seed(123)

# Titanic data

Titanic_data <- titanic.raw

# Train & test dataset

ID <- sample(2201,
             1760,
             replace = F)

train <- Titanic_data[ID,]
test <- Titanic_data[-ID,]

summary(train)
summary(test)

# Goal : predict probability of survival

logistic_train <- glm(Survived ~ .,
                      data = train,
                      family = "binomial")

summary(logistic_train)
anova(logistic_train)
Odd_ratios <- exp(logistic_train$coefficients)
oddsratio::or_glm(data = train,model = logistic_train)

# Predictions on train set

predicted <- predict.glm(object = logistic_train,
                         type = "response")

# Confusion matrix

predicted_train <- data.frame(
  real_class=train$Survived,
  probability=predicted
) %>%
  mutate(predicted_class=case_when(
    probability<0.5 ~ "No",
    probability>=0.5 ~ "Yes"
  ))

# Confusion Matrix

caret::confusionMatrix(table(predicted_train$real_class,
                             predicted_train$predicted_class),positive = "Yes")

# AUC

auc(predicted_train$real_class, predicted)

# ROC

roc_train <- roc(real_class ~ probability, data = predicted_train)

pROC::plot.roc(roc_train)

# Test dataset

predicted <- predict.glm(object = logistic_train,
                         newdata = test[,-4],
                         type = "response")

# Confusion matrix

predicted_test <- data.frame(
  real_class=test$Survived,
  probability=predicted
) %>%
  mutate(predicted_class=case_when(
    probability<0.5 ~ "No",
    probability>=0.5 ~ "Yes"
  ))

# Confusion Matrix

caret::confusionMatrix(table(predicted_test$real_class,
                             predicted_test$predicted_class),positive = "Yes")


# ROC

roc_test <- roc(real_class ~ probability, data = predicted_test)

# AUC

auc(predicted_test$real_class, predicted)
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

