######################################################################################################################################
# Nom : 
# Prénom : 
# Date : 
# Module Sample size calculation
# Goal : 
# Tip : 
######################################################################################################################################

install.packages("pwr")
install.packages("effectsize")

# Load packages
library(pwr)
library(ggplot2)
library(effectsize)

# A researcher wants you to compare the proportion of men in two groups of the same size (N=150 per group)
# Group 1 : 56% of men
# Group 2 : 60.7% of men
# Compare the two proportions Calculate the power of this test and plot the relationship between power and sample size
# Hint : use pwr.2p.test function and ES.h function for estimation of h effect size

data_prop <- data.frame(
  group=as.factor(rep(c(1,2),each=150)),
  gender=c(rep("Man",84),rep("Woman",66),
           rep("Man",91),rep("Woman",59)))






# Calculate the coefficient of correlation between the two variables and test the significance and plot the relationship between the two variables
# and calculate the power of the test and plot the relationship between power and sample size
# Hint : use cor.test function and pwr.r.test function

x=seq(1:20)
y=0.05*x^3-0.015*sqrt(x)+rnorm(20,10,100)








# A categorical variable with 4 modalities has to be compared to the uniform law (same proportion for each category)
# The total number of observations is 100
# Calculate the power of the test and plot the relationship between power and sample size
# How many observations needed for the significance of the test with a power of 80% ?
# Hint : use pwr.chisq.test function for power, ES.w1 for w effect size calculation

P0<-rep(1/6,6)
P1<-c(0.25,0.30,0.10,0.05,0.15,0.15)








# Three groups of the same size (25) have been evaluated on a parameter
# Launch an ANOVA and calculate the power of the test and plot the relationship between power and sample size
# How many observations needed for the significance of the test with a power of 90% ?
# Hint : use pwr.anova.test function for power, cohens_f for f effect size calculation

grp1 <- rnorm(25,mean = 20,sd = 8)
grp2 <- rnorm(25,mean = 25,sd = 10)
grp3 <- rnorm(25,mean = 35,sd = 12)

data <- data.frame(
  group=as.factor(rep(c(1:3),each=25)),
  value=c(grp1,grp2,grp3)
)






# Two groups with different sizes (50 and 95 respectively) have been evaluated on a parameter
# Launch a T-test and calculate the power of the test and plot the relationship between power and sample size
# What effect size is needed for the significance of the test with a power of 80% ?
# Hint : use pwr.t2n.test function for power, cohens_d for f effect size calculation

grp1 <- rnorm(50,mean = 175,sd = 190)
grp2 <- rnorm(95,mean = 208,sd = 175)

data <- data.frame(
  group=as.factor(c(rep(1,50),rep(2,95))),
  value=c(grp1,grp2)
)