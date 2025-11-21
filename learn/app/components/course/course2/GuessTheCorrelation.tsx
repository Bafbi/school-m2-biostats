"use client";

import { useState, useEffect } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Helper to generate correlated data
const generateCorrelatedData = (targetR: number, n: number = 50) => {
    const data = [];
    for (let i = 0; i < n; i++) {
        const x = Math.random() * 10;
        // y = r*x + sqrt(1-r^2)*noise
        // This is a simplified way to get approx correlation
        const noise = (Math.random() - 0.5) * 10;
        // Adjust mixing to get closer to target R. 
        // A more precise method involves Cholesky decomposition, but for a game this is okay-ish.
        // Let's use a simpler approximation: y = x * sign(r) + noise * (1-|r|) * scale

        // Better approach for 2D normal distribution with correlation rho:
        // X = Z1
        // Y = rho*Z1 + sqrt(1-rho^2)*Z2

        const u1 = Math.random();
        const u2 = Math.random();
        // Box-Muller transform for standard normal
        const z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
        const u3 = Math.random();
        const u4 = Math.random();
        const z2 = Math.sqrt(-2.0 * Math.log(u3)) * Math.cos(2.0 * Math.PI * u4);

        const yVal = targetR * z1 + Math.sqrt(1 - targetR * targetR) * z2;

        data.push({ x: z1, y: yVal });
    }
    return data;
};

export default function GuessTheCorrelation() {
    const [targetR, setTargetR] = useState(0);
    const [data, setData] = useState<{ x: number, y: number }[]>([]);
    const [score, setScore] = useState(0);
    const [rounds, setRounds] = useState(0);
    const [message, setMessage] = useState('');
    const [guessed, setGuessed] = useState(false);

    const startNewRound = () => {
        // Generate random correlation between -0.9 and 0.9
        const r = Math.round((Math.random() * 1.8 - 0.9) * 10) / 10;
        setTargetR(r);
        setData(generateCorrelatedData(r));
        setMessage('');
        setGuessed(false);
    };

    useEffect(() => {
        startNewRound();
    }, []);

    const handleGuess = (guess: number) => {
        if (guessed) return;

        const diff = Math.abs(guess - targetR);
        let points = 0;
        let msg = '';

        if (diff <= 0.1) {
            points = 10;
            msg = "Perfect! Spot on.";
        } else if (diff <= 0.3) {
            points = 5;
            msg = "Close enough!";
        } else {
            points = 0;
            msg = "Not quite.";
        }

        setScore(score + points);
        setRounds(rounds + 1);
        setMessage(`${msg} Actual R: ${targetR}`);
        setGuessed(true);
    };

    const options = [-0.9, -0.5, 0, 0.5, 0.9];

    return (
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm my-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Guess the Correlation</h3>
                <div className="text-sm font-medium text-blue-600">
                    Score: {score} / {rounds * 10}
                </div>
            </div>

            <p className="text-gray-600 mb-4">
                Look at the scatter plot. Which correlation coefficient ($r$) best describes it?
            </p>

            <div className="h-64 w-full mb-6 bg-gray-50 rounded-lg p-2">
                <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid />
                        <XAxis dataKey="x" type="number" hide />
                        <YAxis dataKey="y" type="number" hide />
                        <Scatter name="Data" data={data} fill="#3b82f6" />
                    </ScatterChart>
                </ResponsiveContainer>
            </div>

            <div className="flex flex-wrap gap-2 justify-center mb-4">
                {options.map((opt) => (
                    <button
                        key={opt}
                        onClick={() => handleGuess(opt)}
                        disabled={guessed}
                        className={`px-4 py-2 rounded-full font-medium transition-colors ${guessed
                                ? opt === targetR
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gray-200 text-gray-400'
                                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                            }`}
                    >
                        {opt}
                    </button>
                ))}
            </div>

            {guessed && (
                <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <p className="text-lg font-bold text-gray-800 mb-2">{message}</p>
                    <button
                        onClick={startNewRound}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Next Round
                    </button>
                </div>
            )}
        </div>
    );
}
