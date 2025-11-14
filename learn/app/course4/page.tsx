"use client";

import { useState } from 'react';
import CodeBlock from '@/components/ui/CodeBlock';
import InteractiveSelector from '@/components/ui/InteractiveSelector';
import Quiz from '@/components/quiz/Quiz';
import DecisionTreeLab from '@/components/course/course4/DecisionTreeLab';
import PCAExplorer from '@/components/course/course4/PCAExplorer';
import MCAInteractive from '@/components/course/course4/MCAInteractive';
import FCAHeatmap from '@/components/course/course4/FCAHeatmap';
import FAMDExplorer from '@/components/course/course4/FAMDExplorer';
import KMeansPlayground from '@/components/course/course4/KMeansPlayground';
import LDAVisualizer from '@/components/course/course4/LDAVisualizer';
import LiveExerciseC4 from '@/components/course/course4/LiveExerciseC4';

const quizQuestions = [
  {
    question: 'What does the cp plot help you decide when tuning a decision tree?',
    options: [
      'Which predictors to drop',
      'When to stop splitting to avoid overfitting',
      'How many principal components to keep',
      'How to center the data before scaling'
    ],
    answer: 1
  },
  {
    question: 'Why use PCA before clustering?',
    options: [
      'PCA gives discrete labels used by k-means',
      'It reduces noise and captures variance in fewer dimensions',
      'It automatically chooses the number of clusters',
      'It is the same as LDA'
    ],
    answer: 1
  },
  {
    question: 'Which datasets are used for MCA/FCA/FAMD in the demos?',
    options: [
      'Titanic and mtcars',
      'Hobbies and housetasks, plus wine descriptors',
      'Iris only',
      'Decathlon and Titanic'
    ],
    answer: 1
  },
  {
    question: 'How does LDA differ from PCA?',
    options: [
      'LDA is unsupervised, PCA is supervised',
      'LDA finds axes that separate classes, PCA maximizes variance',
      'Both methods are identical',
      'PCA always beats LDA'
    ],
    answer: 1
  }
];

export default function Course4() {
  const [selectedStory, setSelectedStory] = useState('Decision Tree');

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        <header>
          <h1 className="text-3xl font-bold text-black">Course 4: Exploratory & Multivariate Analysis</h1>
          <p className="text-lg text-gray-700 mt-2">
            Decision trees, factorial analyses, clustering, and discriminant methods unlock structure in complex datasets.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Model Navigator</h2>
          <p className="text-gray-700">Pick a story to see the hands-on workflow that mirrors the R demos.</p>
          <InteractiveSelector
            options={['Decision Tree', 'Dimension Reduction', 'Clustering & LDA']}
            selected={selectedStory}
            onSelect={setSelectedStory}
          >
            {(active) => {
              switch (active) {
                case 'Decision Tree':
                  return <DecisionTreeLab />;
                case 'Dimension Reduction':
                  return (
                    <div className="space-y-6">
                      <PCAExplorer />
                      <MCAInteractive />
                      <FCAHeatmap />
                      <FAMDExplorer />
                    </div>
                  );
                case 'Clustering & LDA':
                  return (
                    <div className="space-y-6">
                      <KMeansPlayground />
                      <LDAVisualizer />
                    </div>
                  );
                default:
                  return null;
              }
            }}
          </InteractiveSelector>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Practice Setup</h2>
          <p className="text-gray-700">
            Follow the demos to recreate PCA, k-means, and LDA analyses. Code snippets from the R scripts are shown alongside each activity.
          </p>
          <LiveExerciseC4 />
        </section>

        <Quiz questions={quizQuestions} />

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Resources</h2>
          <p className="text-gray-700">
            <strong>Code:</strong> See the Course 4 scripts in the Code R & Data folder (decision_tree, pca, kmeans, lda, mca, famd). 
          </p>
          <p className="text-gray-700">
            <strong>Slides:</strong> Consult the PowerPoint deck for visual explanations of PCA/FCA/FAMD diagrams.
          </p>
          <CodeBlock code={`# Example: Decision tree
Titanic <- carData::TitanicSurvival
train <- Titanic[sample(nrow(Titanic), 0.8 * nrow(Titanic)), ]
tree <- rpart::rpart(survived ~ ., data = train)
caret::confusionMatrix(...)`} />
        </section>
      </div>
    </div>
  );
}
