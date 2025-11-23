"use client";

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot } from 'recharts';
import CodeBlock from '@/components/ui/CodeBlock';
import { titanicTreeStats, titanicConfusion } from './course4Data';

export default function DecisionTreeLab() {
  const [index, setIndex] = useState(1);
  const selected = titanicTreeStats[index];

  return (
    <div className="my-6 border rounded-lg p-4 bg-gradient-to-br from-indigo-50 to-white">
      <h4 className="text-xl font-semibold mb-2">Decision Tree Lab</h4>
      <p className="text-sm text-gray-700 mb-3">
        <strong>Complexity Parameter (cp):</strong> Controls the trade-off between tree size and accuracy.
        <br/>
        • <strong>Low cp:</strong> Complex tree (many nodes), risk of overfitting.
        <br/>
        • <strong>High cp:</strong> Simple tree (few nodes), risk of underfitting.
      </p>
      <CodeBlock code={`# Train tree
fold <- sample(nrow(TitanicSurvival), floor(nrow(TitanicSurvival)*0.8))
train <- TitanicSurvival[fold, ]
tree <- rpart(survived ~ ., data = train)
plotcp(tree)
prune(tree, cp = ${selected.cp})`} />

      <div className="mt-4 bg-white p-4 rounded shadow-sm border border-indigo-100">
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="cp-slider" className="text-sm font-bold text-gray-700">
            Adjust cp: {selected.cp}
          </label>
          <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full">
            {selected.nodes} Nodes
          </span>
        </div>
        <input
          id="cp-slider"
          type="range"
          min={0}
          max={titanicTreeStats.length - 1}
          value={index}
          onChange={(e) => setIndex(parseInt(e.target.value, 10))}
          className="w-full h-2 rounded-lg appearance-none bg-gray-200 cursor-pointer accent-indigo-600"
        />
        <p className="text-xs text-gray-500 mt-2 text-center italic">
          "{selected.description}"
        </p>
      </div>

      <div className="h-[250px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={titanicTreeStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="cp" type="number" domain={[0, 0.05]} label={{ value: 'Complexity Parameter (cp)', position: 'bottom', offset: 0 }} />
            <YAxis domain={[0.6, 0.8]} label={{ value: 'Accuracy', angle: -90, position: 'left' }} />
            <Tooltip formatter={(value: number) => `${(value * 100).toFixed(1)}%`} />
            <Line type="monotone" dataKey="accuracy" stroke="#4f46e5" strokeWidth={2} dot={true} />
            <ReferenceDot x={selected.cp} y={selected.accuracy} r={6} fill="#4f46e5" stroke="white" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div className="bg-white rounded shadow-sm p-3 border border-gray-100">
          <p className="font-medium text-gray-500 text-xs uppercase">Model Complexity</p>
          <p className="text-2xl font-bold text-gray-800">{selected.nodes} <span className="text-sm font-normal text-gray-500">Leaves</span></p>
        </div>
        <div className="bg-white rounded shadow-sm p-3 border border-gray-100">
          <p className="font-medium text-gray-500 text-xs uppercase">Accuracy</p>
          <p className="text-2xl font-bold text-indigo-600">{(selected.accuracy * 100).toFixed(1)}%</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
        <div className="bg-white rounded shadow-sm p-3">
          <p className="font-semibold border-b pb-1 mb-1">Confusion Matrix (Train)</p>
          <div className="flex justify-between"><span>Yes:</span> <span className="font-mono">{titanicConfusion.train.predicted.yes}</span></div>
          <div className="flex justify-between"><span>No:</span> <span className="font-mono">{titanicConfusion.train.predicted.no}</span></div>
        </div>
        <div className="bg-white rounded shadow-sm p-3">
          <p className="font-semibold border-b pb-1 mb-1">Confusion Matrix (Test)</p>
          <div className="flex justify-between"><span>Yes:</span> <span className="font-mono">{titanicConfusion.test.predicted.yes}</span></div>
          <div className="flex justify-between"><span>No:</span> <span className="font-mono">{titanicConfusion.test.predicted.no}</span></div>
        </div>
      </div>
    </div>
  );
}
