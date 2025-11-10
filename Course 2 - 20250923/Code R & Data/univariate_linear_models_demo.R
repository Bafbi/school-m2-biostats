######################################################################################################################################
# Module univariate linear models
# Goal : Modelize the relationship between two continuous variables
######################################################################################################################################

# Load packages
library(datasets)
library(stats)
library(ggplot2)
library(outliers)
library(ggpubr)

# Load data
data <- datasets::mtcars

# Summarise data

summary(data)
hist(data$mpg)

# Plot relationship between the variables mpg and disp  

ggplot(data=data,
       aes(x=disp,
           y=mpg)) +
  geom_point() +
  geom_smooth(method="lm",se = F)

# Launch model

model <- lm(mpg ~ disp,
            data=data)

# Assess quality of model

plot(model)
summary(model)

# Checking residuals
hist(model$residuals)
boxplot(model$residuals)
shapiro.test(model$residuals)

# Outliers highlighting
grubbs.test(model$residuals)

# Log transformation of Y

data$mpg_log <- log(data$mpg)
hist(data$mpg_log)

# New model

model_log <- lm(mpg_log ~ disp,
                data=data)

# Summary of the model

summary(model)

# Plot model quality

plot(model)

# Checking residuals
ggqqplot(model$residuals)
boxplot(model$residuals,
        outline = T)

# Normality test on residuals
shapiro.test(model$residuals)

