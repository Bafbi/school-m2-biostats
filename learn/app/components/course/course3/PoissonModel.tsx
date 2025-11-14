"use client";

import { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

// Poisson PMF
const poissonPMF = (k: number, lambda: number) => {
  return (Math.exp(-lambda) * Math.pow(lambda, k)) / factorial(k);
};

const factorial = (n: number): number => {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
};

export default function PoissonModel() {
  const [lambda, setLambda] = useState(2);

  const poissonData = useMemo(() => {
    const data = [];
    for (let k = 0; k <= 10; k++) {
      const prob = poissonPMF(k, lambda);
      data.push({ count: k, probability: parseFloat(prob.toFixed(4)) });
    }
    return data;
  }, [lambda]);

  return (
    <div className="my-4">
      <h4 className="text-lg font-semibold mb-2">Interactive Poisson Distribution</h4>
      <p className="text-sm text-gray-600 mb-4">
        Adjust λ (lambda) to see how the distribution of counts changes. λ = {lambda}
      </p>
      <div className="mb-4">
        <label htmlFor="lambda-slider" className="block text-sm font-medium text-gray-700 mb-2">
          Rate Parameter (λ): {lambda}
        </label>
        <input
          id="lambda-slider"
          type="range"
          min="0.5"
          max="5"
          step="0.5"
          value={lambda}
          onChange={(e) => setLambda(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
      <BarChart width={600} height={300} data={poissonData}>
        <CartesianGrid />
        <XAxis dataKey="count" />
        <YAxis dataKey="probability" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Bar dataKey="probability" fill="#ffc658" />
      </BarChart>
      <p className="text-sm text-gray-600 mt-2">
        Poisson distribution for count data (e.g., Ornstein interlocks). λ is both the mean and variance. Check for overdispersion (variance &gt; mean) - use quasi-Poisson or negative binomial if needed.
      </p>
    </div>
  );
}