######################################################################################################################################
# Nom : 
# Prénom : 
# Date : 
# Module Quadratic regression
# Goal : 
# Tip : 
######################################################################################################################################

# Load packages
library(dplyr)
library(datasets)
library(stats)
library(car)
library(corrplot)
library(MASS)
library(mvnormtest)
library(outliers)
library(rstatix)
library(datarium)
library(UsingR)
library(ggplot2)
library(rstatix)

# Import Dataset quadratic_data.csv
# The dataset is organized in a tabular format and contains two columns.
# The first column represents the temperature values, which serve as the independent variable in the regression analysis.
# The temperature values are typically measured in degrees Celsius or Fahrenheit.
# The second column corresponds to the number of units of ice cream sold, which is the dependent variable in the regression analysis.
# Hint : use read.csv2 function

data <- read.csv2(file = "C:/Users/machu/Documents/Documents/Cours Junia 2025/Cours 2025/T3 2025/Cours 3/Data/quadratic_data.csv",sep = ",",dec = ".")

# Plot relationship between the two variables
# Hint : use 

ggplot(data=data,
       aes(x = Temperature...C.,
           y = Ice.Cream.Sales..units.)) +
  geom_point() +
  geom_smooth(method="lm")

# Launch a linear model explaining the number of units of ice cream sold by the temperature
# Hint : use lm function

linear_model <- lm(Ice.Cream.Sales..units. ~ Temperature...C.,
                   data=data)


# Assess quality of this model (residuals, R²...)
# Hint : use residuals function

summary(linear_model)

plot(linear_model)
hist(linear_model$residuals)
ggqqplot(linear_model$residuals)
shapiro.test(linear_model$residuals)

# Add a quadratic term in the equation
# Hint : use lm function

quadratic_model <- lm(Ice.Cream.Sales..units. ~ poly(Temperature...C.,2),
                      data=data)

summary(quadratic_model)

plot(quadratic_model)
hist(quadratic_model$residuals)
shapiro.test(quadratic_model$residuals)

# Plot the quadratic function in the scatterplot
# Hint : use ggplot and geom_smooth

ggplot(data=data,
       aes(x = Temperature...C.,
           y = Ice.Cream.Sales..units.)) +
  geom_point() +
  geom_smooth(formula = y~poly(x,2), span = 0.75, method = "lm",color="red")

# Predict data

predict(quadratic_model,
                       data.frame(
                         Temperature...C.=0.2
                       ),interval = "prediction")


# Temperature for minimum sales : 0.2°C