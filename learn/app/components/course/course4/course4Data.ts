export const titanicTreeStats = [
  { cp: 0.005, accuracy: 0.69, nodes: 6, description: 'Deep tree, more splits' },
  { cp: 0.01, accuracy: 0.73, nodes: 5, description: 'Balanced fit, start pruning' },
  { cp: 0.02, accuracy: 0.71, nodes: 4, description: 'Simpler tree with fewer leaves' },
  { cp: 0.04, accuracy: 0.68, nodes: 3, description: 'Over-pruned, underfits' }
];

export const titanicConfusion = {
  train: { yes: 120, no: 60, predicted: { yes: 110, no: 70 } },
  test: { yes: 40, no: 20, predicted: { yes: 37, no: 23 } }
};

export const decathlonScree = [
  { axis: 'Dim 1', variance: 64 },
  { axis: 'Dim 2', variance: 18 },
  { axis: 'Dim 3', variance: 9 },
  { axis: 'Dim 4', variance: 5 },
  { axis: 'Dim 5', variance: 3 }
];

export const decathlonLoadings = [
  { variable: '100m', dim1: 0.88, dim2: 0.12 },
  { variable: 'Long Jump', dim1: 0.85, dim2: -0.15 },
  { variable: 'Shot Put', dim1: 0.31, dim2: 0.71 },
  { variable: 'High Jump', dim1: 0.67, dim2: 0.53 }
];

export const hobbiesContributions = [
  { label: 'Sports', value: 25 },
  { label: 'Creative', value: 20 },
  { label: 'Technology', value: 18 },
  { label: 'Travel', value: 15 },
  { label: 'Music', value: 22 }
];

export const hobbiesAxes = [
  { axis: 'Axis 1', inertia: 40 },
  { axis: 'Axis 2', inertia: 26 },
  { axis: 'Axis 3', inertia: 12 }
];

export const housetasksHeatmap = [
  { task: 'Cleaning', frequency: 42 },
  { task: 'Cooking', frequency: 38 },
  { task: 'Laundry', frequency: 29 },
  { task: 'Repairs', frequency: 14 }
];

export const wineFamdContrib = [
  { name: 'Aroma', type: 'quant', value: 28 },
  { name: 'Flavor', type: 'quant', value: 24 },
  { name: 'Label', type: 'quali', value: 18 },
  { name: 'Soil', type: 'quali', value: 16 },
  { name: 'Descriptor', type: 'quali', value: 14 }
];

export const clustersElbow = [
  { k: 2, inertia: 120 },
  { k: 3, inertia: 90 },
  { k: 4, inertia: 72 },
  { k: 5, inertia: 60 }
];

export const irisClusterSamples = [
  { sepal: 5.1, petal: 1.4, species: 'setosa', cluster: 1 },
  { sepal: 6.0, petal: 4.5, species: 'versicolor', cluster: 2 },
  { sepal: 6.9, petal: 5.4, species: 'virginica', cluster: 3 },
  { sepal: 5.8, petal: 5.1, species: 'virginica', cluster: 3 },
  { sepal: 6.4, petal: 4.5, species: 'versicolor', cluster: 2 }
];

type ClusterData = { sepal: number; petal: number; cluster: number }[];

export const irisClusterSamplesByK: Record<2 | 3 | 4, ClusterData> = {
  2: [
    { sepal: 5.1, petal: 1.4, cluster: 1 },
    { sepal: 6.0, petal: 4.5, cluster: 2 },
    { sepal: 6.4, petal: 4.5, cluster: 2 },
    { sepal: 6.9, petal: 5.4, cluster: 2 }
  ],
  3: [
    { sepal: 5.1, petal: 1.4, cluster: 1 },
    { sepal: 6.0, petal: 4.5, cluster: 2 },
    { sepal: 6.9, petal: 5.4, cluster: 3 },
    { sepal: 5.8, petal: 5.1, cluster: 3 }
  ],
  4: [
    { sepal: 5.1, petal: 1.4, cluster: 1 },
    { sepal: 6.0, petal: 4.5, cluster: 2 },
    { sepal: 6.4, petal: 4.5, cluster: 3 },
    { sepal: 6.9, petal: 5.4, cluster: 4 }
  ]
};

export const ldaDensity = [
  { x: -2, setosa: 0.05, versicolor: 0.02, virginica: 0.01 },
  { x: -1, setosa: 0.15, versicolor: 0.05, virginica: 0.02 },
  { x: 0, setosa: 0.3, versicolor: 0.18, virginica: 0.05 },
  { x: 1, setosa: 0.2, versicolor: 0.3, virginica: 0.15 },
  { x: 2, setosa: 0.1, versicolor: 0.25, virginica: 0.25 },
  { x: 3, setosa: 0.05, versicolor: 0.2, virginica: 0.3 }
];

export const ldaConfusion = {
  training: { setosa: 50, versicolor: 45, virginica: 48 },
  testing: { setosa: 25, versicolor: 23, virginica: 24 }
};
