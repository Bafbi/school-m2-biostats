"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import CodeBlock from '@/components/ui/CodeBlock';
import { hobbiesContributions, hobbiesAxes } from './course4Data';

export default function MCAInteractive() {
  return (
    <div className="my-6 border rounded-lg p-4 bg-white shadow-sm">
      <h4 className="text-xl font-semibold mb-2">Multiple Correspondence Analysis</h4>
      <p className="text-sm text-gray-600 mb-3">
        MCA reveals relationships between categorical hobbies variables across axis contributions.
      </p>
      <CodeBlock code={`res.mca <- MCA(hobbies, quali.sup = 19:22)
fviz_eig(res.mca)
fviz_mca_var(res.mca)`} />

      <BarChart width={600} height={220} data={hobbiesAxes} className="mt-4">
        <CartesianGrid />
        <XAxis dataKey="axis" />
        <YAxis />
        <Tooltip formatter={(value: number) => `${value}% inertia`} />
        <Bar dataKey="inertia" fill="#14b8a6" />
      </BarChart>

      <BarChart width={600} height={220} data={hobbiesContributions} layout="vertical" className="mt-4">
        <CartesianGrid />
        <XAxis type="number" />
        <YAxis dataKey="label" type="category" />
        <Tooltip />
        <Bar dataKey="value" fill="#0ea5e9" />
      </BarChart>
    </div>
  );
}
