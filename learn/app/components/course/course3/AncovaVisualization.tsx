"use client";

import { useState, useMemo } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line } from 'recharts';

export default function AncovaVisualization() {
  const [headphonesOn, setHeadphonesOn] = useState(false);

  // Generate data: Y = 2*X + GroupEffect + Noise
  // Group A: Effect = 0
  // Group B: Effect = 10
  // But X is distributed such that Y ranges overlap heavily if you ignore X
  const data = useMemo(() => {
    const points = [];
    for (let i = 0; i < 20; i++) {
      const xA = 5 + Math.random() * 10;
      const yA = 2 * xA + 0 + (Math.random() - 0.5) * 4;
      points.push({ x: xA, y: yA, group: 'A' });

      const xB = 5 + Math.random() * 10;
      const yB = 2 * xB + 10 + (Math.random() - 0.5) * 4;
      points.push({ x: xB, y: yB, group: 'B' });
    }
    return points;
  }, []);

  const groupA = data.filter(d => d.group === 'A');
  const groupB = data.filter(d => d.group === 'B');

  // Regression lines
  const lineA = [
    { x: 5, y: 2 * 5 + 0 },
    { x: 15, y: 2 * 15 + 0 }
  ];
  const lineB = [
    { x: 5, y: 2 * 5 + 10 },
    { x: 15, y: 2 * 15 + 10 }
  ];

  return (
    <div className="my-6 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-bold text-gray-800">Noise Cancelling Headphones (ANCOVA)</h4>
        <button
          onClick={() => setHeadphonesOn(!headphonesOn)}
          className={`px-4 py-2 rounded-full font-semibold transition-colors ${headphonesOn
              ? 'bg-green-500 text-white hover:bg-green-600'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
        >
          {headphonesOn ? '🎧 Headphones ON' : 'Headphones OFF'}
        </button>
      </div>

      <p className="text-sm text-gray-600 mb-6">
        {headphonesOn
          ? "With the covariate (X) accounted for, we can clearly see that Group B is consistently higher than Group A."
          : "Without accounting for the covariate (X), the data looks like a messy cloud. Is there a difference? Hard to tell."}
      </p>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid />
            <XAxis type="number" dataKey="x" name="Covariate (e.g. Age)" unit="yrs" domain={[0, 20]} />
            <YAxis type="number" dataKey="y" name="Outcome" domain={[0, 50]} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />

            {/* If Headphones OFF: Show all as one confusing group */}
            {!headphonesOn && (
              <Scatter name="All Data" data={data} fill="#9ca3af" />
            )}

            {/* If Headphones ON: Show groups separately with lines */}
            {headphonesOn && (
              <>
                <Scatter name="Group A" data={groupA} fill="#8884d8" />
                <Scatter name="Group B" data={groupB} fill="#82ca9d" />
                <Line type="monotone" dataKey="y" data={lineA} stroke="#8884d8" strokeWidth={2} dot={false} activeDot={false} />
                <Line type="monotone" dataKey="y" data={lineB} stroke="#82ca9d" strokeWidth={2} dot={false} activeDot={false} />
              </>
            )}
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}