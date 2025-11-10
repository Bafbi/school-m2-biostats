######################################################################################################################################
# Module STRINGR
# Goal : Use the functionalities of stringr package to transform strings
# Tip : 
######################################################################################################################################

# Install package -------------------------------------------------------------
install.packages("stringr")

# Load packages -------------------------------------------------------------
library("stringr")

# Exercises -------------------------------------------------------------

# Load sentences -------------------------------------------------------------

sentences <- stringr::sentences # list of 720 famous English sentences 
words <- stringr::words # list of 980 English words 

# Print the 75th word in the list ordered in descending mode




# Print the word which begin with the letters "ro"



# Print the word which end with the letters "ll"



# Extract from each word the 4 first characters and store it in a list called first_4_characters




# Print the words which contain the pattern "try"




# Store in uppercase in a new list called upper the sentences which ends with the word "man"




# Locate the first position the word "the" in the sentences and store in a dataset called the_sentences the sentence, the start and end positions only for the sentences 
# which contain the "the" word (Hint : use data.frame function)

























