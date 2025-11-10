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
Year <- seq(1,20)
Population <- c(500, 550, 610, 680, 760, 850, 950, 1060, 1180, 1320, 1470, 
                1640, 1830, 2040, 2280, 2540, 2830, 3140, 3480, 3850)

df <- data.frame(Year, Population)

# Plot the evolution of population through time

ggplot(df,
       aes(x=Year,
           y=Population)) +
  geom_point() +
  geom_smooth(formula = y~x, span = 0.75, method = "lm",color="red")

# Fit exponential model

model_exp <- lm(Population ~ exp(Year) + Year,
                data=df)

summary(model_exp)
hist(model_exp$residuals)
plot(model_exp)
shapiro.test(model$residuals)
ggqqplot(model$residuals)

# Plot model

ggplot(df,
       aes(x=Year,
           y=Population)) +
  geom_point() +
  geom_smooth(formula = y~exp(x)+x, span = 0.75, method = "lm",color="red")

# Adding polynomial term

model_exp_2 <- lm(Population ~ exp(Year) + poly(Year,2),
                data=df)

summary(model_exp_2)
hist(model_exp_2$residuals)
plot(model_exp_2)
shapiro.test(model_exp_2$residuals)

# Plot model

ggplot(df,
       aes(x=Year,
           y=Population)) +
  geom_point() +
  geom_smooth(formula = y~exp(x)+poly(x,2), span = 0.75, method = "lm",color="red")

# Predict the population expected between 25 and 50

predict(model_exp_2,
        newdata=data.frame(
          Year=seq(25,50,5)),
        interval = "prediction")
