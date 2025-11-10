######################################################################################################################################
# Module GGPLOT2
# Goal : Use the functionalities of ggplot2 package to visualize data
# Tip : 
######################################################################################################################################

# Install package -------------------------------------------------------------
install.packages("ggplot2")

# Load package -------------------------------------------------------------
library("ggplot2")

# Load data ------------------------------------------------------------

diamonds <- ggplot2::diamonds # Details of 53940 diamonds

# Exercises -------------------------------------------------------------

# Plot the distribution (geom_density) of carat and price by cut (5 levels)
# Color densities by cut
# Store the plot in an object called plot_density_carat




# Plot the distribution with histogram (geom_histogram) of price by cut (5 levels)
# Store the plot in an object called plot_histogram_price




# Plot the correlation between price and carat (geom_point) of price by cut (5 levels)
# Store the plot in an object called plot_scatter
# Add a regression line by cut (use geom_smooth)
# Change the colors of the cut levels with : darkred, red, orange, green, darkgreen (use scale_colour_manual)
# Add a title, subtitle and put titles of axes in uppercase and change title of the legend
# Use black and white theme (theme_bw)




# Export this plot in a file named plot_scatter.png : format png, dimensions of the plot : 2000px width, 1000px height
# Hint : use ggsave function




# Plot the depth by color (7 levels) with boxplots along with points on the right
# Hint : use position_nudge option of geom_boxplot and geom_point with position_jitter)






