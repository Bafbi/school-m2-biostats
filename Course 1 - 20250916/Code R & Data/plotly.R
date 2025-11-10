######################################################################################################################################
# Module PLOTLY
# Goal : Use the functionalities of plotly package to visualize data with interactive plots
# Tip : 
######################################################################################################################################

# Install package -------------------------------------------------------------
install.packages(c("plotly","htmlwidgets"))

# Load packages -------------------------------------------------------------
library("plotly")
library("ggplot2")
library(htmlwidgets)

# Exercises -------------------------------------------------------------

# Create a dataset named df with two variables :
# - x : 1000 points distributed with the normal law (mean = 10, sd = 1)
# - y : 1000 points distributed with the normal law (mean = 5, sd = 4)
# Hint : use rnorm function


# Plot the scatter plot of these two variables with plotly 



# Change the distribition on y in df and use a uniform distribution between 10 and 20
# Increase the standard-deviation of x (change sd to 8)
# Hint : use runif function




# Plot the scatter plot of these two variables with plotly and change the color to red
# Hint : use marker function




# Plot the heatmap plot from the matrix volcano (print volcano object in the console)




# Transform the plot into a 3D plot with add_surface function



# Change the color palette of the plot (use the Jet colorscale)
# Hint : use colorscale function



# Plot the correlation between price and table (geom_point) of price by color (7 levels) with ggplot (use diamond table)
# Store the plot in an object called plot_scatter
# Add a regression line by cut (use geom_smooth)
# Add a title, subtitle and put titles of axes in uppercase and change title of the legend
# Use black and white theme (theme_bw)

# cols <- c("darkred","red","orange","green","darkgreen")




# Transform this plot into a plotly object named plotly_scatter
# Hint : use ggplotly function




# Save this plot into a HTML file
# Hint : use saveWidget function contained in htmlwidgets package



























