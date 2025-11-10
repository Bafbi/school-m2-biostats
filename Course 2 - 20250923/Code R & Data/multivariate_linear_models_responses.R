######################################################################################################################################
# Module multivariate linear models
# Goal : Modelize the relationship between one continuous variable and many others
######################################################################################################################################
# 
# install.packages("caret")
# install.packages("corrplot")
# install.packages("MASS")

# Load packages
library(dplyr)
library(datasets)
library(stats)
library(car)
library(corrplot)
library(MASS)
library(caret)
library(ggpubr)

# Load data (32 records)

data <- datasets::mtcars %>% 
  dplyr::select(c(1:7)) %>%
  mutate(cyl=factor(cyl))

# Variables : 
# mpg	 : Miles/(US) gallon
# cyl	 : Number of cylinders
# disp : Displacement (cu.in.)
# hp	 : Gross horsepower
# drat : Rear axle ratio
# wt	 : Weight (lb/1000)
# qsec : 1/4 mile time


# Questions ------------------------------------------------------

# Summarise data



# Goal : build a multivariate linear model with mpg = X (all other variables)



# Summarise model results and quality



# Get ANOVA table



# Calculate VIF index (package car) of the parameters of the model



# Select the best model with stepAIC function (package MASS) with stepwise selection method



# Predict a new value with your model



















# Answers ------------------------------------------------------

# Summarise data

summary(data)
hist(data$mpg)

# Goal : build a multivariate linear model with mpg = X (all other variables) including all interactions (second order)

complete_model <- lm(mpg ~ (.)^2,
                     data=data)

# Summarise model results and quality

summary(complete_model)
plot(complete_model)
hist(complete_model$residuals)
ggpubr::ggqqplot(complete_model$residuals)
shapiro.test(complete_model$residuals)

# Get ANOVA table

anova(complete_model)

# Calculate VIF index (package car) of the parameters of the model

car::vif(complete_model)

# Select the best model with stepAIC function (package car) with stepwise selection method

final_model <- MASS::stepAIC(complete_model,
                             direction = "both")

summary(final_model)
anova(final_model)
plot(final_model)
hist(final_model$residuals)
shapiro.test(final_model$residuals)
ggpubr::ggqqplot(final_model$residuals)
car::vif(final_model)

# Predict a new value with your model

predict(final_model,
        newdata = data.frame(
          cyl="4",
          hp=200,
          disp=100,
          drat=4,
          qsec=15,
          wt=4
        ),interval = "prediction")

