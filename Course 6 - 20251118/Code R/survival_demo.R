######################################################################################################################################
# Nom : 
# Prénom : 
# Date : 
# Module Survival analysis
# Goal : 
# Tip : 
######################################################################################################################################

# Load packages
library(survival)
library(ggplot2)
library(dplyr)
library(survminer)

# Data : Diabetic retinopathy
# Partial results from a trial of laser coagulation for the treatment of diabetic retinopathy
# Variables : 
# id : subject id
# laser : laser type: xenon or argon
# age : age at diagnosis
# eye : a factor with levels of left right
# trt : treatment: 0 = no treatment, 1= laser
# risk : risk group of 6-12
# time : time to event or last follow-up
# status : status of 0= censored or 1 = visual loss

data <- survival::diabetic

# Goal : Compare the effect of treatment on visual loss

data_left <- data %>%
  filter(eye=="left")

KM <- survival::survfit(formula = Surv(time,status) ~ laser,
                        data=data_left)

summary(KM)

survminer::ggsurvplot(KM)

# Log-rank test

survdiff(formula = Surv(time,status) ~ laser,
         data=data_left)

# Right eye

data_right <- data %>%
  filter(eye!="right")

KM <- survival::survfit(formula = Surv(time,status) ~ laser,
                        data=data_right)

summary(KM)

survminer::ggsurvplot(KM)

# Log-rank test

survdiff(formula = Surv(time,status) ~ laser,
         data=data_left)