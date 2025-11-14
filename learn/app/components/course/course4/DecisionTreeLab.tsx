"use client";

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import CodeBlock from '@/components/ui/CodeBlock';
import { titanicTreeStats, titanicConfusion } from './course4Data';

export default function DecisionTreeLab() {
  const [index, setIndex] = useState(1);
  const selected = titanicTreeStats[index];

  return (
    <div className="my-6 border rounded-lg p-4 bg-gradient-to-br from-indigo-50 to-white">
      <h4 className="text-xl font-semibold mb-2">Decision Tree Lab</h4>
      <p className="text-sm text-gray-700 mb-3">
        Train/test splits on the Titanic survival data feed into cp pruning. Adjust cp to balance tree depth and accuracy.
      </p>
      <CodeBlock code={`# Train tree
fold <- sample(nrow(TitanicSurvival), floor(nrow(TitanicSurvival)*0.8))
train <- TitanicSurvival[fold, ]
tree <- rpart(survived ~ ., data = train)
plotcp(tree)
prune(tree, cp = 0.01)`} />

      <div className="mt-4">
        <label htmlFor="cp-slider" className="text-sm font-medium text-gray-600">
          Complexity parameter (cp): {selected.cp}
        </label>
        <input
          id="cp-slider"
          type="range"
          min={0}
          max={titanicTreeStats.length - 1}
          value={index}
          onChange={(e) => setIndex(parseInt(e.target.value, 10))}
          className="w-full h-2 mt-1 rounded-lg appearance-none bg-gray-200"
        />
      </div>

      <LineChart width={600} height={200} data={titanicTreeStats} className="mt-4">
        <CartesianGrid />
        <XAxis dataKey="cp" type="number" domain={[0, 0.05]} />
        <YAxis domain={[0.6, 0.8]} />
  <Tooltip formatter={(value: number) => `${(value * 100).toFixed(1)}%`} />
        <Line type="monotone" dataKey="accuracy" stroke="#4f46e5" strokeWidth={2} dot={false} />
      </LineChart>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div className="bg-white rounded shadow-sm p-3">
          <p className="font-medium">Nodes: {selected.nodes}</p>
          <p className="text-gray-600">{selected.description}</p>
        </div>
        <div className="bg-white rounded shadow-sm p-3">
          <p className="font-medium">Train accuracy:</p>
          <p className="text-indigo-600 text-lg font-semibold">{(selected.accuracy * 100).toFixed(1)}%</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
        <div className="bg-white rounded shadow-sm p-3">
          <p className="font-semibold">Confusion Matrix (Train)</p>
          <p className="text-gray-700">Yes predicted: {titanicConfusion.train.predicted.yes}</p>
          <p className="text-gray-700">No predicted: {titanicConfusion.train.predicted.no}</p>
        </div>
        <div className="bg-white rounded shadow-sm p-3">
          <p className="font-semibold">Confusion Matrix (Test)</p>
          <p className="text-gray-700">Yes predicted: {titanicConfusion.test.predicted.yes}</p>
          <p className="text-gray-700">No predicted: {titanicConfusion.test.predicted.no}</p>
        </div>
      </div>
    </div>
  );
}
