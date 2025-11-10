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
# Genomic data for chicken
# A data frame with 43 chickens and 7407 variables.
# A factor with levels J16 J16R16 J16R5 J48 J48R24 N
# And many continuous variables corresponding to the gene expression

data("poulet")

# PCA (PCA function)

pca <- FactoMineR::PCA(poulet,
                       scale.unit = T,
                       ncp = 10,
                       quali.sup = 1)

# Dimensions (fviz_eig function)

fviz_eig(pca)

# Influence of variables in the axes (fviz_contrib function)

fviz_contrib(pca,choice = "var",axes = 1,top = 50)
fviz_contrib(pca,choice = "var",axes = 2,top = 50)
fviz_contrib(pca,choice = "var",axes = 3,top = 50)

# Coordinates of variables (fviz_pca_var function)

fviz_pca_var(pca,axes = c(1,2))
fviz_pca_var(pca,axes = c(1,3))
fviz_pca_var(pca,axes = c(2,3))

# Top 10

var_contrib_dim1 <- pca$var$contrib %>% 
  as.data.frame() %>% 
  arrange(desc(Dim.1)) %>% 
  head(10)

# Coordinates of individuals (fviz_pca_ind function)

fviz_pca_ind(pca,axes = c(1,2),col.ind = poulet$Diet)

# Biplot (fviz_pca_biplot function)

fviz_pca_biplot(pca,axes = c(1,2))
