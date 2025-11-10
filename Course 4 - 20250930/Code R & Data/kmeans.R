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


# Number of clusters
# Hint : use fviz_nbclust function (factoextra package)


# K-means
# Hint : use kmeans function (stats package)


# Plot clustering results
# Hint : use fviz_cluster function (factoextra package)



