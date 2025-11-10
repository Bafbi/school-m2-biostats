######################################################################################################################################
# Nom : 
# Prénom : 
# Date : 
# Module MCA
# Goal : 
# Tip : 
######################################################################################################################################

# Load packages
library(tidyverse)
library(factoextra)
library(FactoMineR)
library(ggplot2)
library(corrplot)
library(plotly)
set.seed(123)

# Load the data
# The data used here concern a questionnaire on tea.
# We asked to 300 individuals how they drink tea (18 questions), what are their product's perception (12 questions) 
# and some personal details (4 questions).

data("tea")

# Study frequencies

summary(tea)

# MCA (MCA function)

res.mca <- MCA(tea,
               quali.sup=20:36,
               quanti.sup=19,
               method="Burt")

# Dimensions (fviz_eig function)

fviz_eig(res.mca)

# Influence of variables in the axes (fviz_contrib function)

fviz_contrib(res.mca, choice ="var", axes = 1)

# Coordinates of variables (fviz_mca_var function)

ggplotly(fviz_mca_var(res.mca))

# Coordinates of individuals (fviz_mca_row function)

fviz_mca_ind(res.mca)

# Biplot (fviz_mca_biplot function)

ggplotly(fviz_mca_biplot(res.mca))


