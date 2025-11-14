"use client";

// app/components/course/course5/EvidencePyramid.tsx
import React, { useState } from 'react';

interface PyramidLevel {
  name: string;
  description: string;
}

const pyramidLevels: PyramidLevel[] = [
  { name: 'Systematic Reviews & Meta-Analyses', description: 'Highest level of evidence, combining results from multiple studies.' },
  { name: 'Randomized Controlled Trials (RCTs)', description: 'Gold standard for evaluating interventions.' },
  { name: 'Cohort Studies', description: 'Observational studies that follow a group over time.' },
  { name: 'Case-Control Studies', description: 'Observational studies that compare cases and controls.' },
  { name: 'Case Series & Case Reports', description: 'Collections of reports on the treatment of individual patients.' },
  { name: 'Editorials & Expert Opinion', description: 'Based on the experience of experts.' },
];

const EvidencePyramid: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<PyramidLevel | null>(null);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-md">
        {pyramidLevels.map((level, index) => (
          <div
            key={level.name}
            onClick={() => setSelectedLevel(level)}
            className="bg-blue-500 text-white text-center py-2 px-4 cursor-pointer hover:bg-blue-600 transition-colors"
            style={{ clipPath: `polygon(${index * 10}% 0, ${100 - index * 10}% 0, ${100 - (index + 1) * 10}% 100%, ${(index + 1) * 10}% 100%)` }}
          >
            {level.name}
          </div>
        ))}
      </div>
      {selectedLevel && (
        <div className="mt-8 p-4 border border-gray-300 rounded-lg w-full max-w-md">
          <h3 className="text-xl font-semibold mb-2">{selectedLevel.name}</h3>
          <p>{selectedLevel.description}</p>
        </div>
      )}
    </div>
  );
};

export default EvidencePyramid;
