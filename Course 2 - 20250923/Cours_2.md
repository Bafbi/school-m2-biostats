## 01. Introduction (Page 3)

### Statistical Modeling vs. Machine Learning (Page 4)

| Feature | Statistics (Statistical Modeling) | ML (Machine Learning) |
| :--- | :--- | :--- |
| **Assumptions** | High certainty that most assumptions will be satisfied, prior to constructing your model. | There are several or even countless ways to train your algorithm. |
| **Data Size** | Small-to-mid sized data sets. | You have a large data set. |
| **Prediction** | Expectations that there will be some uncertainty in predictions. | You're looking to make a prediction that is not based on other independent variables or their relationships with each other. |
| **Interpretability** | High interpretability. | There are low interpretability options. |
| **Model Structure** | A need for a simple structure/model. | |

### What is a Statistical Model? (Page 5)

A statistical model is a more or less complex equation that aims to link a variable (called the "dependent variable") with explanatory variables (also called "factors").

**Example with the classical linear model:**
$$Y = a \times X + b + \varepsilon$$
*   **$Y$**: variable to explain (continuous)
*   **$X$**: explanatory variable (continuous)
*   **$a$**: coefficient of explanatory variable $X$ (slope of the regression)
*   **$b$**: intercept (value of $Y$ when $X = 0$)
*   **$\varepsilon$**: model residuals (proportion of the variability of $Y$ not explained)

### Goals and Quality Assessment (Page 6)

**Two possible goals for statistical modeling:**
1.  **Explain and quantify the relationship** (linear or not) between a variable to explain $Y$ (often continuous) and explanatory variables $X$ (**inference**).
2.  **Predict a value $\hat{Y}$** from explanatory variables $X$ (**prediction**).

**Important Note:** The best explanatory model is not always the best predictive model!

**Metrics for model quality assessment:** $R^2$, $Q^2$ (also called predictive $R^2$), AIC, BIC, etc.

### Exhaustive Listing of Statistical Models (Page 7)

**1. Modeling of a continuous variable:**
*   Linear model (univariate or multivariate)
*   ANOVA (ANalysis Of VAriance), MANOVA, ANCOVA, MANCOVA
*   Non-linear model (quadratic, cubic, exponential, logarithmic...)
*   Mixed models
*   Factorial analysis: PCA

**2. Modeling of a categorical variable:**
*   Two modalities (Yes vs No): binary logistic regression
*   More than two modalities: ordinal or nominal logistic regression
*   Factorial analysis: CFA, MCA

---

## 02. Density Distributions (Page 8)

### Introduction (Page 9)

*   Hundreds of different distributions are available.
*   The most useful one is the **gaussian distribution** (also called **normal law**).
*   **Two metrics** which summarize the shape of a distribution:
    *   **Skewness** (asymmetry of distribution)
    *   **Kurtosis** (tailedness of distribution)
*   A **Normal distribution** has a **skewness of 0**.

### R Functions for Skewness and Kurtosis (Page 10)

*   **Skewness** of a distribution: `skewness` function (package **parameters**)
    *   Parameters: `x` (list of continuous or categorical values), `na.rm` (boolean: remove NA values?)
*   **Kurtosis** of a distribution: `kurtosis` function (package **parameters**)
    *   Parameters: `x` (list of continuous or categorical values), `na.rm` (boolean: remove NA values?)

### Impact of Distribution on Central Tendency (Page 11)

*   **Normal Distribution (b):** Mean, Median, and Mode are all equal and at the center.
*   **Negatively (or) Left-Skewed Distribution (a):** The long tail is on the left. Mode > Median > Mean.
*   **Positively (or) Right-Skewed Distribution (c):** The long tail is on the right. Mean > Median > Mode.

### R Functions for Density Distribution Simulations (Pages 12-13)

Generation of random variables is easy with **R**:

| Distribution | R Function (Package) | Parameters |
| :--- | :--- | :--- |
| **Uniform distribution** | `runif` (**stats**) | `n` (number of random values), `min` (minimum threshold), `max` (maximum threshold) |
| **Normal distribution** | `rnorm` (**stats**) | `n` (number of random values), `mean` (mean of values), `sd` (standard-deviation of values) |
| **Poisson distribution** | `rpois` (**stats**) | `n` (number of random values), `lambda` (shape of the distribution) |
| **Binomial distribution** | `rbinom` (**base**) | `n` (number of random values), `size` (number of trials), `prob` (probability of success) |

