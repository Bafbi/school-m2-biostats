######################################################################################################################################
# Nom : 
# Prénom : 
# Date : 
# Module PCA
# Goal : 
# Tip : 
######################################################################################################################################

# Load packages
library(tidyverse)
library(factoextra)
library(FactoMineR)
library(ggplot2)
library(corrplot)
set.seed(123)

# Load the data
# Performance in decathlon
# A data frame with 41 rows and 13 columns: the first ten columns corresponds to the performance of the athletes for the 10 events 
# of the decathlon. The columns 11 and 12 correspond respectively to the rank and the points obtained.
# The last column is a categorical variable corresponding to the sporting event (2004 Olympic Game or 2004 Decastar)

data("decathlon")
data <- decathlon[,c(1:10,13)]
rm(decathlon)

# Study distribution of parameters and correlations

summary(data)

# PCA (PCA function)

pca <- FactoMineR::PCA(data,
                       scale.unit = T,
                       quali.sup = 11)

# Dimensions (fviz_eig function)

factoextra::fviz_eig(pca)

# Influence of variables in the axes (fviz_contrib function)

factoextra::fviz_contrib(pca,choice = "var",axes = 1)
factoextra::fviz_contrib(pca,choice = "var",axes = 2)
factoextra::fviz_contrib(pca,choice = "var",axes = 3)

# Coordinates of variables (fviz_pca_var function)

factoextra::fviz_pca_var(pca,axes = c(1,2))
factoextra::fviz_pca_var(pca,axes = c(1,3))
factoextra::fviz_pca_var(pca,axes = c(2,3))

# Coordinates of individuals (fviz_pca_ind function)

factoextra::fviz_pca_ind(pca,axes = c(1,2),col.ind = data$Competition)
factoextra::fviz_pca_ind(pca,axes = c(1,3),col.ind = data$Competition)
factoextra::fviz_pca_ind(pca,axes = c(2,3),col.ind = data$Competition)

# Biplot (fviz_pca_biplot function)

factoextra::fviz_pca_biplot(pca)

