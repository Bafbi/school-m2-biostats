######################################################################################################################################
# Nom : 
# Prénom : 
# Date : 
# Module LDA
# Goal : 
# Tip : 
######################################################################################################################################

install.packages("klaR")

# Load packages
library(tidyverse)
library(factoextra)
library(FactoMineR)
library(ggplot2)
library(psych)
library(corrplot)
library(caret)
library(klaR)
set.seed(123)

# Load the data
# Edgar Anderson's Iris Data
# This famous (Fisher's or Anderson's) iris data set gives the measurements in centimeters of the variables sepal length and width and 
# petal length and width, respectively, for 50 flowers from each of 3 species of iris. The species are Iris setosa, versicolor, and virginica.

data("iris")

# Study correlations

pairs.panels(iris[1:4],
             gap = 0,
             bg = c("red", "green", "blue")[iris$Species],
             pch = 21)

# Data partition

ind <- sample(2, nrow(iris),
              replace = TRUE,
              prob = c(0.6, 0.4))
training <- iris[ind==1,]
testing <- iris[ind==2,]

# LDA

LDA <- lda(Species~., training)
summary(LDA)

# Dimensions (ldahist function)

p <- predict(LDA, training)

ldahist(data = p$x[,1], g = training$Species)

# Partition plot

partimat(Species~., data = training, method = "lda")


# Confusion matrix and accuracy – training data

p1 <- predict(LDA, training)$class
tab <- table(Predicted = p1, Actual = training$Species)
caret::confusionMatrix(tab)

# Confusion matrix and accuracy – test data

partimat(Species~., data = testing, method = "lda")

p1 <- predict(LDA, testing)$class
tab <- table(Predicted = p1, Actual = testing$Species)
caret::confusionMatrix(tab)
