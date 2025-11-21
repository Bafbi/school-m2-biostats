"use client";

import { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';


export default function AnovaVisualization() {
  const [signal, setSignal] = useState(5); // Distance between means
  const [noise, setNoise] = useState(3);   // Standard deviation

  // Generate data for 3 distributions
  const data = useMemo(() => {
    const points = [];
    const mean1 = 10;
    const mean2 = 10 + signal;
    const mean3 = 10 + 2 * signal;

    // Range to cover all distributions
    const minX = 0;
    const maxX = 40;

    for (let x = minX; x <= maxX; x += 0.5) {
      // Normal distribution PDF formula: (1 / (sigma * sqrt(2*pi))) * exp(-0.5 * ((x-mu)/sigma)^2)
      const y1 = (1 / (noise * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mean1) / noise, 2));
      const y2 = (1 / (noise * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mean2) / noise, 2));
      const y3 = (1 / (noise * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mean3) / noise, 2));

      points.push({ x, y1, y2, y3 });
    }
    return points;
  }, [signal, noise]);

  // Calculate F-statistic (simplified for visualization)
  const stats = useMemo(() => {
    // MS_between / MS_within
    // Signal is related to MS_between, Noise is related to MS_within

    // Let's simulate a real F-test based on the parameters
    const n = 30; // Sample size per group
    const k = 3;  // Number of groups

    // Variance between means (approximate)
    const grandMean = 10 + signal;
    const ssBetween = n * (Math.pow(10 - grandMean, 2) + Math.pow(10 + signal - grandMean, 2) + Math.pow(10 + 2 * signal - grandMean, 2));
    const dfBetween = k - 1;
    const msBetween = ssBetween / dfBetween;

    // Variance within (approximate)
    const ssWithin = (n - 1) * k * Math.pow(noise, 2);
    const dfWithin = k * (n - 1);
    const msWithin = ssWithin / dfWithin;

    const fStat = msBetween / msWithin;

    // Heuristic P-value calculation (since we don't want to add a heavy stats library)
    // Critical value for F(2, 87) at alpha=0.05 is approx 3.1
    let pVal = 0.5;
    if (fStat > 10) pVal = 0.000;
    else if (fStat > 5) pVal = 0.009;
    else if (fStat > 3.1) pVal = 0.04;
    else if (fStat > 2) pVal = 0.15;
    else pVal = 0.4;

    return { f: fStat, p: pVal };
  }, [signal, noise]);

  return (
    <div className="my-6 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <h4 className="text-lg font-bold text-gray-800 mb-2">Signal vs Noise Tuner</h4>
      <p className="text-sm text-gray-600 mb-6">
        Adjust the <strong>Signal</strong> (separation) and <strong>Noise</strong> (spread) to see how ANOVA detects differences.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Signal (Group Separation): {signal}
          </label>
          <input
            type="range"
            min="0"
            max="10"
            step="0.5"
            value={signal}
            onChange={(e) => setSignal(parseFloat(e.target.value))}
            className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
          />
          <p className="text-xs text-gray-500 mt-1">Higher signal = Groups are further apart.</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Noise (Variance): {noise}
          </label>
          <input
            type="range"
            min="1"
            max="5"
            step="0.5"
            value={noise}
            onChange={(e) => setNoise(parseFloat(e.target.value))}
            className="w-full h-2 bg-red-200 rounded-lg appearance-none cursor-pointer"
          />
          <p className="text-xs text-gray-500 mt-1">Higher noise = Groups are more spread out (overlap).</p>
        </div>
      </div>

      <div className="h-64 w-full mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" type="number" domain={[0, 40]} hide />
            <YAxis hide />
            <Tooltip />
            <Area type="monotone" dataKey="y1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} name="Group A" />
            <Area type="monotone" dataKey="y2" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} name="Group B" />
            <Area type="monotone" dataKey="y3" stroke="#ffc658" fill="#ffc658" fillOpacity={0.3} name="Group C" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-between items-center p-4 bg-gray-50 rounded border border-gray-200">
        <div>
          <p className="text-sm font-semibold text-gray-700">F-Statistic: <span className="text-blue-600 text-lg">{stats.f.toFixed(2)}</span></p>
          <p className="text-xs text-gray-500">Ratio of Signal / Noise</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-gray-700">P-Value: <span className={stats.p < 0.05 ? "text-green-600 font-bold" : "text-red-600"}>{stats.p < 0.001 ? "< 0.001" : stats.p.toFixed(3)}</span></p>
          <p className="text-xs text-gray-500">{stats.p < 0.05 ? "Significant Difference!" : "No Significant Difference"}</p>
        </div>
      </div>
    </div>
  );
}