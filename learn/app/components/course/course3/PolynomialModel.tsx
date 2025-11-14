"use client";

import { useState, useMemo } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Line } from 'recharts';

// Boston housing data subset (lstat vs medv)
const bostonData = [
  { lstat: 4.98, medv: 24.0 },
  { lstat: 9.14, medv: 21.6 },
  { lstat: 4.03, medv: 34.7 },
  { lstat: 2.94, medv: 33.4 },
  { lstat: 5.33, medv: 36.2 },
  { lstat: 5.21, medv: 28.7 },
  { lstat: 12.43, medv: 22.9 },
  { lstat: 19.15, medv: 27.1 },
  { lstat: 29.93, medv: 16.5 },
  { lstat: 17.10, medv: 18.9 },
  { lstat: 20.45, medv: 15.0 },
  { lstat: 13.27, medv: 18.9 },
  { lstat: 15.71, medv: 21.7 },
  { lstat: 8.26, medv: 20.4 },
  { lstat: 10.26, medv: 18.2 },
  { lstat: 8.47, medv: 19.9 },
  { lstat: 6.58, medv: 23.1 },
  { lstat: 14.67, medv: 17.5 },
  { lstat: 11.69, medv: 20.2 },
  { lstat: 11.28, medv: 18.2 },
  { lstat: 21.02, medv: 13.6 },
  { lstat: 13.83, medv: 19.6 },
  { lstat: 18.72, medv: 15.2 },
  { lstat: 19.88, medv: 14.5 },
  { lstat: 16.30, medv: 15.6 },
  { lstat: 18.13, medv: 13.9 },
  { lstat: 14.37, medv: 16.6 },
  { lstat: 9.60, medv: 14.8 },
  { lstat: 30.81, medv: 18.4 },
  { lstat: 24.08, medv: 21.0 }
];

// Fit polynomial of given degree (pre-computed for Boston data)
const fitPolynomial = (degree: number) => {
  const fits = {
    1: (x: number) => 34.55 - 0.95 * x, // linear
    2: (x: number) => 42.86 - 2.33 * x + 0.043 * x * x, // quadratic
    3: (x: number) => 35.05 - 0.18 * x - 0.032 * x * x + 0.0007 * x * x * x, // cubic
    4: (x: number) => 39.11 - 1.49 * x + 0.034 * x * x - 0.0003 * x * x * x - 0.00002 * x * x * x * x, // quartic
    5: (x: number) => 33.45 + 0.84 * x - 0.19 * x * x + 0.012 * x * x * x - 0.0003 * x * x * x * x + 0.000003 * x * x * x * x * x // quintic
  };

  const fitFunc = fits[degree as keyof typeof fits] || fits[1];
  const lineData = [];
  for (let x = 0; x <= 40; x += 1) {
    lineData.push({ lstat: x, medv: fitFunc(x) });
  }
  return lineData;
};

// Calculate RMSE
const calculateRMSE = (data: {lstat: number, medv: number}[], degree: number) => {
  const fitFunc = {
    1: (x: number) => 34.55 - 0.95 * x,
    2: (x: number) => 42.86 - 2.33 * x + 0.043 * x * x,
    3: (x: number) => 35.05 - 0.18 * x - 0.032 * x * x + 0.0007 * x * x * x,
    4: (x: number) => 39.11 - 1.49 * x + 0.034 * x * x - 0.0003 * x * x * x - 0.00002 * x * x * x * x,
    5: (x: number) => 33.45 + 0.84 * x - 0.19 * x * x + 0.012 * x * x * x - 0.0003 * x * x * x * x + 0.000003 * x * x * x * x * x
  }[degree] || ((x: number) => 34.55 - 0.95 * x);

  let sumSq = 0;
  data.forEach(point => {
    const pred = fitFunc(point.lstat);
    sumSq += (point.medv - pred) ** 2;
  });
  return Math.sqrt(sumSq / data.length);
};

export default function PolynomialModel() {
  const [degree, setDegree] = useState(1);
  const fittedLine = useMemo(() => fitPolynomial(degree), [degree]);
  const rmse = useMemo(() => calculateRMSE(bostonData, degree), [degree]);

  return (
    <div className="my-4">
      <h4 className="text-lg font-semibold mb-2">Interactive Polynomial Regression on Boston Housing</h4>
      <p className="text-sm text-gray-600 mb-4">
        Adjust the polynomial degree to fit median house value (medv) vs % lower status (lstat). Degree: {degree}, RMSE: {rmse.toFixed(2)}
      </p>
      <div className="mb-4">
        <label htmlFor="degree-slider" className="block text-sm font-medium text-gray-700 mb-2">
          Polynomial Degree: {degree}
        </label>
        <input
          id="degree-slider"
          type="range"
          min="1"
          max="5"
          value={degree}
          onChange={(e) => setDegree(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
      <ScatterChart width={600} height={300} data={bostonData}>
        <CartesianGrid />
        <XAxis dataKey="lstat" type="number" domain={[0, 40]} />
        <YAxis dataKey="medv" type="number" domain={[0, 50]} />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="Data Points" dataKey="medv" fill="#8884d8" />
        <Line
          type="monotone"
          dataKey="medv"
          data={fittedLine}
          stroke="#ff0000"
          strokeWidth={2}
          dot={false}
        />
      </ScatterChart>
      <p className="text-sm text-gray-600 mt-2">
        Degree {degree} polynomial fit. Higher degrees can overfit - notice RMSE changes. Use train/test split in practice.
      </p>
    </div>
  );
}