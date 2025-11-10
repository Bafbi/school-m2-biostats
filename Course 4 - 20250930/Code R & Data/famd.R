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


# FAMD (with last column Churn as supplementary variable)




# Dimensions (fviz_eig function)



# Influence of variables in the axes (fviz_contrib function)



# Influence of variables - All variables (fviz_famd_var)



# Influence of variables - Quantitative variables (fviz_famd_var)



# Influence of variables - Qualitative variables (fviz_famd_var)


# Coordinates of individuals (fviz_famd_ind function)



# Classification of individuals on Churn variable on a plot (fviz_mfa_ind)


