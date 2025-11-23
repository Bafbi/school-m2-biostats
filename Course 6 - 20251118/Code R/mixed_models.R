######################################################################################################################################
# Nom : 
# Prénom : 
# Date : 
# Module Linear Mixed Models
# Goal : 
# Tip : 
######################################################################################################################################

# install.packages("nlme")
# install.packages("lme4")
# install.packages("performance")

# Load packages
library(nlme)
library(lme4)
library(ggplot2)
library(performance)
library(dplyr)

# Data : Rat weight over time for different diets
# Variables : 
# weight : body weight of the rat (grams)
# Time : Time of measurement (days)
# Rat : Rat ID
# Diet : Diet (3 groups)

data <- nlme::BodyWeight

# Goal : Compare the effect of diet on the weight of rats


# Plot the evolution of weights of rats across time
# Color by group the lines
# Hint : use ggplot





# Do the same but plot the average weight / diet group with +/- 95% CI (+/- 1.96 * (sd/sqrt(n)))
# Color by group the lines
# Hint : use ggplot after calculating statistics / group with dplyr





# Launch a linear mixed model
# Hint : use lme function from nlme package






# Assess quality of model
# Hint : study residuals distribution and r2 function from performance package






