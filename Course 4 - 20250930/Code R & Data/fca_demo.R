######################################################################################################################################
# Nom : 
# Prénom : 
# Date : 
# Module FCA
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
# Housekeeping tasks repartition
# Contingency table with 1744 couples answers on 13 questions

housetasks <- factoextra::housetasks

# FCA (CA function)

fca <- FactoMineR::CA(housetasks)

# Dimensions (fviz_eig function)

fviz_eig(fca)

# Influence of variables in the axes (fviz_contrib function)

fviz_contrib(fca,axes = 1)
fviz_contrib(fca,axes = 2)
fviz_contrib(fca,axes = 3)

# Coordinates of variables (fviz_ca_col function)

fviz_ca_col(fca,axes = c(1,2))

# Coordinates of individuals (fviz_ca_row function)

fviz_ca_row(fca,axes = c(1,2))

# Biplot (fviz_ca_biplot function)

fviz_ca_biplot(fca)
