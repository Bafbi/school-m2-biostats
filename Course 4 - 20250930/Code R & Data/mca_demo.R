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
# The data used here concern a questionnaire on hobbies.
# We asked to 8403 individuals how answer questions about their hobbies (18 questions). 
# The data used here concern a questionnaire on hobbies. We asked to 8403 individuals how answer questions about their hobbies (18 questions). 
# The following four variables were used to label the individuals: sex (male, female), age (15-25, 26-35, 36-45, 46-55, 56-65, 66-75, 76-85, 86-100),
# marital status (single, married, widowed,divorced, remarried), profession (manual laborer, unskilled worker, technician, foreman, senior management, employee, other). 
# And finally, a quantitative variable indicates the number of hobbies practiced out of the 18 possible choices.

data("hobbies")

# Study data

summary(hobbies)

# MCA (MCA function)

res.mca <- MCA(hobbies,
               quali.sup=19:22,
               quanti.sup=23,
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

fviz_mca_biplot(res.mca)

