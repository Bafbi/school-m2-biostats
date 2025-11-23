# Course Syllabus: Biostatistics #3 – Statistical Modeling #2
**Institution:** Junia ISEN
**Date:** September 2025

## Course Overview
This course advances beyond basic linear regression and t-tests to explore complex statistical modeling techniques. It focuses on three main pillars:
1.  **Advanced Group Comparisons:** Extending analysis to multiple groups, multiple dependent variables, and covariates (ANOVA family).
2.  **Non-Linear Modeling:** Handling data where relationships cannot be defined by a straight line using Quadratic, Polynomial, Logarithmic, and Exponential models.
3.  **Generalized Linear Models (GLM):** Moving beyond Ordinary Least Squares (OLS) to Maximum Likelihood Estimation (MLE) for count data (Poisson) and binary outcomes (Logistic Regression).

---

## Module 1: Analysis of Variance and Covariance (The ANOVA Family)

This module covers techniques used to compare means across more than two groups, handling complex experimental designs.

### 1.1 One-Way ANOVA
*   **Goal:** Compare the means of a single continuous variable across more than two independent groups.
*   **Hypotheses:**
    *   $H_0$: All group means are equivalent.
    *   $H_1$: At least two means are different.
*   **Workflow:** If the global p-value is significant, **Post-hoc pairwise tests** (e.g., Tukey’s HSD) are required to identify exactly which groups differ.
*   **R Functions:** `aov()`, `tukey_hsd()` (package: `rstatix`).

### 1.2 Two-Way ANOVA
*   **Goal:** Assess the impact of **two** categorical factors on a continuous outcome.
*   **Key Concept - Interaction:** Beyond main effects (Does Factor A matter? Does Factor B matter?), this tests if the effect of Factor A changes depending on the level of Factor B ($H_{AB0}$ vs $H_{AB1}$).

### 1.3 MANOVA (Multivariate ANOVA)
*   **Goal:** Assess the impact of categorical factors on **two or more continuous dependent variables** simultaneously (e.g., analyzing Test Score AND Annual Income based on Education Level).
*   **Assumptions:**
    *   Normality within groups (Test: `mshapiro.test`).
    *   Homogeneity of variances.
    *   **No Multicollinearity:** Dependent variables should not be perfectly correlated (Test: `cor_test`).
*   **R Function:** `manova()`.

### 1.4 ANCOVA & MANCOVA (Adding Covariates)
*   **ANCOVA:** Similar to ANOVA but controls for a **covariate** (a continuous variable that might influence the outcome, e.g., "Hours Spent Studying" when analyzing Test Scores by Education Level).
*   **MANCOVA:** Extension of ANCOVA for multiple dependent variables.
*   **Specific Assumptions:**
    *   Independence between the covariate and the factor.
    *   Homogeneity of regression slopes (the relationship between covariate and outcome is consistent across groups).

---

## Module 2: Non-Linear Models

When the Central Limit Theorem (CLT) applies, linear models are robust. However, when relationships are curvilinear, transformation or non-linear modeling is required.

### 2.1 The Quadratic Model
*   **Shape:** Parabolic (U-shape or inverted U).
*   **Equation:** $Y = aX^2 + bX + c + \epsilon$
*   **R Implementation:** `lm(Y ~ I(X^2) + X)` or `lm(Y ~ poly(X, 2))`.

### 2.2 The Polynomial Model
*   **Shape:** Complex curves with multiple inflection points.
*   **Equation:** $Y = a_1X^K + a_2X^{K-1} ... + b + \epsilon$
*   **Model Selection:** Use `anova(model1, model2)` to determine if adding complexity (higher degrees) significantly improves the model.

### 2.3 Logarithmic & Exponential Models
*   **Logarithmic:** Used when the rate of change decreases over time/scale.
    *   Equation: $Y = a \times \log(X) + X + b + \epsilon$
    *   R Code: `lm(Y ~ log(X))`
*   **Exponential:** Used when the rate of change increases rapidly (growth curves).
    *   Equation: $Y = a \times \exp(X) + X + b + \epsilon$
    *   R Code: `lm(Y ~ exp(X))`

**Note:** All models in this module use the **Least Squares Algorithm** to minimize the sum of squared residuals ($\epsilon^2$).

---

## Module 3: Generalized Linear Models (GLM)

When data is not normally distributed (e.g., counts or binary outcomes), we switch from Least Squares to **Maximum Likelihood Estimation (MLE)**.

### 3.1 Model Comparison Metrics
Since $R^2$ is not applicable in GLM the same way it is in linear regression, we use:
*   **AIC (Akaike Information Criterion):** Balances goodness of fit vs. complexity.
*   **BIC (Bayesian Information Criterion):** Penalizes complex models more heavily than AIC (useful when $N > 8$).
*   **Rule:** For both AIC and BIC, the **lower value indicates the best model**.

### 3.2 Poisson Model (Count Data)
*   **Use Case:** Modeling counts (e.g., number of events).
*   **Distribution:** Poisson distribution where $\lambda$ (mean) = variance.
*   **Issue - Overdispersion:** If Variance > Mean (Residual deviance / degrees of freedom > 1), the Poisson assumption is violated.
*   **Solutions:**
    *   **Quasi-Poisson:** Adjusts standard errors.
    *   **Negative Binomial:** Uses `glm.nb` (package `MASS`) to handle overdispersion explicitly.

### 3.3 Logistic Regression (Binary Data)
*   **Use Case:** Predicting a binary outcome (e.g., Sick vs. Healthy, Success vs. Fail).
*   **Link Function:** Logit.
*   **Output Interpretation:**
    *   **Odds Ratio (OR):**
        *   $OR = 1$: No difference between groups.
        *   $OR > 1$: Event is *more* frequent in the group.
        *   $OR < 1$: Event is *less* frequent in the group.
*   **Model Quality Assessment:**
    *   **Confusion Matrix:** Compares Predicted vs. Actual classes (TP, FP, TN, FN).
    *   **Metrics:** Sensitivity (TPR), Specificity (TNR), Accuracy.
    *   **ROC Curve:** Plots TPR against FPR.
    *   **AUC (Area Under Curve):** 0.5 is random guessing; 1.0 is perfect classification.

---

## Technical Laboratory Guide (R Packages)

Students will utilize the following R ecosystem for analysis:

| Analysis Type | Key Functions | Packages |
| :--- | :--- | :--- |
| **ANOVA/ANCOVA** | `aov`, `anova_test`, `tukey_hsd` | `stats`, `rstatix` |
| **Assumptions** | `mshapiro.test`, `cor_test` | `mvnormtest`, `rstatix` |
| **Linear/Non-Linear** | `lm`, `poly`, `I()` | `stats` |
| **GLM (General)** | `glm`, `predict` | `stats` |
| **GLM (Overdispersion)**| `glm` (family=`quasipoisson`), `glm.nb` | `stats`, `MASS` |
| **Logistic Reg.** | `roc`, `plot.roc`, `confusionMatrix` | `pROC`, `caret`, `plotROC` |

## Course Schedule
*   **Introduction:** Data workflow and refresher.
*   **Part 1:** ANOVA, MANOVA, ANCOVA (Theory + 20 min Lab).
*   **Part 2:** Non-Linear Models (Theory + 30 min Lab).
*   **Part 3:** GLM & Logistic Regression (Theory + 20 min Lab).
*   **Conclusion:** Q&A.