"use client";

import CodeBlock from '@/components/ui/CodeBlock';
import Quiz from '@/components/quiz/Quiz';
import DecisionTreeLab from '@/components/course/course4/DecisionTreeLab';
import PCAExplorer from '@/components/course/course4/PCAExplorer';
import MCAInteractive from '@/components/course/course4/MCAInteractive';
import FCAHeatmap from '@/components/course/course4/FCAHeatmap';
import FAMDExplorer from '@/components/course/course4/FAMDExplorer';
import KMeansPlayground from '@/components/course/course4/KMeansPlayground';
import LDAVisualizer from '@/components/course/course4/LDAVisualizer';
import ComparisonTable from '@/components/course/course4/ComparisonTable';

const quizQuestions = [
  {
    question: 'What is the primary goal of Principal Component Analysis (PCA)?',
    options: [
      'To classify data into known groups',
      'To reduce dimensions while retaining variance',
      'To find non-linear relationships',
      'To predict categorical outcomes'
    ],
    answer: 1,
    explanation: 'PCA reduces the dimensionality of a dataset while preserving as much statistical information (variance) as possible.'
  },
  {
    question: 'Which plot helps determine how many principal components to keep?',
    options: [
      'Biplot',
      'Scatter plot',
      'Scree plot',
      'Box plot'
    ],
    answer: 2,
    explanation: 'A Scree Plot displays the eigenvalues (variance explained) for each component, helping to identify the "elbow" where adding more components yields diminishing returns.'
  },
  {
    question: 'What is the key difference between Classification and Clustering?',
    options: [
      'Classification is unsupervised, Clustering is supervised',
      'Classification uses labeled data, Clustering uses unlabeled data',
      'Clustering is only for text data',
      'There is no difference'
    ],
    answer: 1,
    explanation: 'Classification is supervised learning (we know the labels), while Clustering is unsupervised learning (we want to find natural groups in unlabeled data).'
  },
  {
    question: 'Which method is suitable for analyzing datasets with BOTH continuous and categorical variables?',
    options: [
      'PCA',
      'MCA',
      'FAMD',
      'LDA'
    ],
    answer: 2,
    explanation: 'FAMD (Factor Analysis of Mixed Data) is specifically designed to handle datasets containing both quantitative and qualitative variables.'
  },
  {
    question: 'In Decision Trees, what is "Pruning" used for?',
    options: [
      'To increase the depth of the tree',
      'To prevent overfitting by cutting back deep branches',
      'To normalize the data',
      'To calculate eigenvalues'
    ],
    answer: 1,
    explanation: 'Pruning removes parts of the tree that are too complex and likely fitting noise (overfitting), improving the model\'s ability to generalize to new data.'
  }
];

