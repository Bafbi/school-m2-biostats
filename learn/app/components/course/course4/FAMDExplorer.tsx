"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CodeBlock from '@/components/ui/CodeBlock';
import { wineFamdContrib } from './course4Data';

export default function FAMDExplorer() {
  return (
    <div className="my-6 border rounded-lg p-4 bg-white shadow-sm">
      <h4 className="text-xl font-semibold mb-2">Factor Analysis of Mixed Data</h4>
      <p className="text-sm text-gray-600 mb-3">
        FAMD blends quantitative and qualitative variables (wine aroma, soil, label).
      </p>
      <CodeBlock code={`res.famd <- FAMD(wine, ncp = 5)
fviz_famd_ind(res.famd)
fviz_famd_var(res.famd, 'contrib')`} />

      <div className="h-[250px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={wineFamdContrib}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value: number) => `${value}% contribution`} />
            <Bar dataKey="value" fill="#f97316" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
