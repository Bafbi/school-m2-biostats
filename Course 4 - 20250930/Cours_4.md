# Course Title: Statistical Modeling & Multivariate Analysis
**Course Number:** Biostatistics #4 / Statistical Modeling #3
**Institution:** Junia ISEN
**Date:** September 2025

## Course Overview
This course provides an in-depth look at multivariate statistical techniques used to analyze complex datasets. It is divided into two main categories: **Dimension Reduction** (Unsupervised Learning for data simplification) and **Classification/Clustering** (Supervised and Unsupervised Learning for grouping data).

---

## Module 1: Principal Component Analysis (PCA)

### 1.1 Introduction and History
Principal Component Analysis (PCA) is a powerful statistical tool used for dimension reduction. It allows researchers to take a dataset with many variables and reduce it to fewer "principal components" while retaining as much information (variance) as possible.
*   **Origin:** Emerged with **Karl Pearson** in 1901.
*   **Alternate Name:** Hotelling’s transformation.
*   **Applications:** Biostatistics (genetics), R&D, Finance, Image compression, and Machine Learning.

### 1.2 Core Concepts
*   **Goal:** To uncorrelate multiple strongly linked variables and project them into a new multidimensional space.
*   **Input Data:** Works strictly with **continuous variables**. (Categorical factors can be used only for coloring/visualizing points).
*   **Scaling:** It is crucial to scale values before analysis; otherwise, variables with high variance or large absolute values will disproportionately influence the model.
*   **Linearity:** PCA assumes linear combinations of variables; it is not useful for non-linear relationships.

### 1.3 The Mathematics of PCA
*   **Eigenvalues:** Calculated from the covariance matrix. Each Principal Component (PC) has an associated eigenvalue representing the amount of variance it explains.
*   **Vector Geometry:** The first PC is the axis that spans the greatest variance in the data. The second PC is orthogonal (perpendicular) to the first and covers the second most variance.

### 1.4 Visualizing PCA Results
*   **Scree Plot:** A bar chart displaying the percentage of variability explained by each PC. It helps determine how many components to keep (e.g., if PC1 + PC2 explain 90% of the data, you may only need 2 dimensions).
*   **Variables Plot (Correlation Circle):**
    *   Arrows represent variables.
    *   Coordinates are proportional to their contribution to the PC.
    *   **Interpretation:** Variables pointing in the same direction are correlated. Opposite directions indicate negative correlation. Orthogonal arrows indicate no correlation.
*   **Individuals Plot:** Maps the data points (rows) onto the new factorial planes.
*   **Biplot:** Overlays both variables and individuals on the same graph to visualize relationships simultaneously.

### 1.5 Implementation in R
*   **Package:** `FactoMineR`
*   **Function:** `PCA(X, scale.unit=TRUE, graph=TRUE)`
*   **Visualization:** Use the `factoextra` package functions: `fviz_eig` (scree plot), `fviz_pca_var` (variables), and `fviz_pca_ind` (individuals).

---

## Module 2: Other Factor Analyses (FCA, MCA, FAMD)

While PCA handles continuous data, other methods are required for categorical or mixed data.

### 2.1 Factor Correspondence Analysis (FCA)
*   **Origin:** Jean-Paul Benzecri (1960).
*   **Goal:** Study the link/correlation between **two categorical variables**.
*   **Input Data:** Contingency tables (count data) or Burt tables.
*   **Metric:** Uses the **Chi-square ($Chi^2$) metric** to measure the "drift from independence" rather than variance.
*   **R Function:** `CA()` from `FactoMineR`.

### 2.2 Multiple Correspondence Analysis (MCA)
*   **Overview:** An extension of FCA used when there are **more than two** categorical variables.
*   **Input Data:** Complete disjunctive tables (binary 0/1 for each modality) or Burt tables.
*   **R Function:** `MCA()` from `FactoMineR`.

### 2.3 Factor Analysis of Mixed Data (FAMD)
*   **Origin:** Brigitte Escofier (1979), extended by Gilbert Saporta (1990).
*   **Goal:** Analyze datasets containing **both** continuous and categorical variables.
*   **Mechanism:** It calculates a link matrix using:
    *   Pearson correlation ($r$) for quantitative parameters.
    *   $\phi^2$ (based on $Chi^2$) for categorical parameters.
*   **R Function:** `FAMD()` from `FactoMineR`.

