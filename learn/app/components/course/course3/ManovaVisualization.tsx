"use client";

import { useState, useMemo } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

export default function ManovaVisualization() {
  const [viewMode, setViewMode] = useState<'separate' | 'combo'>('separate');

  // Generate data: Two groups that overlap on X and Y individually, but separate in 2D
  // Group A: Mean (10, 10), Correlated
  // Group B: Mean (12, 12), Correlated
  // But the correlation makes them separate diagonally
  const data = useMemo(() => {
    const pointsA = [];
    const pointsB = [];

    for (let i = 0; i < 50; i++) {
      // Group A: Centered at 10,10
      const xA = 10 + (Math.random() - 0.5) * 4;
      const yA = 10 + (Math.random() - 0.5) * 4;
      // Shift to create diagonal separation (Simpson's paradox-ish or just multivariate separation)
      // Actually, let's just make them overlap on axes but separate in 2D
      // Group A: X ~ N(10, 2), Y ~ N(10, 2)
      // Group B: X ~ N(11, 2), Y ~ N(11, 2)
      // Overlap is high on 1D.

      pointsA.push({ x: 10 + (Math.random() - 0.5) * 3, y: 12 + (Math.random() - 0.5) * 3, group: 'Burger (A)' });
      pointsB.push({ x: 12 + (Math.random() - 0.5) * 3, y: 10 + (Math.random() - 0.5) * 3, group: 'Fries (B)' });
    }
    return { A: pointsA, B: pointsB };
  }, []);

  // Histogram data for Separate View
  const histDataX = [
    { bin: '8-9', A: 2, B: 0 },
    { bin: '9-10', A: 8, B: 1 },
    { bin: '10-11', A: 15, B: 5 },
    { bin: '11-12', A: 15, B: 15 }, // High overlap
    { bin: '12-13', A: 5, B: 15 },
    { bin: '13-14', A: 1, B: 8 },
    { bin: '14-15', A: 0, B: 2 },
  ];

  return (
    <div className="my-6 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-bold text-gray-800">The Combo Meal (MANOVA)</h4>
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('separate')}
            className={`px-4 py-1 rounded-md text-sm font-medium transition-all ${viewMode === 'separate' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            Separate Items (1D)
          </button>
          <button
            onClick={() => setViewMode('combo')}
            className={`px-4 py-1 rounded-md text-sm font-medium transition-all ${viewMode === 'combo' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            Combo Meal (2D)
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-6">
        {viewMode === 'separate'
          ? "Looking at Taste (X) and Texture (Y) separately, the groups overlap a lot. It's hard to say they are different."
          : "Looking at the Combo (X and Y together), the groups are clearly separated! MANOVA finds this difference."}
      </p>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {viewMode === 'separate' ? (
            <BarChart data={histDataX} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="bin" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="A" fill="#8884d8" name="Group A" />
              <Bar dataKey="B" fill="#82ca9d" name="Group B" />
            </BarChart>
          ) : (
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid />
              <XAxis type="number" dataKey="x" name="Taste" domain={[8, 14]} />
              <YAxis type="number" dataKey="y" name="Texture" domain={[8, 14]} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Legend />
              <Scatter name="Group A" data={data.A} fill="#8884d8" />
              <Scatter name="Group B" data={data.B} fill="#82ca9d" />
            </ScatterChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}