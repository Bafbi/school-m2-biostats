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
# Customer data from TELCO company (7032 clients)
# Goal : identify the characteristics of clients which are "No Churn" (last variable)  with a FAMD

## Import data
df <- read.csv('https://github.com/nchelaru/data-prep/raw/master/telco_cleaned_renamed.csv')

summary(df)

# FAMD (with last column Churn as supplementary variable)

res.famd <- FAMD(df, 
                 sup.var = 20,
                 graph = TRUE, 
                 ncp=25)

# Dimensions (fviz_eig function)

fviz_eig(res.famd)

# Influence of variables in the axes (fviz_contrib function)

fviz_contrib(res.famd,choice = "var",axes = 1)
fviz_contrib(res.famd,choice = "var",axes = 2)

# Influence of variables - All variables (fviz_famd_var)

fviz_famd_var(res.famd,axes = c(1,2))

# Influence of variables - Quantitative variables (fviz_famd_var)

fviz_famd_var(res.famd, "quanti.var",
              col.var = "contrib", 
              gradient.cols = c("#00AFBB", "#E7B800", "#FC4E07"),
              repel = TRUE)

# Influence of variables - Qualitative variables (fviz_famd_var)

fviz_famd_var(res.famd, "quali.var",
              col.var = "contrib", 
              gradient.cols = c("#00AFBB", "#E7B800", "#FC4E07"))

# Coordinates of individuals (fviz_famd_ind function)

fviz_famd_ind(res.famd,axes = c(1,2))

# Classification of individuals on Churn variable on a plot (fviz_mfa_ind)

fviz_mfa_ind(res.famd, 
             habillage = "Churn", # color by groups 
             palette = c("#00AFBB", "#E7B800"),
             addEllipses = TRUE, ellipse.type = "confidence", 
             repel = FALSE # Avoid text overlapping
) 

