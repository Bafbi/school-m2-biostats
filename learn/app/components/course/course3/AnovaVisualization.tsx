"use client";

import { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

// Mock ANOVA results for iris dataset
const anovaResults = {
  SepalLength: { f: 119.26, p: 0.000 },
  SepalWidth: { f: 49.16, p: 0.000 },
  PetalLength: { f: 1180.16, p: 0.000 },
  PetalWidth: { f: 960.01, p: 0.000 }
};

// Box plot data for iris
const irisData = [
  { species: 'setosa', sepalLength: 5.1, sepalWidth: 3.5, petalLength: 1.4, petalWidth: 0.2 },
  { species: 'setosa', sepalLength: 4.9, sepalWidth: 3.0, petalLength: 1.4, petalWidth: 0.2 },
  { species: 'setosa', sepalLength: 4.7, sepalWidth: 3.2, petalLength: 1.3, petalWidth: 0.2 },
  { species: 'versicolor', sepalLength: 7.0, sepalWidth: 3.2, petalLength: 4.7, petalWidth: 1.4 },
  { species: 'versicolor', sepalLength: 6.4, sepalWidth: 3.2, petalLength: 4.5, petalWidth: 1.5 },
  { species: 'versicolor', sepalLength: 6.9, sepalWidth: 3.1, petalLength: 4.9, petalWidth: 1.5 },
  { species: 'virginica', sepalLength: 6.3, sepalWidth: 3.3, petalLength: 6.0, petalWidth: 2.5 },
  { species: 'virginica', sepalLength: 5.8, sepalWidth: 2.7, petalLength: 5.1, petalWidth: 1.9 },
  { species: 'virginica', sepalLength: 7.1, sepalWidth: 3.0, petalLength: 5.9, petalWidth: 2.1 }
];

export default function AnovaVisualization() {
  const [selectedVariable, setSelectedVariable] = useState('SepalLength');

  const chartData = useMemo(() => {
    const speciesStats: { [key: string]: number[] } = { setosa: [], versicolor: [], virginica: [] };
    irisData.forEach(item => {
      const key = selectedVariable.replace(/([A-Z])/g, (match) => match.toLowerCase()).replace(/^./, str => str.toLowerCase());
      const value = item[key as keyof typeof item] as number;
      speciesStats[item.species].push(value);
    });

    return [
      { species: 'setosa', mean: speciesStats.setosa.reduce((a, b) => a + b, 0) / speciesStats.setosa.length },
      { species: 'versicolor', mean: speciesStats.versicolor.reduce((a, b) => a + b, 0) / speciesStats.versicolor.length },
      { species: 'virginica', mean: speciesStats.virginica.reduce((a, b) => a + b, 0) / speciesStats.virginica.length }
    ];
  }, [selectedVariable]);

  const result = anovaResults[selectedVariable as keyof typeof anovaResults];

  return (
    <div className="my-4">
      <h4 className="text-lg font-semibold mb-2">Interactive ANOVA with Iris Dataset</h4>
      <p className="text-sm text-gray-600 mb-4">
        Select a variable to see if iris species differ significantly.
      </p>
      <div className="mb-4">
        <label htmlFor="variable-select" className="block text-sm font-medium text-gray-700 mb-2">
          Variable: {selectedVariable}
        </label>
        <select
          id="variable-select"
          value={selectedVariable}
          onChange={(e) => setSelectedVariable(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="SepalLength">Sepal Length</option>
          <option value="SepalWidth">Sepal Width</option>
          <option value="PetalLength">Petal Length</option>
          <option value="PetalWidth">Petal Width</option>
        </select>
      </div>
      <BarChart width={600} height={300} data={chartData}>
        <CartesianGrid />
        <XAxis dataKey="species" />
        <YAxis />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Bar dataKey="mean" fill="#8884d8" />
      </BarChart>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h5 className="font-medium">ANOVA Results:</h5>
        <p className="text-sm">F-statistic: {result.f}</p>
        <p className="text-sm">p-value: {result.p}</p>
        <p className="text-sm text-gray-600">
          {result.p < 0.05 ? 'Significant differences between species!' : 'No significant differences found.'}
        </p>
      </div>
    </div>
  );
}