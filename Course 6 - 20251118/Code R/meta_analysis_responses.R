######################################################################################################################################
# Nom : 
# Prénom : 
# Date : 
# Module Meta-analysis
# Goal : 
# Tip : 
######################################################################################################################################

install.packages("meta")
install.packages("metadat")

# Load packages
library(meta)
library(metadat)
library(dplyr)

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

meta_analyse <- meta::metacont(n.e = dat.furukawa2003$Ne,
                               mean.e = dat.furukawa2003$Me,
                               sd.e = dat.furukawa2003$Se,
                               n.c = dat.furukawa2003$Nc,
                               mean.c = dat.furukawa2003$Mc,
                               sd.c = dat.furukawa2003$Sc,
                               studlab = dat.furukawa2003$author)

forest(meta_analyse) # Forest plot
funnel(meta_analyse) # Funnel plot
baujat(meta_analyse)

# We remove Rampello and Rickels studies

subset <- dat.furukawa2003 %>%
  filter(author != "Rickels(70)" & author != "Rampello(100)")

meta_analyse_2<- meta::metacont(n.e = subset$Ne,
                                mean.e = subset$Me,
                                sd.e = subset$Se,
                                n.c = subset$Nc,
                                mean.c = subset$Mc,
                                sd.c = subset$Sc,
                                studlab = subset$author,sm="SMD")

forest(meta_analyse_2) # Forest plot
funnel(meta_analyse_2) # Funnel plot
baujat(meta_analyse_2)
