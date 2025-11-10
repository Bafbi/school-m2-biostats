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



































# Answers -------------------------------------------------------------

# Load sentences -------------------------------------------------------------

sentences <- stringr::sentences # list of 720 famous English sentences 
words <- stringr::words # list of 980 English words 

# Print the 75th word in the list ordered in descending mode

sort(words,decreasing = T)[75]

# Print the word which begin with the letters "ro"

words[str_sub(words,start = 1,2) == "ro"]
words[str_detect(words,pattern = "^(ro)")]

# Print the word which end with the letters "ll"

words[str_sub(words,start = nchar(words)-1,nchar(words)) == "ll"]
words[str_detect(words,pattern = "(ll)$")]

# Extract from each word the 4 first characters and store it in a list called first_4_characters

first_4_characters <- str_sub(words,start = 1,end = 4)

# Print the words which contain the pattern "try"

words[str_detect(words,pattern = "try")]

# Store in uppercase in a new list called upper the sentences which ends with the word "man"

upper <- str_to_upper(words[str_detect(words,pattern = "man$")])

# Locate the first position the word "the" in the sentences and store in a dataset called the_sentences the sentence, the start and end positions only for the sentences 
# which contain the "the" word (Hint : use data.frame function)

the_sentences = sentences[str_detect(string = sentences,pattern = "the")]

the_sentences=data.frame(sentences=the_sentences,
                         start=str_locate(string = the_sentences,pattern = "the")[,1],
                         end=str_locate(string = the_sentences,pattern = "the")[,2])


