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
# Hint : use pairs.panels function (psych package)

pairs.panels(data[3:7],
             gap = 0,
             bg = c("red", "green")[data$sp],
             pch = 21)

# Number of clusters
# Hint : use fviz_nbclust function (factoextra package)

fviz_nbclust(data[3:7],
             FUNcluster = kmeans,
             method = "wss") +
  geom_vline(xintercept = 3, linetype = 2)+
  labs(subtitle = "Elbow method") 

# K-means
# Hint : use kmeans function (stats package)

res.km <- kmeans(scale(data[3:7]),
                 2, 
                 nstart = 25)

res.km

# Plot clustering results
# Hint : use fviz_cluster function (factoextra package)

fviz_cluster(res.km,
             data[3:7],
             palette = c("#2E9FDF", "#00AFBB", "#E7B800"), 
             geom = "point",
             ellipse.type = "convex", 
             ggtheme = theme_bw()
)

# Confusion matrix and accuracy – training data

predictions <- data.frame(
  real=as.numeric(data$sp),
  predicted=res.km$cluster
)

caret::confusionMatrix(table(predictions$real,
                             predictions$predicted))
