######################################################################################################################################
# Nom : 
# Prénom : 
# Date : 
# Module K-means
# Goal : 
# Tip : 
######################################################################################################################################

# Load packages
library(tidyverse)
library(factoextra)
library(FactoMineR)
library(ggplot2)
library(psych)
library(corrplot)
library(caret)
library(fdm2id)
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

# Number of clusters

fviz_nbclust(iris[1:4],
             FUNcluster = kmeans, 
             method = "wss") +
  geom_vline(xintercept = 3, 
             linetype = 2)+
  labs(subtitle = "Elbow method") 

# K-means

res.km <- kmeans(scale(iris[, -5]),
                 centers = 3, 
                 nstart = 25)
res.km

# Cluster visualisation

fviz_cluster(res.km, 
             data = iris[, -5],
             palette = c("#2E9FDF", "#00AFBB", "#E7B800"), 
             geom = "point",
             ellipse.type = "convex", 
             ggtheme = theme_bw()
)

# Confusion matrix and accuracy – training data

predictions <- data.frame(
  real=as.numeric(iris$Species),
  predicted=res.km$cluster
)

caret::confusionMatrix(table(predictions$real,
                             predictions$predicted))

