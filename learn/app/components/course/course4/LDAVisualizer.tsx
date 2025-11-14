"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import CodeBlock from '@/components/ui/CodeBlock';
import { ldaDensity, ldaConfusion } from './course4Data';

export default function LDAVisualizer() {
  return (
    <div className="my-6 border rounded-lg p-4 bg-white shadow-sm">
      <h4 className="text-xl font-semibold mb-2">Linear Discriminant Analysis</h4>
      <p className="text-sm text-gray-600 mb-3">
        LDA finds the linear combination of features that best separates species.
      </p>
      <CodeBlock code={`LDA <- lda(Species ~ ., training)
p <- predict(LDA, training)
ldahist(data = p$x[,1], g = training$Species)`} />

      <LineChart width={600} height={220} data={ldaDensity} className="mt-4">
        <CartesianGrid />
        <XAxis dataKey="x" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="setosa" stroke="#0f172a" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="versicolor" stroke="#047857" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="virginica" stroke="#be185d" strokeWidth={2} dot={false} />
      </LineChart>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div className="bg-gray-50 rounded p-3">
          <p className="font-semibold">Training accuracy</p>
          <p className="text-gray-700">Setosa: {ldaConfusion.training.setosa}</p>
          <p className="text-gray-700">Versicolor: {ldaConfusion.training.versicolor}</p>
          <p className="text-gray-700">Virginica: {ldaConfusion.training.virginica}</p>
        </div>
        <div className="bg-gray-50 rounded p-3">
          <p className="font-semibold">Testing accuracy</p>
          <p className="text-gray-700">Setosa: {ldaConfusion.testing.setosa}</p>
          <p className="text-gray-700">Versicolor: {ldaConfusion.testing.versicolor}</p>
          <p className="text-gray-700">Virginica: {ldaConfusion.testing.virginica}</p>
        </div>
      </div>
    </div>
  );
}
