"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CodeBlock from '@/components/ui/CodeBlock';
import { hobbiesContributions, hobbiesAxes } from './course4Data';

export default function MCAInteractive() {
  return (
    <div className="my-6 border rounded-lg p-4 bg-white shadow-sm h-full flex flex-col">
      <h4 className="text-xl font-semibold mb-2">Multiple Correspondence Analysis</h4>
      <p className="text-sm text-gray-600 mb-3">
        MCA reveals relationships between categorical hobbies variables across axis contributions.
      </p>
      <CodeBlock code={`res.mca <- MCA(hobbies, quali.sup = 19:22)
fviz_eig(res.mca)
fviz_mca_var(res.mca)`} />

      <div className="h-[200px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={hobbiesAxes}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="axis" />
            <YAxis />
            <Tooltip formatter={(value: number) => `${value}% inertia`} />
            <Bar dataKey="inertia" fill="#14b8a6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="h-[250px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={hobbiesContributions} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="label" type="category" width={80} />
            <Tooltip />
            <Bar dataKey="value" fill="#0ea5e9" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
