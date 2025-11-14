"use client";

import { useState } from 'react';
import CodeBlock from '@/components/ui/CodeBlock';

const exercises = [
  {
    challenge: "Check the normality of departure delay in airport JFK during the first 10 days of October.",
    expectedCode: `# Load data and filter
dep_delay_october_JFK <- flights %>%
  filter(origin=="JFK" & month==10 & day %in% c(1:10))

# Check normality
shapiro.test(dep_delay_october_JFK$dep_delay)
ggqqplot(dep_delay_october_JFK$dep_delay)
hist(dep_delay_october_JFK$dep_delay, breaks = 30)`,
    hint: "Use shapiro.test() for statistical test, ggqqplot() for visual check, and hist() for distribution."
  },
  {
    challenge: "Compare the humidity in November at LGA airport with 50%.",
    expectedCode: `# Filter data
humidity_november_LGA <- weather %>%
  filter(origin=="LGA" & month==11)

# Check normality first
shapiro.test(humidity_november_LGA$humid)
ggqqplot(humidity_november_LGA$humid)

# Non-parametric test since likely not normal
wilcox.test(humidity_november_LGA$humid, mu=50)`,
    hint: "Humidity data is often not normal, so use wilcox.test() instead of t.test()."
  },
  {
    challenge: "Check for outliers in arrival delay for flights to Honolulu (HNL) in March.",
    expectedCode: `# Filter flights to HNL in March
flights_HNL <- flights %>%
  filter(dest=="HNL" & month==3)

# Check outliers
grubbs.test(flights_HNL$arr_delay)
boxplot(flights_HNL$arr_delay)`,
    hint: "Use grubbs.test() from outliers package and boxplot() for visualization."
  }
];

export default function LiveExercise() {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [userCode, setUserCode] = useState('');

  const exercise = exercises[currentExercise];

  const checkCode = () => {
    // Simple check - in real app, this could parse and compare
    const similarity = userCode.toLowerCase().includes(exercise.expectedCode.split('\n')[1].toLowerCase().trim())
      ? 'Good start!' : 'Try again or check the hint.';
    alert(similarity);
  };

  return (
    <div className="my-6 border rounded-lg p-4 bg-blue-50">
      <h4 className="text-lg font-semibold mb-2">Live Coding Exercise</h4>
      <p className="text-sm text-gray-600 mb-4">
        Practice your R skills with real data challenges. Write code to solve the problem below.
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