"use client";

import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function InteractiveChiSquare() {
    // 2x2 Contingency Table State
    //      | Yes | No
    // Grp A| a   | b
    // Grp B| c   | d
    const [counts, setCounts] = useState({ a: 30, b: 20, c: 20, d: 30 });

    const updateCount = (key: keyof typeof counts, delta: number) => {
        setCounts(prev => ({ ...prev, [key]: Math.max(0, prev[key] + delta) }));
    };

    // Calculate Totals
    const totalA = counts.a + counts.b;
    const totalB = counts.c + counts.d;
    const totalYes = counts.a + counts.c;
    const totalNo = counts.b + counts.d;
    const grandTotal = totalA + totalB;

    // Calculate Expected Counts
    // E = (RowTotal * ColTotal) / GrandTotal
    const expected = {
        a: (totalA * totalYes) / grandTotal,
        b: (totalA * totalNo) / grandTotal,
        c: (totalB * totalYes) / grandTotal,
        d: (totalB * totalNo) / grandTotal,
    };

    // Calculate Chi-Square Statistic
    // sum((O - E)^2 / E)
    const chiSq =
        Math.pow(counts.a - expected.a, 2) / expected.a +
        Math.pow(counts.b - expected.b, 2) / expected.b +
        Math.pow(counts.c - expected.c, 2) / expected.c +
        Math.pow(counts.d - expected.d, 2) / expected.d;

    // Approx P-value (1 degree of freedom)
    // This is a rough approximation for visualization
    const pValue = Math.exp(-chiSq / 2);

    const chartData = [
        { name: 'Group A - Yes', Observed: counts.a, Expected: expected.a },
        { name: 'Group A - No', Observed: counts.b, Expected: expected.b },
        { name: 'Group B - Yes', Observed: counts.c, Expected: expected.c },
        { name: 'Group B - No', Observed: counts.d, Expected: expected.d },
    ];

    return (
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm my-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Interactive Chi-Square: Observed vs Expected</h3>

            <div className="grid grid-cols-2 gap-8 mb-6">
                <div>
                    <h4 className="font-semibold mb-2 text-center">Contingency Table</h4>
                    <div className="grid grid-cols-3 gap-2 text-center items-center">
                        <div></div>
                        <div className="font-bold">Yes</div>
                        <div className="font-bold">No</div>

                        <div className="font-bold">Group A</div>
                        <div className="bg-blue-50 p-2 rounded">
                            <div className="text-xl font-bold text-blue-800">{counts.a}</div>
                            <div className="flex justify-center gap-1">
                                <button onClick={() => updateCount('a', -5)} className="px-1 bg-gray-200 rounded hover:bg-gray-300">-</button>
                                <button onClick={() => updateCount('a', 5)} className="px-1 bg-gray-200 rounded hover:bg-gray-300">+</button>
                            </div>
                        </div>
                        <div className="bg-blue-50 p-2 rounded">
                            <div className="text-xl font-bold text-blue-800">{counts.b}</div>
                            <div className="flex justify-center gap-1">
                                <button onClick={() => updateCount('b', -5)} className="px-1 bg-gray-200 rounded hover:bg-gray-300">-</button>
                                <button onClick={() => updateCount('b', 5)} className="px-1 bg-gray-200 rounded hover:bg-gray-300">+</button>
                            </div>
                        </div>

                        <div className="font-bold">Group B</div>
                        <div className="bg-green-50 p-2 rounded">
                            <div className="text-xl font-bold text-green-800">{counts.c}</div>
                            <div className="flex justify-center gap-1">
                                <button onClick={() => updateCount('c', -5)} className="px-1 bg-gray-200 rounded hover:bg-gray-300">-</button>
                                <button onClick={() => updateCount('c', 5)} className="px-1 bg-gray-200 rounded hover:bg-gray-300">+</button>
                            </div>
                        </div>
                        <div className="bg-green-50 p-2 rounded">
                            <div className="text-xl font-bold text-green-800">{counts.d}</div>
                            <div className="flex justify-center gap-1">
                                <button onClick={() => updateCount('d', -5)} className="px-1 bg-gray-200 rounded hover:bg-gray-300">-</button>
                                <button onClick={() => updateCount('d', 5)} className="px-1 bg-gray-200 rounded hover:bg-gray-300">+</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Observed" fill="#8884d8" />
                            <Bar dataKey="Expected" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="flex justify-around items-center bg-gray-50 p-4 rounded-lg">
                <div className="text-center">
                    <p className="text-sm text-gray-600">Chi-Square Statistic</p>
                    <p className="text-2xl font-bold text-purple-600">{chiSq.toFixed(2)}</p>
                </div>
                <div className="text-center">
                    <p className="text-sm text-gray-600">P-Value (Approx)</p>
                    <p className={`text-2xl font-bold ${pValue < 0.05 ? 'text-green-600' : 'text-red-600'}`}>
                        {pValue < 0.001 ? '< 0.001' : pValue.toFixed(3)}
                    </p>
                    <p className="text-xs font-medium">
                        {pValue < 0.05 ? 'Significant Association!' : 'Independent'}
                    </p>
                </div>
            </div>
        </div>
    );
}
