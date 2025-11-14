"use client";

// app/components/course/course5/TrialTypeSelector.tsx
import React, { useState } from 'react';

interface TrialType {
  name: string;
  description: string;
  diagram: string;
}

const trialTypes: TrialType[] = [
  { name: 'Cohort Study', description: 'An observational study that follows a group of people (a cohort) over time.', diagram: 'Exposure → Outcome' },
  { name: 'Case-Control Study', description: 'An observational study that compares two groups of people: those with the disease (cases) and those without (controls).', diagram: 'Exposure ← Outcome' },
  { name: 'Cross-Sectional Study', description: 'An observational study that analyzes data from a population at a single point in time.', diagram: 'Exposure & Outcome at a single point in time' },
  { name: 'Randomized Clinical Trial (RCT)', description: 'A study in which participants are randomly assigned to one of two or more treatment arms.', diagram: 'Randomization → Treatment/Control → Outcome' },
];

const TrialTypeSelector: React.FC = () => {
  const [selectedType, setSelectedType] = useState<TrialType | null>(trialTypes[0]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-4">
        {trialTypes.map((type) => (
          <button
            key={type.name}
            onClick={() => setSelectedType(type)}
            className={`px-4 py-2 rounded-md transition-colors ${
              selectedType?.name === type.name
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {type.name}
          </button>
        ))}
      </div>
      {selectedType && (
        <div className="p-4 border border-gray-300 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">{selectedType.name}</h3>
          <p><strong>Description:</strong> {selectedType.description}</p>
          <p><strong>Diagram:</strong> {selectedType.diagram}</p>
        </div>
      )}
    </div>
  );
};

export default TrialTypeSelector;
