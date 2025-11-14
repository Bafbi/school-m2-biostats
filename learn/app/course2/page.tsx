"use client";

import { useState } from "react";
import { ScatterChart, Scatter, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import CodeBlock from '@/components/ui/CodeBlock';
import InteractiveSelector from '@/components/ui/InteractiveSelector';
import Quiz from '@/components/quiz/Quiz';
import DensityDistributionsSection from '@/components/course/DensityDistributionsSection';
import PValueVisualization from '@/components/course/course2/PValueVisualization';
import ModelDiagnosticsPlots from '@/components/course/course2/ModelDiagnosticsPlots';
import R2Visualization from '@/components/course/course2/R2Visualization';
import LiveExercise from '@/components/course/course2/LiveExercise';

const scatterData = [
  { x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 4 }, { x: 4, y: 5 }, { x: 5, y: 6 }
];

const quizQuestions = [
  {
    question: "What is the goal of statistical modeling?",
    options: ["To visualize data", "To explain or predict relationships between variables", "To collect data", "To write code"],
    answer: 1
  },
  {
    question: "Which test is used for normality?",
    options: ["t.test", "shapiro.test", "anova", "chisq.test"],
    answer: 1
  },
  {
    question: "What does R² measure in linear models?",
    options: ["Error rate", "Proportion of variability explained", "Sample size", "P-value"],
    answer: 1
  }
];

export default function Course2() {
  const [showExample, setShowExample] = useState(false);
  const [selectedDist, setSelectedDist] = useState('Normal');
  const [showSim, setShowSim] = useState(false);
  const [simData, setSimData] = useState<number[]>([]);
  const [showErrors, setShowErrors] = useState(false);
  const [selectedTest, setSelectedTest] = useState('Normality');
  const [selectedMultivariateTest, setSelectedMultivariateTest] = useState('Correlation');
  const [selectedMultivariateModel, setSelectedMultivariateModel] = useState('Multiple Regression');
  const mounted = true;

  const generateSim = () => {
    const data = Array.from({ length: 10 }, () => Math.round((Math.random() - 0.5) * 4 + 5));
    setSimData(data);
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-black mb-8">Course 2: Statistical Modeling #1</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Introduction to Statistical Modeling</h2>
          <div className="space-y-4">
             <div className="border rounded-lg p-4">
               <h3 className="text-black text-lg font-medium mb-2">What is Statistical Modeling?</h3>
               <p className="text-gray-900 mb-2">
                 Imagine you&apos;re a detective trying to solve a mystery. You have clues (data) and you want to find patterns or predict outcomes.
               </p>
               <p className="text-gray-900 mb-2">
                 Throughout this course, we&apos;ll use the famous <strong>Iris dataset</strong> to demonstrate concepts. This dataset contains measurements of 150 iris flowers from three species.
               </p>
               <button
                 onClick={() => setShowExample(!showExample)}
                 className="px-4 py-2 bg-blue-500 text-white rounded"
               >
                 {showExample ? 'Hide Example' : 'Show Example'}
               </button>
               {showExample && (
                 <div className="mt-4 p-4 bg-gray-100 rounded">
                   <p className="text-gray-900">
                     Example: Predicting house prices based on size and location. The model is like a formula: Price = a*Size + b*Location + c
                   </p>
                   <p className="text-gray-900 mt-2">
                     With Iris: Predicting petal length based on sepal measurements and species.
                   </p>
                 </div>
               )}
             </div>

            <div className="border rounded-lg p-4">
              <h3 className="text-black text-lg font-medium mb-2">Modeling vs Machine Learning</h3>
              <p className="text-gray-900 mb-2">
                Statistical modeling focuses on understanding relationships and explaining why things happen.
              </p>
              <p className="text-gray-900">
                Machine learning is more about making accurate predictions, often with complex algorithms.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="text-black text-lg font-medium mb-2">Goals of Modeling</h3>
              <ul className="list-disc list-inside text-gray-900">
                <li><strong>Inference:</strong> Explain relationships between variables</li>
                <li><strong>Prediction:</strong> Forecast future outcomes</li>
              </ul>
            </div>

             <div className="border rounded-lg p-4">
               <h3 className="text-black text-lg font-medium mb-2">Quality Metrics</h3>
               <p className="text-gray-900 mb-2">How do we know if our model is good?</p>
               <ul className="list-disc list-inside text-gray-900">
                 <li><strong>R²:</strong> <span title="Coefficient of determination: proportion of variance in dependent variable explained by independent variables">How much variability is explained (0-1)</span></li>
                 <li><strong>AIC/BIC:</strong> <span title="Akaike/Bayesian Information Criterion: measures model quality, penalizing complexity">Balance between fit and simplicity</span></li>
               </ul>
               <R2Visualization />
             </div>
          </div>
        </section>

        <DensityDistributionsSection
          selectedDist={selectedDist}
          setSelectedDist={setSelectedDist}
          showSim={showSim}
          setShowSim={setShowSim}
          simData={simData}
          generateSim={generateSim}
          mounted={mounted}
        />

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-black mb-4">Statistical Tests</h2>
          <div className="space-y-4">
             <div className="border rounded-lg p-4">
               <h3 className="text-black">What is a Statistical Test?</h3>
               <p className="text-gray-900 mb-2">
                 A statistical test helps us decide if our data supports a hypothesis.
               </p>
               <p className="text-gray-900 mb-2">
                 <strong>Hypotheses:</strong> <span title="Null hypothesis: no effect or difference">H0</span> (no effect) vs <span title="Alternative hypothesis: there is an effect">H1</span> (there is effect).
               </p>
               <p className="text-gray-900">
                 If <span title="Probability of data if H0 is true">p-value</span> &lt; <span title="Significance level, usually 0.05">α</span> (0.05), we reject H0.
               </p>
               <PValueVisualization />
             </div>

            <div className="border rounded-lg p-4">
              <h3 className="text-black">Test Power and Errors</h3>
              <p className="text-gray-900 mb-2">
                <strong>Power:</strong> Ability to detect a true effect (1 - β, where β is Type II error).
              </p>
              <p className="text-gray-900 mb-2">
                <strong>Errors:</strong> Type I (false positive, α) vs Type II (false negative, β).
              </p>
              <button
                onClick={() => setShowErrors(!showErrors)}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                {showErrors ? 'Hide Error Types' : 'Show Error Types'}
              </button>
              {showErrors && (
                <div className="mt-4 p-4 bg-gray-100 rounded">
                  <table className="w-full text-gray-900">
                    <thead>
                      <tr>
                        <th></th>
                        <th>H0 True</th>
                        <th>H0 False</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Reject H0</td>
                        <td>Type I Error (α)</td>
                        <td>Correct (Power)</td>
                      </tr>
                      <tr>
                        <td>Fail to Reject H0</td>
                        <td>Correct</td>
                        <td>Type II Error (β)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="text-black">Test Families</h3>
              <p className="text-gray-900 mb-2">
                <strong>Parametric:</strong> Assume normality (e.g., t-test).
              </p>
              <p className="text-gray-900 mb-2">
                <strong>Non-parametric:</strong> No normality assumption (e.g., Wilcoxon).
              </p>
              <p className="text-gray-900">
                <strong>Univariate:</strong> One variable; <strong>Multivariate:</strong> Multiple variables/groups.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="text-black">Common Tests</h3>
              <ul className="list-disc list-inside text-gray-900">
                <li><strong>Normality:</strong> <code className="text-gray-900">shapiro.test(data)</code></li>
                <li><strong>Means (2 groups):</strong> <code className="text-gray-900">t.test(x, y)</code></li>
                <li><strong>Means (&gt;2 groups):</strong> <code className="text-gray-900">anova_test(data, y ~ group)</code></li>
                <li><strong>Proportions:</strong> <code className="text-gray-900">chisq.test(table)</code></li>
                <li><strong>Correlation:</strong> <code className="text-gray-900">cor.test(x, y)</code></li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-black mb-4">Univariate Tests</h2>
          <p className="text-gray-900 mb-4">
            Univariate tests analyze a single variable. Select a test to learn more:
          </p>
          <InteractiveSelector
            options={['Normality', 'Mean vs Reference', 'Median vs Reference', 'Proportion vs Reference', 'Outliers']}
            selected={selectedTest}
            onSelect={setSelectedTest}
          >
            {(selected) => {
              switch (selected) {
                case 'Normality':
                  return (
                    <div>
                      <h3 className="text-black">Shapiro-Wilk Normality Test</h3>
                      <p className="text-gray-900 mb-2">Tests if data follows normal distribution.</p>
                      <CodeBlock code={`# Example
result <- shapiro.test(my_data)
print(result$p.value)  # > 0.05 for normal`} />
                      <p className="text-gray-900">Alternative: Q-Q plot with <code className="text-gray-900 bg-gray-100 px-1 rounded">ggqqplot(my_data)</code></p>
                    </div>
                  );
                case 'Mean vs Reference':
                  return (
                    <div>
                      <h3 className="text-black">One-Sample T-Test</h3>
                      <p className="text-gray-900 mb-2">Compares sample mean to known value (assumes normality).</p>
                      <CodeBlock code={`# Example
t.test(my_data, mu = 10)  # H0: mean = 10`} />
                      <p className="text-gray-900">Output: t-statistic, df, p-value, 95% CI.</p>
                    </div>
                  );
                case 'Median vs Reference':
                  return (
                    <div>
                      <h3 className="text-black">Wilcoxon Signed-Rank Test</h3>
                      <p className="text-gray-900 mb-2">Non-parametric test for median vs reference.</p>
                      <CodeBlock code={`# Example
wilcox.test(my_data, mu = 5)`} />
                      <p className="text-gray-900">Output: W statistic, p-value.</p>
                    </div>
                  );
                case 'Proportion vs Reference':
                  return (
                    <div>
                      <h3 className="text-black">Binomial/Proportion Test</h3>
                      <p className="text-gray-900 mb-2">Tests proportion against expected value.</p>
                      <CodeBlock code={`# Small sample
binom.test(8, 20, p = 0.5)  # 8 successes out of 20

# Large sample
prop.test(80, 200, p = 0.5)  # 80 out of 200`} />
                      <p className="text-gray-900">Output: proportion, 95% CI, p-value.</p>
                    </div>
                  );
                case 'Outliers':
                  return (
                    <div>
                      <h3 className="text-black">Grubbs Test for Outliers</h3>
                      <p className="text-gray-900 mb-2">Detects single outlier in normally distributed data.</p>
                      <CodeBlock code={`# Install outliers package first
library(outliers)
grubbs.test(my_data)`} />
                      <p className="text-gray-900">Output: G statistic, p-value.</p>
                    </div>
                  );
                default:
                  return null;
              }
             }}
           </InteractiveSelector>
           <LiveExercise />
         </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-black mb-4">Multivariate Tests</h2>
          <p className="text-gray-900 mb-4">
            Multivariate tests compare multiple groups or variables. Select a test to learn more:
          </p>
          <div className="flex gap-2 mb-4 flex-wrap">
            {['Correlation', 'Variances', 'Means', 'Medians', 'Proportions'].map((test) => (
              <button
                key={test}
                onClick={() => setSelectedMultivariateTest(test)}
                className={`px-4 py-2 rounded ${selectedMultivariateTest === test ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
              >
                {test}
              </button>
            ))}
          </div>
          <div className="border rounded-lg p-4">
            {selectedMultivariateTest === 'Correlation' && (
              <div>
                <h3 className="text-black">Pearson Correlation Test</h3>
                <p className="text-gray-900 mb-2">Measures linear relationship between two continuous variables.</p>
                <p className="text-gray-900 mb-2">Strong correlation if |r| &gt; 0.75; weak if |r| &lt; 0.25.</p>
                <pre className="bg-gray-100 p-2 rounded text-gray-900 text-sm">
{`# Example
result <- cor.test(x, y, method="pearson")
print(result$estimate)  # r value
print(result$p.value)   # significance`}
                </pre>
                <p className="text-gray-900">Alternatives: Spearman (non-parametric), Kendall.</p>
              </div>
            )}
            {selectedMultivariateTest === 'Variances' && (
              <div>
                <h3 className="text-black">Variance Tests</h3>
                <p className="text-gray-900 mb-2">Test if variances are equal across groups.</p>
                <pre className="bg-gray-100 p-2 rounded text-gray-900 text-sm">
{`# Two groups
var.test(x, y)

# More than two groups
bartlett.test(values ~ group)`}
                </pre>
                <p className="text-gray-900">Equal variances needed for parametric tests like ANOVA.</p>
              </div>
            )}
            {selectedMultivariateTest === 'Means' && (
              <div>
                <h3 className="text-black">Mean Comparison Tests</h3>
                <p className="text-gray-900 mb-2">Compare means across multiple groups.</p>
                <pre className="bg-gray-100 p-2 rounded text-gray-900 text-sm">
{`# Two groups
t.test(x, y)

# More than two groups
anova_result <- aov(y ~ group, data = df)
summary(anova_result)
TukeyHSD(anova_result)  # post-hoc`}
                </pre>
                <p className="text-gray-900">ANOVA assumes normality and equal variances.</p>
              </div>
            )}
            {selectedMultivariateTest === 'Medians' && (
              <div>
                <h3 className="text-black">Median Comparison Tests</h3>
                <p className="text-gray-900 mb-2">Non-parametric tests for medians across groups.</p>
                <pre className="bg-gray-100 p-2 rounded text-gray-900 text-sm">
{`# Two groups
wilcox.test(x, y)

# More than two groups
kruskal.test(y ~ group, data = df)
pairwise.wilcox.test(y, group)`}
                </pre>
                <p className="text-gray-900">No normality assumption required.</p>
              </div>
            )}
            {selectedMultivariateTest === 'Proportions' && (
              <div>
                <h3 className="text-black">Chi-Square Test for Proportions</h3>
                <p className="text-gray-900 mb-2">Test independence between categorical variables.</p>
                <pre className="bg-gray-100 p-2 rounded text-gray-900 text-sm">
{`# Contingency table
table_data <- table(group1, group2)
chisq.test(table_data)

# Post-hoc for significant result
library(chisq.posthoc.test)
chisq.posthoc.test(table_data)`}
                </pre>
                <p className="text-gray-900">Expected frequencies should be &gt;5 in most cells.</p>
              </div>
            )}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Univariate Linear Models</h2>
          <p className="text-gray-900 mb-4">
            <strong>Equation:</strong> Y = a*X + b + ε.
          </p>
          <p className="text-gray-900 mb-4">
            <strong>Least Squares:</strong> Minimize sum of squared residuals.
          </p>
          <p className="text-gray-900 mb-4">
            <strong>Residuals:</strong> Check normality; non-normal indicates issues.
          </p>
          <p className="text-gray-900 mb-4">
            <strong>R²:</strong> <span title="Coefficient of determination">Proportion of Y variability explained</span>.
          </p>
          <p className="text-gray-900 mb-4">
            <strong>Other Metrics:</strong> MAE, MSE, RMSE (caret package).
          </p>
          <p className="text-gray-900 mb-2">lm function example:</p>
          <CodeBlock code={`model <- lm(y ~ x, data = df)
summary(model)  # coefficients, R²
anova(model)    # ANOVA table
predict(model, newdata)
plot(model)     # diagnostic plots`} />
          <p className="text-gray-900">Residual checks: histogram, Q-Q plot with <code className="text-gray-900 bg-gray-100 px-1 rounded">shapiro.test(residuals(model))</code>.</p>
           <div className="mb-4">
             <h3 className="text-black">Linear Model Example</h3>
             {mounted && (
               <ScatterChart width={400} height={200} data={scatterData}>
                 <CartesianGrid />
                 <XAxis type="number" dataKey="x" />
                 <YAxis type="number" dataKey="y" />
                 <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                 <Scatter name="Data Points" dataKey="y" fill="#8884d8" />
               </ScatterChart>
             )}
           </div>
           <ModelDiagnosticsPlots />
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-black mb-4">Multivariate Linear Models</h2>
          <p className="text-gray-900 mb-4">
            Models with multiple predictors. Select a topic to learn more:
          </p>
          <div className="flex gap-2 mb-4 flex-wrap">
            {['Multiple Regression', 'Interactions', 'Variable Selection', 'Model Validation'].map((topic) => (
              <button
                key={topic}
                onClick={() => setSelectedMultivariateModel(topic)}
                className={`px-4 py-2 rounded ${selectedMultivariateModel === topic ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
              >
                {topic}
              </button>
            ))}
          </div>
          <div className="border rounded-lg p-4">
            {selectedMultivariateModel === 'Multiple Regression' && (
              <div>
                <h3 className="text-black">Multiple Linear Regression</h3>
                <p className="text-gray-900 mb-2"><strong>Equation:</strong> Y = a1*X1 + a2*X2 + ... + b + ε</p>
                <p className="text-gray-900 mb-2">Extends simple regression to multiple predictors.</p>
                <CodeBlock code={`# Example
model <- lm(y ~ x1 + x2 + x3, data = df)
summary(model)  # coefficients, R², p-values`} />
                <p className="text-gray-900">Interpret coefficients as change in Y per unit X, holding others constant.</p>
              </div>
            )}
            {selectedMultivariateModel === 'Interactions' && (
              <div>
                <h3 className="text-black">Interaction Terms</h3>
                <p className="text-gray-900 mb-2">Model how predictors affect each other.</p>
                <p className="text-gray-900 mb-2"><strong>Equation:</strong> Y = a1*X1 + a2*X2 + a3*X1*X2 + b + ε</p>
                <CodeBlock code={`# Example
model <- lm(y ~ x1 * x2, data = df)  # includes interaction
# or
model <- lm(y ~ x1 + x2 + x1:x2, data = df)`} />
                <p className="text-gray-900">Significant interaction means effect of X1 depends on X2.</p>
              </div>
            )}
            {selectedMultivariateModel === 'Variable Selection' && (
              <div>
                <h3 className="text-black">Variable Selection Methods</h3>
                <p className="text-gray-900 mb-2">Choose best subset of predictors to avoid overfitting.</p>
                <CodeBlock code={`# Stepwise selection (MASS package)
library(MASS)
model <- lm(y ~ ., data = df)
step_model <- stepAIC(model, direction = "both")

# Manual selection
full_model <- lm(y ~ x1 + x2 + x3, data = df)
reduced_model <- lm(y ~ x1 + x2, data = df)
anova(reduced_model, full_model)  # compare models`} />
                <p className="text-gray-900">Use AIC/BIC to balance fit and complexity.</p>
              </div>
            )}
            {selectedMultivariateModel === 'Model Validation' && (
              <div>
                <h3 className="text-black">Model Validation and Diagnostics</h3>
                <p className="text-gray-900 mb-2">Ensure model assumptions and predictive power.</p>
                <CodeBlock code={`# Cross-validation (caret package)
library(caret)
train_control <- trainControl(method = "cv", number = 10)
model <- train(y ~ ., data = df, method = "lm", trControl = train_control)

# Multicollinearity check (car package)
library(car)
vif(model)  # VIF > 5 indicates issue

# Diagnostic plots
plot(model)  # residuals vs fitted, Q-Q, etc.`} />
                <p className="text-gray-900">LOOCV: Leave-One-Out Cross-Validation for small datasets.</p>
              </div>
            )}
          </div>
        </section>

        <Quiz questions={quizQuestions} />

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-black mb-4">Resources</h2>
          <p className="text-gray-900 mb-4">
            <strong>Code:</strong> R scripts for density distributions, multivariate/univariate linear models, multivariate/univariate tests in Code R & Data folder.
          </p>
          <p className="text-gray-900 mb-4">
            <strong>R Cheatsheets:</strong>
          </p>
          <ul className="list-disc list-inside text-gray-900 mb-4">
            <li><a href="/documents/dplyr_cheatsheet.pdf" target="_blank" className="text-blue-500 underline">dplyr Cheatsheet</a> - Data manipulation</li>
            <li><a href="/documents/ggplot2_cheatsheet.pdf" target="_blank" className="text-blue-500 underline">ggplot2 Cheatsheet</a> - Data visualization</li>
            <li><a href="/documents/rmarkdown_cheatsheet.pdf" target="_blank" className="text-blue-500 underline">R Markdown Cheatsheet</a> - Report generation</li>
            <li><a href="/documents/lubridate_cheatsheet.pdf" target="_blank" className="text-blue-500 underline">lubridate Cheatsheet</a> - Date/time handling</li>
            <li><a href="/documents/stringr_cheatsheet.pdf" target="_blank" className="text-blue-500 underline">stringr Cheatsheet</a> - String manipulation</li>
            <li><a href="/documents/plotly_cheatsheet.pdf" target="_blank" className="text-blue-500 underline">plotly Cheatsheet</a> - Interactive plots</li>
            <li><a href="/documents/shiny_cheatsheet.pdf" target="_blank" className="text-blue-500 underline">Shiny Cheatsheet</a> - Web apps</li>
          </ul>
          <p className="text-gray-900">
            <strong>Additional:</strong> <a href="/documents/Article_Malaria.pdf" target="_blank" className="text-blue-500 underline">Malaria Article PDF</a>
          </p>
        </section>
      </div>
    </div>
  );
}