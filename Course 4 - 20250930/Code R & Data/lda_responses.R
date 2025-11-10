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
# Morphological Measurements on Leptograpsus Crabs
# The crabs data frame has 200 rows and 8 columns, 
# describing 5 morphological measurements on 50 crabs each of two colour forms and both sexes, 
# of the species Leptograpsus variegatus collected at Fremantle, W. Australia.

# Variables :
# sp : species
# sex
# FL : frontal lobe size (mm).
# RW : rear width (mm).
# CL : carapace length (mm).
# CW : carapace width (mm).
# BD : body depth (mm).

data <- MASS::crabs %>%
  dplyr::select(-index)

# Study correlations
# Hint : use pairs.panels (package psych)

pairs.panels(data[,4:7],
             gap = 0,
             bg = c("red", "green")[data$sp],
             pch = 21)

# Data partition (75% of observations in the train dataset)
# Hint : use sample function

ids <- sample(200,150)

train <- data[ids,] %>% dplyr::select(-sex)
test <- data[-ids,] %>% dplyr::select(-sex)

# LDA
# Hint : use lda function

LDA <- lda(sp~., train)
summary(LDA)
LDA

# Dimensions of LDA 
# Hint : use ldahist function (MASS package)

p <- predict(LDA, train)
ldahist(data = p$x[,1], g = train$sp)

# Partition plot
# Hint : use partimat function (klaR package)

partimat(sp~., data = train, method = "lda")

# Confusion matrix and accuracy – training data
# Hint : use table function (base package) and confusionMatrix (caret package)

p1 <- predict(LDA, train)$class
tab <- table(Predicted = p1, Actual = train$sp)
caret::confusionMatrix(tab)

# Confusion matrix and accuracy - test dataset
# Hint : use table function (base package) and confusionMatrix (caret package)

p1 <- predict(LDA, test)$class
tab <- table(Predicted = p1, Actual = test$sp)
caret::confusionMatrix(tab)
