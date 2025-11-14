"use client";

import { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default function ExponentialModel() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(0.5);

  const expData = useMemo(() => {
    const data = [];
    for (let x = 0; x <= 5; x += 0.2) {
      const y = a * Math.exp(b * x);
      data.push({ x: parseFloat(x.toFixed(1)), y: parseFloat(y.toFixed(2)) });
    }
    return data;
  }, [a, b]);

  return (
    <div className="my-4">
      <h4 className="text-lg font-semibold mb-2">Interactive Exponential Model</h4>
      <p className="text-sm text-gray-600 mb-4">
        Adjust parameters to see exponential growth/decay. y = {a}e^({b}x)
      </p>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="a-slider" className="block text-sm font-medium text-gray-700 mb-2">
            Initial Value (a): {a}
          </label>
          <input
            id="a-slider"
            type="range"
            min="0.1"
            max="3"
            step="0.1"
            value={a}
            onChange={(e) => setA(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <div>
          <label htmlFor="b-slider" className="block text-sm font-medium text-gray-700 mb-2">
            Growth Rate (b): {b}
          </label>
          <input
            id="b-slider"
            type="range"
            min="-1"
            max="1"
            step="0.1"
            value={b}
            onChange={(e) => setB(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
      <LineChart width={600} height={300} data={expData}>
        <CartesianGrid />
        <XAxis dataKey="x" type="number" domain={[0, 5]} />
        <YAxis dataKey="y" type="number" domain={[0, 20]} />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Line
          type="monotone"
          dataKey="y"
          stroke="#ff7300"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
      <p className="text-sm text-gray-600 mt-2">
        Exponential models show rapid growth (b &gt; 0) or decay (b &lt; 0). Use log transformation for linear fitting.
      </p>
    </div>
  );
}