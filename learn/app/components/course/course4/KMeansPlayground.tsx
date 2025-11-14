"use client";

import { useMemo, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ScatterChart, Scatter } from 'recharts';
import CodeBlock from '@/components/ui/CodeBlock';
import { clustersElbow, irisClusterSamplesByK } from './course4Data';

const clusterColors: Record<number, string> = {
  1: '#0ea5e9',
  2: '#f97316',
  3: '#4ade80',
  4: '#a78bfa'
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
      <CodeBlock code={`res.km <- kmeans(scale(iris[, -5]), centers = 3, nstart = 25)
fviz_nbclust(iris[, -5], FUNcluster = kmeans)
fviz_cluster(res.km, data = iris[, -5])`} />

      <LineChart width={600} height={220} data={clustersElbow} className="mt-4">
        <CartesianGrid />
        <XAxis dataKey="k" />
        <YAxis />
        <Tooltip formatter={(value: number) => `Inertia: ${value}`} />
        <Line type="monotone" dataKey="inertia" stroke="#0f172a" strokeWidth={2} dot={false} />
      </LineChart>

      <div className="mt-4">
        <label className="text-sm text-gray-600">Clusters: {clusters}</label>
        <input
          type="range"
          min={2}
          max={4}
          value={clusters}
          onChange={(e) => setClusters(parseInt(e.target.value, 10) as ClusterGroup)}
          className="w-full h-2 mt-1 rounded-lg appearance-none bg-gray-200"
        />
      </div>

      <ScatterChart width={600} height={240} className="mt-4">
        <CartesianGrid />
        <XAxis dataKey="sepal" name="Sepal" />
        <YAxis dataKey="petal" name="Petal" />
        <Tooltip />
        {groupedClusters.map((group) => (
          <Scatter
            key={`cluster-${group.cluster}`}
            data={group.points}
            fill={clusterColors[group.cluster]}
            line={{}}
          />
        ))}
      </ScatterChart>
    </div>
  );
}
