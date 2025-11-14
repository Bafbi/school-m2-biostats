"use client";

import { useState } from 'react';
import CodeBlock from '@/components/ui/CodeBlock';

const exercises = [
  {
    challenge: "Fit a logistic regression model to predict survival in the Titanic dataset using passenger class and sex.",
    expectedCode: `# Load data
library(titanic)
data("titanic_train")

# Fit logistic model
model <- glm(Survived ~ Pclass + Sex, data = titanic_train, family = "binomial")
summary(model)

# Get odds ratios
exp(coef(model))`,
    hint: "Use glm() with family='binomial'. Survived is the outcome variable."
  },
  {
    challenge: "Perform ANOVA to compare sepal lengths across iris species.",
    expectedCode: `# Load iris data
data(iris)

# ANOVA
result <- aov(Sepal.Length ~ Species, data = iris)
summary(result)

# Post-hoc test
TukeyHSD(result)`,
    hint: "Use aov() function and check the summary. Use TukeyHSD() for pairwise comparisons."
  },
  {
    challenge: "Fit a Poisson regression to model the number of carburetors in mtcars based on horsepower.",
    expectedCode: `# Load mtcars
data(mtcars)

# Poisson model
model <- glm(carb ~ hp, data = mtcars, family = "poisson")
summary(model)

# Check for overdispersion
library(AER)
dispersiontest(model)`,
    hint: "Use glm() with family='poisson'. Check dispersion with AER package."
  },
  {
    challenge: "Fit a quadratic polynomial regression to the relationship between mpg and horsepower in mtcars.",
    expectedCode: `# Load data
data(mtcars)

# Quadratic model
model <- lm(mpg ~ hp + I(hp^2), data = mtcars)
summary(model)

# Plot
plot(mtcars$hp, mtcars$mpg)
lines(sort(mtcars$hp), predict(model)[order(mtcars$hp)])`,
    hint: "Use lm() with I(hp^2) for quadratic term. Use plot() and lines() to visualize."
  }
];

export default function LiveExerciseC3() {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [userCode, setUserCode] = useState('');

  const exercise = exercises[currentExercise];

  const checkCode = () => {
    const keyTokens = ['glm', 'family', 'binomial', 'summary', 'predict', 'lm', 'aov', 'TukeyHSD', 'anova'];
    const hasKey = keyTokens.some(token => userCode.toLowerCase().includes(token));
    const similarity = hasKey ? 'Good, includes key R functions!' : 'Try again, include key modelling functions like glm, lm, summary.';
    alert(similarity);
  };

  return (
    <div className="my-6 border rounded-lg p-4 bg-blue-50">
      <h4 className="text-lg font-semibold mb-2">Live Coding Exercise - Course 3</h4>
      <p className="text-sm text-gray-600 mb-4">
        Practice advanced modeling skills with real data challenges. Write code to solve the problem below.
      </p>

      <div className="mb-4">
        <h5 className="font-medium">Challenge {currentExercise + 1}:</h5>
        <p className="text-gray-800">{exercise.challenge}</p>
        <button
          onClick={() => setShowSolution(!showSolution)}
          className="text-sm text-blue-600 underline mt-1"
        >
          {showSolution ? 'Hide Hint' : 'Show Hint'}
        </button>
        {showSolution && (
          <p className="text-sm text-gray-600 mt-1 italic">{exercise.hint}</p>
        )}
      </div>

      <textarea
        value={userCode}
        onChange={(e) => setUserCode(e.target.value)}
        placeholder="Write your R code here..."
        className="w-full h-32 p-2 border rounded font-mono text-sm"
      />

      <div className="flex gap-2 mt-2">
        <button
          onClick={checkCode}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Check My Code
        </button>
        <button
          onClick={() => setShowSolution(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Show Solution
        </button>
        <button
          onClick={() => {
            setCurrentExercise((currentExercise + 1) % exercises.length);
            setShowSolution(false);
            setUserCode('');
          }}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Next Exercise
        </button>
      </div>

      {showSolution && (
        <div className="mt-4">
          <h5 className="font-medium">Expected Solution:</h5>
          <CodeBlock code={exercise.expectedCode} />
        </div>
      )}
    </div>
  );
}