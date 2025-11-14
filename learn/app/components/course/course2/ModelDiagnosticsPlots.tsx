"use client";

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Line } from 'recharts';

// Mock data for demonstration - in real app, this would come from R model
const residualsVsFitted = [
  { fitted: 10, residual: 2 }, { fitted: 12, residual: -1 }, { fitted: 15, residual: 3 },
  { fitted: 18, residual: -2 }, { fitted: 20, residual: 1 }, { fitted: 22, residual: -3 },
  { fitted: 25, residual: 2 }, { fitted: 28, residual: -1 }, { fitted: 30, residual: 0 },
  { fitted: 32, residual: 1 }, { fitted: 35, residual: -2 }, { fitted: 38, residual: 3 }
];

const qqData = [
  { theoretical: -2, sample: -2.5 }, { theoretical: -1.5, sample: -1.8 }, { theoretical: -1, sample: -1.2 },
  { theoretical: -0.5, sample: -0.3 }, { theoretical: 0, sample: 0.1 }, { theoretical: 0.5, sample: 0.4 },
  { theoretical: 1, sample: 1.2 }, { theoretical: 1.5, sample: 1.8 }, { theoretical: 2, sample: 2.3 }
];

const scaleLocationData = [
  { fitted: 10, sqrtResidual: 1.4 }, { fitted: 12, sqrtResidual: 1 }, { fitted: 15, sqrtResidual: 1.7 },
  { fitted: 18, sqrtResidual: 1.4 }, { fitted: 20, sqrtResidual: 1 }, { fitted: 22, sqrtResidual: 1.7 },
  { fitted: 25, sqrtResidual: 1.4 }, { fitted: 28, sqrtResidual: 1 }, { fitted: 30, sqrtResidual: 0.8 },
  { fitted: 32, sqrtResidual: 1 }, { fitted: 35, sqrtResidual: 1.4 }, { fitted: 38, sqrtResidual: 1.7 }
];

const residualsVsLeverage = [
  { leverage: 0.1, residual: 2 }, { leverage: 0.15, residual: -1 }, { leverage: 0.2, residual: 3 },
  { leverage: 0.25, residual: -2 }, { leverage: 0.3, residual: 1 }, { leverage: 0.35, residual: -3 },
  { leverage: 0.4, residual: 2 }, { leverage: 0.45, residual: -1 }, { leverage: 0.5, residual: 0 },
  { leverage: 0.55, residual: 1 }, { leverage: 0.6, residual: -2 }, { leverage: 0.65, residual: 3 }
];

export default function ModelDiagnosticsPlots() {
  return (
    <div className="my-6">
      <h4 className="text-lg font-semibold mb-4">Model Diagnostic Plots</h4>
      <p className="text-sm text-gray-600 mb-4">
        These plots help assess if the linear model assumptions are met. Hover over points for details.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Residuals vs Fitted */}
        <div>
          <h5 className="text-md font-medium mb-2">Residuals vs Fitted</h5>
          <p className="text-xs text-gray-500 mb-2">Check for non-linearity, unequal error variances, and outliers.</p>
          <ScatterChart width={300} height={200} data={residualsVsFitted}>
            <CartesianGrid />
            <XAxis dataKey="fitted" name="Fitted Values" />
            <YAxis dataKey="residual" name="Residuals" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="Residuals" dataKey="residual" fill="#8884d8" />
            <Line type="monotone" dataKey={() => 0} stroke="#ff0000" strokeDasharray="5 5" />
          </ScatterChart>
          <p className="text-xs text-gray-500 mt-1">Look for: Flat red line (no pattern), random scatter.</p>
        </div>

        {/* Normal Q-Q */}
        <div>
          <h5 className="text-md font-medium mb-2">Normal Q-Q</h5>
          <p className="text-xs text-gray-500 mb-2">Check if residuals are normally distributed.</p>
          <ScatterChart width={300} height={200} data={qqData}>
            <CartesianGrid />
            <XAxis dataKey="theoretical" name="Theoretical Quantiles" />
            <YAxis dataKey="sample" name="Sample Quantiles" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="Q-Q" dataKey="sample" fill="#82ca9d" />
            <Line type="monotone" dataKey="theoretical" stroke="#ff0000" strokeDasharray="5 5" />
          </ScatterChart>
          <p className="text-xs text-gray-500 mt-1">Look for: Points following the red line.</p>
        </div>

        {/* Scale-Location */}
        <div>
          <h5 className="text-md font-medium mb-2">Scale-Location</h5>
          <p className="text-xs text-gray-500 mb-2">Check for homoscedasticity (constant variance).</p>
          <ScatterChart width={300} height={200} data={scaleLocationData}>
            <CartesianGrid />
            <XAxis dataKey="fitted" name="Fitted Values" />
            <YAxis dataKey="sqrtResidual" name="√|Residuals|" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="Scale" dataKey="sqrtResidual" fill="#ffc658" />
          </ScatterChart>
          <p className="text-xs text-gray-500 mt-1">Look for: Horizontal band (no trend).</p>
        </div>

        {/* Residuals vs Leverage */}
        <div>
          <h5 className="text-md font-medium mb-2">Residuals vs Leverage</h5>
          <p className="text-xs text-gray-500 mb-2">Identify influential observations.</p>
          <ScatterChart width={300} height={200} data={residualsVsLeverage}>
            <CartesianGrid />
            <XAxis dataKey="leverage" name="Leverage" />
            <YAxis dataKey="residual" name="Residuals" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="Leverage" dataKey="residual" fill="#ff7300" />
          </ScatterChart>
          <p className="text-xs text-gray-500 mt-1">Look for: Points within Cook&apos;s distance contours.</p>
        </div>
      </div>
    </div>
  );
}