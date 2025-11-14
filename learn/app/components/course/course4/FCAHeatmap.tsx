"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import CodeBlock from '@/components/ui/CodeBlock';
import { housetasksHeatmap } from './course4Data';

export default function FCAHeatmap() {
  return (
    <div className="my-6 border rounded-lg p-4 bg-white shadow-sm">
      <h4 className="text-xl font-semibold mb-2">Factorial Correspondence Analysis</h4>
      <p className="text-sm text-gray-600 mb-3">
        Correspondence analysis decomposes the association between households and tasks.
      </p>
      <CodeBlock code={`fca <- CA(housetasks)
fviz_eig(fca)
fviz_ca_biplot(fca)`} />

      <BarChart width={600} height={240} data={housetasksHeatmap} className="mt-4">
        <CartesianGrid />
        <XAxis dataKey="task" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="frequency" fill="#4c1d95" />
      </BarChart>
    </div>
  );
}
