"use client";

// app/components/course/course5/InteractiveWorkflow.tsx
import React, { useState } from 'react';

interface WorkflowStep {
  title: string;
  description: string;
}

interface InteractiveWorkflowProps {
  steps: WorkflowStep[];
}

const InteractiveWorkflow: React.FC<InteractiveWorkflowProps> = ({ steps }) => {
  const [selectedStep, setSelectedStep] = useState<WorkflowStep | null>(null);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex flex-wrap gap-4">
        {steps.map((step, index) => (
          <button
            key={index}
            onClick={() => setSelectedStep(step)}
            className={`p-4 rounded-lg shadow-md text-center transition-colors ${
              selectedStep?.title === step.title
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {step.title}
          </button>
        ))}
      </div>
      <div className="flex-1 p-4 border border-gray-300 rounded-lg">
        {selectedStep ? (
          <div>
            <h3 className="text-xl font-semibold mb-2">{selectedStep.title}</h3>
            <p>{selectedStep.description}</p>
          </div>
        ) : (
          <p className="text-gray-500">Select a step to see the details.</p>
        )}
      </div>
    </div>
  );
};

export default InteractiveWorkflow;
