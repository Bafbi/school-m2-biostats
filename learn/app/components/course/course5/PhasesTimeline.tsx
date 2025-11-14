"use client";

// app/components/course/course5/PhasesTimeline.tsx
import React, { useState } from 'react';

interface Phase {
  name: string;
  title: string;
  participants: string;
  duration: string;
  purpose: string;
}

const phases: Phase[] = [
  { name: 'Phase 0', title: 'Exploratory', participants: '10-15', duration: 'Short', purpose: 'Pharmacokinetics and pharmacodynamics' },
  { name: 'Phase I', title: 'Safety', participants: '20-80', duration: 'Several months', purpose: 'Safety and dosage' },
  { name: 'Phase II', title: 'Efficacy', participants: '100-300', duration: 'Up to 2 years', purpose: 'Efficacy and side effects' },
  { name: 'Phase III', title: 'Confirmation', participants: '1,000-3,000', duration: '1-4 years', purpose: 'Efficacy and monitoring of adverse reactions' },
  { name: 'Phase IV', title: 'Post-Marketing', participants: 'Thousands', duration: 'Ongoing', purpose: 'Safety and efficacy in the general population' },
];

const PhasesTimeline: React.FC = () => {
  const [selectedPhase, setSelectedPhase] = useState<Phase | null>(phases[0]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between">
        {phases.map((phase) => (
          <button
            key={phase.name}
            onClick={() => setSelectedPhase(phase)}
            className={`px-4 py-2 rounded-md transition-colors ${
              selectedPhase?.name === phase.name
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {phase.name}
          </button>
        ))}
      </div>
      {selectedPhase && (
        <div className="p-4 border border-gray-300 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">{selectedPhase.title}</h3>
          <p><strong>Participants:</strong> {selectedPhase.participants}</p>
          <p><strong>Duration:</strong> {selectedPhase.duration}</p>
          <p><strong>Purpose:</strong> {selectedPhase.purpose}</p>
        </div>
      )}
    </div>
  );
};

export default PhasesTimeline;