A live demo and practical session (20 minutes) follow this section (Pages 14-15).

---

## 03. Statistical Tests (Page 16)

### Definition of Statistical Tests (Page 17)

*   A **Statistical inferential procedure** allows for testing **hypotheses**.
*   **Two tested hypotheses:**
    *   $H_0$ (null hypothesis)
    *   $H_1$ (alternative hypothesis)
*   **Result: p-value**, the probability of being wrong when rejecting the null hypothesis.
*   **Two levels of risk:** $\alpha$ (alpha) and $\beta$ (beta).
*   $H_0$ is **rejected** when **pvalue < $\alpha$** (e.g., 0.05 or 5%).
*   **Two-sided test** (difference) vs. **one-sided** (inferiority or superiority).

### Statistical Power (Page 18)

*   **Statistical power** $= 1 - \beta$ (beta risk).
*   Represents the **ability of a test to detect a significant effect size**.
*   Strongly correlated with the **number of observations** and **effect size**.
    *   *Note: As the sample size increases in the model, so does power.*

### Families of Tests (Page 19)

**Two families of tests:**
1.  **Parametric tests:** Require checking assumptions on data (normality of distribution at least).
2.  **Non-parametric tests:** Alternative tests when parametric tests are not valid.

**Two dimensions of tests:**
1.  **Univariate tests:** Allow testing hypotheses at the overall level (no groups).
2.  **Multivariate tests:** Allow testing hypotheses at group level (2 or more).

### Exhaustive List of Tests (Page 20)

| Data Type | Test Goal | Example Tests |
| :--- | :--- | :--- |
| **Quantitative** | Test the distribution of a variable (normality, etc.) | Kolmogorov-Smirnov, Shapiro-Wilks... |
| **Quantitative** | Compare the level of a variable to a reference level. | T-test, Wilcoxon test (for non-normal)... |
| **Quantitative** | Highlight outliers. | Test de Grubbs |
| **Quantitative** | Compare the level of a variable between two or more groups (mean, median...). | T-test, univariate ANOVA, Wilcoxon test, Kruskal-Wallis test... |
| **Quantitative** | Test the strength of the relationship between two variables. | Correlations (Pearson, Spearman) |
| **Quantitative** | Compare the variability of a variable between groups. | Variance tests (Fisher, Bartlett) |
| **Qualitative** | Compare occurrence of factors (counts and percentages) between groups. | Chi² test |

### How to Choose the Relevant Test (Page 21)

A flow chart is provided (Page 21) for choosing the correct test based on:
1.  **Data type:** Qualitative or Quantitative.
2.  **Question:** Probability law, Relationship between two variables, or Difference between groups.
3.  **Assumptions:** Normality (Shapiro-Wilks test) and Homoscedasticity/Variance (Fisher or Bartlett test).
4.  **Data structure:** Paired or Independent series.

---

## Univariate Tests (Pages 22-27)

### Normality Test (Page 23)

*   **Goal:** Test if the distribution of a quantitative variable's values is **gaussian** (or normal).
*   **Hypotheses:**
    *   $H_0$: the values follow the normal law.
    *   $H_1$: the values do not follow the normal law.
*   **In R:** `shapiro.test(data)` (package **stats**).
    *   If **pvalue $\ge 0.05$** $\implies$ data is normally distributed.
*   **Plot for normality:** `ggqqplot(data)` (package **ggpubr**).
    *   If all points are approximately aligned on the diagonal $\implies$ data is normality distributed.

### Test Mean to a Reference (Page 24)

*   **Goal:** Test if a variable has the same **mean** compared to a **reference value** (for a normally distributed variable).
*   **Hypotheses:**
    *   $H_0$: the variable has the same mean.
    *   $H_1$: the variable has a different mean.
*   **In R:** `t.test(data, mu = reference level)` (package **stats**).
    *   If **pvalue $< 0.05$** $\implies$ mean is significantly different from the reference level.
*   **Outputs:** test statistic, degrees of freedom, pvalue, 95% confidence interval (CI) of the mean.

### Test Median to a Reference (Page 25)

