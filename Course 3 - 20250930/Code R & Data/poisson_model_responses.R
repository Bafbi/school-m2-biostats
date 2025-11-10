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
# There are n=601 observations and 8 variables in the reduced dataset.
# The variable ‘affairs’ is the number of extramarital affairs in the past year and is our response variable.
# We will include as covariates the variables ‘gender’, ‘age’, ‘yearsmarried’, ‘children’, ‘religiousness’, ‘education’ and ‘rating’ in our analysis.
# ‘religiousness’ ranges from 1 (anti) to 5 (very) and ‘rating’ is a self rating of the marriage, ranging from 1 (very unhappy) to 5 (very happy).

data(Affairs, package = 'AER')

summary(Affairs)

# Check if mean(affairs) = std(affairs)
# Hint : use the t.test or wilcoxon test 

# Histogram
ggplot(data=Affairs,aes(x=affairs))+
  geom_histogram() +
  theme_light()
  
mean(Affairs$affairs,na.rm = T)
sd(Affairs$affairs,na.rm = T)

wilcox.test(Affairs$affairs,
            mu = sd(Affairs$affairs,na.rm = T)) # Mean < SD : overdispersion of the studied parameter

# Build a train and a test dataset (80% of data in train set)
# Hint : use sample function

IDs <- sample(x = 601,
              size = 480,
              replace = F)

train <- Affairs[IDs,]
test <- Affairs[-IDs,]

# Plot relationship between the number of affairs and other parameters on train dataset
# Hint : use glm function with poisson family

poisson_model <- glm(affairs ~ .,
                     data = train,
                     family = poisson())

summary(poisson_model)

# Study overdispersion from model

residual_deviance <- summary(poisson_model)$deviance
ddl_deviance <- summary(poisson_model)$df.residual

dispersion_parameter=residual_deviance/ddl_deviance # Dispersion parameter > 1 : overdispersion

# Use quasipoisson model

quasipoisson_model <- glm(affairs ~ .,
                     data = train,
                     family = quasipoisson())

summary(quasipoisson_model)  # Dispersion parameter > 1

residual_deviance <- summary(quasipoisson_model)$deviance
ddl_deviance <- summary(quasipoisson_model)$df.residual
dispersion_parameter=residual_deviance/ddl_deviance # Dispersion parameter > 1 : overdispersion

# Use negative-binomial model

negative_binomial <- glm.nb(affairs~.,
                            data=train)

summary(negative_binomial)

residual_deviance <- summary(negative_binomial)$deviance
ddl_deviance <- summary(negative_binomial)$df.residual

dispersion_parameter=residual_deviance/ddl_deviance # Dispersion parameter > 1 : overdispersion

# Reduce the number of variables with stepAIC function

final_model <- stepAIC(negative_binomial,
                       direction = "both")

summary(final_model)

# Predict values with final model with test dataset

predictions <- data.frame(
  real_values <- test$affairs,
  predicted_values <- predict(final_model,
                              newdata = test[,-1])
)

ggplot(data=predictions,
       aes(x=real_values,
           y=predicted_values)) +
  geom_point()