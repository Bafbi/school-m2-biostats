######################################################################################################################################
# Module GGPLOT2
# Goal : Use the functionalities of ggplot2 package to visualize data
# Tip : 
######################################################################################################################################

# Install package -------------------------------------------------------------
# install.packages("ggplot2")

# Load package -------------------------------------------------------------
library("ggplot2")

# Load data ------------------------------------------------------------

diamonds <- ggplot2::diamonds # Details of 53940 diamonds

# Exercises -------------------------------------------------------------

# Plot the distribution (geom_density) of carat and price by cut (5 levels)
# Color densities by cut
# Store the plot in an object called plot_density_carat

ggplot(data=diamonds,
       aes(x=carat,
           fill = cut)) +
  geom_density(alpha=0.5) +
  theme_bw() +
  theme()

# Plot the distribution with histogram (geom_histogram) of price by cut (5 levels)
# Store the plot in an object called plot_histogram_price

ggplot(data=diamonds,
       aes(x=price,fill = cut)) +
  geom_histogram(alpha=0.5) +
  theme_bw()

# Plot the correlation between price and carat (geom_point) of price by cut (5 levels)
# Store the plot in an object called plot_scatter
# Add a regression line by cut (use geom_smooth)
# Change the colors of the cut levels with : darkred, red, orange, green, darkgreen (use scale_colour_manual)
# Add a title, subtitle and put titles of axes in uppercase and change title of the legend
# Use black and white theme (theme_bw)

cols <- c("darkred","red","orange","green","darkgreen")

plot_scatter <- ggplot(data=diamonds,
                       aes(x=price,
                           y=carat,
                           colour = cut)) +
  geom_point(alpha=0.5) +
  geom_smooth(method = "lm")+
  scale_colour_manual(values = cols)+
  labs(title = "Relationship between price in $, carat by quality of diamonds",
       subtitle = "Number of diamonds : 53940",
       colour="Cut")+
  xlab("PRICE")+
  ylab("CARAT")+
  theme_bw() 

# Export this plot in a file named plot_scatter.png : format png, dimensions of the plot : 2000px width, 1000px height
# Hint : use ggsave function

ggplot2::ggsave(filename = "plot_scatter.png",
                plot = plot_scatter,
                device = "png",
                width = 2000,
                height = 1000,
                units = "px")

# Plot the depth by color (7 levels) with boxplots along with points on the right
# Hint : use position_nudge option of geom_boxplot and geom_point with position_jitter)

ggplot(data=diamonds,
       aes(x=color,
           y=depth,
           colour = color)) +
  geom_boxplot(width=0.25,alpha=0.5,position= position_nudge(x=-.25)) +
  geom_point(position = position_jitter(width = 0.1),alpha=0.25)+
  # geom_point(position=position_jitterdodge(dodge.width = 0.5,jitter.width = 0.25))+
  labs(title = "Boxplot of depth by quality",
       subtitle = "Number of diamonds : 53940")+
  xlab("Quality")+
  ylab("Depth")+
  theme_bw() 
