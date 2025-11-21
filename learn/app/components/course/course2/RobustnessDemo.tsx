"use client";

import { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

export default function RobustnessDemo() {
    // Initial data points
    const [outlier, setOutlier] = useState(10);
    const baseData = [2, 3, 3, 4, 4, 5, 5, 6, 7];

    const allData = [...baseData, outlier].sort((a, b) => a - b);

    // Calculate Mean
    const sum = allData.reduce((a, b) => a + b, 0);
    const mean = sum / allData.length;

    // Calculate Median
    const mid = Math.floor(allData.length / 2);
    const median = allData.length % 2 !== 0
        ? allData[mid]
        : (allData[mid - 1] + allData[mid]) / 2;

    const chartData = allData.map((val, i) => ({ x: val, y: 1, id: i }));

    return (
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm my-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Robustness: Mean vs Median</h3>
            <p className="text-gray-600 mb-4">
                Drag the slider to move the <strong>outlier</strong> point. Watch how the Mean chases it, while the Median stays stable.
            </p>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Outlier Value: {outlier}
                </label>
                <input
                    type="range"
                    min="0"
                    max="50"
                    step="1"
                    value={outlier}
                    onChange={(e) => setOutlier(parseFloat(e.target.value))}
                    className="w-full h-2 bg-red-200 rounded-lg appearance-none cursor-pointer"
                />
            </div>

            <div className="h-40 w-full mb-4">
                <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis type="number" dataKey="x" domain={[0, 55]} />
                        <YAxis type="number" dataKey="y" hide domain={[0, 2]} />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        <Scatter name="Data" data={chartData} fill="#8884d8" />
                        <ReferenceLine x={mean} stroke="red" strokeWidth={2} label={{ value: 'Mean', fill: 'red', position: 'top' }} />
                        <ReferenceLine x={median} stroke="green" strokeWidth={2} label={{ value: 'Median', fill: 'green', position: 'bottom' }} />
                    </ScatterChart>
                </ResponsiveContainer>
            </div>

            <div className="flex justify-around items-center bg-gray-50 p-4 rounded-lg">
                <div className="text-center">
                    <p className="text-sm text-gray-600">Mean (Sensitive)</p>
                    <p className="text-2xl font-bold text-red-600">{mean.toFixed(2)}</p>
                </div>
                <div className="text-center">
                    <p className="text-sm text-gray-600">Median (Robust)</p>
                    <p className="text-2xl font-bold text-green-600">{median.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
}
