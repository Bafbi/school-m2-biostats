import React from 'react';

export default function ComparisonTable() {
  return (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feature</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Classification</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clustering</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Learning Type</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Supervised</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Unsupervised</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Input Data</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Labeled</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Unlabeled</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Output</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Known classes</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Unknown groups</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Goal</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Predict the class of new data</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Find natural structures/groups</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Examples</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">SVM, Decision Trees, LDA</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">K-Means, Hierarchical Clustering</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
