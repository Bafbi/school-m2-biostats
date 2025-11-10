######################################################################################################################################
# Nom : 
# Prénom : 
# Date : 
# Module Logarithmic regression
# Goal : 
# Tip : 
######################################################################################################################################

# Load packages
library(tidyverse)
library(caret)
library(MASS)
set.seed(123)

# Load the data
x=2:16 

y=c(69, 60, 44, 38, 33, 28, 23, 20, 
    17, 15, 13, 12, 11, 10, 9.5)

data <- data.frame(
  x=x,
  y=y
)

# Plot data

ggplot(data,
       aes(x=x,
           y=y)) +
  geom_point()

# Model data with log regression
# Hint : use lm function

log_regression <- lm(y ~ log(x),
                     data=data)

# Plot residuals and assess quality of regression

summary(log_regression)
hist(log_regression$residuals)
plot(log_regression)

ggplot(data,
       aes(x=x,
           y=y)) +
  geom_point() +
  geom_smooth(formula = y~log(x), span = 0.75, method = "lm",color="red")

# Adding x

log_regression_2 <- lm(y ~ log(x) + x,
                     data=data)


summary(log_regression_2)
hist(log_regression_2$residuals)
plot(log_regression_2)
shapiro.test(log_regression_2$residuals)

ggplot(data,
       aes(x=x,
           y=y)) +
  geom_point() +
  geom_smooth(formula = y~log(x)+x, span = 0.75, method = "lm",color="red")
