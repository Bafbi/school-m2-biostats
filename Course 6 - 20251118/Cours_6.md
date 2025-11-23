# Course Overview: Advanced Biostatistics (Course #6)
**Date:** November 2025
**Institution:** Junia ISEN
**Software Focus:** R Language

## Course Objectives
This course covers advanced statistical methods used in clinical research. By the end of this module, students will understand how to calculate sample sizes, synthesize data through meta-analysis, manage clinical trial data, and analyze complex datasets using longitudinal and survival analysis techniques.

---

# Module 1: Sample Size Calculation

## 1.1 Historical Context & Theory
*   **Key Figure:** Jacob Cohen (1923–1998), an American statistician who pioneered statistical power analysis and effect size measures (Cohen’s Kappa, d, and h).
*   **Statistical Power:** Defined as $1 - \beta$ (Beta risk). It represents the ability of a test to detect a significant effect size. Power is strongly linked to:
    *   Sample size (N)
    *   Effect size (magnitude of the difference)
    *   Significance level ($\alpha$)
*   **The Logic:** As sample size increases, statistical power increases.

## 1.2 Application in R (Package: `pwr`)
The `pwr` package functions generally work by providing all parameters except one, which the function then calculates.

*   **Two Proportions:**
    *   `pwr.2p.test`: Equal N in groups.
    *   `pwr.2p2n.test`: Unequal N.
    *   *Effect Size (h):* Calculated using arcsin transformation of proportions.
*   **Correlations:** `pwr.r.test`.
*   **Chi-Square:** `pwr.chisq.test` (Effect size `w`).
*   **ANOVA:** `pwr.anova.test` (Effect size `f`).
*   **T-Tests:**
    *   `pwr.t.test`: One sample, two samples, or paired.
    *   `pwr.t2n.test`: Two samples with unequal N.
    *   *Effect Size (d):* Difference in means divided by pooled standard deviation.
*   **Helper Functions:**
    *   `cohen.ES`: Provides conventional effect sizes (Small, Medium, Large).
    *   `plot`: Visualizes the evolution of power vs. sample size.

---

# Module 2: Meta-Analysis

## 2.1 Overview
*   **Definition:** A statistical method to synthesize quantitative data from multiple independent studies addressing a common research question.
*   **Goal:** Increase statistical power and derive an overall result.
*   **Key Figure:** Gene Glass (1978), who coined the term "Analysis of analyses."
*   **Vs. Systematic Literature Review (SLR):** SLR is qualitative and subjective; Meta-Analysis is quantitative and empirical.

## 2.2 The Workflow
1.  **Research Question:** Define PICO/SPIDER.
2.  **Preliminary Search:** Validate the idea.
3.  **Search Strategy:** Define inclusion/exclusion criteria.
4.  **Database Search:** PubMed, Cochrane, Embase, etc.
5.  **Screening:** Title/Abstract screening $\rightarrow$ Full-text screening.
6.  **Data Extraction:** Double data checking.
7.  **Analysis:** Statistical synthesis and heterogeneity assessment.

## 2.3 Biases in Meta-Analysis
*   **Publication Bias:** Positive results are more likely to be published.
*   **Selection Bias:** Sampling or attrition issues.
*   **Information Bias:** Inaccurate variable measurement.
*   **Others:** Interviewer bias, Response bias, Confirmation bias.

