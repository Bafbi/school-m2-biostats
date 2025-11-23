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
# install.packages("metafor")
# install.packages("metadat")


# Load packages
library(meta)
library(metafor)
library(metadat)
library(ggplot2)

# Data 
# Mortality Outcomes with Hydroxychloroquine and Chloroquine in COVID-19 from an International Collaborative Meta-Analysis of Randomized Trials
# Variables : 
# id : registry number
# acronym : shortened registry number
# blinding_exact : study blinding
# high_dose : high or low dose of medication
# Published : publication status
# hcq_cq : medication type (hcq = hydroxychloroquine or cq = chloroquine)
# hcq_arm_event : number of deaths in the treatment group
# hcq_arm_total : number of patients in the treatment group
# control_arm_event : number of deaths in the control group
# control_arm_total : number of patients in the control group
# Control : control group type (Standard of Care or Placebo)

data(dat.axfors2021)
dat.axfors2021

# calculate log odds ratios and corresponding sampling variances 

?escalc

dat <- escalc(measure="OR",
              ai=hcq_arm_event,
              n1i=hcq_arm_total,
              ci=control_arm_event,
              n2i=control_arm_total,
              data=dat.axfors2021)

# meta-analysis Hydroxychloroquine 
res_hcq <- rma(yi, vi, subset=(hcq_cq=="hcq"), slab = id, data=dat)
print(res_hcq, digits=2)
forest(res_hcq,)
funnel(res_hcq)
baujat.rma(res_hcq)

# meta-analysis Chloroquine
res_cq <- rma(yi, vi, subset=(hcq_cq=="cq"), slab = id, data=dat)
print(res_cq, digits=2)
forest(res_cq)
funnel(res_cq)
baujat.rma(res_cq)
