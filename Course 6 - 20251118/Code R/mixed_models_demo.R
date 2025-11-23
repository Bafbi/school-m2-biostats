######################################################################################################################################
# Nom : 
# Prénom : 
# Date : 
# Module Linear Mixed Models
# Goal : 
# Tip : 
######################################################################################################################################

# Load packages
library(nlme)
library(lme4)
library(ggplot2)
library(performance)
library(dplyr)

# Data : Reaction times in a sleep deprivation study
# Days 0-1 were adaptation and training (T1/T2), day 2 was baseline (B); sleep deprivation started after day 2.
# treatment of depression.
# Variables : 
# Reaction : Average reaction time (ms)
# Days : Number of days of sleep deprivation
# Subject : Subject number on which the observation was made.

data <- lme4::sleepstudy

# Goal : launch a linear-mixed model 
# Plot

ggplot(data=data,
       aes(x=Days,
           y=Reaction,
           group=Subject,
           color=Subject)) +
  geom_line() +
  geom_point() +
  theme_bw()

stats <- data %>%
  group_by(Days) %>%
  summarise(n=n(),
            mean=mean(Reaction,na.rm=T),
            sd=sd(Reaction,na.rm=T))

ggplot(data=stats,
       aes(x=Days,
           y=mean)) +
  geom_line() +
  geom_point() +
  theme_bw()

# Linear mixed model

# Random intercept 

model_1 <- lme(data = data,
             fixed = Reaction ~ Days,
             random = ~ 1|Subject)


hist(residuals(model_1))
qqnorm(residuals(model_1))
qqline(residuals(model_1))

summary(model_1)
getVarCov(model_1)
performance::r2(model_1)

# Random slope 

model_2 <- lme(data = data,
               fixed = Reaction ~ Days,
               random = ~ Days|Subject)


hist(residuals(model_2))
qqnorm(residuals(model_2))
qqline(residuals(model_2))

summary(model_2)
getVarCov(model_2)
performance::r2(model_2)

# Random intercept + slope 

model_3 <- lme(data = data,
               fixed = Reaction ~ Days,
               random = ~ (1 + Days)|Subject)


hist(residuals(model_3))
qqnorm(residuals(model_3))
qqline(residuals(model_3))

summary(model_3)
getVarCov(model_3)
performance::r2(model_3)