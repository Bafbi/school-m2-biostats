######################################################################################################################################
# Nom : 
# Prénom : 
# Date : 
# Module Sample size calculation
# Goal : 
# Tip : 
######################################################################################################################################

# install.packages("pwr")

# Load packages
library(pwr)
library(ggplot2)
library(effectsize)
set.seed(123)

# pwr.2p.test : comparison of 2 proportions

h <- pwr::ES.h(0.5,0.8)
pwr <- pwr.2p.test(h,
                   sig.level = 0.05,
                   power = 0.9,
                   alternative = "less")
plot(pwr)

# pwr.r.test  : correlation

pwr_corr <- pwr.r.test(n=100,sig.level = 0.05,power = 0.80)
plot(pwr_corr)

# pwr.chisq.test : chi-square for goodness of fit

w <- pwr::ES.w1(P0 = c(0.4,0.4,0.1,0.1),
                P1 = c(0.25,0.25,0.25,0.25))

pwr_chisq <- pwr.chisq.test(w = w,df = 3,sig.level = 0.05,power = 0.8)
plot(pwr_chisq)

# pwr.chisq.test : chi-square for association

m <- matrix(c(0.4,0.4,0.1,0.1,
              0.5,0.15,0.15,0.2),
            ncol = 2)

w <- pwr::ES.w2(P = m)

pwr_chisq <- pwr.chisq.test(w = w,df = 3,sig.level = 0.05,power = 0.8)
plot(pwr_chisq)

# pwr.anova.test : ANOVA

grp1 <- rnorm(50,mean = 10,sd = 8)
grp2 <- rnorm(50,mean = 11,sd = 10)
grp3 <- rnorm(50,mean = 12,sd = 12)

data <- data.frame(
  group=as.factor(rep(c(1:3),each=50)),
  value=c(grp1,grp2,grp3)
)

ggplot(data=data,
       aes(x=value,
           fill=group,alpha=0.25))+
  geom_density()

model <- aov(value ~ group,data=data)
anova(model)
f <- cohens_f(model)
power <- pwr.anova.test(k = 3,f = f$Cohens_f,power = 0.8)
plot(power)

# pwr.t.test : T-test

mean_1 <- 25
mean_2 <- 35
pooled_sd <- 25

cohen_d <- abs(mean_1-mean_2)/pooled_sd

pwr_t_test <- pwr.t.test(d = cohen_d,power = 0.9)
plot(pwr_t_test)

# pwr.norm.test : univariate

mean <- 10
sd <- 100

cohen_d <- mean/sd

pwr_t_test <- pwr.t.test(d = cohen_d,power = 0.8,type = "one.sample")
plot(pwr_t_test)

# pwr.t2n.test 

mean_1 <- 30
mean_2 <- 45
pooled_sd <- 30

cohen_d <- abs(mean_1-mean_2)/pooled_sd

pwr_t2n_test <- pwr.t2n.test(d = cohen_d,n1 = 40,power = 0.8)
plot(pwr_t2n_test)
