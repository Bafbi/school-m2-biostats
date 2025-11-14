import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts';
import CodeBlock from '@/components/ui/CodeBlock';

interface DensityDistributionsSectionProps {
  selectedDist: string;
  setSelectedDist: (dist: string) => void;
  showSim: boolean;
  setShowSim: (show: boolean) => void;
  simData: number[];
  generateSim: () => void;
  mounted: boolean;
}

const normalData = Array.from({ length: 100 }, (_, i) => {
  const x = (i - 50) / 10;
  const y = Math.exp(-x * x / 2) / Math.sqrt(2 * Math.PI);
  return { x: x.toFixed(1), y: y.toFixed(3) };
});

const uniformData = [
  { x: 0, y: 0.2 }, { x: 1, y: 0.2 }, { x: 2, y: 0.2 }, { x: 3, y: 0.2 }, { x: 4, y: 0.2 }
];

const poissonData = [
  { x: 0, y: 0.1 }, { x: 1, y: 0.2 }, { x: 2, y: 0.3 }, { x: 3, y: 0.2 }, { x: 4, y: 0.1 }, { x: 5, y: 0.05 }
];

const binomialData = [
  { x: 0, y: 0.05 }, { x: 1, y: 0.15 }, { x: 2, y: 0.25 }, { x: 3, y: 0.3 }, { x: 4, y: 0.2 }, { x: 5, y: 0.05 }
];

export default function DensityDistributionsSection({
  selectedDist,
  setSelectedDist,
  showSim,
  setShowSim,
  simData,
  generateSim,
  mounted
}: DensityDistributionsSectionProps) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Density Distributions</h2>
      <div className="space-y-4">
        <div className="border rounded-lg p-4">
          <h3 className="text-black text-lg font-medium mb-2">Introduction</h3>
          <p className="text-gray-900 mb-2">
            Distributions describe how data is spread. The <span title="Bell-shaped curve, mean=median=mode">normal distribution</span> is most common.
          </p>
          <p className="text-gray-900">
            Key metrics: <span title="Measure of asymmetry">skewness</span> (0 for symmetric), <span title="Measure of tail heaviness">kurtosis</span> (3 for normal).
          </p>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="text-black text-lg font-medium mb-2">Interactive Distribution Explorer</h3>
          <p className="text-gray-900 mb-2">Select a distribution to visualize:</p>
          <div className="flex gap-2 mb-4">
            {['Normal', 'Uniform', 'Poisson', 'Binomial'].map((dist) => (
              <button
                key={dist}
                onClick={() => setSelectedDist(dist)}
                className={`px-4 py-2 rounded ${selectedDist === dist ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                {dist}
              </button>
            ))}
          </div>
          <div className="mb-4">
            {mounted && (
              <>
                {selectedDist === 'Normal' && (
                  <>
                    <LineChart width={400} height={200} data={normalData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="x" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="y" stroke="#8884d8" />
                    </LineChart>
                    <p className="text-gray-900 mt-2">Normal distribution: symmetric, bell-shaped curve.</p>
                  </>
                )}
                {selectedDist === 'Uniform' && (
                  <>
                    <BarChart width={400} height={200} data={uniformData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="x" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="y" fill="#82ca9d" />
                    </BarChart>
                    <p className="text-gray-900 mt-2">Uniform distribution: equal probability across range.</p>
                  </>
                )}
                {selectedDist === 'Poisson' && (
                  <>
                    <BarChart width={400} height={200} data={poissonData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="x" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="y" fill="#ffc658" />
                    </BarChart>
                    <p className="text-gray-900 mt-2">Poisson distribution: for count data with rate λ.</p>
                  </>
                )}
                {selectedDist === 'Binomial' && (
                  <>
                    <BarChart width={400} height={200} data={binomialData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="x" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="y" fill="#ff7300" />
                    </BarChart>
                    <p className="text-gray-900 mt-2">Binomial distribution: for binary outcomes with n trials.</p>
                  </>
                )}
              </>
            )}
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="text-black text-lg font-medium mb-2">Simulation Functions</h3>
          <p className="text-gray-900 mb-2">R functions to generate random samples:</p>
          <div className="mb-4 space-y-2">
            <div>
              <code className="text-gray-900 bg-gray-100 px-2 py-1 rounded">runif(n, min, max)</code> - Uniform distribution
              <CodeBlock code={`# Example
uniform_sample <- runif(100, 0, 10)
hist(uniform_sample)`} />
            </div>
            <div>
              <code className="text-gray-900 bg-gray-100 px-2 py-1 rounded">rnorm(n, mean, sd)</code> - Normal distribution
              <CodeBlock code={`# Example
normal_sample <- rnorm(100, mean=5, sd=2)
hist(normal_sample)`} />
            </div>
            <div>
              <code className="text-gray-900 bg-gray-100 px-2 py-1 rounded">rpois(n, lambda)</code> - Poisson distribution
              <CodeBlock code={`# Example
poisson_sample <- rpois(100, lambda=3)
table(poisson_sample)`} />
            </div>
            <div>
              <code className="text-gray-900 bg-gray-100 px-2 py-1 rounded">rbinom(n, size, prob)</code> - Binomial distribution
              <CodeBlock code={`# Example
binomial_sample <- rbinom(100, size=10, prob=0.5)
hist(binomial_sample)`} />
            </div>
          </div>
          <button
            onClick={() => setShowSim(!showSim)}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
          >
            {showSim ? 'Hide Simulation' : 'Try Simulation'}
          </button>
          {showSim && (
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <p className="text-gray-900">Simulated normal sample: {simData.join(', ')}</p>
              <button onClick={generateSim} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
                Generate New Sample
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}