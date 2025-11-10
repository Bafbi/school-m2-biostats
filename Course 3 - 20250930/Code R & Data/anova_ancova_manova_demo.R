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
library(ggpubr)

# ANOVA : Analysis of variance

airlines <- nycflights13::airlines
airports <- nycflights13::airports
flights <- nycflights13::flights
planes <- nycflights13::planes
weather <- nycflights13::weather

# Compare the temperature mean or median between the three New-York airports in august

weather_august <- weather %>%
  filter(month==8)

# Checking homogeneity of variances

bartlett.test(temp ~ origin,
              data = weather_august)

boxplot(temp ~ origin,data=weather_august)

model <- aov(temp ~ origin,
             data=weather_august)

summary(model)
anova(model)
ggqqplot(residuals(model),conf.int = T)
shapiro.test(residuals(model))

kruskal_test(temp ~ origin,
             data=weather_august)

# ANCOVA : Analysis of Covariance

# Load data (1236 records : impact of the intensity of physical training on anxiety levels)

babies <- UsingR::babies

# Variables : 
# wt : weight of baby at birth (parameter to predict)
# wt1 : weight of mother (covariate)
# smoke : smoking status of mother (factor)
#   0 = never smoked
#   1 = smoked during pregnancy
#   2 = smoked before but stopped at start of pregnancy
#   3 = smoked before but stopped long before pregnancy 

# Data exploration

babies <- babies %>% 
  select(wt, wt1, smoke) %>% # Keeping key variables
  filter(wt1 < 999, wt < 999, smoke < 9) %>% # Keeping reliable values
  mutate(wt = wt * 0.02835,
         wt1 = wt1 * 0.4536,
         smoke = as.factor(smoke))

# Histograms

hist(babies$wt)
hist(babies$wt1)

# Data plot (boxplots between smoke and wt1 and wt2)

ggplot(data = babies, aes(x=smoke,y=wt)) +
  geom_boxplot() +
  ylab("Baby weight [kg]")

ggplot(data = babies, aes(x=smoke,y=wt1)) +
  geom_boxplot() +
  ylab("Mother weight [kg]")

# Correlation between wt and wt1 by smoking status

ggplot(data=babies,
       aes(x=wt1,
           y=wt,color=smoke)) +
  geom_point() +
  geom_smooth(method = "lm",se = F)

# Checking homogeneity of slopes between wt and smoke

anova_test(wt ~ smoke*wt1,
           data=babies)

# ANCOVA
babies_lm <- lm(data = babies,
                wt ~ smoke * wt1)

summary(babies_lm)
anova(babies_lm)

ggpubr::ggqqplot(babies_lm$residuals)
hist(babies_lm$residuals)

# ANCOVA without interaction
babies_lm2 <- lm(data = babies, wt ~ smoke + wt1)
summary(babies_lm2)
anova(babies_lm2)
hist(babies_lm2$residuals)
shapiro.test(babies_lm2$residuals)

# MANOVA : Multiple Analysis of Variance --------------------------------------

# Load data (150 records : 50 samples of 3 species of flowers)

data <- datasets::iris

# Goal : launch an MANOVA which explains the two lengths (sepal and petal) by the species

# summary statistics for dependent variables  

data %>% 
  group_by(Species) %>%  
  summarise(n = n(), 
            mean = mean(Sepal.Length), 
            sd = sd(Sepal.Length))

data %>% 
  group_by(Species) %>%  
  summarise(n = n(), 
            mean = mean(Petal.Length), 
            sd = sd(Petal.Length))

# Visualize data

ggboxplot(data,
          x = "Species",
          y = c("Sepal.Length", "Petal.Length"), 
          merge = TRUE, palette = "jco")

# Outliers identification

data %>%
  group_by(Species) %>%
  identify_outliers(Sepal.Length)

data %>%
  group_by(Species) %>%
  identify_outliers(Petal.Length)

# Assumptions of multivariate normality

# With plots (histogram & qqnorm)

ggqqplot(data, "Sepal.Length",
         facet.by = "Species",
         ylab = "Sepal Length",
         ggtheme = theme_bw())

# With Shapiro_test

data %>%
  group_by(Species) %>%
  shapiro_test(Sepal.Length, Petal.Length) %>%
  arrange(variable)

# No multicollinearity between dependent variables (r<0.9)

data %>% 
  cor_test(Sepal.Length, Petal.Length)

# Homogeineity of variances

bartlett.test(Sepal.Length ~ Species,data=data)
bartlett.test(Petal.Length ~ Species,data=data)

# Perform one-way MANOVA

dep_vars <- cbind(data$Sepal.Length, data$Petal.Length)
fit <- manova(dep_vars ~ Species, data = data)
summary(fit)
anova(fit)

# get effect size
effectsize::eta_squared(fit)

# Welch test (no homogeneity of variances)

grouped.data <- data %>%
  gather(key = "variable",
         value = "value",
         Sepal.Length,
         Petal.Length) %>%
  group_by(variable)

welch_anova_test(value ~ Species, data = grouped.data)