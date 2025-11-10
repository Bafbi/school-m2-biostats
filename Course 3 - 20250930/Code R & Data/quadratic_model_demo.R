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

# Create a data frame to store the data

study_hours <- c(6, 9, 12, 14, 30, 35, 40, 47, 51, 55, 60)
exam_scores <- c(14, 28, 50, 70, 89, 94, 90, 75, 59, 44, 27)
data <- data.frame(study_hours, exam_scores)
data

# Create a scatterplot of exam scores versus study hours

ggplot(data,aes(x=study_hours,
                y=exam_scores)) +
  geom_point() + 
  xlab("Study Hours")+
  ylab("Exam Scores")

# Fit linear model

linear_model <- lm(exam_scores ~ study_hours,data=data)
summary(linear_model)

# Plot linear

ggplot(data,aes(x=study_hours,
                y=exam_scores)) +
  geom_point() + 
  xlab("Study Hours")+
  ylab("Exam Scores") +
  geom_smooth(method = "lm")

hist(linear_model$residuals)
ggqqplot(linear_model$residuals)
shapiro.test(linear_model$residuals)

# Fit a quadratic regression model to the data
quadratic_model <- lm(exam_scores ~ I(study_hours^2) + study_hours,
                      data = data)

summary(quadratic_model)
hist(quadratic_model$residuals)
ggqqplot(quadratic_model$residuals)
shapiro.test(quadratic_model$residuals)

ggplot(data,aes(x=study_hours,
                y=exam_scores)) +
  geom_point() + 
  xlab("Study Hours")+
  ylab("Exam Scores")

# Fit a quadratic regression model to the data
summary(lm(exam_scores ~ poly(study_hours,3),
                      data = data))


# Summarize the quadratic regression model
summary(quadratic_model)

# Calculate the predicted exam scores for a range of study hours
predicted_scores <- predict(
  quadratic_model, 
  newdata = data.frame(
    study_hours = seq(min(study_hours), 
                      max(study_hours), 
                      length.out = 100
    )
  )
)

# Plot the data points and the predicted scores

ggplot(data,
       aes(x=study_hours,
           y=exam_scores)) +
  geom_point() + 
  geom_smooth(formula = y~poly(x,2), span = 0.75, method = "lm",color="red") +
  xlab("Study Hours")+
  ylab("Exam Scores")
