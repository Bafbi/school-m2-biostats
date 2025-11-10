######################################################################################################################################
# Nom : 
# Prénom : 
# Date : 
# Module FAMD
# Goal : 
# Tip : 
######################################################################################################################################

# Load packages
library("FactoMineR")
library("factoextra")
set.seed(123)

# Load the data
# Wine data: 21 wines of Val de Loire.
# A data frame with 21 rows (the number of wines) and 31 columns: 
# the first column corresponds to the label of origin
# the second column corresponds to the soil
# and the others correspond to sensory descriptors.

data(wine)

summary(wine)

# FAMD

res.famd <- FAMD(wine,
                 ncp = 5,
                 sup.var = NULL,
                 ind.sup = NULL,
                 graph = TRUE)

# Dimensions (fviz_eig function)

fviz_eig(res.famd)

# Influence of variables in the axes (fviz_contrib function)

fviz_contrib(res.famd,choice = "var",axes = 1)
fviz_contrib(res.famd,choice = "var",axes = 2)

# Influence of variables - All variables

fviz_famd_var(res.famd,axes = c(1,2))

# Influence of variables - Quantitative variables

fviz_famd_var(res.famd, "quanti.var",
              col.var = "contrib", 
              gradient.cols = c("#00AFBB", "#E7B800", "#FC4E07"),
              repel = TRUE)

# Influence of variables - Qualitative variables

fviz_famd_var(res.famd, "quali.var",
              col.var = "contrib", 
              gradient.cols = c("#00AFBB", "#E7B800", "#FC4E07"))

# Coordinates of individuals (fviz_famd_ind function)

fviz_famd_ind(res.famd,axes = c(1,2))

# Classification

fviz_mfa_ind(res.famd, 
             habillage = "Label", # color by groups 
             palette = c("#00AFBB", "#E7B800", "#FC4E07"),
             addEllipses = TRUE,
             ellipse.type = "confidence", 
             repel = TRUE # Avoid text overlapping
) 
