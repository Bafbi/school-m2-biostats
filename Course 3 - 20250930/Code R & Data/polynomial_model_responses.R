######################################################################################################################################
# Nom : 
# Prénom : 
# Date : 
# Module Polynomial regression
# Goal : 
# Tip : 
######################################################################################################################################

# Load packages
library(tidyverse)
library(caret)
library(MASS)
set.seed(123)

# Dataset Boston : Housing Values in Suburbs of Boston
# Variables : 
#   crimper : capita crime rate by town
#   zn : proportion of residential land zoned for lots over 25,000 sq.ft.
#   indus : proportion of non-retail business acres per town.
#   chas : Charles River dummy variable (= 1 if tract bounds river; 0 otherwise).
#   nox : nitrogen oxides concentration (parts per 10 million).
#   rm : average number of rooms per dwelling.
#   age : proportion of owner-occupied units built prior to 1940.
#   dis : weighted mean of distances to five Boston employment centres.
#   rad : index of accessibility to radial highways.
#   tax : full-value property-tax rate per $10,000.
#   ptratio : pupil-teacher ratio by town.
#   black : proportion of black people / 1000 inhabitants
#   lstat : lower status of the population (percent).
#   medv : median value of owner-occupied homes in $1000s. => Variable to explain

data <- MASS::Boston

# Summarize data

summary(data)
hist(data$medv)
shapiro.test(data$medv)

# Plot relationship between lstat and medv

ggplot(data,
       aes(x=lstat,
           y=medv)) +
  geom_point() +
  geom_smooth(method = "lm",color="red")

# Plot relationship between crimer and medv

ggplot(data,
       aes(x=crim,
           y=medv)) +
  geom_point() +
  geom_smooth(method = "lm",color="red")

# Build polynomial models (2 to 6 orders) explaining medv by lstat
# Hint : split the dataset into test and train set with function sample : 80% of points in train set

train_id <- sample(x = seq(1:nrow(data)),size = 405)

train <- data[train_id,]
test <- data[-train_id,]

# Plotting distributions

ggplot() +
  geom_density(data = train,aes(x=medv),color="red") +
  geom_density(data = test,aes(x=medv),color="blue")

ggplot() +
  geom_density(data = train,aes(x=lstat),color="red") +
  geom_density(data = test,aes(x=lstat),color="blue")

ggplot() +
  geom_point(data = train,aes(x=lstat,y=medv),color="red") +
  geom_point(data = test,aes(x=lstat,y=medv),color="blue") +
  geom_smooth(data = train,aes(x=lstat,y=medv),method = "lm",color="red") +
  geom_smooth(data = test,aes(x=lstat,y=medv),method = "lm",color="blue")

# Evaluate quality of models (R², RMSE)
# Hint : use RMSE function in caret package

# Quadratic model

quadratic_model <- lm(medv ~ poly(lstat,2),
                      data=train)

summary(quadratic_model)
hist(quadratic_model$residuals)
shapiro.test(quadratic_model$residuals)
plot(quadratic_model)

ggplot(train,
       aes(x=lstat,
           y=medv)) +
  geom_point() +
  geom_smooth(formula = y~poly(x,2), span = 0.75, method = "lm",color="red")


# Cubic model

cubic_model <- lm(medv ~ poly(lstat,3),
                      data=train)

summary(cubic_model)
hist(cubic_model$residuals)
shapiro.test(cubic_model$residuals)
plot(cubic_model)

ggplot(train,
       aes(x=lstat,
           y=medv)) +
  geom_point() +
  geom_smooth(formula = y~poly(x,3), span = 0.75, method = "lm",color="red")

# Degré 4 model

degre4_model <- lm(medv ~ poly(lstat,4),
                  data=train)

summary(degre4_model)
hist(degre4_model$residuals)
shapiro.test(degre4_model$residuals)
plot(degre4_model)

ggplot(train,
       aes(x=lstat,
           y=medv)) +
  geom_point() +
  geom_smooth(formula = y~poly(x,4), span = 0.75, method = "lm",color="red")

anova(cubic_model,degre4_model)

# Choose the relevant model and plot predictions on train dataset
# Hint : plot the evolution of RMSE vs order of polynoms or use anova function in order to compare models


# Degré 4 model

model <- lm(medv ~ poly(lstat,4) + crim,
                   data=train)

summary(degre4_model)
vif(model)
hist(degre4_model$residuals)
shapiro.test(degre4_model$residuals)
plot(degre4_model)

anova(model,degre4_model)

# Predictions on test dataset

predictions <- predict(model,newdata = test[,c("crim","lstat")])
MSE = sum((test$medv-predictions)^2)