"use client";

import { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Iris data for MANOVA
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

export default function ManovaVisualization() {
  const [selectedVariables, setSelectedVariables] = useState(['SepalLength', 'PetalLength']);

  const chartData = useMemo(() => {
    const speciesStats: { [key: string]: { [key: string]: number } } = { setosa: {}, versicolor: {}, virginica: {} };
    selectedVariables.forEach(varName => {
      const key = varName.replace(/([A-Z])/g, (match) => match.toLowerCase()).replace(/^./, str => str.toLowerCase());
      ['setosa', 'versicolor', 'virginica'].forEach(species => {
        const speciesData = irisData.filter(item => item.species === species);
        const values = speciesData.map(item => item[key as keyof typeof item] as number);
        speciesStats[species][varName] = values.reduce((a, b) => a + b, 0) / values.length;
      });
    });

    return [
      { species: 'setosa', ...speciesStats.setosa },
      { species: 'versicolor', ...speciesStats.versicolor },
      { species: 'virginica', ...speciesStats.virginica }
    ];
  }, [selectedVariables]);

  const handleVariableChange = (varName: string, checked: boolean) => {
    if (checked) {
      setSelectedVariables([...selectedVariables, varName]);
    } else {
      setSelectedVariables(selectedVariables.filter(v => v !== varName));
    }
  };

  return (
    <div className="my-4">
      <h4 className="text-lg font-semibold mb-2">MANOVA: Multiple Variables Across Species</h4>
      <p className="text-sm text-gray-600 mb-4">
        MANOVA tests differences across multiple dependent variables simultaneously.
      </p>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Variables:</label>
        {['SepalLength', 'SepalWidth', 'PetalLength', 'PetalWidth'].map(varName => (
          <label key={varName} className="inline-flex items-center mr-4">
            <input
              type="checkbox"
              checked={selectedVariables.includes(varName)}
              onChange={(e) => handleVariableChange(varName, e.target.checked)}
              className="mr-2"
            />
            {varName}
          </label>
        ))}
      </div>
      <BarChart width={600} height={300} data={chartData}>
        <CartesianGrid />
        <XAxis dataKey="species" />
        <YAxis />
        <Tooltip />
        <Legend />
        {selectedVariables.map((varName, index) => {
          const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300'];
          return <Bar key={varName} dataKey={varName} fill={colors[index % colors.length]} />;
        })}
      </BarChart>
      <p className="text-sm text-gray-600 mt-2">
        Bars show means for selected variables by species. MANOVA considers all variables together.
      </p>
    </div>
  );
}