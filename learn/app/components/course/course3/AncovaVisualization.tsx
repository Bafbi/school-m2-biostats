"use client";

import { useState, useMemo } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Line } from 'recharts';

// Mock babies data (subset from UsingR::babies)
const babiesData = [
  { wt: 3.2, wt1: 60, smoke: '0' },
  { wt: 3.5, wt1: 65, smoke: '0' },
  { wt: 3.1, wt1: 58, smoke: '0' },
  { wt: 2.8, wt1: 55, smoke: '1' },
  { wt: 3.0, wt1: 62, smoke: '1' },
  { wt: 2.9, wt1: 59, smoke: '1' },
  { wt: 3.3, wt1: 63, smoke: '2' },
  { wt: 3.4, wt1: 66, smoke: '2' },
  { wt: 3.2, wt1: 61, smoke: '2' },
  // Add more as needed
];

export default function AncovaVisualization() {
  const [selectedSmoke, setSelectedSmoke] = useState('all');

  const chartData = useMemo(() => {
    let data = babiesData;
    if (selectedSmoke !== 'all') {
      data = babiesData.filter(item => item.smoke === selectedSmoke);
    }
    return data.map(item => ({
      wt1: item.wt1,
      wt: item.wt,
      smoke: item.smoke
    }));
  }, [selectedSmoke]);

  // Simple linear fits per group (mock)
  const fits = useMemo(() => {
    const groups = ['0', '1', '2'];
    const fitsData: { [key: string]: { x: number, y: number }[] } = {};
    groups.forEach(group => {
      // Mock fit: y = a + b*x, assume b=0.02, a=1
      const a = 1;
      const b = 0.02;
      fitsData[group] = [];
      for (let x = 50; x <= 70; x += 2) {
        fitsData[group].push({ x, y: a + b * x });
      }
    });
    return fitsData;
  }, []);

  return (
    <div className="my-4">
      <h4 className="text-lg font-semibold mb-2">ANCOVA: Baby Weight Adjusted for Mother Weight</h4>
      <p className="text-sm text-gray-600 mb-4">
        ANCOVA adjusts for covariates. Select smoking group to see regression lines.
      </p>
      <div className="mb-4">
        <label htmlFor="smoke-select" className="block text-sm font-medium text-gray-700 mb-2">
          Smoking Status: {selectedSmoke === 'all' ? 'All' : `Group ${selectedSmoke}`}
        </label>
        <select
          id="smoke-select"
          value={selectedSmoke}
          onChange={(e) => setSelectedSmoke(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="all">All Groups</option>
          <option value="0">Never Smoked</option>
          <option value="1">Smoked During Pregnancy</option>
          <option value="2">Stopped at Start</option>
        </select>
      </div>
      <ScatterChart width={600} height={300} data={chartData}>
        <CartesianGrid />
        <XAxis dataKey="wt1" type="number" domain={[50, 70]} />
        <YAxis dataKey="wt" type="number" domain={[2.5, 3.5]} />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="Data Points" dataKey="wt" fill="#8884d8" />
        {selectedSmoke === 'all' && (
          <>
            <Line type="monotone" dataKey="y" data={fits['0']} stroke="#ff0000" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="y" data={fits['1']} stroke="#00ff00" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="y" data={fits['2']} stroke="#0000ff" strokeWidth={2} dot={false} />
          </>
        )}
        {selectedSmoke !== 'all' && (
          <Line type="monotone" dataKey="y" data={fits[selectedSmoke]} stroke="#ff0000" strokeWidth={2} dot={false} />
        )}
      </ScatterChart>
      <p className="text-sm text-gray-600 mt-2">
        Regression lines show baby weight vs mother weight, adjusted for smoking. ANCOVA tests if slopes differ after adjustment.
      </p>
    </div>
  );
}