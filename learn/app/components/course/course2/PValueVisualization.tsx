"use client";

import { useState } from 'react';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Area, ComposedChart } from 'recharts';

// Generate normal distribution data points
const generateNormalData = (mean: number = 0, std: number = 1, points: number = 100) => {
  const data = [];
  const min = mean - 4 * std;
  const max = mean + 4 * std;
  const step = (max - min) / points;

  for (let x = min; x <= max; x += step) {
    const y = (1 / (std * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * ((x - mean) / std) ** 2);
    data.push({ x: x.toFixed(2), y: y.toFixed(4), rawX: x });
  }
  return data;
};

const normalData = generateNormalData();

interface PValueVisualizationProps {
  alpha?: number;
  pValue?: number;
}

export default function PValueVisualization({ alpha = 0.05, pValue = 0.02 }: PValueVisualizationProps) {
  const [hovered, setHovered] = useState<'alpha' | 'pvalue' | null>(null);

  // Calculate critical values
  const zAlpha = 1.645; // For alpha = 0.05, one-tailed
  const zPValue = 2.05; // Example p-value corresponding to z=2.05

  // Data for alpha area (right tail)
  const alphaAreaData = normalData.filter(point => point.rawX > zAlpha);

  // Data for p-value area (right tail, more extreme)
  const pValueAreaData = normalData.filter(point => point.rawX > zPValue);

  return (
    <div className="my-4">
      <h4 className="text-lg font-semibold mb-2">Interactive P-Value and α Visualization</h4>
      <p className="text-sm text-gray-600 mb-4">
        Hover over &quot;p-value&quot; or &quot;&alpha;&quot; to see the corresponding rejection regions.
      </p>
      <div className="flex gap-4 mb-4">
        <button
          onMouseEnter={() => setHovered('alpha')}
          onMouseLeave={() => setHovered(null)}
          className="px-3 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200"
        >
          &alpha; = {alpha}
        </button>
        <button
          onMouseEnter={() => setHovered('pvalue')}
          onMouseLeave={() => setHovered(null)}
          className="px-3 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
        >
          p-value = {pValue}
        </button>
      </div>
      <ComposedChart width={600} height={300} data={normalData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="y" stroke="#8884d8" strokeWidth={2} dot={false} />
        {hovered === 'alpha' && (
          <Area
            type="monotone"
            dataKey="y"
            data={alphaAreaData}
            stroke="#ff0000"
            fill="#ff0000"
            fillOpacity={0.3}
          />
        )}
        {hovered === 'pvalue' && (
          <Area
            type="monotone"
            dataKey="y"
            data={pValueAreaData}
            stroke="#0000ff"
            fill="#0000ff"
            fillOpacity={0.3}
          />
        )}
      </ComposedChart>
      <p className="text-sm text-gray-600 mt-2">
        {hovered === 'alpha' && "The red area shows the rejection region for &alpha; (Type I error rate)."}
        {hovered === 'pvalue' && "The blue area shows where the observed p-value falls (more extreme than &alpha;, so reject H0)."}
      </p>
    </div>
  );
}