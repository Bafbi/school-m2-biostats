"use client";

import { useMemo, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ScatterChart, Scatter, ResponsiveContainer, Legend } from 'recharts';
import CodeBlock from '@/components/ui/CodeBlock';
import { clustersElbow, irisClusterSamplesByK } from './course4Data';

const clusterColors: Record<number, string> = {
  1: '#0ea5e9', // Sky Blue
  2: '#f97316', // Orange
  3: '#4ade80', // Green
  4: '#a78bfa'  // Purple
};

type ClusterGroup = 2 | 3 | 4;

export default function KMeansPlayground() {
  const [clusters, setClusters] = useState<ClusterGroup>(3);
  const selectedData = irisClusterSamplesByK[clusters];
  const groupedClusters = useMemo(() => {
    const uniqueClusters = Array.from(new Set(selectedData.map((row) => row.cluster)));
    return uniqueClusters.map((cluster) => ({
      cluster,
      points: selectedData.filter((row) => row.cluster === cluster)
    }));
  }, [selectedData]);

  return (
    <div className="my-6 border rounded-lg p-4 bg-white shadow-sm">
      <h4 className="text-xl font-semibold mb-2">K-Means Clustering</h4>
      <p className="text-sm text-gray-600 mb-3">
        K-means groups iris specimens. The elbow shows when additional clusters stop giving big gains.
      </p>
      <CodeBlock code={`res.km <- kmeans(scale(iris[, -5]), centers = ${clusters}, nstart = 25)
fviz_nbclust(iris[, -5], FUNcluster = kmeans)
fviz_cluster(res.km, data = iris[, -5])`} />

      <div className="h-[200px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={clustersElbow}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="k" label={{ value: 'Number of Clusters (k)', position: 'bottom', offset: 0 }} />
            <YAxis label={{ value: 'Total Within Sum of Squares', angle: -90, position: 'left' }} />
            <Tooltip formatter={(value: number) => `Inertia: ${value}`} />
            <Line type="monotone" dataKey="inertia" stroke="#0f172a" strokeWidth={2} dot={true} />
            <ReferenceDot x={clusters} y={clustersElbow.find(d => d.k === clusters)?.inertia} r={6} fill="#0f172a" stroke="white" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 bg-gray-50 p-4 rounded border border-gray-200">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-bold text-gray-700">Number of Clusters (K): {clusters}</label>
        </div>
        <input
          type="range"
          min={2}
          max={4}
          value={clusters}
          onChange={(e) => setClusters(parseInt(e.target.value, 10) as ClusterGroup)}
          className="w-full h-2 rounded-lg appearance-none bg-gray-300 cursor-pointer accent-blue-600"
        />
        <p className="text-xs text-gray-500 mt-2">
          Drag to re-run K-Means with a different K. Notice how the groups shift.
        </p>
      </div>

      <div className="h-[300px] w-full mt-4 border border-gray-100 rounded">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="sepal" name="Sepal Length" type="number" domain={[4, 8]} label={{ value: 'Sepal Length', position: 'bottom', offset: 0 }} />
            <YAxis dataKey="petal" name="Petal Length" type="number" domain={[0, 7]} label={{ value: 'Petal Length', angle: -90, position: 'left' }} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend verticalAlign="top" height={36}/>
            {groupedClusters.map((group) => (
              <Scatter
                key={`cluster-${group.cluster}`}
                name={`Cluster ${group.cluster}`}
                data={group.points}
                fill={clusterColors[group.cluster]}
              />
            ))}
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Add missing import for ReferenceDot
import { ReferenceDot } from 'recharts';
