######################################################################################################################################
# Nom : 
# Prénom : 
# Date : 
# Module ANCOVA
# Goal : 
# Tip : 
######################################################################################################################################

# install.packages("mvnormtest")

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
library(gridExtra)

# ANOVA : Analysis of Variance ------------------------------------

data <- datasets::iris

# Goal : compare the characteristics of the three species of flowers with ANOVA (aov function)
# Hint : check homogeneity of variances with Barlett test (stats package)

# Sepal length

bartlett.test(Sepal.Length ~ Species,
              data=data)

boxplot(Sepal.Length ~ Species,
        data=data)

model <- aov(Sepal.Length ~ Species,
             data=data)

summary(model)
ggqqplot(residuals(model),conf.int = T)
shapiro.test(residuals(model))
tukey_hsd(model)

# Kruskal-wallis

kruskal.test(Sepal.Length ~ Species,
             data=data)

# ANCOVA : Analysis of Covariance ------------------------------------------

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

ggplot(data=anxiety,
       aes(y=pretest,
           color=group)) +
  geom_boxplot()

ggplot(data=anxiety,
       aes(y=posttest,
           color=group)) +
  geom_boxplot()

# Correlation between pretest and posttest by group

ggplot(data=anxiety,
       aes(x=pretest,
           y=posttest,
           color=group)) +
  geom_point() +
  geom_smooth(method = "lm",se = F)

# Checking homogeneity of slopes between pretest and group

anova_test(posttest ~ group*pretest,
           data=anxiety)

# Checking homogeneity of variances between pretest and posttest by group

bartlett.test(pretest ~ group,
              data=anxiety)

bartlett.test(posttest ~ group,
              data=anxiety)

# ANCOVA

lm <- lm(posttest ~ group*pretest,
         data = anxiety)

summary(lm)
anova(lm)
hist(lm$residuals)
ggqqplot(lm$residuals,conf.int = T)
shapiro.test(lm$residuals)

# ANCOVA without interaction

lm <- lm(posttest ~ group+pretest,
         data = anxiety)

summary(lm)
anova(lm)
tukey_hsd(lm)

# MANOVA : Multiple Analysis of Variance ------------------------------------

# Load data (40 records : 10 samples of 4 flowers)

df=read_csv("https://reneshbedre.github.io/assets/posts/ancova/manova_data.csv")

# Variables : 
# plant_var : plant variety (factor)
# height	 : plant height (cm)
# canopy_vol	 : volume of canopy

# Goal : launch an MANOVA which explains the measurements with the plant

# summary statistics for dependent variables  

df %>% 
  group_by(plant_var) %>%  
  summarise(n = n(), 
            mean = mean(height), 
            sd = sd(height))

df %>% group_by(plant_var) %>%  
  summarise(n = n(), 
            mean = mean(canopy_vol), 
            sd = sd(canopy_vol))

# Visualize data

p1 <- ggplot(df, aes(x = plant_var, y = height, fill = plant_var)) + geom_boxplot(outlier.shape = NA) + geom_jitter(width = 0.2) + theme(legend.position="top")
p2 <- ggplot(df, aes(x = plant_var, y = canopy_vol, fill = plant_var)) + geom_boxplot(outlier.shape = NA) + geom_jitter(width = 0.2) + theme(legend.position="top")
grid.arrange(p1, p2, ncol=2)

# Plot correlation between canopy_vol & height by variety

ggplot(df,
       aes(x=height,
           y=canopy_vol,
           color=plant_var)) +
  geom_point()+
  geom_smooth(method = "lm")

# Assumptions of multivariate normality

# With plots (histogram & qqnorm)

# With Shapiro_test

df %>% group_by(plant_var) %>%  shapiro_test(height, canopy_vol)

# No multicollinearity between dependent variables (<0.9)

cor_test(data=df,vars = height,vars2 = canopy_vol)

# Homogeineity of variances

bartlett.test(canopy_vol ~ plant_var,data=df)
bartlett.test(height ~ plant_var,data=df)

# Check outliers
# Hint : use grubbs.test in outliers package

df %>%
  group_by(plant_var) %>%
  identify_outliers(canopy_vol)

df %>%
  group_by(plant_var) %>%
  identify_outliers(height)

# Perform one-way MANOVA

dep_vars <- cbind(df$height, df$canopy_vol)
fit <- manova(dep_vars ~ plant_var, data = df)
summary(fit)
anova(fit)

# get effect size
effectsize::eta_squared(fit)