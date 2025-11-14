"use client";

import { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default function LogarithmicModel() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(2);

  const logData = useMemo(() => {
    const data = [];
    for (let x = 0.1; x <= 5; x += 0.2) {
      const y = a + b * Math.log(x);
      data.push({ x: parseFloat(x.toFixed(1)), y: parseFloat(y.toFixed(2)) });
    }
    return data;
  }, [a, b]);

  return (
    <div className="my-4">
      <h4 className="text-lg font-semibold mb-2">Interactive Logarithmic Model</h4>
      <p className="text-sm text-gray-600 mb-4">
        Adjust parameters to see logarithmic growth. y = {a} + {b}ln(x)
      </p>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="loga-slider" className="block text-sm font-medium text-gray-700 mb-2">
            Intercept (a): {a}
          </label>
          <input
            id="loga-slider"
            type="range"
            min="0"
            max="5"
            step="0.5"
            value={a}
            onChange={(e) => setA(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <div>
          <label htmlFor="logb-slider" className="block text-sm font-medium text-gray-700 mb-2">
            Slope (b): {b}
          </label>
          <input
            id="logb-slider"
            type="range"
            min="0.5"
            max="4"
            step="0.5"
            value={b}
            onChange={(e) => setB(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
      <LineChart width={600} height={300} data={logData}>
        <CartesianGrid />
        <XAxis dataKey="x" type="number" domain={[0, 5]} />
        <YAxis dataKey="y" type="number" domain={[0, 10]} />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Line
          type="monotone"
          dataKey="y"
          stroke="#8dd1e1"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
      <p className="text-sm text-gray-600 mt-2">
        Logarithmic models show diminishing returns - rapid increase initially, then slowing growth.
      </p>
    </div>
  );
}