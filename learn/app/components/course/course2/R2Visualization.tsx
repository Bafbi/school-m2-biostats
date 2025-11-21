"use client";

import { useState, useRef, useEffect, MouseEvent } from 'react';

interface Point {
  id: number;
  x: number;
  y: number;
}

export default function R2Visualization() {
  const [points, setPoints] = useState<Point[]>([
    { id: 1, x: 50, y: 250 },
    { id: 2, x: 100, y: 200 },
    { id: 3, x: 150, y: 150 },
    { id: 4, x: 200, y: 100 },
    { id: 5, x: 250, y: 50 },
  ]);
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Calculate Regression Statistics
  const calculateStats = (data: Point[]) => {
    const n = data.length;
    if (n < 2) return { slope: 0, intercept: 0, r2: 0 };

    const sumX = data.reduce((acc, p) => acc + p.x, 0);
    const sumY = data.reduce((acc, p) => acc + p.y, 0);
    const sumXY = data.reduce((acc, p) => acc + p.x * p.y, 0);
    const sumX2 = data.reduce((acc, p) => acc + p.x * p.x, 0);
    const sumY2 = data.reduce((acc, p) => acc + p.y * p.y, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    // Calculate R2
    // SST = sum((y - meanY)^2)
    // SSR = sum((yPred - meanY)^2)
    // SSE = sum((y - yPred)^2)
    // R2 = 1 - (SSE / SST)

    const meanY = sumY / n;
    const sst = data.reduce((acc, p) => acc + Math.pow(p.y - meanY, 2), 0);
    const sse = data.reduce((acc, p) => {
      const yPred = slope * p.x + intercept;
      return acc + Math.pow(p.y - yPred, 2);
    }, 0);

    const r2 = sst === 0 ? 0 : 1 - (sse / sst);

    return { slope, intercept, r2 };
  };

  const { slope, intercept, r2 } = calculateStats(points);

  // Interaction Handlers
  const getSvgCoordinates = (e: MouseEvent) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const CTM = svgRef.current.getScreenCTM();
    if (!CTM) return { x: 0, y: 0 };
    return {
      x: (e.clientX - CTM.e) / CTM.a,
      y: (e.clientY - CTM.f) / CTM.d
    };
  };

  const handleMouseDown = (id: number, e: MouseEvent) => {
    e.stopPropagation(); // Prevent adding a point when clicking an existing one
    setDraggingId(id);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (draggingId !== null) {
      const { x, y } = getSvgCoordinates(e);
      // Constrain to SVG bounds (0-300)
      const constrainedX = Math.max(0, Math.min(300, x));
      const constrainedY = Math.max(0, Math.min(300, y));

      setPoints(prev => prev.map(p =>
        p.id === draggingId ? { ...p, x: constrainedX, y: constrainedY } : p
      ));
    }
  };

  const handleMouseUp = () => {
    setDraggingId(null);
  };

  const handleSvgClick = (e: MouseEvent) => {
    if (draggingId === null) {
      const { x, y } = getSvgCoordinates(e);
      const newPoint = {
        id: Date.now(),
        x: Math.max(0, Math.min(300, x)),
        y: Math.max(0, Math.min(300, y))
      };
      setPoints([...points, newPoint]);
    }
  };

  const handleReset = () => {
    setPoints([
      { id: 1, x: 50, y: 250 },
      { id: 2, x: 100, y: 200 },
      { id: 3, x: 150, y: 150 },
      { id: 4, x: 200, y: 100 },
      { id: 5, x: 250, y: 50 },
    ]);
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm my-6 select-none">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">Interactive R² Builder</h3>
        <button
          onClick={handleReset}
          className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded"
        >
          Reset Points
        </button>
      </div>

      <p className="text-gray-600 mb-4 text-sm">
        <strong>Click</strong> anywhere to add a point. <strong>Drag</strong> points to move them.
        <br />
        See how the regression line and R² change instantly!
      </p>

      <div className="flex flex-col md:flex-row gap-6">
        <div
          className="border border-gray-300 rounded bg-gray-50 cursor-crosshair relative"
          style={{ width: '300px', height: '300px' }}
        >
          <svg
            ref={svgRef}
            width="300"
            height="300"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onClick={handleSvgClick}
          >
            {/* Grid Lines */}
            <defs>
              <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="gray" strokeWidth="0.5" opacity="0.2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Regression Line */}
            {points.length >= 2 && (
              <line
                x1="0"
                y1={intercept}
                x2="300"
                y2={slope * 300 + intercept}
                stroke="#ef4444"
                strokeWidth="2"
              />
            )}

            {/* Residual Lines */}
            {points.map(p => (
              <line
                key={`res-${p.id}`}
                x1={p.x}
                y1={p.y}
                x2={p.x}
                y2={slope * p.x + intercept}
                stroke="#ef4444"
                strokeWidth="1"
                strokeDasharray="4 2"
                opacity="0.6"
              />
            ))}

            {/* Data Points */}
            {points.map(p => (
              <circle
                key={p.id}
                cx={p.x}
                cy={p.y}
                r="6"
                fill="#3b82f6"
                stroke="white"
                strokeWidth="2"
                className="cursor-move hover:fill-blue-700 transition-colors"
                onMouseDown={(e) => handleMouseDown(p.id, e)}
              />
            ))}
          </svg>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center bg-blue-50 rounded-lg p-6">
          <div className="text-center mb-6">
            <p className="text-sm text-gray-600 font-semibold uppercase tracking-wide">Coefficient of Determination</p>
            <p className="text-5xl font-bold text-blue-600 my-2">R² = {r2.toFixed(2)}</p>
            <p className="text-sm text-gray-500">
              {r2 > 0.8 ? "Strong Fit" : r2 > 0.4 ? "Moderate Fit" : "Weak Fit"}
            </p>
          </div>

          <div className="w-full bg-white p-4 rounded border border-blue-100 text-sm text-gray-700">
            <p className="mb-2"><strong>Equation:</strong></p>
            <code className="block bg-gray-100 p-2 rounded text-center font-mono">
              Y = {slope.toFixed(2)}X + {intercept.toFixed(2)}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}