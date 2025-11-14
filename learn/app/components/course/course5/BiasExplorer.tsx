"use client";

// app/components/course/course5/BiasExplorer.tsx
import React, { useState } from 'react';

interface Bias {
  name: string;
  description: string;
  mitigation: string;
}

const biases: Bias[] = [
  { name: 'Selection Bias', description: 'Systematic differences between baseline characteristics of the groups that are compared.', mitigation: 'Randomization' },
  { name: 'Performance Bias', description: 'Systematic differences between groups in the care that is provided, or in exposure to factors other than the interventions of interest.', mitigation: 'Blinding of treatment allocation' },
  { name: 'Attrition Bias', description: 'Systematic differences between groups in withdrawals from a study (missing values).', mitigation: 'Intention-to-treat analysis' },
  { name: 'Reporting Bias', description: 'Systematic differences between reported and unreported findings.', mitigation: 'Pre-registration of studies and protocols' },
];

const BiasExplorer: React.FC = () => {
  const [selectedBias, setSelectedBias] = useState<Bias | null>(biases[0]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-4">
        {biases.map((bias) => (
          <button
            key={bias.name}
            onClick={() => setSelectedBias(bias)}
            className={`px-4 py-2 rounded-md transition-colors ${
              selectedBias?.name === bias.name
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {bias.name}
          </button>
        ))}
      </div>
      {selectedBias && (
        <div className="p-4 border border-gray-300 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">{selectedBias.name}</h3>
          <p><strong>Description:</strong> {selectedBias.description}</p>
          <p><strong>Mitigation:</strong> {selectedBias.mitigation}</p>
        </div>
      )}
    </div>
  );
};

export default BiasExplorer;
