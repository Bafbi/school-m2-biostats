import React from 'react';

const Section = ({ title, children, className = "" }: { title: string, children: React.ReactNode, className?: string }) => (
  <div className={`mb-4 border-b border-gray-300 pb-2 ${className}`}>
    <h3 className="font-bold text-blue-800 text-sm uppercase mb-1">{title}</h3>
    <div className="text-xs text-gray-800">{children}</div>
  </div>
);

const Code = ({ children }: { children: React.ReactNode }) => (
  <code className="bg-gray-100 px-1 py-0.5 rounded text-red-600 font-mono text-[10px]">{children}</code>
);

const Page = ({ children, pageNum }: { children: React.ReactNode, pageNum: number }) => (
  <div className="w-[210mm] h-[297mm] bg-white p-8 mx-auto mb-8 shadow-lg print:shadow-none print:mb-0 relative overflow-hidden text-xs leading-tight">
    <div className="columns-2 gap-6 h-full">
      {children}
    </div>
    <div className="absolute bottom-4 right-4 text-gray-400 text-[10px]">Page {pageNum}</div>
  </div>
);

export default function Cheatsheet() {
  return (
    <div className="bg-gray-100 min-h-screen py-8 print:bg-white print:py-0">
      
      {/* Page 1: Basics & Comparisons */}
      <Page pageNum={1}>
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-blue-900 mb-1">Biostatistics & R Cheatsheet</h1>
          <p className="text-[10px] text-gray-600">Exam Prep - Nov 2025</p>
        </div>

        <Section title="1. Hypothesis Testing Basics">
          <ul className="list-disc pl-3 space-y-1">
            <li><strong>H0 (Null):</strong> No effect/difference. <strong>H1 (Alt):</strong> Effect exists.</li>
            <li><strong>p-value &lt; 0.05:</strong> Reject H0 (Significant).</li>
            <li><strong>p-value &gt; 0.05:</strong> Fail to reject H0 (Not significant).</li>
            <li><strong>Type I Error ($\alpha$):</strong> False Positive. <strong>Type II ($\beta$):</strong> False Negative.</li>
            <li><strong>Power ($1-\beta$):</strong> Probability of detecting an effect if it exists.</li>
          </ul>
        </Section>

        <Section title="2. Assumptions & Normality">
          <p className="mb-1">Most parametric tests assume normality and homoscedasticity.</p>
          <ul className="list-disc pl-3 space-y-1">
            <li><strong>Normality:</strong> Shapiro-Wilk Test. <Code>shapiro.test(x)</Code>
              <br/>If p &gt; 0.05 $\rightarrow$ Normal.
            </li>
            <li><strong>Homogeneity of Variance:</strong> Levene's Test. <Code>car::leveneTest(y ~ group)</Code>
              <br/>If p &gt; 0.05 $\rightarrow$ Equal variances.
            </li>
            <li><strong>Visual Check:</strong> <Code>qqnorm(x); qqline(x)</Code></li>
          </ul>
        </Section>

        <Section title="3. Comparing Means (2 Groups)">
          <table className="w-full text-[10px] border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left">Condition</th>
                <th className="text-left">Test</th>
                <th className="text-left">R Function</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Parametric (Normal)</td>
                <td>Student's T-test</td>
                <td><Code>t.test(y ~ x)</Code></td>
              </tr>
              <tr>
                <td>Non-Parametric</td>
                <td>Wilcoxon / Mann-Whitney</td>
                <td><Code>wilcox.test(y ~ x)</Code></td>
              </tr>
              <tr>
                <td>Paired Data</td>
                <td>Paired T-test</td>
                <td><Code>t.test(..., paired=TRUE)</Code></td>
              </tr>
            </tbody>
          </table>
        </Section>

        <Section title="4. Comparing Means (>2 Groups) - ANOVA">
          <ul className="list-disc pl-3 space-y-1">
            <li><strong>One-Way ANOVA:</strong> Compare means of 1 continuous var across &gt;2 groups.
              <br/><Code>model &lt;- aov(y ~ group, data=df)</Code>
              <br/><Code>summary(model)</Code>
            </li>
            <li><strong>Post-hoc (if p &lt; 0.05):</strong> Tukey HSD.
              <br/><Code>TukeyHSD(model)</Code>
            </li>
            <li><strong>Non-Parametric:</strong> Kruskal-Wallis.
              <br/><Code>kruskal.test(y ~ group, data=df)</Code>
            </li>
            <li><strong>Two-Way ANOVA:</strong> 2 Factors + Interaction.
              <br/><Code>aov(y ~ factorA * factorB)</Code>
              <br/>Interaction significant? Effect of A depends on B.
            </li>
            <li><strong>MANOVA:</strong> Multiple dependent variables.
              <br/><Code>manova(cbind(y1, y2) ~ group)</Code>
            </li>
          </ul>
        </Section>

        <Section title="5. Proportions & Counts (Categorical)">
          <ul className="list-disc pl-3 space-y-1">
            <li><strong>Chi-Square Test:</strong> Independence of 2 categorical vars.
              <br/><Code>chisq.test(table(var1, var2))</Code>
              <br/>Assumption: Expected counts &gt; 5.
            </li>
            <li><strong>Fisher's Exact Test:</strong> Small samples.
              <br/><Code>fisher.test(table(var1, var2))</Code>
            </li>
            <li><strong>McNemar Test:</strong> Paired categorical data.
              <br/><Code>mcnemar.test(table)</Code>
            </li>
          </ul>
        </Section>

        <Section title="Stat-to-English Dictionary">
          <ul className="list-disc pl-3 space-y-1">
            <li><strong>P-value:</strong> Probability of seeing this result if H0 were true. (NOT prob that H0 is true).</li>
            <li><strong>CI (95%):</strong> If we repeated the study 100 times, 95 intervals would contain the true mean.</li>
            <li><strong>Std Dev (SD):</strong> Spread of the data points.</li>
            <li><strong>Std Error (SE):</strong> Precision of the mean estimate.</li>
          </ul>
        </Section>

        <Section title="R Core & Data Structures">
          <ul className="list-disc pl-3 space-y-1">
            <li><strong>Vectorization:</strong> <Code>x + 1</Code> adds 1 to <em>every</em> element. No loops needed!</li>
            <li><strong>Factors:</strong> Categorical data. <Code>relevel(x, ref="A")</Code> sets baseline for models.</li>
            <li><strong>Indexing:</strong> <Code>df[row, col]</Code>, <Code>df$col</Code>, <Code>df[df$age &gt; 20, ]</Code> (Filter).</li>
            <li><strong>Missing Data:</strong> <Code>NA</Code> poisons math. Use <Code>na.rm=TRUE</Code> or <Code>is.na()</Code>.</li>
          </ul>
        </Section>
      </Page>

      {/* Page 2: Regression & GLM */}
      <Page pageNum={2}>
        <Section title="6. Correlation & Linear Regression">
          <ul className="list-disc pl-3 space-y-1">
            <li><strong>Correlation:</strong>
              <br/><Code>cor.test(x, y, method="pearson")</Code> (Linear)
              <br/><Code>cor.test(x, y, method="spearman")</Code> (Rank)
            </li>
            <li><strong>Simple Linear Regression:</strong> $Y = aX + b$
              <br/><Code>model &lt;- lm(y ~ x, data=df)</Code>
            </li>
            <li><strong>Multiple Regression:</strong>
              <br/><Code>lm(y ~ x1 + x2 + x3)</Code>
            </li>
            <li><strong>Interpretation:</strong>
              <br/>$R^2$: % variance explained.
              <br/>Estimate: Change in Y for 1 unit increase in X.
            </li>
            <li><strong>Diagnostics:</strong>
              <br/><Code>par(mfrow=c(2,2)); plot(model)</Code>
              <br/>Check Residuals vs Fitted (Linearity), QQ (Normality).
            </li>
          </ul>
        </Section>

        <Section title="7. Non-Linear Models">
          <ul className="list-disc pl-3 space-y-1">
            <li><strong>Polynomial:</strong> $Y = aX^2 + bX + c$
              <br/><Code>lm(y ~ poly(x, 2))</Code> or <Code>lm(y ~ x + I(x^2))</Code>
            </li>
            <li><strong>Logarithmic:</strong> $Y = a \log(X) + b$
              <br/><Code>lm(y ~ log(x))</Code>
            </li>
            <li><strong>Exponential:</strong> $Y = a e^X + b$
              <br/><Code>lm(y ~ exp(x))</Code>
            </li>
            <li><strong>Comparison:</strong> Use <Code>anova(mod1, mod2)</Code> to test improvement.</li>
          </ul>
        </Section>

        <Section title="8. Generalized Linear Models (GLM)">
          <p className="mb-1">For non-normal errors (Counts, Binary).</p>
          
          <h4 className="font-bold text-xs mt-2">Logistic Regression (Binary Y)</h4>
          <ul className="list-disc pl-3 space-y-1">
            <li><Code>glm(y ~ x, family="binomial")</Code></li>
            <li><strong>Odds Ratio (OR):</strong> <Code>exp(coef(model))</Code></li>
            <li><strong>Evaluation:</strong>
              <br/>ROC Curve: <Code>pROC::roc(y, predict(model))</Code>
              <br/>AUC: 0.5 (Random) $\rightarrow$ 1.0 (Perfect).
            </li>
          </ul>

          <h4 className="font-bold text-xs mt-2">Poisson Regression (Count Y)</h4>
          <ul className="list-disc pl-3 space-y-1">
            <li><Code>glm(y ~ x, family="poisson")</Code></li>
            <li><strong>Overdispersion:</strong> If Residual Deviance / DF &gt; 1.
              <br/>Use <Code>family="quasipoisson"</Code> or <Code>MASS::glm.nb()</Code>.
            </li>
          </ul>

          <h4 className="font-bold text-xs mt-2">Model Selection</h4>
          <ul className="list-disc pl-3 space-y-1">
            <li><strong>AIC/BIC:</strong> Lower is better.
              <br/><Code>AIC(mod1, mod2)</Code>
            </li>
          </ul>
        </Section>

        <Section title="Interpretation Templates (Mad Libs)">
          <ul className="list-disc pl-3 space-y-1">
            <li><strong>Linear Regression:</strong> "For every 1 unit increase in [X], [Y] changes by [Estimate] (holding others constant)."</li>
            <li><strong>Logistic (OR):</strong> "The odds of [Event] are [OR] times higher for [Group A] vs [Group B]."</li>
            <li><strong>ANOVA:</strong> "There is a significant difference between at least two group means."</li>
          </ul>
        </Section>

        <Section title="Assumptions Checklist">
          <ul className="list-disc pl-3 space-y-1">
            <li><strong>Linearity:</strong> Residuals vs Fitted plot has no pattern.</li>
            <li><strong>Independence:</strong> Durbin-Watson test.</li>
            <li><strong>Normality of Residuals:</strong> QQ Plot follows line.</li>
            <li><strong>Homoscedasticity:</strong> Equal variance of residuals (Scale-Location plot).</li>
          </ul>
        </Section>

        <Section title="Data Wrangling (dplyr)">
          <ul className="list-disc pl-3 space-y-1">
            <li><strong>Pipe (|&gt; or %&gt;%):</strong> Passes left result to first arg of right function.</li>
            <li><Code>filter(df, age &gt; 20)</Code>: Pick rows.</li>
            <li><Code>select(df, age, sex)</Code>: Pick columns.</li>
            <li><Code>mutate(df, bmi = w/h^2)</Code>: Create/modify columns.</li>
            <li><Code>group_by(sex) |&gt; summarise(m=mean(age))</Code>: Pivot table.</li>
          </ul>
        </Section>
      </Page>

      {/* Page 3: Multivariate Analysis */}
      <Page pageNum={3}>
        <Section title="9. Dimension Reduction (Unsupervised)">
          <h4 className="font-bold text-xs mt-1">PCA (Continuous Vars)</h4>
          <ul className="list-disc pl-3 space-y-1">
            <li><strong>Goal:</strong> Reduce dimensions, maximize variance.</li>
            <li><Code>res &lt;- FactoMineR::PCA(df, scale.unit=TRUE)</Code></li>
            <li><strong>Scree Plot:</strong> <Code>factoextra::fviz_eig(res)</Code> (Check elbow).</li>
            <li><strong>Biplot:</strong> <Code>fviz_pca_biplot(res)</Code></li>
          </ul>

          <h4 className="font-bold text-xs mt-2">Correspondence Analysis (Categorical)</h4>
          <ul className="list-disc pl-3 space-y-1">
            <li><strong>CA (2 vars):</strong> <Code>CA(table)</Code> - Chi2 distance.</li>
            <li><strong>MCA (&gt;2 vars):</strong> <Code>MCA(df)</Code> - Uses disjunctive table.</li>
          </ul>

          <h4 className="font-bold text-xs mt-2">Mixed Data</h4>
          <ul className="list-disc pl-3 space-y-1">
            <li><strong>FAMD:</strong> <Code>FAMD(df)</Code> - Continuous + Categorical.</li>
          </ul>
        </Section>

        <Section title="10. Clustering (Unsupervised)">
          <ul className="list-disc pl-3 space-y-1">
            <li><strong>K-Means:</strong> Partition into K groups.
              <br/><Code>kmeans(scale(df), centers=K)</Code>
              <br/><strong>Elbow Method:</strong> Plot WSS vs K to find optimal K.
            </li>
            <li><strong>Hierarchical (HCA):</strong> Dendrogram.
              <br/><Code>hclust(dist(scale(df)))</Code>
            </li>
          </ul>
        </Section>

        <Section title="11. Classification (Supervised)">
          <h4 className="font-bold text-xs mt-1">LDA (Linear Discriminant Analysis)</h4>
          <ul className="list-disc pl-3 space-y-1">
            <li>Separates known groups linearly. Assumes normality.
              <br/><Code>MASS::lda(group ~ ., data=df)</Code>
            </li>
          </ul>

          <h4 className="font-bold text-xs mt-2">Decision Trees (CART)</h4>
          <ul className="list-disc pl-3 space-y-1">
            <li>Flowchart-like rules. Handles non-linear/interactions.
              <br/><Code>rpart::rpart(y ~ ., data=df)</Code>
            </li>
            <li><strong>Pruning:</strong> Avoid overfitting.
              <br/><Code>plotcp(tree)</Code> $\rightarrow$ <Code>prune(tree, cp=...)</Code>
            </li>
          </ul>
        </Section>

        <Section title="PCA Interpretation Guide">
          <ul className="list-disc pl-3 space-y-1">
            <li><strong>Eigenvalue &gt; 1:</strong> Component explains more variance than a single original variable.</li>
            <li><strong>Cos2:</strong> Quality of representation. Close to 1 = Good.</li>
            <li><strong>Contrib:</strong> How much a variable contributes to the axis definition.</li>
            <li><strong>Biplot Arrows:</strong> Same direction = Correlated. 90° = Uncorrelated. Opposite = Negatively correlated.</li>
          </ul>
        </Section>

        <Section title="Clustering Concepts">
          <ul className="list-disc pl-3 space-y-1">
            <li><strong>Dendrogram Height:</strong> Represents dissimilarity. Cut higher for fewer, broader clusters.</li>
            <li><strong>Inertia:</strong>
              <br/><strong>Within:</strong> Compactness (Minimize).
              <br/><strong>Between:</strong> Separation (Maximize).
            </li>
          </ul>
        </Section>

        <Section title="Data Visualization (ggplot2)">
          <ul className="list-disc pl-3 space-y-1">
            <li><strong>Grammar:</strong> Data + Aesthetics (x, y, color) + Geometries.</li>
            <li><Code>ggplot(df, aes(x=age, y=weight)) + geom_point()</Code></li>
            <li><strong>Geoms:</strong> <Code>geom_boxplot()</Code>, <Code>geom_histogram()</Code>, <Code>geom_smooth(method="lm")</Code>.</li>
            <li><strong>Faceting:</strong> <Code>+ facet_wrap(~sex)</Code> splits plot by group.</li>
          </ul>
        </Section>
      </Page>

      {/* Page 4: Advanced Topics & Clinical Trials */}
      <Page pageNum={4}>
        <Section title="12. Survival Analysis">
          <ul className="list-disc pl-3 space-y-1">
            <li><strong>Kaplan-Meier:</strong> Estimate survival curve $S(t)$.
              <br/><Code>fit &lt;- survfit(Surv(time, status) ~ group)</Code>
              <br/><Code>ggsurvplot(fit)</Code>
            </li>
            <li><strong>Log-Rank Test:</strong> Compare curves.
              <br/><Code>survdiff(Surv(time, status) ~ group)</Code>
            </li>
            <li><strong>Cox Proportional Hazards:</strong> Multivariate.
              <br/><Code>coxph(Surv(time, status) ~ age + sex)</Code>
              <br/><strong>Hazard Ratio (HR):</strong> &gt;1 increases risk, &lt;1 decreases.
            </li>
          </ul>
        </Section>

        <Section title="13. Longitudinal Data (LMM)">
          <ul className="list-disc pl-3 space-y-1">
            <li><strong>Fixed Effects:</strong> Population average.</li>
            <li><strong>Random Effects:</strong> Subject-specific deviation.</li>
            <li><Code>nlme::lme(y ~ time, random = ~1|id)</Code> (Random Intercept)</li>
            <li><Code>random = ~time|id</Code> (Random Slope)</li>
          </ul>
        </Section>

        <Section title="14. Meta-Analysis">
          <ul className="list-disc pl-3 space-y-1">
            <li><strong>Forest Plot:</strong> Visualizes effect sizes & pooled result.</li>
            <li><strong>Heterogeneity ($I^2$):</strong> Inconsistency across studies.
              <br/>&lt;30% Low, &gt;75% High.
            </li>
            <li><strong>Fixed vs Random Effects:</strong> Use Random if Heterogeneity is high.</li>
            <li><Code>meta::metacont(...)</Code> or <Code>metabin(...)</Code></li>
          </ul>
        </Section>

        <Section title="15. Clinical Trials & Evidence">
          <ul className="list-disc pl-3 space-y-1">
            <li><strong>Phases:</strong>
              <br/>I: Safety (Healthy). II: Efficacy (Small). III: Confirmation (Large). IV: Post-market.
            </li>
            <li><strong>Bias:</strong> Selection (Randomize), Performance (Blind), Attrition (IT Analysis).</li>
            <li><strong>Evidence Pyramid:</strong> Meta-Analysis &gt; RCT &gt; Cohort &gt; Case-Control.</li>
          </ul>
        </Section>

        <Section title="16. Sample Size (Power)">
          <ul className="list-disc pl-3 space-y-1">
            <li><strong>Package:</strong> <Code>pwr</Code></li>
            <li>Need 3 of 4: N, Power, Effect Size, Alpha.</li>
            <li><Code>pwr.t.test(d=0.5, power=0.8, sig.level=0.05)</Code></li>
          </ul>
        </Section>

        <Section title="Survival & Meta-Analysis Visuals">
          <ul className="list-disc pl-3 space-y-1">
            <li><strong>Censoring (+):</strong> Event didn't happen yet (or lost).</li>
            <li><strong>Hazard Ratio (HR):</strong> &gt;1 (Riskier), &lt;1 (Protective).</li>
            <li><strong>Forest Plot:</strong>
              <br/>Box size = Weight. Line = CI. Diamond = Pooled Result.
              <br/>Vertical Line = No Effect (1 for OR/RR, 0 for MD).
            </li>
          </ul>
        </Section>

        <Section title="Clinical Acronyms">
          <ul className="list-disc pl-3 space-y-1">
            <li><strong>CRF:</strong> Case Report Form. <strong>eCRF:</strong> Electronic.</li>
            <li><strong>SAP:</strong> Statistical Analysis Plan.</li>
            <li><strong>AE:</strong> Adverse Event. <strong>SAE:</strong> Serious AE.</li>
            <li><strong>ITT:</strong> Intention To Treat (Analyze all randomized).</li>
            <li><strong>PP:</strong> Per Protocol (Analyze only compliers).</li>
          </ul>
        </Section>

        <Section title="R Programming & Debugging">
          <ul className="list-disc pl-3 space-y-1">
            <li><strong>Lists:</strong> Test outputs are lists. Access with $: <Code>res$p.value</Code>.</li>
            <li><strong>Inspection:</strong> <Code>str(obj)</Code> (Structure), <Code>summary(obj)</Code>, <Code>unique(x)</Code>.</li>
            <li><strong>Conditionals:</strong> <Code>ifelse(test, yes, no)</Code> (Vectorized).</li>
            <li><strong>Common Error:</strong> "Object not found" = Typo or library not loaded.</li>
          </ul>
        </Section>
      </Page>
    </div>
  );
}
