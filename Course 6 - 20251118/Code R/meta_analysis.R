######################################################################################################################################
# Nom : 
# Prénom : 
# Date : 
# Module Meta-analysis
# Goal : 
# Tip : 
######################################################################################################################################
# 
# install.packages("meta")
# install.packages("metadat")

# Load packages
library(meta)
library(metadat)

# Data : Studies on Low Dosage Tricyclic Antidepressants for the Treatment of Depression
# Results on depression severity from 17 studies comparing low dosage tricyclic antidepressants (TCA) and placebo for the
# treatment of depression.
# Variables : 
# author : First author with information on dosage in parentheses
# Ne : number of patients in low TCA group
# Me : depression severity (low TCA)
# Se : standard deviation (low TCA)
# Nc : number of patients in placebo group
# Mc : depression severity (placebo)
# Sc : standard deviation (placebo)

data(dat.furukawa2003)
dat.furukawa2003

# Goal : launch a meta-analysis 
# Hint : use metacont function (package meta), funnel for funnel plot and baujat for baujat plot

 