## 2.4 Effect Sizes & Formulas
*   **Arithmetic Mean:** Central tendency.
*   **Proportion:** Prevalence measures.
*   **Correlations:** Co-variation between variables.
*   **Mean Differences:**
    *   *Raw:* $MD = \bar{x}_1 - \bar{x}_2$
    *   *Standardized (Cohen's d):* Difference standardized by pooled standard deviation.
*   **Risk Ratio (RR):** Ratio of two risks (binary outcomes).
*   **Odds Ratio (OR):** Ratio of odds (focuses on ratio rather than probability).

## 2.5 Heterogeneity & Visualization
*   **Forest Plot:** The primary visualization tool showing individual study effect sizes, weights, and the pooled result.
*   **I² Statistic:** Measures heterogeneity (inconsistency across study results).
    *   0-30%: Low
    *   30-50%: Moderate
    *   50-75%: Substantial
    *   75-100%: Considerable
*   **Diagnostic Plots:**
    *   *Funnel Plot:* Checks for publication bias (asymmetry indicates bias).
    *   *Baujat Plot:* Identifies studies contributing most to heterogeneity and influence.
*   **Models:**
    *   *Fixed Effects:* Assumes a common true effect size.
    *   *Random Effects:* Assumes a distribution of true effect sizes (accounts for heterogeneity).
*   **Meta-Regression:** Uses covariates (moderators) to explain heterogeneity (visualized via Bubble Plots).

## 2.6 Application in R (Package: `meta`)
*   **Functions:** `metacont` (continuous), `metabin` (binary), `metacor` (correlation), `metaprop` (proportions).
*   **Key Arguments:** Sample sizes (`n.e`, `n.c`), means (`mean.e`, `mean.c`), standard deviations (`sd.e`, `sd.c`), and study labels.

---

# Module 3: Clinical Trial Data

## 3.1 Clinical Data Management (CDM)
*   **Definition:** The process of collecting, cleaning, and managing study data.
*   **Pillars of Data Quality:**
    1.  **Accuracy:** Error-free, true to life.
    2.  **Completeness:** No missing required data.
    3.  **Consistency:** Uniform formatting.
*   **Process:** Protocol Design $\rightarrow$ CRF Design $\rightarrow$ Database Design $\rightarrow$ Data Capture $\rightarrow$ Validation $\rightarrow$ Database Lock $\rightarrow$ Archiving.

## 3.2 Key Documents & Standards
*   **Data Management Plan (DMP):** A comprehensive document outlining data formats, storage, security, archiving, and personnel responsibilities.
*   **Case Report Form (CRF/eCRF):** The tool used to collect data (Demographics, Vitals, Labs, Adverse Events). Must avoid redundancy.
*   **CDISC (Clinical Data Interchange Standards Consortium):**
    *   International organization for data standards.
    *   **SDTM (Study Data Tabulation Model):** Mandatory for FDA submission since 2016; harmonizes data structure for reuse.

---

# Module 4: Longitudinal Data Analysis

## 4.1 Overview
*   **Definition:** Data collected from the same individual across multiple time points (e.g., biomarkers, electronic health records).
*   **Fixed vs. Random Effects:**
    *   *Fixed Effect:* Estimate separate levels; no assumed relationship between levels; results are easily interpretable.
    *   *Random Effect:* Levels are random variables from an underlying distribution; handles correlation within subjects; essential for longitudinal data.

## 4.2 Linear Mixed Models (LMM)
*   **Formula:** $Y = X\beta + Zu + \epsilon$
    *   Includes both fixed effects ($X\beta$) and random effects ($Zu$).
*   **Covariance Structures:** Introducing random effects requires defining how time points relate to each other.
    *   *Compound Symmetry:* Equal variance and covariance (default).
    *   *Autoregressive (AR1):* Correlations decay over time.
    *   *Toeplitz:* Banded structure.

## 4.3 Application in R (Package: `nlme`)
*   **Function:** `lme`
*   **Defining Random Effects:**
    *   `~ 1 | Patient_ID`: Random intercept (baseline differences).
    *   `~ Time | Patient_ID`: Random slope (different rates of change).
    *   `~ (1 + Time) | Patient_ID`: Random intercept and slope.
*   **Evaluation:** Use `getVarCov` for covariance matrix and the `performance` package (`r2` function) to calculate Conditional $R^2$ (overall model) and Marginal $R^2$ (fixed effects only).

---

# Module 5: Survival Analysis

## 5.1 Foundations
*   **Definition:** Analysis of the expected duration of time until an event occurs (e.g., death, relapse).
*   **History:** Origins in 17th-century life tables (John Graunt).
*   **Censored Data:** Crucial concept. Occurs when the event is not observed for a participant during the study period (e.g., lost to follow-up or study ends).

## 5.2 Kaplan-Meier Estimator
*   **Purpose:** Non-parametric statistic to estimate the survival function $S(t)$.
*   **Visualization:** Kaplan-Meier plot (step function decreasing over time).
*   **Testing:** **Log-rank test** is used to compare survival curves between groups (p-value).

## 5.3 Cox Proportional Hazards Model
*   **Inventor:** Sir David Cox (1972).
*   **Purpose:** Multivariate analysis to study the impact of continuous or categorical variables on survival.
*   **Metric:** **Hazard Ratio (HR)**.
    *   $HR = \exp(\beta)$
    *   Assumption: Hazards for any two individuals remain proportional over time.
    *   Visualized using Forest Plots.

## 5.4 Application in R (Packages: `survival`, `survminer`)
*   **Kaplan-Meier:** `survfit(Surv(time, outcome) ~ group)`.
*   **Plotting:** `ggsurvplot` for KM curves.
*   **Comparison:** `survdiff` for Log-rank test.
*   **Modeling:** `coxph` for Cox model.
*   **Diagnostics:** `cox.zph` to test the proportional hazards assumption.