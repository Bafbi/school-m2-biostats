"use client";

import { useState } from "react";
import CodeBlock from '@/components/ui/CodeBlock';
import InteractiveSelector from '@/components/ui/InteractiveSelector';
import Quiz from '@/components/quiz/Quiz';
import PolynomialModel from '@/components/course/course3/PolynomialModel';
import LogisticModel from '@/components/course/course3/LogisticModel';
import PoissonModel from '@/components/course/course3/PoissonModel';
import ExponentialModel from '@/components/course/course3/ExponentialModel';
import LogarithmicModel from '@/components/course/course3/LogarithmicModel';
import AnovaVisualization from '@/components/course/course3/AnovaVisualization';
import AncovaVisualization from '@/components/course/course3/AncovaVisualization';
import ManovaVisualization from '@/components/course/course3/ManovaVisualization';
import LiveExerciseC3 from '@/components/course/course3/LiveExerciseC3';

const quizQuestions = [
  {
    question: "What is the main difference between linear regression and logistic regression?",
    options: ["Logistic uses categorical predictors", "Logistic predicts probabilities for binary outcomes", "Logistic requires more data", "Logistic is for time series"],
    answer: 1
  },
  {
    question: "When would you use Poisson regression?",
    options: ["For continuous outcomes", "For count data", "For binary outcomes", "For time-to-event data"],
    answer: 1
  },
  {
    question: "What does ANOVA test?",
    options: ["Differences between two means", "Differences between multiple means", "Relationships between variables", "Normality of data"],
    answer: 1
  }
];

