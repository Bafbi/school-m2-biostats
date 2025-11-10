######################################################################################################################################
# Module multivariate
# Goal : use statistical tests to compare data between groups or assess the relationship between continuous variables
######################################################################################################################################

# Load data
library("plotly")
library("ggplot2")
library(htmlwidgets)
library(datasets)
library(dplyr)

# 1 - airlines : 16 airlines
# 2 - airports : 1458 destination airports 
# 3 - flights : 336776 flights
# 4 - planes : 3322 planes
# 5 - weather : hourly weather for each airport in 2013

cars <- datasets::cars
airlines <- nycflights13::airlines
airports <- nycflights13::airports
flights <- nycflights13::flights
planes <- nycflights13::planes
weather <- nycflights13::weather

# Correlation between speed and distance need to stop in cars dataset : correlation and plot  (add linear regression line with geom_smooth)

ggqqplot(cars$speed)
hist(cars$speed)

ggqqplot(cars$dist)
hist(cars$dist)

shapiro.test(cars$speed)
shapiro.test(cars$dist)

correlation <- cor.test(cars$speed,cars$dist,method = "spearman")

ggplot(data=cars,
       aes(x=speed,
           y=dist)) +
  geom_point()+
  geom_smooth(method = "lm") + 
  labs(title = "Correlation between speed and distance",
       subtitle = paste0("Correlation=",round(correlation$estimate,3)))

# Compare the distance variability in flights dataset between the three New-York airports in july 
# 2013 and plot the boxplots

flights_july <- flights %>%
  filter(month==7)

test <- bartlett.test(distance ~ origin,data=flights_july)

ggplot(data=flights_july,
       aes(x=origin,
           y=distance,
           color=origin)) +
  geom_boxplot()+
  labs(title = "Distances covered by planes in july 2013",
       subtitle = paste0("Bartlett test pvalue=",round(test$p.value)))

# Compare the mean (or median) distances of flights in july 2013 between the three airports

kruskal.test(distance ~ origin,data=flights_july)
pairwise.wilcox.test(x = flights_july$distance,g = flights_july$origin)

# Compare the mean (or median) distances of flights between the five most active companies (number of flights) in 2013

top_5_companies <- flights %>%
  merge(airlines,by = "carrier") %>%
  group_by(carrier,name) %>%
  dplyr::summarise(n=n()) %>%
  arrange(desc(n)) %>%
  ungroup() %>%
  slice(c(1:5))

top_5_companies_distances <- flights %>%
  merge(top_5_companies,by = "carrier",all.y = T) %>%
  select(name,distance)

bartlett.test(distance ~ name,top_5_companies_distances)

test <- kruskal.test(distance ~ name,data=top_5_companies_distances)
pairwise.wilcox.test(x = top_5_companies_distances$distance,g = top_5_companies_distances$name)

ggplot(data=top_5_companies_distances,
       aes(x=name,
           y=distance,
           color=name)) +
  geom_boxplot()+
  labs(title = "Distances covered by planes in 2013 in top 5 companies",
       subtitle = paste0("Kruskal-wallis test pvalue=",round(test$p.value))) + 
  theme_bw()

# Calculate and compare the average age of planes mean (or median) between the five most active companies (number of flights) in 2013 and plot the boxplots

top_5_companies_age <- flights %>%
  select(carrier,tailnum) %>%
  unique() %>%
  merge(top_5_companies,by = "carrier",all.y = T) %>%
  merge(planes,by = "tailnum") %>%
  select(tailnum,name,year) %>%
  mutate(age=2013-year)

bartlett.test(age ~ name,top_5_companies_age)
test <- kruskal.test(age ~ name,data=top_5_companies_age)
pairwise.wilcox.test(x = top_5_companies_age$age,g = top_5_companies_age$name)

ggplot(data=top_5_companies_age,
       aes(x=name,
           y=age,
           color=name)) +
  geom_boxplot()+
  labs(title = "Age of planes in 2013 in top 5 companies",
       subtitle = paste0("Kruskal-wallis test pvalue=",round(test$p.value)))

# Calculate and compare % of tzones which contains "America" on the number of flights between the three airports (dataset airports) between the three New-York airports and plot the stacked
# bar chart with ggplot2 and / or plotly
# Hint : use table function to transform raw data into a contingency table

tzone_america <- airports %>%
  mutate(timezone=case_when(stringr::str_detect(tzone,"America") ~ tzone,
                            TRUE ~ NA_character_)) %>%
  filter(!is.na(timezone)) %>%
  select(faa,timezone) %>%
  merge(flights,by.x = "faa",by.y = "dest") %>%
  select(origin,timezone)

table <- table(tzone_america$origin,tzone_america$timezone)

test <- chisq.test(table)

tzone_america %>%
  dplyr::group_by(origin,timezone) %>%
  dplyr::summarise(n=n()) %>%
  mutate(pct=round(n/sum(n),2)) %>%
  ggplot(., aes(fill=timezone, y=pct, x=origin)) + 
  geom_bar(position="fill", stat="identity") +
  geom_text(aes(label = pct), position = position_stack(vjust = 0.5), size = 5) +
  theme_bw() +
  labs(title = "% of flights by airport and timezone in America",
       subtitle = paste0("Chi-sq test pvalue=",round(test$p.value)))


