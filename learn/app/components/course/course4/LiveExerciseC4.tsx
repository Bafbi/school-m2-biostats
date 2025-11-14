"use client";

import { useState } from 'react';
import CodeBlock from '@/components/ui/CodeBlock';

const exercises = [
  {
    challenge: 'Use PCA on the decathlon dataset and plot the contribution of variables to the first two components.',
    expectedCode: `# PCA
pca <- PCA(decathlon, scale.unit = TRUE, quali.sup = 11)
fviz_contrib(pca, choice = "var", axes = 1)
fviz_pca_var(pca)`,
    hint: 'Use PCA() from FactoMineR and fviz_contrib/fviz_pca_var from factoextra.'
  },
  {
    challenge: 'Cluster the iris data using k-means with 3 centers and visualize the elbow method.',
    expectedCode: `res.km <- kmeans(scale(iris[, -5]), centers = 3, nstart = 25)
fviz_nbclust(iris[, -5], FUNcluster = kmeans, method = "wss")
fviz_cluster(res.km, data = iris[, -5])`,
    hint: 'Use scale() before kmeans and inspect the wss elbow plot.'
  },
  {
    challenge: 'Run LDA on iris and compare the confusion matrix between training and testing sets.',
    expectedCode: `training <- iris[ind == 1, ]
testing <- iris[ind == 2, ]
LDA <- lda(Species ~ ., training)
pred <- predict(LDA, testing)$class
caret::confusionMatrix(table(pred, testing$Species))`,
    hint: 'Partition the data, fit lda, then use caret::confusionMatrix.'
  }
];

export default function LiveExerciseC4() {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [userCode, setUserCode] = useState('');
  const exercise = exercises[currentExercise];

  const checkCode = () => {
    const tokens = ['pca', 'fviz', 'kmeans', 'lda', 'confusionmatrix'];
    const hasToken = tokens.some((token) => userCode.toLowerCase().includes(token));
    const message = hasToken ? 'Good job mentioning key functions!' : 'Try including PCA/kmeans/lda keywords.';
    alert(message);
  };

  return (
    <div className="my-8 border rounded-lg p-4 bg-blue-50">
      <h4 className="text-xl font-semibold mb-2">Live Coding - Course 4</h4>
      <p className="text-sm text-gray-700 mb-3">Practice multivariate methods taken from the R demos.</p>

      <div className="mb-3">
        <h5 className="font-medium">Challenge {currentExercise + 1}</h5>
        <p className="text-gray-800 mb-1">{exercise.challenge}</p>
        <button
          onClick={() => setShowSolution((prev) => !prev)}
          className="text-sm text-blue-600 underline"
        >
          {showSolution ? 'Hide hint' : 'Show hint'}
        </button>
        {showSolution && <p className="text-sm italic text-gray-600 mt-1">{exercise.hint}</p>}
      </div>

      <textarea
        value={userCode}
        onChange={(e) => setUserCode(e.target.value)}
        placeholder="Write your R script here..."
        className="w-full h-32 border rounded font-mono text-sm p-2"
      />

      <div className="flex gap-2 mt-3">
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
          Show Expected Solution
        </button>
        <button
          onClick={() => {
            setCurrentExercise((currentExercise + 1) % exercises.length);
            setShowSolution(false);
            setUserCode('');
          }}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Next Challenge
        </button>
      </div>

      {showSolution && (
        <div className="mt-4">
          <h5 className="font-medium">Solution outline</h5>
          <CodeBlock code={exercise.expectedCode} />
        </div>
      )}
    </div>
  );
}
