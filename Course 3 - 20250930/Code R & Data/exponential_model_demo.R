######################################################################################################################################
# Nom : 
# Prénom : 
# Date : 
# Module Exponential regression
# Goal : 
# Tip : 
######################################################################################################################################

# Load packages
library(tidyverse)
library(caret)
library(MASS)
set.seed(123)

# Load the data
x=1:20
y=c(1, 3, 5, 7, 9, 12, 15, 19, 23, 28, 33, 38, 44, 50, 56, 64, 73, 84, 97, 113)
noise=rnorm(20,0,7)
y_plus_noise = y+noise

data <- data.frame(
  x=x,
  y=y_plus_noise
)

# Plot

ggplot(data,
       aes(x=x,
           y=y_plus_noise)) +
  geom_point()


# Fit exponential model

model <- lm(y ~ exp(x) + x,
            data=data)

summary(model)

ggplot(data,
       aes(x=x,
           y=y)) +
  geom_point() +
  geom_smooth(formula = y~exp(x)+x, span = 0.75, method = "lm",color="red")

# Plot residuals

hist(model$residuals)
shapiro.test(model$residuals)

# Predict the y when x = 30

predict(model,newdata = data.frame(x=c(30,35,45)),interval = "prediction")

