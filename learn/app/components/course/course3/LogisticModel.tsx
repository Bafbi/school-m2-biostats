"use client";

import { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default function LogisticModel() {
  const [beta0, setBeta0] = useState(0);
  const [beta1, setBeta1] = useState(1);

  const logisticData = useMemo(() => {
    const data = [];
    for (let x = -5; x <= 5; x += 0.2) {
      const logit = beta0 + beta1 * x;
      const prob = 1 / (1 + Math.exp(-logit));
      data.push({ x: parseFloat(x.toFixed(1)), probability: parseFloat(prob.toFixed(3)) });
    }
    return data;
  }, [beta0, beta1]);

  return (
    <div className="my-4">
      <h4 className="text-lg font-semibold mb-2">Interactive Logistic Regression</h4>
      <p className="text-sm text-gray-600 mb-4">
        Adjust the coefficients to see how the logistic curve changes. β₀ = {beta0}, β₁ = {beta1}. In Titanic data, use predictors like passenger class and sex for survival prediction. Evaluate with confusion matrix and AUC.
      </p>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="beta0-slider" className="block text-sm font-medium text-gray-700 mb-2">
            Intercept (β₀): {beta0}
          </label>
          <input
            id="beta0-slider"
            type="range"
            min="-3"
            max="3"
            step="0.5"
            value={beta0}
            onChange={(e) => setBeta0(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <div>
          <label htmlFor="beta1-slider" className="block text-sm font-medium text-gray-700 mb-2">
            Slope (β₁): {beta1}
          </label>
          <input
            id="beta1-slider"
            type="range"
            min="-2"
            max="2"
            step="0.2"
            value={beta1}
            onChange={(e) => setBeta1(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
      <LineChart width={600} height={300} data={logisticData}>
        <CartesianGrid />
        <XAxis dataKey="x" type="number" domain={[-5, 5]} />
        <YAxis dataKey="probability" type="number" domain={[0, 1]} />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Line
          type="monotone"
          dataKey="probability"
          stroke="#82ca9d"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
      <p className="text-sm text-gray-600 mt-2">
        The S-shaped curve shows probability of the positive outcome. β₀ shifts the curve left/right, β₁ controls steepness.
      </p>
    </div>
  );
}