---

## Module 3: Classification & Clustering Fundamentals

### 3.1 Classification vs. Clustering
The distinction lies in whether the data is labeled (the answer is known) or unlabeled.

| Feature | Classification | Clustering |
| :--- | :--- | :--- |
| **Learning Type** | Supervised | Unsupervised |
| **Input Data** | Labeled | Unlabeled |
| **Output** | Known classes | Unknown groups |
| **Goal** | Predict the class of new data | Find natural structures/groups |
| **Examples** | SVM, Decision Trees, LDA | K-Means, Hierarchical Clustering |

### 3.2 Evaluation Metrics (Confusion Matrix)
For classification models, performance is measured using a confusion matrix (Predicted vs. Actual).
*   **Sensitivity (True Positive Rate):** $TP / (TP + FN)$
*   **Specificity (True Negative Rate):** $TN / (TN + FP)$
*   **Positive Predicted Value:** $TP / (TP + FP)$
*   **Negative Predicted Value:** $TN / (TN + FN)$

---

## Module 4: Supervised Learning Methods

### 4.1 Linear Discriminant Analysis (LDA)
*   **Origin:** Ronald Fisher (1936).
*   **Goal:** Find the best linear combination of continuous variables that creates the most distinct boundaries between known groups.
*   **Assumptions:**
    1.  Predictors are normally distributed.
    2.  Homoscedasticity (equal variances across groups).
*   **R Function:** `lda()` from the `MASS` package.
*   **Visualization:** `partimat()` from `klaR` package creates 2D partition plots.

### 4.2 Decision Trees (CART)
*   **Origin:** Breiman and Stone (1972).
*   **Goal:** Create a flowchart-like structure to classify individuals or predict outcomes by finding optimal cut-off thresholds in variables.
*   **Pros:** Easy to interpret/visualize; no need to normalize data.
*   **Cons:** Prone to **Overfitting** (making the tree too complex/deep).
*   **Solution - Pruning:** Cutting back the deepest branches of the tree to:
    *   Prevent overfitting.
    *   Improve generalization to new data.
    *   Reduce model complexity.
*   **R Implementation:**
    *   `rpart()` for building the model.
    *   `plotcp()` to find the optimal complexity parameter (CP) for pruning.
    *   `rpart.plot()` for visualizing the tree.

---

## Module 5: Unsupervised Learning Methods

### 5.1 K-Means Clustering
*   **Origin:** Hugo Steinhaus (1957).
*   **Goal:** Partition a dataset into **K** distinct, non-overlapping subgroups (clusters).
*   **Algorithm:**
    1.  Define $K$ (number of clusters).
    2.  Initialize centroids.
    3.  Assign individuals to the nearest centroid (minimizing squared distance).
    4.  Recalculate centroids based on new assignments.
    5.  Repeat until convergence.
*   **Choosing K:** Use the **Elbow Method** (visualized via `fviz_nbclust`) to find the inflection point where adding more clusters creates diminishing returns in explaining variance (Total Within Sum of Squares).
*   **R Implementation:**
    *   `kmeans()` from `stats` package.
    *   `fviz_cluster()` from `factoextra` for visualization.

---

## Practical Lab Guide (R Summary)

### **FactoMineR & Factoextra (Dimension Reduction)**
```r
# PCA
res.pca <- PCA(data, scale.unit = TRUE, graph = FALSE)
fviz_eig(res.pca)             # Scree plot
fviz_pca_var(res.pca)         # Variable plot
fviz_pca_ind(res.pca)         # Individual plot

# FCA (Correspondence Analysis)
res.ca <- CA(contingency_table)

# MCA (Multiple Correspondence Analysis)
res.mca <- MCA(categorical_dataset)

# FAMD (Mixed Data)
res.famd <- FAMD(mixed_dataset)
```

### **Classification & Clustering**
```r
# LDA (Linear Discriminant Analysis)
library(MASS)
model <- lda(Class ~ ., data = training_data)

# K-Means
library(factoextra)
fviz_nbclust(data, kmeans, method = "wss") # Find optimal K
final <- kmeans(data, centers = 4, nstart = 25)
fviz_cluster(final, data = data)

# Decision Trees
library(rpart)
library(rpart.plot)
tree <- rpart(Outcome ~ ., data = data, method = "class")
rpart.plot(tree)
plotcp(tree) # Check for pruning
```