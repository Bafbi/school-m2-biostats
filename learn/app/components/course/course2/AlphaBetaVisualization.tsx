"use client";

import { useState, useMemo } from 'react';
import { ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

// Standard Normal PDF
const normalPDF = (x: number, mean: number, std: number) => {
    return (1 / (std * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mean) / std, 2));
};

// Inverse Error Function (approximate) for calculating Z-score
// Actually, for this simple visualization, we can just use a lookup or simple approximation
// But since we need to find the critical value Xc given Alpha:
// Alpha = P(X > Xc | H0). Xc = Mean0 + Z_(1-alpha) * Std
// We can use a simple Z-table approximation or just hardcode common values if we limit Alpha options.
// Or use a simple implementation of probit function.

function getZScore(p: number) {
    // Approximation of probit function (inverse CDF)
    // Source: Abramowitz and Stegun
    const a1 = -3.969683028665376e+01;
    const a2 = 2.209460984245205e+02;
    const a3 = -2.759285104469687e+02;
    const a4 = 1.383577518672690e+02;
    const a5 = -3.066479806614716e+01;
    const a6 = 2.506628277459239e+00;

    const b1 = -5.447609879822406e+01;
    const b2 = 1.615858368580409e+02;
    const b3 = -1.556989798598866e+02;
    const b4 = 6.680131188771972e+01;
    const b5 = -1.328068155288572e+01;

    const c1 = -7.784894002430293e-03;
    const c2 = -3.223964580411365e-01;
    const c3 = -2.400758277161838e+00;
    const c4 = -2.549732539343734e+00;
    const c5 = 4.374664141464968e+00;
    const c6 = 2.938163982698783e+00;

    const d1 = 7.784695709041462e-03;
    const d2 = 3.224671290700398e-01;
    const d3 = 2.445134137142996e+00;
    const d4 = 3.754408661907416e+00;

    const p_low = 0.02425;
    const p_high = 1 - p_low;

    let q, r;
    if (p < p_low) {
        q = Math.sqrt(-2 * Math.log(p));
        return (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
            ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
    } else if (p <= p_high) {
        q = p - 0.5;
        r = q * q;
        return (((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q /
            (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1);
    } else {
        q = Math.sqrt(-2 * Math.log(1 - p));
        return -(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
            ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
    }
}

export default function AlphaBetaVisualization() {
    const [effectSize, setEffectSize] = useState(2); // Distance between means
    const [sampleSize, setSampleSize] = useState(20); // Affects std dev
    const [alpha, setAlpha] = useState(0.05);

    const std = 1 / Math.sqrt(sampleSize / 10); // Scaling for visualization
    const mean0 = 0;
    const mean1 = effectSize;

    // Calculate Critical Value (one-tailed right)
    const zCrit = getZScore(1 - alpha);
    const xCrit = mean0 + zCrit * std;

    // Calculate Beta (Area of H1 left of xCrit)
    // Z_beta = (xCrit - mean1) / std
    // We can't easily calculate CDF here without a library, but we can approximate or just visualize it.
    // For the text display, let's use the visualization data to sum up areas? No, that's inaccurate.
    // Let's use a simple CDF approximation for the text values.

    // Error function approximation for CDF
    function getCDF(x: number, mean: number, s: number) {
        const z = (x - mean) / s;
        // Constants
        const t = 1 / (1 + 0.2316419 * Math.abs(z));
        const d = 0.3989423 * Math.exp(-z * z / 2);
        let p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
        if (z > 0) p = 1 - p;
        return p;
    }

    const beta = getCDF(xCrit, mean1, std);
    const power = 1 - beta;

    const data = useMemo(() => {
        const points = [];
        const min = -3;
        const max = 8;
        const step = 0.05;

        for (let x = min; x <= max; x += step) {
            const yH0 = normalPDF(x, mean0, std);
            const yH1 = normalPDF(x, mean1, std);

            points.push({
                x: Number(x.toFixed(2)),
                H0: yH0,
                H1: yH1,
                // Fill areas
                AlphaArea: x > xCrit ? yH0 : 0,
                BetaArea: x < xCrit ? yH1 : 0,
                PowerArea: x > xCrit ? yH1 : 0,
            });
        }
        return points;
    }, [mean0, mean1, std, xCrit]);

    return (
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm my-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Alpha, Beta, and Power Visualization</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Effect Size (Difference): {effectSize}
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="5"
                        step="0.1"
                        value={effectSize}
                        onChange={(e) => setEffectSize(parseFloat(e.target.value))}
                        className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Sample Size (Precision): {sampleSize}
                    </label>
                    <input
                        type="range"
                        min="5"
                        max="100"
                        step="5"
                        value={sampleSize}
                        onChange={(e) => setSampleSize(parseFloat(e.target.value))}
                        className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Alpha (Significance Level): {alpha}
                    </label>
                    <input
                        type="range"
                        min="0.01"
                        max="0.20"
                        step="0.01"
                        value={alpha}
                        onChange={(e) => setAlpha(parseFloat(e.target.value))}
                        className="w-full h-2 bg-red-200 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
            </div>

            <div className="h-80 w-full mb-4">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="x" type="number" domain={[-3, 8]} allowDataOverflow={false} />
                        <YAxis hide />
                        <Tooltip />

                        {/* H0 Distribution */}
                        <Area type="monotone" dataKey="H0" stroke="#8884d8" fill="none" strokeWidth={2} name="H0 (Healthy)" />
                        {/* Alpha Area (False Positive) */}
                        <Area type="monotone" dataKey="AlphaArea" stroke="none" fill="#ff0000" fillOpacity={0.5} name="Alpha (Type I Error)" />

                        {/* H1 Distribution */}
                        <Area type="monotone" dataKey="H1" stroke="#82ca9d" fill="none" strokeWidth={2} name="H1 (Sick)" />
                        {/* Beta Area (False Negative) */}
                        <Area type="monotone" dataKey="BetaArea" stroke="none" fill="#ffc658" fillOpacity={0.5} name="Beta (Type II Error)" />
                        {/* Power Area (True Positive) */}
                        <Area type="monotone" dataKey="PowerArea" stroke="none" fill="#82ca9d" fillOpacity={0.3} name="Power (1 - Beta)" />

                        <ReferenceLine x={xCrit} stroke="red" strokeDasharray="3 3" label={{ value: 'Critical Value', position: 'top', fill: 'red' }} />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center bg-gray-50 p-4 rounded-lg">
                <div>
                    <p className="text-sm text-gray-600 font-semibold">Alpha (Type I Error)</p>
                    <p className="text-xs text-gray-500">False Positive</p>
                    <p className="text-xl font-bold text-red-600">{(alpha * 100).toFixed(1)}%</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600 font-semibold">Beta (Type II Error)</p>
                    <p className="text-xs text-gray-500">False Negative</p>
                    <p className="text-xl font-bold text-yellow-600">{(beta * 100).toFixed(1)}%</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600 font-semibold">Power</p>
                    <p className="text-xs text-gray-500">True Positive</p>
                    <p className="text-xl font-bold text-green-600">{(power * 100).toFixed(1)}%</p>
                </div>
            </div>

            <div className="mt-4 text-sm text-gray-700 bg-blue-50 p-3 rounded border border-blue-100">
                <p><strong>Insight:</strong></p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Moving the <strong>Critical Value</strong> left (increasing Alpha) decreases Beta but increases False Positives.</li>
                    <li>Increasing <strong>Sample Size</strong> makes curves narrower, reducing overlap and both errors!</li>
                    <li>A larger <strong>Effect Size</strong> separates the curves, making it easier to detect the difference (Higher Power).</li>
                </ul>
            </div>
        </div>
    );
}
