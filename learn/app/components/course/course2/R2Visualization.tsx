"use client";

import { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Line } from 'recharts';

// Base data points
const baseData = [
  { x: 1, y: 2 }, { x: 2, y: 4 }, { x: 3, y: 6 }, { x: 4, y: 8 }, { x: 5, y: 10 },
  { x: 6, y: 12 }, { x: 7, y: 14 }, { x: 8, y: 16 }, { x: 9, y: 18 }, { x: 10, y: 20 }
];

// Function to generate data with given R²
const generateDataWithR2 = (r2: number) => {
  const slope = 2; // True slope
  const intercept = 0; // True intercept

  return baseData.map(point => {
    const trueY = slope * point.x + intercept;
    const noise = (Math.random() - 0.5) * 4; // Random noise
    const explainedVariance = (trueY - (slope * point.x + intercept)) * Math.sqrt(r2);
    const unexplainedVariance = noise * Math.sqrt(1 - r2);
    const y = trueY + explainedVariance + unexplainedVariance;
    return { x: point.x, y: Math.round(y * 100) / 100 };
  });
};

export default function R2Visualization() {
  const [r2, setR2] = useState(0.5);

  const data = generateDataWithR2(r2);
  const slope = 2;
  const intercept = 0;
  const lineData = [
    { x: 0, y: intercept },
    { x: 11, y: slope * 11 + intercept }
  ];

  return (
    <div className="my-4">
      <h4 className="text-lg font-semibold mb-2">Interactive R² Explanation</h4>
      <p className="text-sm text-gray-600 mb-4">
        Move the slider to see how R² affects the fit. R² = {r2.toFixed(2)} (proportion of variance explained)
      </p>
      <div className="mb-4">
        <label htmlFor="r2-slider" className="block text-sm font-medium text-gray-700 mb-2">
          R² Value: {r2.toFixed(2)}
        </label>
        <input
          id="r2-slider"
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={r2}
          onChange={(e) => setR2(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
      <ScatterChart width={500} height={300} data={data}>
        <CartesianGrid />
        <XAxis dataKey="x" type="number" domain={[0, 11]} />
        <YAxis dataKey="y" type="number" domain={[-5, 25]} />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="Data Points" dataKey="y" fill="#8884d8" />
        <Line
          type="monotone"
          dataKey="y"
          data={lineData}
          stroke="#ff0000"
          strokeWidth={2}
          dot={false}
        />
      </ScatterChart>
      <p className="text-sm text-gray-600 mt-2">
        As R² increases, points cluster closer to the red regression line, meaning more variance is explained by the model.
      </p>
    </div>
  );
}