######################################################################################################################################
# Nom : 
# Prénom : 
# Date : 
# Module Poisson regression
# Goal : 
# Tip : 
######################################################################################################################################

# Load packages
library(tidyverse)
library(caret)
library(MASS)
library(ggplot2)
library(car)
set.seed(123)

# Data : Interlocking Directorates Among Major Canadian Firms
# The Ornstein data frame has 248 rows and 4 columns.
# The observations are the 248 largest Canadian firms with publicly available information in the mid-1970s.
# The names of the firms were not available.
# Variables : 
#     assets : Assets in millions of dollars.
#     sector : Industrial sector. A factor with levels: AGR, agriculture, food, light industry; BNK, banking; CON, construction; FIN, other financial; HLD, holding companies; MAN, heavy manufacturing; MER, merchandizing; MIN, mining, metals, etc.; TRN, transport; WOD, wood and paper.
#     nation : Nation of control. A factor with levels: CAN, Canada; OTH, other foreign; UK, Britain; US, United States.
#     interlocks : Number of interlocking director and executive positions shared with other major firms.


data(Ornstein) 
Ornstein <- Ornstein %>% as.data.frame()

# Y=interlocks, X=assets

ggplot(Ornstein, aes(x=assets, y=interlocks))+
  geom_point() 

# Transform data

ggplot(Ornstein, aes(x=log10(assets),
                     y=interlocks))+
  geom_point() 

# Checking assumption : mean = std

mean(Ornstein$interlocks)
sd(Ornstein$interlocks)

theoretic_count <-rpois(248,13.58)
tc_df <-data.frame(theoretic_count)

ggplot(Ornstein,aes(interlocks))+
  geom_bar(fill="#1E90FF")+
  geom_bar(data=tc_df,
           aes(theoretic_count,fill="red", alpha=0.5))+
  theme_classic()+
  theme(legend.position="none") 

# Poisson model

mod.pois1 <- glm(interlocks~log10(assets),
                 family="poisson",
                 data=Ornstein) 

# Checking overdispersion : residual deviance / ddl > 1
1904.7/246

summary(mod.pois1)

# Quasi-poisson

mod.quasipois1 <- glm(interlocks~log10(assets),
                      family="quasipoisson", 
                      data=Ornstein) 

summary(mod.quasipois1)

# Negative binomiale

mod.nb1 <- glm.nb(interlocks~log10(assets), 
                  data=Ornstein)

summary(mod.nb1)

293.38/246  

plot(mod.nb1)
  
# Predictions

mydf=data.frame(assets=c(100,1000,5000,10000, 50000, 100000)) 
xmin <- min(Ornstein$assets) 
xmax <- max(Ornstein$assets)
predicted <- data.frame(assets=seq(xmin, xmax, length.out=1000)) 
predicted$interlocks <-predict.glm(mod.quasipois1,
                                   newdata= predicted,
                                   type="response") 

ggplot(Ornstein, aes(x=log10(assets), y=interlocks)) +     
  geom_point()+
  geom_line(data=predicted, size=1, color="red")

# print predictions

predict.glm(mod.quasipois1,
            newdata= mydf,
            type="response") 

