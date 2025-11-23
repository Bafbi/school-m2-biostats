"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CodeBlock from '@/components/ui/CodeBlock';
import { housetasksHeatmap } from './course4Data';

export default function FCAHeatmap() {
  return (
    <div className="my-6 border rounded-lg p-4 bg-white shadow-sm h-full flex flex-col">
      <h4 className="text-xl font-semibold mb-2">Factorial Correspondence Analysis</h4>
      <p className="text-sm text-gray-600 mb-3">
        Correspondence analysis decomposes the association between households and tasks.
      </p>
      <CodeBlock code={`fca <- CA(housetasks)
fviz_eig(fca)
fviz_ca_biplot(fca)`} />

      <div className="h-[250px] w-full mt-4 flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={housetasksHeatmap}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="task" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="frequency" fill="#4c1d95" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
