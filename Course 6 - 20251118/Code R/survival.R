######################################################################################################################################
# Nom : 
# Prénom : 
# Date : 
# Module Survival analysis
# Goal : 
# Tip : 
######################################################################################################################################

# install.packages("survival")
# install.packages("survminer") 

# Load packages
library(survival)
library(survminer)
library(ggplot2)
library(dplyr)

##------------------------  Exercice 1

# Data : Acute Myelogenous Leukemia survival data

leukemia <- survival::leukemia

# Survival in patients with Acute Myelogenous Leukemia. The question at the time was whether the standard course of chemotherapy should be extended ('maintainance') 
# for additional cycles.

# Variables : 
# time : survival or censoring time
# status : censoring status
# x : maintenance chemotherapy given? (factor)


# Goal : Compare the effect of chemotherapy on survival
# Hint : use survfit function from survival package




# Compare the two curves with log-rank test
# Hint : use survdiff function from survival package





# Plot Kaplan-Meier curves
# Hint : use ggsurvplot function from survminer package





##------------------------  Exercice 2

# Data : Acute Myelogenous Leukemia survival data

rotterdam <- survival::rotterdam

# Breast cancer data set used in Royston and Altman (2013)
# The rotterdam data set includes 2982 primary breast cancers patients 
# whose records were included in the Rotterdam tumor bank.

# Variables : 
# pid : patient identifier
# year : year of surgery
# age : age at surgery
# meno : menopausal status (0= premenopausal, 1= postmenopausal)
# size : tumor size, a factor with levels <=20 20-50 >50
# grade : differentiation grade
# nodes : number of positive lymph nodes
# pgr : progesterone receptors (fmol/l)
# er : estrogen receptors (fmol/l)
# hormon : hormonal treatment (0=no, 1=yes)
# chemo : chemotherapy
# rtime : days to relapse or last follow-up
# recur : 0= no relapse, 1= relapse
# dtime : days to death or last follow-up
# death : 0= alive, 1= dead


# Plot overall Kaplan-Meier curve
# Hint : use ggsurvplot from package survminer







# Goal : Identify the factors of death (dtime and death variables)
# Hint : use coxph and cox.zph functions from survival package

# Univariate models

# Age at surgery





# menopausal status





# size






# grade





# nodes






# menopausal status






# pgr






# er








# hormon





# chemo






# Multivariate analysis
# Hint : use ggforest functions from surminer package





