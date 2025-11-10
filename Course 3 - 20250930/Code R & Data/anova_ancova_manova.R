######################################################################################################################################
# Nom : 
# Prénom : 
# Date : 
# Module ANCOVA
# Goal : 
# Tip : 
######################################################################################################################################

install.packages("mvnormtest")

# Load packages
library(dplyr)
library(datasets)
library(stats)
library(car)
library(corrplot)
library(MASS)
library(mvnormtest)
library(outliers)
library(rstatix)
library(datarium)
library(UsingR)
library(ggplot2)
library(rstatix)
library(readr)

# ANOVA : Analysis of Variance -----------------------------------------------------

data <- datasets::iris

# Goal : compare the characteristics of the three species of flowers with ANOVA (aov function)
# Hint : check homogeneity of variances with Barlett test (stats package)






# ANCOVA : Analysis of Covariance -----------------------------------------------------

# Load data (45 records : impact of the intensity of physical training on anxiety levels)

data("anxiety", package = "datarium")

anxiety <- anxiety %>%
  as.data.frame() %>%
  select(-t2) %>%
  rename("pretest"="t1",
         "posttest"="t3")

# Variables : 
# group : training group (grp1 : low exercise, grp2 : moderate exercise, grp3 : intensive exercise)
# pretest : anxiety score before training
# posttest : anxiety score 6 months after training

# Data exploration

# Histograms

# Data plot (boxplots between group and pretest and posttest)


# Correlation between pretest and posttest by group


# Checking homogeneity of slopes between pretest and group


# Checking homogeneity of variances between pretest and posttest by group


# ANCOVA


# ANCOVA without interaction


# MANOVA : Multiple Analysis of Variance -----------------------------------------------------

# Load data (40 records : 10 samples of 4 flowers)

df=read_csv("https://reneshbedre.github.io/assets/posts/ancova/manova_data.csv")

# Variables : 
# plant_var : plant variety (factor)
# height	 : plant height (cm)
# canopy_vol	 : volume of canopy

# Goal : launch an MANOVA which explains the measurements with the plant

# summary statistics for dependent variables  


# Visualize data


# Plot correlation between canopy_vol & height by variety


# Assumptions of multivariate normality

# With plots (histogram & qqnorm)

# With Shapiro_test


# No multicollinearity between dependent variables (<0.9)


# Homogeineity of variances


# Check outliers
# Hint : use grubbs.test in outliers package




# Perform one-way MANOVA


# get effect size