export default function Course3() {
  const [selectedModel, setSelectedModel] = useState('Polynomial');
  const [selectedAnova, setSelectedAnova] = useState('ANOVA');

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-black mb-8">Course 3: Advanced Statistical Modeling</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Introduction to Advanced Modeling</h2>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="text-black text-lg font-medium mb-2">Beyond Linear Regression</h3>
              <p className="text-gray-900 mb-2">
                Linear regression assumes a straight-line relationship and normally distributed residuals. But real-world data often violates these assumptions.
              </p>
              <p className="text-gray-900">
                <strong>Generalized Linear Models (GLMs)</strong> extend linear regression to handle different types of response variables and non-linear relationships.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="text-black text-lg font-medium mb-2">When to Use Different Models</h3>
              <ul className="list-disc list-inside text-gray-900">
                <li><strong>Polynomial Regression:</strong> Curved relationships between continuous variables</li>
                <li><strong>Logistic Regression:</strong> Binary outcomes (yes/no, success/failure)</li>
                <li><strong>Poisson Regression:</strong> Count data (number of events)</li>
                <li><strong>ANOVA/ANCOVA:</strong> Comparing means across multiple groups</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-black mb-4">Model Explorer</h2>
          <p className="text-gray-900 mb-4">
            Explore different types of statistical models. Select a model to learn more:
          </p>
          <InteractiveSelector
            options={['Polynomial', 'Logistic', 'Poisson', 'Exponential', 'Logarithmic']}
            selected={selectedModel}
            onSelect={setSelectedModel}
          >
            {(selected) => {
              switch (selected) {
                case 'Polynomial':
                  return (
                    <div>
                      <h3 className="text-black">Polynomial Regression</h3>
                      <p className="text-gray-900 mb-2">Models non-linear relationships using polynomial terms.</p>
                      <CodeBlock code={`# Example: Quadratic relationship
model <- lm(y ~ x + I(x^2), data = df)
summary(model)`} />
                      <p className="text-gray-900 mb-2">Use when scatterplot shows a curve, not a straight line.</p>
                      <PolynomialModel />
                    </div>
                  );
                case 'Logistic':
                  return (
                    <div>
                      <h3 className="text-black">Logistic Regression</h3>
                      <p className="text-gray-900 mb-2">Predicts probabilities for binary outcomes.</p>
                      <CodeBlock code={`# Example: Binary outcome
model <- glm(outcome ~ predictor, family = "binomial", data = df)
summary(model)
predict(model, type = "response")  # Get probabilities`} />
                      <p className="text-gray-900 mb-2">Output is log-odds; use predict() with type=&quot;response&quot; for probabilities.</p>
                      <LogisticModel />
                    </div>
                  );
                case 'Poisson':
                  return (
                    <div>
                      <h3 className="text-black">Poisson Regression</h3>
                      <p className="text-gray-900 mb-2">Models count data (e.g., number of events).</p>
                      <CodeBlock code={`# Example: Count outcome
model <- glm(counts ~ predictor, family = "poisson", data = df)
summary(model)`} />
                      <p className="text-gray-900 mb-2">Assumes mean equals variance; check for overdispersion.</p>
                      <PoissonModel />
                    </div>
                  );
                case 'Exponential':
                  return (
                    <div>
                      <h3 className="text-black">Exponential Models</h3>
                      <p className="text-gray-900 mb-2">For exponentially growing/decaying relationships.</p>
                      <CodeBlock code={`# Transform to linear
model <- lm(log(y) ~ x, data = df)
# Or use nls for direct fitting
model <- nls(y ~ a * exp(b * x), start = list(a=1, b=0.1))`} />
                      <p className="text-gray-900 mb-2">Use log transformation or non-linear least squares (nls).</p>
                      <ExponentialModel />
                    </div>
                  );
                case 'Logarithmic':
                  return (
                    <div>
                      <h3 className="text-black">Logarithmic Models</h3>
                      <p className="text-gray-900 mb-2">For relationships that change rapidly then slow down.</p>
                      <CodeBlock code={`# Log-linear model
model <- lm(y ~ log(x), data = df)
# Or transform y
model <- lm(log(y) ~ x, data = df)`} />
                      <p className="text-gray-900 mb-2">Common for diminishing returns or growth rates.</p>
                      <LogarithmicModel />
                    </div>
                  );
                default:
                  return null;
              }
            }}
          </InteractiveSelector>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-black mb-4">ANOVA, ANCOVA, and MANOVA</h2>
          <p className="text-gray-900 mb-4">
            Compare means across multiple groups. Select a method to learn more:
          </p>
          <div className="flex gap-2 mb-4 flex-wrap">
            {['ANOVA', 'ANCOVA', 'MANOVA'].map((method) => (
              <button
                key={method}
                onClick={() => setSelectedAnova(method)}
                className={`px-4 py-2 rounded ${selectedAnova === method ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
              >
                {method}
              </button>
            ))}
          </div>
          <div className="border rounded-lg p-4">
            {selectedAnova === 'ANOVA' && (
              <div>
                <h3 className="text-black">Analysis of Variance (ANOVA)</h3>
                <p className="text-gray-900 mb-2">Tests if means differ across 3+ groups.</p>
                <AnovaVisualization />
                <CodeBlock code={`# One-way ANOVA
result <- aov(y ~ group, data = df)
summary(result)

# Post-hoc tests
TukeyHSD(result)`} />
                <p className="text-gray-900">Assumes normality and equal variances; use Tukey HSD for pairwise comparisons.</p>
              </div>
            )}
            {selectedAnova === 'ANCOVA' && (
              <div>
                <h3 className="text-black">Analysis of Covariance (ANCOVA)</h3>
                <p className="text-gray-900 mb-2">ANOVA while controlling for a continuous covariate.</p>
                <AncovaVisualization />
                <CodeBlock code={`# ANCOVA
result <- aov(y ~ group + covariate, data = df)
summary(result)`} />
                <p className="text-gray-900">Adjusts for confounding variables; covariate should be measured, not manipulated.</p>
              </div>
            )}
            {selectedAnova === 'MANOVA' && (
              <div>
                <h3 className="text-black">Multivariate ANOVA (MANOVA)</h3>
                <p className="text-gray-900 mb-2">Tests differences across multiple dependent variables simultaneously.</p>
                <ManovaVisualization />
                <CodeBlock code={`# MANOVA
result <- manova(cbind(y1, y2) ~ group, data = df)
summary(result)`} />
                <p className="text-gray-900">More powerful than separate ANOVAs; controls for multiple testing.</p>
              </div>
            )}
          </div>
        </section>

        <LiveExerciseC3 />

        <Quiz questions={quizQuestions} />

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-black mb-4">Resources</h2>
          <p className="text-gray-900 mb-4">
            <strong>Code:</strong> R scripts for advanced models, ANOVA/ANCOVA/MANOVA in Code R & Data folder.
          </p>
          <p className="text-gray-900">
            <strong>Additional:</strong> <a href="/documents/Article_Malaria.pdf" target="_blank" className="text-blue-500 underline">Malaria Article PDF</a>
          </p>
        </section>
      </div>
    </div>
  );
}