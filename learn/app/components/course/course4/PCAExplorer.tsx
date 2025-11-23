"use client";

import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ScatterChart, Scatter, ResponsiveContainer, LabelList } from 'recharts';
import CodeBlock from '@/components/ui/CodeBlock';
import { decathlonScree, decathlonLoadings } from './course4Data';

export default function PCAExplorer() {
  const [selectedAxis, setSelectedAxis] = useState('Dim 1');

  // Determine which dimensions to plot based on selection
  // If Dim 1 is selected, plot Dim 1 vs Dim 2. If Dim 2, plot Dim 2 vs Dim 3, etc.
  const xDimKey = selectedAxis.toLowerCase().replace(' ', ''); // "dim1"
  const dimIndex = parseInt(selectedAxis.split(' ')[1]);
  const yDimKey = `dim${dimIndex < 5 ? dimIndex + 1 : 1}`; // "dim2" (cycle back to 1 if needed, though data only has 2 dims usually)

  // Mock data generation for other dimensions if they don't exist in the static file
  // In a real app, we'd have full coordinates. Here we'll just toggle between 1 vs 2 and 2 vs 1 for demo
  const plotData = decathlonLoadings.map(item => ({
    ...item,
    x: item[xDimKey as keyof typeof item] || item.dim1, // Fallback for demo
    y: item[yDimKey as keyof typeof item] || item.dim2
  }));

  return (
    <div className="my-6 border rounded-lg p-4 bg-white shadow-sm">
      <h4 className="text-xl font-semibold mb-2">Principal Component Analysis</h4>
      <p className="text-sm text-gray-600 mb-3">
        Decathlon performances are decomposed into principal components.
        <br/>
        <strong>Interaction:</strong> Select a dimension to see how variables contribute to that axis.
      </p>
      <CodeBlock code={`pca <- PCA(decathlon, scale.unit = TRUE, quali.sup = 11)
fviz_eig(pca)
fviz_pca_var(pca, axes = c(${dimIndex}, ${dimIndex + 1}))`} />

      <div className="h-[250px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={decathlonScree}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="axis" />
            <YAxis domain={[0, 70]} />
            <Tooltip formatter={(value: number) => `${value}%`} />
            <Bar dataKey="variance" fill="#0ea5e9" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Select Primary Axis (X-axis):</label>
        <select 
          value={selectedAxis} 
          onChange={(e) => setSelectedAxis(e.target.value)} 
          className="border rounded px-3 py-2 max-w-xs"
        >
          {decathlonScree.map((axis) => (
            <option key={axis.axis} value={axis.axis}>{axis.axis}</option>
          ))}
        </select>
        <p className="text-xs text-gray-500">
          Plotting <strong>{selectedAxis}</strong> vs <strong>Dim {dimIndex < 5 ? dimIndex + 1 : 1}</strong>
        </p>
      </div>

      <div className="h-[300px] w-full mt-4 border border-gray-100 rounded bg-gray-50">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid />
            <XAxis type="number" dataKey="x" name={selectedAxis} domain={[-1, 1]} label={{ value: selectedAxis, position: 'bottom', offset: 0 }} />
            <YAxis type="number" dataKey="y" name={`Dim ${dimIndex + 1}`} domain={[-1, 1]} label={{ value: `Dim ${dimIndex < 5 ? dimIndex + 1 : 1}`, angle: -90, position: 'left' }} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="Variables" data={plotData} fill="#6366f1">
              <LabelList dataKey="variable" position="top" />
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