*   **Goal:** Test if a variable has the same **median** compared to a **reference value** (for a **not-normally distributed** variable).
*   **In R:** `wilcox.test(data, mu = reference level)` (package **stats**).
    *   If **pvalue $< 0.05$** $\implies$ median is significantly different from the reference level.
*   **Outputs:** test statistic, pvalue.

### Test Proportion to a Reference (Page 26)

*   **Goal:** Test if the **proportion** of a modality of a binary variable is equal to a target percentage.
*   **In R (two options):**
    *   Small sample ($n < 30$): `binom.test(x = number of success, n = number of trials, p = target proportion)` (package **stats**)
    *   Large sample ($n \ge 30$): `prop.test(same parameters)` (package **stats**)
*   **Outputs:** test statistic, proportion, pvalue, 95% CI of the proportion.

### Outlier Detection (Grubbs Test) (Page 27)

*   **Goal:** Test if some **outliers** exist in a variable.
*   **Hypotheses:**
    *   $H_0$: the highest (or lowest) value is **not** an outlier.
    *   $H_1$: the highest (or lowest) value **is** an outlier.
*   **In R:** `grubbs.test(data, type, opposite)` (package **outliers**).
    *   If **pvalue $< 0.05$** $\implies$ an outlier is detected.
*   **Outputs:** test statistic, pvalue.

A live demo and practical session (15 minutes) follow this section (Pages 28-29).

---

## Multivariate Tests (Pages 30-40)

### Correlation (Page 31-32)

*   **Goal:** Test if the **coefficient of correlation** between two variables is significantly different from 0.
*   **Hypotheses:**
    *   $H_0$: the coefficient is 0.
    *   $H_1$: the coefficient is different from 0.
*   **Warning:** A coefficient of correlation with a significant pvalue is not necessarily strong. **Correlation > 0.75 in absolute is considered strong.**
*   **In R:** `cor.test(x, y, method)` (package **stats**).
    *   **Method to use:** `pearson` (normality of distributions) vs. `spearman`.

### Comparison of Variances (Homoscedasticity) (Page 33)

*   **Goal:** Compare the **variance** of a variable between **independent groups** (**homoscedasticity**).
*   **Hypotheses:**
    *   $H_0$: the variances of each group are equivalent.
    *   $H_1$: at least one group has a different variance.
*   **In R (two options):**
    *   If two groups: `var.test(x, y, ratio)` (package **stats**).
    *   If more than two groups: `bartlett.test(values ~ group)` (package **stats**).
*   **Outputs:** test statistic, pvalue.

### Comparison of Means (T-Test) (Page 34-35)

*   **Goal (Independent Groups):** Compare **means** between two **independent groups** (normally distributed variable and homoscedasticity).
    *   **In R:** `t.test(x, y, mu)` (package **stats**).
*   **Goal (Paired Groups):** Compare **means** between two **paired groups** (normally distributed variable and homoscedasticity).
    *   **Only applicable on paired data** ("before / after").
    *   **In R:** `t.test(x, y, mu, paired=T)` (package **stats**).
*   **Hypotheses:**
    *   $H_0$: the two means are equivalent.
    *   $H_1$: the two means are different.
*   **Outputs:** test statistic, difference of means, pvalue, 95% CI of the difference.

### Comparison of Means (ANOVA) (Page 36)

*   **Goal:** Compare the **means** of a variable between **more than 2 independent groups** (normally distributed variable and equivalent variances).
*   **Hypotheses:**
    *   $H_0$: the means are equivalent.
    *   $H_1$: at least two means are different.
*   **Post-hoc tests:** Need to perform post-hoc pairwise tests in case of overall significant pvalue, typically with **Tukey's tests**.
*   **In R:** `anova_test(y ~ group)` and `tukey_hsd(y ~ group)` (package **rstatix**).
*   **Outputs:** ANOVA table and pairwise comparisons (for post-hoc tests).

### Comparison of Medians (Non-parametric T-Test) (Pages 37-39)

*   **Goal (Independent Groups):** Compare **medians** of a variable between two **independent groups** (**non-normally distributed** variable).
    *   **In R:** `wilcox.test(x, y, mu)` (package **stats**).
*   **Goal (Paired Groups):** Compare **medians** of a variable between two **paired groups** (**non-normally distributed** variable).
    *   **In R:** `wilcox.test(x, y, mu, paired=T)` (package **stats**).
