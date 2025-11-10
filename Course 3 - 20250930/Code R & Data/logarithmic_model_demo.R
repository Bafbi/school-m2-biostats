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
x <- seq(from = 1, to = 100, by = 1)
y <- log(seq(from = 1000, to = 1, by = -10))
y <- y * exp(-0.05 * x)
noise <- rnorm(100,0,0.5)
data <- data.frame(dependent = y+noise, independent = x)

# Plot

ggplot(data,
       aes(x=x,
           y=y+noise)) +
  geom_point()

# Logarithmic model

model <- lm(y ~ log(x) + x,
            data=data)

summary(model)
hist(model$residuals)
plot(model)
shapiro.test(model$residuals)

# Plot model

ggplot(data,
       aes(x=x,
           y=y)) +
  geom_point() +
  geom_smooth(formula = y~log(x)+x, span = 0.75, method = "lm",color="red")

# Polynomial model ordre 3

model <- lm(y ~ poly(x,3),
            data=data)

summary(model)
hist(model$residuals)
plot(model)
shapiro.test(model$residuals)

# Plot model

ggplot(data,
       aes(x=x,
           y=y)) +
  geom_point() +
  geom_smooth(formula = y~poly(x,3), span = 0.75, method = "lm",color="red")


# Log + polynomial model 

model <- lm(y ~ log(x) + poly(x,2),
            data=data)

summary(model)
hist(model$residuals)
plot(model)
shapiro.test(model$residuals)

# Plot model

ggplot(data,
       aes(x=x,
           y=y)) +
  geom_point() +
  geom_smooth(formula = y~log(x) + poly(x,2), span = 0.75, method = "lm",color="red")
