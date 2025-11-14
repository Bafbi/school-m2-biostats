"use client";

import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ScatterChart, Scatter } from 'recharts';
import CodeBlock from '@/components/ui/CodeBlock';
import { decathlonScree, decathlonLoadings } from './course4Data';

export default function PCAExplorer() {
  const [selectedAxis, setSelectedAxis] = useState('Dim 1');

  return (
    <div className="my-6 border rounded-lg p-4 bg-white shadow-sm">
      <h4 className="text-xl font-semibold mb-2">Principal Component Analysis</h4>
      <p className="text-sm text-gray-600 mb-3">
        Decathlon performances are decomposed into principal components that maximize variance.
      </p>
      <CodeBlock code={`pca <- PCA(decathlon, scale.unit = TRUE, quali.sup = 11)
fviz_eig(pca)
fviz_pca_var(pca)`} />

      <BarChart width={600} height={220} data={decathlonScree} className="mt-4">
        <CartesianGrid />
        <XAxis dataKey="axis" />
        <YAxis domain={[0, 70]} />
        <Tooltip formatter={(value: number) => `${value}%`} />
        <Bar dataKey="variance" fill="#0ea5e9" />
      </BarChart>

      <div className="mt-4 flex flex-col gap-2">
        <label className="text-sm text-gray-600">Select axis summary</label>
        <select value={selectedAxis} onChange={(e) => setSelectedAxis(e.target.value)} className="border rounded px-3 py-2">
          {decathlonScree.map((axis) => (
            <option key={axis.axis} value={axis.axis}>{axis.axis}</option>
          ))}
        </select>
      </div>

      <ScatterChart width={600} height={220} className="mt-4">
        <CartesianGrid />
        <XAxis dataKey="dim1" type="number" domain={[-1, 1]} />
        <YAxis dataKey="dim2" type="number" domain={[-1, 1]} />
        <Tooltip />
        <Scatter data={decathlonLoadings} fill="#6366f1" />
      </ScatterChart>
    </div>
  );
}
