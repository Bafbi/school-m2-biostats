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

KM <- survfit(Surv(time,status) ~ x,
              data=leukemia)

summary(KM)

# Compare the two curves with log-rank test
# Hint : use survdiff function from survival package

log_rank <- survdiff(Surv(time,status) ~ x,
                     data=leukemia)

log_rank # pvalue of 0.07

# Plot Kaplan-Meier curves
# Hint : use ggsurvplot function from survminer package

ggsurvplot(KM,surv.median.line = "hv",pval = T)

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

KM <- survival::survfit(Surv(dtime,death) ~ 1,
                        data=rotterdam)

survminer::ggsurvplot(KM,surv.median.line = "hv")

# Goal : Identify the factors of death (dtime and death variables)
# Hint : use coxph and cox.zph functions from survival package

# Univariate models

# Age at surgery

cox_age <- coxph(Surv(dtime,death) ~ age,
                 data=rotterdam)

summary(cox_age)
plot(cox.zph(cox_age)) # pvalue : < 0.001

# menopausal status

KM <- survival::survfit(Surv(dtime,death) ~ meno,
                        data=rotterdam)

survminer::ggsurvplot(KM,surv.median.line = "hv")

survdiff(formula = Surv(dtime,death) ~ meno,
         data=rotterdam)

cox_meno <- coxph(Surv(dtime,death) ~ meno,
                  data=rotterdam)

summary(cox_meno)

cox.zph(cox_meno)

# size

KM_size <- survival::survfit(Surv(dtime,death) ~ size,
                             data=rotterdam)

survminer::ggsurvplot(KM_size,surv.median.line = "hv",pval = T)

survdiff(formula = Surv(dtime,death) ~ size,
         data=rotterdam) # pvalue < 0.001

cox_size <- coxph(Surv(dtime,death) ~ size,
                  data=rotterdam)

summary(cox_size)

cox.zph(cox_size) # pvalue : 0.01

# grade

KM_grade <- survival::survfit(Surv(dtime,death) ~ grade,
                              data=rotterdam)

survminer::ggsurvplot(KM_grade,surv.median.line = "hv",pval = T)

survdiff(formula = Surv(dtime,death) ~ grade,
         data=rotterdam) # pvalue < 0.001

cox_grade <- coxph(Surv(dtime,death) ~ grade,
                   data=rotterdam)

summary(cox_grade)

cox.zph(cox_grade) # pvalue : 0.06

# nodes

cox_nodes <- coxph(Surv(dtime,death) ~ nodes,
                   data=rotterdam)

summary(cox_nodes) # pvalue < 0.001

cox.zph(cox_nodes) # pvalue : 0.047


# menopausal status

KM <- survival::survfit(Surv(dtime,death) ~ meno,
                        data=rotterdam)

survminer::ggsurvplot(KM,surv.median.line = "hv")

survdiff(formula = Surv(dtime,death) ~ meno,
         data=rotterdam)

cox_meno <- coxph(Surv(dtime,death) ~ meno,
                  data=rotterdam)

summary(cox_meno)

cox.zph(cox_meno)

# pgr

cox_pgr <- coxph(Surv(dtime,death) ~ pgr,
                 data=rotterdam)

summary(cox_pgr)

cox.zph(cox_pgr) # pvalue : <0.001
plot(cox.zph(cox_pgr)) # pvalue : <0.001

# er

cox_er <- coxph(Surv(dtime,death) ~ er,
                data=rotterdam)

summary(cox_er) # pvalue=0.44

cox.zph(cox_er) # pvalue : <0.001
plot(cox.zph(cox_er))

# hormon

KM_hormon <- survival::survfit(Surv(dtime,death) ~ hormon,
                               data=rotterdam)

survminer::ggsurvplot(KM_hormon,surv.median.line = "hv",pval = T)

survdiff(formula = Surv(dtime,death) ~ hormon,
         data=rotterdam) # pvalue < 0.001

cox_hormon <- coxph(Surv(dtime,death) ~ hormon,
                    data=rotterdam)

summary(cox_hormon)

cox.zph(cox_hormon) # pvalue=0.72

# chemo

KM_chemo <- survival::survfit(Surv(dtime,death) ~ chemo,
                              data=rotterdam)

survminer::ggsurvplot(KM_chemo,surv.median.line = "hv",pval = T)

survdiff(formula = Surv(dtime,death) ~ chemo,
         data=rotterdam) # pvalue : 0.50

cox_chemo <- coxph(Surv(dtime,death) ~ chemo,
                   data=rotterdam) 

summary(cox_chemo) # pvalue : 0.48

cox.zph(cox_chemo) # pvalue=0.28

# Multivariate analysis
# Hint : use ggforest functions from surminer package

cox_death <- coxph(Surv(dtime,death) ~ age + meno + size + grade + nodes + pgr + er + hormon + chemo,
                   data=rotterdam) 

summary(cox_death)

cox.zph(cox_death) # remove er and pgr : too low pvalue

cox_death_2 <- coxph(Surv(dtime,death) ~ age + meno + size + grade + nodes + hormon + chemo,
                     data=rotterdam) 

summary(cox_death_2)
plot(cox.zph(cox_death_2))

scox_death_3 <- coxph(Surv(dtime,death) ~ meno + size + grade + nodes + hormon + chemo,
                     data=rotterdam)

summary(cox_death_3)

cox.zph(cox_death_3) # remove age : too low pvalue

ggforest(cox_death_3)