export default function Course4() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header */}
        <header className="border-b pb-8">
          <h1 className="text-4xl font-bold text-gray-900">Course 4: Statistical Modeling & Multivariate Analysis</h1>
          <p className="text-xl text-gray-600 mt-4">
            Biostatistics #4 / Statistical Modeling #3
          </p>
          <p className="text-lg text-gray-700 mt-4">
            This course provides an in-depth look at multivariate statistical techniques used to analyze complex datasets. 
            It covers <strong>Dimension Reduction</strong> (Unsupervised Learning) and <strong>Classification/Clustering</strong>.
          </p>
        </header>

        {/* Module 1: PCA */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 border-l-4 border-blue-500 pl-4">Module 1: Principal Component Analysis (PCA)</h2>
          
          <div className="prose max-w-none text-gray-700">
            <h3 className="text-xl font-semibold text-gray-900">1.1 Introduction & Core Concepts</h3>
            <p>
              PCA is a powerful tool for dimension reduction, allowing you to reduce a dataset with many variables to fewer "principal components" 
              while retaining as much information (variance) as possible.
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Goal:</strong> Uncorrelate strongly linked variables and project them into a new space.</li>
              <li><strong>Input:</strong> Strictly <strong>continuous variables</strong>.</li>
              <li><strong>Scaling:</strong> Crucial to scale values so high-variance variables don't dominate.</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-4">1.2 The Mathematics</h3>
            <p>
              <strong>Eigenvalues</strong> represent the amount of variance explained by each Principal Component (PC). 
              The first PC spans the greatest variance, and the second is orthogonal to the first.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-4">1.3 Visualization</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Scree Plot:</strong> Displays variability explained by each PC.</li>
              <li><strong>Variables Plot (Correlation Circle):</strong> Arrows indicate correlation (same direction = correlated, orthogonal = uncorrelated).</li>
              <li><strong>Individuals Plot:</strong> Maps data points onto factorial planes.</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Interactive Demo: PCA on Decathlon Data</h3>
            <PCAExplorer />
          </div>
        </section>

        {/* Module 2: Other Factor Analyses */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 border-l-4 border-purple-500 pl-4">Module 2: Other Factor Analyses</h2>
          <p className="text-gray-700">
            While PCA handles continuous data, other methods are required for categorical or mixed data.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">2.1 Factor Correspondence Analysis (FCA)</h3>
              <p className="text-gray-700">
                Studies the link between <strong>two categorical variables</strong> (contingency tables). 
                Uses Chi-square metric to measure "drift from independence".
              </p>
              <FCAHeatmap />
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">2.2 Multiple Correspondence Analysis (MCA)</h3>
              <p className="text-gray-700">
                Extension of FCA for <strong>more than two</strong> categorical variables. 
                Input is often a complete disjunctive table.
              </p>
              <MCAInteractive />
            </div>
          </div>

          <div className="space-y-4 mt-8">
            <h3 className="text-xl font-semibold text-gray-900">2.3 Factor Analysis of Mixed Data (FAMD)</h3>
            <p className="text-gray-700">
              Analyzes datasets with <strong>both</strong> continuous and categorical variables.
            </p>
            <FAMDExplorer />
          </div>
        </section>

        {/* Module 3: Classification vs Clustering */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 border-l-4 border-green-500 pl-4">Module 3: Classification & Clustering Fundamentals</h2>
          
          <div className="prose max-w-none text-gray-700">
            <h3 className="text-xl font-semibold text-gray-900">3.1 The Distinction</h3>
            <p>
              The main difference lies in whether the data is labeled (known answer) or unlabeled.
            </p>
            <ComparisonTable />

            <h3 className="text-xl font-semibold text-gray-900 mt-6">3.2 Evaluation Metrics</h3>
            <p>For classification, we use a <strong>Confusion Matrix</strong>:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Sensitivity (True Positive Rate):</strong> TP / (TP + FN)</li>
              <li><strong>Specificity (True Negative Rate):</strong> TN / (TN + FP)</li>
            </ul>
          </div>
        </section>

        {/* Module 4: Supervised Learning */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 border-l-4 border-orange-500 pl-4">Module 4: Supervised Learning Methods</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">4.1 Linear Discriminant Analysis (LDA)</h3>
              <p className="text-gray-700 mb-4">
                Finds the best linear combination of continuous variables that creates the most distinct boundaries between known groups.
                Assumes normal distribution and homoscedasticity.
              </p>
              <LDAVisualizer />
            </div>

            <div className="border-t pt-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">4.2 Decision Trees (CART)</h3>
              <p className="text-gray-700 mb-4">
                Creates a flowchart-like structure to classify individuals. 
                <strong>Pruning</strong> is used to cut back deep branches to prevent overfitting and improve generalization.
              </p>
              <DecisionTreeLab />
            </div>
          </div>
        </section>

        {/* Module 5: Unsupervised Learning */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 border-l-4 border-teal-500 pl-4">Module 5: Unsupervised Learning</h2>
          
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">5.1 K-Means Clustering</h3>
            <p className="text-gray-700 mb-4">
              Partitions a dataset into <strong>K</strong> distinct subgroups. 
              The <strong>Elbow Method</strong> is used to find the optimal number of clusters (K).
            </p>
            <KMeansPlayground />
          </div>
        </section>

        {/* Practical Lab Guide */}
        <section className="space-y-6 bg-gray-50 p-8 rounded-xl">
          <h2 className="text-2xl font-bold text-gray-900">Practical Lab Guide (R Summary)</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Dimension Reduction</h4>
              <CodeBlock code={`# PCA
res.pca <- PCA(data, scale.unit = TRUE, graph = FALSE)
fviz_eig(res.pca)             # Scree plot
fviz_pca_var(res.pca)         # Variable plot

# MCA
res.mca <- MCA(categorical_dataset)

# FAMD
res.famd <- FAMD(mixed_dataset)`} />
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Classification & Clustering</h4>
              <CodeBlock code={`# LDA
library(MASS)
model <- lda(Class ~ ., data = training_data)

# K-Means
fviz_nbclust(data, kmeans, method = "wss") # Find K
final <- kmeans(data, centers = 4)

# Decision Trees
tree <- rpart(Outcome ~ ., data = data)
plotcp(tree) # Check for pruning`} />
            </div>
          </div>
        </section>

        <Quiz questions={quizQuestions} />
      </div>
    </div>
  );
}
