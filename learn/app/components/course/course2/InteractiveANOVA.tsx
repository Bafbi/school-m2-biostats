"use client";

import { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

// Helper to generate normal distribution data
const generateNormalData = (mean: number, std: number, points: number = 100) => {
    const data = [];
    const min = -10;
    const max = 20;
    const step = (max - min) / points;

    for (let x = min; x <= max; x += step) {
        const y = (1 / (std * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * ((x - mean) / std) ** 2);
        data.push({ x, y });
    }
    return data;
};

export default function InteractiveANOVA() {
    const [separation, setSeparation] = useState(2); // Distance between means
    const [noise, setNoise] = useState(1.5); // Standard deviation

    const data = useMemo(() => {
        const group1 = generateNormalData(0, noise);
        const group2 = generateNormalData(separation, noise);
        const group3 = generateNormalData(separation * 2, noise);

        // Merge for chart
        return group1.map((p, i) => ({
            x: p.x,
            g1: p.y,
            g2: group2[i].y,
            g3: group3[i].y,
        }));
    }, [separation, noise]);

    // Simplified F-stat calculation for display purposes
    // F = Between-Group Variance / Within-Group Variance
    // Between ~ separation^2
    // Within ~ noise^2
    const fStat = (separation * separation) / (noise * noise);

    // Rough p-value approximation for display (not exact)
    // High F -> Low P
    const pValue = Math.max(0.001, Math.exp(-fStat)).toFixed(3);

    return (
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm my-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Interactive ANOVA: Signal vs Noise</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Group Separation (Signal): {separation}
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="5"
                        step="0.5"
                        value={separation}
                        onChange={(e) => setSeparation(parseFloat(e.target.value))}
                        className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <p className="text-xs text-gray-500 mt-1">How different are the groups?</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Variability (Noise): {noise}
                    </label>
                    <input
                        type="range"
                        min="0.5"
                        max="3"
                        step="0.1"
                        value={noise}
                        onChange={(e) => setNoise(parseFloat(e.target.value))}
                        className="w-full h-2 bg-red-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <p className="text-xs text-gray-500 mt-1">How spread out is the data?</p>
                </div>
            </div>

            <div className="h-64 w-full mb-4">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="x" type="number" domain={[-10, 20]} hide />
                        <YAxis hide />
                        <Tooltip />
                        <Area type="monotone" dataKey="g1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} name="Group A" />
                        <Area type="monotone" dataKey="g2" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} name="Group B" />
                        <Area type="monotone" dataKey="g3" stroke="#ffc658" fill="#ffc658" fillOpacity={0.3} name="Group C" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="flex justify-around items-center bg-gray-50 p-4 rounded-lg">
                <div className="text-center">
                    <p className="text-sm text-gray-600">F-Statistic (Signal/Noise)</p>
                    <p className="text-2xl font-bold text-blue-600">{fStat.toFixed(2)}</p>
                </div>
                <div className="text-center">
                    <p className="text-sm text-gray-600">P-Value (Significance)</p>
                    <p className={`text-2xl font-bold ${parseFloat(pValue) < 0.05 ? 'text-green-600' : 'text-red-600'}`}>
                        {parseFloat(pValue) < 0.001 ? '< 0.001' : pValue}
                    </p>
                    <p className="text-xs font-medium">
                        {parseFloat(pValue) < 0.05 ? 'Significant Difference!' : 'No Significant Difference'}
                    </p>
                </div>
            </div>
        </div>
    );
}
