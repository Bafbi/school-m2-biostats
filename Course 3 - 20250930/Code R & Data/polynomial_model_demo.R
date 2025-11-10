######################################################################################################################################
# Nom : 
# Prénom : 
# Date : 
# Module Polynomial regression
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
library(caret)
library(ggplot2)
library(rstatix)

##### Data generating function #####
set.seed(123) # set seed for reproducibility
n <- 25
x <- runif(n, 0, 1)
y <- sin(2 * pi * x) + rnorm(n, 0, 0.35)
poly_data <- data.frame("x" = x, "y" = y)

# Plot data

ggplot(poly_data,
       aes(x=x,
           y=y)) +
  geom_point()

# Models

linear_model <- lm(y ~ poly(x, 1), data = poly_data)
summary(linear_model)
hist(linear_model$residuals)
ggqqplot(linear_model$residuals)
shapiro.test(linear_model$residuals)
RSE_linear <- summary(linear_model)$sigma

ggplot(poly_data,
       aes(x=x,
           y=y)) +
  geom_point() +
  geom_smooth(formula = y~poly(x,1), span = 0.75, method = "lm",color="red")

# Ordre 2

quadratic_model <- lm(y ~ poly(x, 2), data = poly_data)
summary(quadratic_model)
hist(quadratic_model$residuals)
plot(quadratic_model)
ggqqplot(quadratic_model$residuals)
shapiro.test(quadratic_model$residuals)
summary(quadratic_model)

RSE_quadratic <- summary(quadratic_model)$sigma

ggplot(poly_data,
       aes(x=x,
           y=y)) +
  geom_point() +
  geom_smooth(formula = y~poly(x,2), span = 0.75, method = "lm",color="red")

# Ordre 3

cubic_model <- lm(y ~ poly(x, 3), data = poly_data)
summary(cubic_model)
hist(cubic_model$residuals)
plot(cubic_model)
ggqqplot(cubic_model$residuals)
shapiro.test(cubic_model$residuals)
RSE_cubic <- summary(cubic_model)$sigma

ggplot(poly_data,
       aes(x=x,
           y=y)) +
  geom_point() +
  geom_smooth(formula = y~poly(x,3), span = 0.75, method = "lm",color="red")

# Ordre 4

ordre4_model <- lm(y ~ poly(x, 4), data = poly_data)
summary(ordre4_model)
hist(ordre4_model$residuals)
plot(ordre4_model)
ggqqplot(ordre4_model$residuals)
shapiro.test(ordre4_model$residuals)
RSE_ordre4 <- summary(ordre4_model)$sigma

# Ordre 5

ordre5_model <- lm(y ~ poly(x, 5), data = poly_data)
summary(ordre5_model)
hist(ordre5_model$residuals)
plot(ordre5_model)
RSE_ordre5 <- summary(ordre5_model)$sigma

ggplot(poly_data,
       aes(x=x,
           y=y)) +
  geom_point() +
  geom_smooth(formula = y~poly(x,5), span = 0.75, method = "lm",color="red")

# Comparing models 4 and 5
anova(ordre4_model,ordre5_model)

# Plotting RSE

RSE <- data.frame(
  order=seq(1:5),
  rse=c(RSE_linear,RSE_quadratic,RSE_cubic,RSE_ordre4,RSE_ordre5)
)

ggplot(data=RSE,
       aes(x=order,
           y=rse)) +
  geom_line() +
  geom_point()


m1 <- lm(y ~ poly(x, 2), data = poly_data)
m2 <- lm(y ~ x + I(x^2), data = poly_data)

predict(m1, newdata = list("x" = 0.5))
predict(m2, newdata = list("x" = 0.5))

# plotting setup
par(mfrow = c(3, 2), mar = c(2, 2, 1, 1)) # set up 6 subplots

# setup
RMSE <- data.frame("kth_order" = NA, "RMSE" = NA) # empty data frame to store RMSE
vals <- list("x" <- seq(min(poly_data$x), max(poly_data$y), by = 0.01)) # set up vector used for prediction

# run  loop
k <- c(1, 2, 3, 5, 9, 14) # k-th order

for (i in 1:length(k)) {
  # build models
  model <- lm(y ~ poly(x, k[i]), data = poly_data)
  
  # calculate RMSE and store it for further usage
  RMSE[i, 1] <- k[i] # store k-th order
  RMSE[i, 2] <- sqrt(sum((fitted(model) - poly_data$y)^2) / length(poly_data$y)) # calculate RMSE
  
  # predict
  predictions <- predict(model, newdata = vals)
  # plot
  plot(poly_data$x, poly_data$y, pch = 16, col = "blue",
       ylim = c(min(poly_data$y) * 1.3, max(poly_data$y) * 1.3))
  lines(vals[[1]], predictions, lwd = 2, col = "red")
  text(x = 0.8, y = 0.95, paste0("k = ", k[i], ", RMSE = ", round(RMSE[i, 2], 3))) # annotate the plot
}

plot(RMSE[, 1], RMSE[, 2],
     xlab = "k-th order",
     ylab = "RMSE",
     type = "b",
     col = "blue",
     pch = 16
)

# Comparison of order 2 and 3
anova(cubic_model,ordre4_model)
