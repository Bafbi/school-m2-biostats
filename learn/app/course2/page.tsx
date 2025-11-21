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
import GuessTheCorrelation from '@/components/course/course2/GuessTheCorrelation';
import InteractiveANOVA from '@/components/course/course2/InteractiveANOVA';
import InteractiveChiSquare from '@/components/course/course2/InteractiveChiSquare';
import RobustnessDemo from '@/components/course/course2/RobustnessDemo';
import AlphaBetaVisualization from '@/components/course/course2/AlphaBetaVisualization';

const scatterData = [
  { x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 4 }, { x: 4, y: 5 }, { x: 5, y: 6 }
];

const quizQuestions = [
  {
    question: "What is the goal of statistical modeling?",
    options: ["To visualize data", "To explain or predict relationships between variables", "To collect data", "To write code"],
    answer: 1,
    explanation: "Modeling is about finding patterns (inference) or forecasting future outcomes (prediction). Visualization is a tool, not the goal itself."
  },
  {
    question: "Which test is used for normality?",
    options: ["t.test", "shapiro.test", "anova", "chisq.test"],
    answer: 1,
    explanation: "The Shapiro-Wilk test (shapiro.test) checks if data follows a normal distribution. T-test compares means, ANOVA compares >2 means, and Chi-square checks categorical independence."
  },
  {
    question: "What does R² measure in linear models?",
    options: ["Error rate", "Proportion of variability explained", "Sample size", "P-value"],
    answer: 1,
    explanation: "R² (Coefficient of Determination) tells you what percentage of the variance in the dependent variable is explained by the independent variables. 1.0 is perfect, 0.0 is none."
  },
  {
    question: "In the medical diagnosis analogy, what is a Type II Error?",
    options: ["Telling a healthy person they are sick", "Telling a sick person they are healthy", "Correctly diagnosing a sick person", "Correctly diagnosing a healthy person"],
    answer: 1,
    explanation: "Type II Error is a False Negative. It's dangerous because you miss the disease (fail to reject H0 when H0 is false)."
  },
  {
    question: "You want to compare the height of plants in 3 different soil types. Which test do you use?",
    options: ["T-test", "Correlation", "ANOVA", "Chi-Square"],
    answer: 2,
    explanation: "You have 3 groups (soil types) and a continuous variable (height). ANOVA is designed for comparing means across more than 2 groups."
  },
  {
    question: "What does a P-value of 0.03 mean (assuming alpha = 0.05)?",
    options: ["The null hypothesis is true", "There is a 3% chance the result is random, so we reject H0", "The result is not significant", "We made a calculation error"],
    answer: 1,
    explanation: "Since 0.03 < 0.05, the result is statistically significant. It suggests that such an extreme result would only happen 3% of the time if the null hypothesis were true."
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
                Think of statistical modeling as <strong>detective work</strong>. You have evidence (data) and you want to solve a mystery (answer a question).
              </p>
              <p className="text-gray-900 mb-2">
                <strong>The Goal:</strong> To find a mathematical formula that explains the patterns in your data.
              </p>
              <p className="text-gray-900 mb-2">
                We will use the <strong>Iris dataset</strong> (measurements of flowers) to practice. It's like learning to cook with a simple recipe before trying a banquet.
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
              <h3 className="text-black text-lg font-medium mb-2">Why do we model?</h3>
              <ul className="list-disc list-inside text-gray-900">
                <li><strong>To Explain (Inference):</strong> "Does fertilizer X make plants grow taller?" (Understanding the relationship)</li>
                <li><strong>To Predict:</strong> "If I use 10g of fertilizer, how tall will the plant be?" (Forecasting)</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="text-black text-lg font-medium mb-2">Quality Metrics</h3>
              <p className="text-gray-900 mb-2">How do we know if our model is good?</p>
              <ul className="list-disc list-inside text-gray-900">
                <li><strong>R² (The Grade):</strong> How much of the result is explained by your model? (0% = None, 100% = Perfect).</li>
                <li><strong>AIC/BIC (The Suitcase):</strong> Measures efficiency. Like packing for a trip: you want to bring everything you need (good fit) but nothing extra (simplicity). <strong>Lower is better!</strong></li>
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
              <h3 className="text-black text-lg font-medium mb-2">How to Choose a Test?</h3>
              <p className="text-gray-900 mb-4">Follow this simple decision tree:</p>
              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <ul className="space-y-2 text-gray-900">
                  <li><strong>1. What are you comparing?</strong></li>
                  <li className="ml-4">
                    A. <strong>Groups</strong> (e.g., Drug A vs Drug B)
                    <ul className="ml-4 mt-1 text-sm text-gray-700">
                      <li>- 2 Groups? &rarr; <strong>T-test</strong> (or Wilcoxon)</li>
                      <li>- &gt;2 Groups? &rarr; <strong>ANOVA</strong> (or Kruskal-Wallis)</li>
                    </ul>
                  </li>
                  <li className="ml-4">
                    B. <strong>Relationships</strong> (e.g., Height vs Weight)
                    <ul className="ml-4 mt-1 text-sm text-gray-700">
                      <li>- Both Continuous? &rarr; <strong>Correlation</strong> or <strong>Linear Regression</strong></li>
                      <li>- Both Categorical? &rarr; <strong>Chi-Square</strong></li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="mt-4">
                <PValueVisualization />
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="text-black text-lg font-medium mb-2">Errors & Power (The Medical Diagnosis Analogy)</h3>
              <p className="text-gray-900 mb-2">
                Imagine a test for a disease. We have two worlds:
              </p>
              <ul className="list-disc list-inside text-gray-900 mb-4">
                <li><strong>H0 (Left Curve):</strong> The patient is Healthy. Any result to the right of the line is a False Positive (Type I Error).</li>
                <li><strong>H1 (Right Curve):</strong> The patient is Sick. Any result to the left of the line is a False Negative (Type II Error).</li>
              </ul>
              <p className="text-gray-900 mb-4">
                Use the sliders to see how <strong>Sample Size</strong> and <strong>Effect Size</strong> affect the overlap (Errors).
              </p>
              <AlphaBetaVisualization />
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
                      <p className="text-gray-900 mb-2"><strong>In Plain English:</strong> "Does the data look like a Bell Curve?"</p>
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
                      <p className="text-gray-900 mb-2"><strong>In Plain English:</strong> "Is the average different from what we expect?"</p>
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
                      <p className="text-gray-900 mb-2"><strong>In Plain English:</strong> "Is the median different? (Use this if data is weird/skewed)"</p>
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
                      <p className="text-gray-900 mb-2"><strong>In Plain English:</strong> "Is the coin fair? (Did we get heads more often than expected?)"</p>
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
                <p className="text-gray-900 mb-2"><strong>In Plain English:</strong> "Do they move together? (e.g., Taller people are heavier)"</p>
                <p className="text-gray-900 mb-2">Measures linear relationship between two continuous variables.</p>
                <p className="text-gray-900 mb-2">Strong correlation if |r| &gt; 0.75; weak if |r| &lt; 0.25.</p>
                <pre className="bg-gray-100 p-2 rounded text-gray-900 text-sm">
                  {`# Example
result <- cor.test(x, y, method="pearson")
print(result$estimate)  # r value
print(result$p.value)   # significance`}
                </pre>
                <p className="text-gray-900 mb-4">Alternatives: Spearman (non-parametric), Kendall.</p>

                <GuessTheCorrelation />
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
                <p className="text-gray-900 mb-2"><strong>In Plain English:</strong> "Is the signal (difference) stronger than the noise (variance)?"</p>
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
                <InteractiveANOVA />
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
                <RobustnessDemo />
              </div>
            )}
            {selectedMultivariateTest === 'Proportions' && (
              <div>
                <h3 className="text-black">Chi-Square Test for Proportions</h3>
                <p className="text-gray-900 mb-2"><strong>In Plain English:</strong> "Did the treatment change the outcome? (Observed vs Expected)"</p>
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
                <InteractiveChiSquare />
              </div>
            )}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Univariate Linear Models (Simple Regression)</h2>
          <p className="text-gray-900 mb-4">
            <strong>The Formula:</strong> <code className="bg-gray-100 px-1 rounded">Y = a*X + b</code>
          </p>
          <p className="text-gray-900 mb-4">
            Think of it like a taxi fare: <strong>Total Cost = (Price per km * Distance) + Base Fee</strong>.
          </p>
          <ul className="list-disc list-inside text-gray-900 mb-4">
            <li><strong>Y (Dependent Variable):</strong> What you want to predict (Total Cost).</li>
            <li><strong>X (Independent Variable):</strong> What you use to predict (Distance).</li>
            <li><strong>a (Slope):</strong> How much Y changes for every 1 unit of X (Price per km).</li>
            <li><strong>b (Intercept):</strong> The starting value when X is 0 (Base Fee).</li>
          </ul>
          <div className="bg-blue-50 p-4 rounded border border-blue-200 mb-4">
            <p className="text-blue-900">
              <strong>R² (The "Grade" Analogy):</strong> Imagine your final grade depends on how much you study.
              If R² is 0.8, it means 80% of your grade is explained by study time. The other 20% is luck, sleep, etc.
            </p>
          </div>
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
                <p className="text-gray-900 mb-2"><strong>The "Recipe" Analogy:</strong></p>
                <p className="text-gray-900 mb-2">
                  Simple regression is like making a sandwich with just cheese. Multiple regression is adding ham, lettuce, and tomato.
                </p>
                <p className="text-gray-900 mb-2">
                  <strong>Equation:</strong> <code className="bg-gray-100 px-1 rounded">Y = a1*X1 + a2*X2 + ... + b</code>
                </p>
                <CodeBlock code={`# Example: Predicting Price based on Size AND Location
model <- lm(price ~ size + location, data = houses)
summary(model)`} />
                <p className="text-gray-900">
                  <strong>Interpretation:</strong> "Holding location constant, for every extra square meter, price increases by..."
                </p>
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
                <h3 className="text-black">Variable Selection (Don't Overcomplicate!)</h3>
                <p className="text-gray-900 mb-2">
                  Adding too many ingredients to a recipe can ruin it. Same with models.
                </p>
                <p className="text-gray-900 mb-2">
                  <strong>Goal:</strong> Find the simplest model that explains the data well (Occam's Razor).
                </p>
                <CodeBlock code={`# Stepwise selection (Let R choose for you)
library(MASS)
full_model <- lm(y ~ ., data = df)
best_model <- stepAIC(full_model, direction = "both")`} />
                <p className="text-gray-900">AIC is like a score: Lower is better!</p>
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