*   **Goal (More than two independent groups):** Compare **medians** between **more than two independent groups** (**non-normally distributed** variable).
    *   **In R:** `kruskal.test(y ~ group)` and `pairwise.wilcox.test` for post-hoc comparisons (package **stats**).
*   **Hypotheses:**
    *   $H_0$: the two/all medians are equivalent.
    *   $H_1$: the two/at least one median is different.
*   **Outputs:** test statistic, pvalue (and matrix with adjusted pvalues for post-hoc in Kruskal-Wallis).

### Comparison of Proportions (Chi-Square) (Page 40)

*   **Goal:** Compare **percentages** of levels of a **qualitative variable** between **two or more independent groups**.
*   **Hypotheses:**
    *   $H_0$: proportions are equivalent.
    *   $H_1$: proportions are different.
*   **To illustrate:** stacked bar chart.
*   **In R:** `chisq.test(contingency table: 2-ways count table)` and `chisq.posthoc.test` for pairwise comparisons (on GitHub: `ebbertd/chisq.posthoc.test`).
*   **Outputs:** test statistic, pvalue.

A live demo and practical session (10 minutes) follow this section (Pages 41-42).

---

## 04. Univariate Linear Models (Page 43)

### Highlights (Page 44)

*   **Goal:** Explain a continuous variable $Y$ with a continuous variable $X$.
*   **Hypothesis to test:** The relationship between the two variables is **linear**.
*   **Equation:** $Y = a \times X + b + \varepsilon$ (as defined in Section 01).

### Least Squares (Page 45)

*   **Adjustment method:** **Least square algorithm** plays on parameters $a$ and $b$ to minimize the sum of squares ($\sum \varepsilon^2$) between real values $Y$ and the regression line (estimated values $\hat{Y}$).

### Residuals (Page 46)

*   **Residuals ($\varepsilon$)** embody the **proportion of the variability of $Y$ not explained by $X$**.
*   The more important the residuals are, the less the model fits the data.
*   **Normality of residuals** is a strong fact to check.
*   **Non-normally distributed residuals** can mean:
    *   Significance of estimates can be wrong (calculation assumes normality).
    *   Check data quality or use multivariate linear models or non-linear models.

### Coefficient of Determination ($R^2$) (Pages 47-48)

*   **Quality model metric:** $R^2$.
    $$\text{R}^2 = 1 - \frac{\sum_{i=1}^n (y_i - \hat{y}_i)^2}{\sum_{i=1}^n (y_i - \bar{y})^2}$$
    *   $y_i$: real value for observation $i$
    *   $\hat{y}_i$: predicted value by the model for observation $i$
    *   $\bar{y}$: mean of real values
*   $R^2$ is the **square of the linear coefficient of correlation**.
*   It allows determining the **proportion of variability of $Y$ explained by the model (in %)**.
*   **Warning:** A good $R^2$ does not mean the model has a good **predictive accuracy**!

### Other Quality Metrics (Page 49)

| Metric | Abbreviation | Formula | R Function (Package **caret**) |
| :--- | :--- | :--- | :--- |
| Mean absolute error | MAE | $\text{MAE} = \frac{1}{N} \sum_{i=1}^N |y_i - \hat{y}_i|$ | `MAE` |
| Mean square error | MSE | $\text{MSE} = \frac{1}{N} \sum_{i=1}^N (y_i - \hat{y}_i)^2$ | `MSE` |
| Root Mean square error | RMSE | $\text{RMSE} = \sqrt{\text{MSE}}$ | `RMSE` |

### Modeling with R (Pages 50-56)

The primary function for a linear model is **`lm`** (package **stats**).

**Parameters:**
*   `formula = Y ~ X`: $Y$ and $X$ must be continuous.
*   `data = dataset`: number of points $N$.
*   `subset`: train model only on a subset of the dataset.
*   `weight`: optional vector with the weights of points.
*   `na.action`: handling of NA values.

**Results (attributes of the `lm` object):**
*   `coefficients`: $a$ (slope) and $b$ (intercept).
*   `residuals`: vector of $N$ points with residuals of the model.
*   `fitted.values`: vector of $N$ points with values estimated ($\hat{Y}$).

