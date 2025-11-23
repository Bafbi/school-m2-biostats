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

ggplot(data=data,
       aes(x=Time,
           y = weight,
           group=Rat,
           color=Diet)) +
  geom_line()+
  geom_point() +
  theme_bw()

# Do the same but plot the average weight / diet group with +/- 95% CI (+/- 1.96 * (sd/sqrt(n)))
# Color by group the lines
# Hint : use ggplot after calculating statistics / group with dplyr

stats <- data %>%
  group_by(Diet,Time) %>%
  summarise(n=n(),
            mean=mean(weight,na.rm=T),
            sd=sd(weight,na.rm=T))

ggplot(data=stats,
       aes(x=Time,
           y=mean,
           group=Diet,
           color=Diet)) +
  geom_line() +
  geom_point(position=position_dodge(0.05)) +
  geom_errorbar(aes(ymin=mean-1.96*(sd/sqrt(n)), ymax=mean+1.96*(sd/sqrt(n))),
                width=.2,
                position=position_dodge(0.05)) +
  theme_bw()

# Launch a linear mixed model
# Hint : use lme function from nlme package

model_1 <- lme(data = data,
               fixed = weight ~ Time*Diet,
               random = ~ 1|Rat)

# Assess quality of model
# Hint : study residuals distribution and r2 function from performance package

hist(residuals(model_1))
qqnorm(residuals(model_1))
qqline(residuals(model_1))
anova(model_1)

summary(model_1)
getVarCov(model_1)
performance::r2(model_1)

