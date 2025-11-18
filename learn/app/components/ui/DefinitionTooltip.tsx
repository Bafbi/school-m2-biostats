import React from 'react';

interface DefinitionTooltipProps {
  term: string;
  definition: string;
}

export default function DefinitionTooltip({ term, definition }: DefinitionTooltipProps) {
  return (
    <span className="relative inline-block">
      <abbr
        tabIndex={0}
        aria-describedby={`def-${term.replace(/\s+/g, '-')}`}
        className="cursor-help border-b border-dotted border-gray-400"
        title={definition}
      >
        {term}
      </abbr>

      <span
        id={`def-${term.replace(/\s+/g, '-')}`}
        role="tooltip"
        className="hidden group-hover:block group-focus:block absolute z-20 w-72 p-2 bg-white border rounded shadow-md text-sm text-gray-800"
      >
        {definition}
      </span>
    </span>
  );
}