**Other useful functions:**
*   **`summary` function:** Prints the model, descriptive statistics of residuals, coefficients of the model (estimates, standard-error, statistic, pvalue), and quality of model ($R^2$ and adjusted $R^2$).
*   **`anova` function (stats package):** Prints the analysis of variance table (sum of squares).
*   **`predict`:** Applies the equation on data.
*   **`plot`:** Displays the residual quality plots (6 plots) for checking assumptions:
    1.  **Residuals vs Fitted values**
    2.  **Residual Q-Q plot** (checks normality)
    3.  **Scale-Location**
    4.  **Cook's distance** (outliers detection)

**Assessing model quality with normality test:**
1.  Plot histogram of residuals (using `residuals` function or `model$residuals`).
2.  Plot Q-Q plot of residuals with `ggqqplot` function (package **ggpubr**).
3.  Launch a Shapiro-Wilks normality test `shapiro.test` (stats package).

A live demo and practical session (20 minutes) follow this section (Pages 57-58).

---

## 05. Multivariate Linear Models (Page 59)

### Highlights (Page 60)

*   **Goal:** Explain a continuous variable $Y$ with **many** continuous variables $X_i$.
*   **Hypothesis to test:** The relationship between $Y$ and the $X_i$ variables is **linear**.
*   **Equation:**
    $$Y = a_1 \times X_1 + a_2 \times X_2 + \dots + a_n \times X_n + a_{1,2} \times X_1X_2 + b + \varepsilon$$
    *   $X_i$: explanatory variables (continuous)
    *   $a_i$: coefficient of explanatory variable $X_i$ (**Main effects**)
    *   $a_{1,2}$: coefficient of **interaction** between $X_1$ and $X_2$ (**Interactions**)
    *   $b$: intercept (value of $Y$ when all $X_i = 0$)
    *   $\varepsilon$: model residuals

### Model Quality (Page 61)

*   **Adjustment method:** Least Squares method.
*   **Quality Model metric:** $R^2$.
*   **Several $R^2$ in R:**
    *   **Classical $R^2$.**
    *   **Adjusted $R^2$:** Allows comparison of $R^2$ for different models with different numbers of parameters.
    *   **Predictive $R^2$ (also called $Q^2$):** Ability of the model to predict new values (calculated with PRESS function with cross-validation).
*   **Warning:** The more parameters added, the more $R^2$ increases, leading to an **overfitting issue**.

### Variable Selection (Page 62)

**Several methods of explanatory variables selection:**
1.  **Backward method:** Iteratively remove the least significant variable (based on p-value) starting from the complete model.
2.  **Forward method:** Iteratively add the most significant variable (based on p-value) starting from the null model (containing only the mean of $Y$).
3.  **Stepwise method:** Mix of the two other methods.

The algorithm stops when it cannot find another variable to include (based on a p-value threshold, e.g., 15% or 0.15 by default).
*   **In R:** `stepAIC` function included in package **MASS**.

### Multicolinearity (Page 68)

*   **Statistical issue** where two (or more) explanatory variables are **strongly correlated**.
*   **Consequences:** Can cause instability of parameters, non-convergence of variable selection algorithms, and strongly impact the significance of factors (p-values). It does *not* impact the predictive ability of the model.
*   **Detection:** The **VIF index (Variance Influence Factor)** highlights highly correlated variables.
    *   **In R:** `vif` function in the **car** package.
*   **Action:** **Remove a variable when the VIF is $> 5$**.

### Overfitting Issue (Pages 65-67)

*   **Overfitting** occurs when a model is excessively complex and fits the training data too closely, including noise or random fluctuations, which harms its ability to generalize to new, unseen data.
*   **Cross-validation** is a statistical procedure used to reduce the overfitting issue and develop predictive models.
    *   **Idea:** A model is trained on a representative subset of data and tested on the remaining (not seen) data several times.
    *   **Predictive $R^2$ ($Q^2$)** is calculated with cross-validation, where the model is built on all data except one, and tested on that datapoint. This is done $N$ times (number of observations) and is called **LOOCV (Leave-One Out Cross Validation)**.
    *   **In R:** Many techniques available in package **caret**.

A live demo and practical session (30 minutes) follow this section (Pages 69-70).

---

## 06. Questions (Page 71)

*   *Time allocated for questions.*

---
**THANK YOU FOR YOUR ATTENTION** (Page 72)
*September 2025*