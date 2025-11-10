######################################################################################################################################
# Module univariate linear models
# Goal : Modelize the relationship between two continuous variables
######################################################################################################################################

# Load packages
library(datasets)
library(stats)
library(ggplot2)
library(dplyr)
library(ggpubr)

# Load data
data <- datasets::cars

# Questions ----------------------------------------------------

# Summarise data

summary(data)
hist(data$speed)
hist(data$dist)


# Plot relationship between the variables speed and dist  
# Hint : use ggplot2 and calculate correlation

cor(data$speed,
    data$dist)

ggplot(data=data,
       aes(x=speed,
           y=dist)) +
  geom_point() +
  geom_smooth(method="lm",se = F)


# Launch model
# Hint : use lm function

model <- lm(data$dist ~ data$speed)

# Print and comment model outputs
# Hint use print and summary functions

summary(model)


# Assess quality of model
# Hint : use plot and residuals functions

plot(model)
ggqqplot(model$residuals)



























# Answers ----------------------------------------------------

# Summarise data

summary(data)


# Plot relationship between the variables speed and dist  
# Hint : use ggplot2 and calculate correlation

ggplot(data=data,
       aes(x=speed,
           y=dist)) +
  geom_point()+
  geom_smooth(method = "lm",se = F)

# Launch model
# Hint : use lm function

model <- lm(dist ~ speed,
            data=data)

# Print and comment model outputs
# Hint use print and summary functions

print(model)
summary(model)

# Assess quality of model
# Hint : use plot and residuals functions

plot(model)
hist(model$residuals)
shapiro.test(model$residuals)

# Weighted outliers

data <- data %>%
  mutate(w=case_when(
    row.names(.) %in% c(23,39,49) ~ 0.5,
    T ~ 1))

model_2 <- lm(dist ~ speed,
             data=data,
             weights = w)

print(model_2)
summary(model_2)

plot(model_2)
hist(model_2$residuals)
shapiro.test(model_2$residuals)

