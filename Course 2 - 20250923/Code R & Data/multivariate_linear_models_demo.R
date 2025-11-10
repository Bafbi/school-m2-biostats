######################################################################################################################################
# Module multivariate linear models
# Goal : Modelize the relationship between one continuous variable and many others
######################################################################################################################################

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

# Summarise data

summary(data)
hist(data$mpg)

# Goal : build a multivariate linear model with Y = X (all other variables)

complete_model <- lm(mpg ~ .,
                     data=data)

# Summarise model

summary(complete_model)
plot(complete_model)
hist(complete_model$residuals)
shapiro.test(complete_model$residuals)
ggpubr::ggqqplot(complete_model$residuals)

# Get ANOVA table

anova(complete_model)

# VIF

car::vif(complete_model)

# Select the best model with stepAIC function

final_model <- MASS::stepAIC(complete_model,
                             direction = "both")

anova(final_model)

summary(final_model)
plot(final_model)
hist(final_model$residuals)
ggpubr::ggqqplot(final_model$residuals)
shapiro.test(final_model$residuals)

# Prediction

predict(final_model,
        newdata = data.frame(
          cyl="4",
          hp=200,
          wt=4
        ),interval = "prediction")

