interface InteractiveSelectorProps {
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
  children: (selected: string) => React.ReactNode;
}

export default function InteractiveSelector({ options, selected, onSelect, children }: InteractiveSelectorProps) {
  return (
    <div>
      <div className="flex gap-2 mb-4 flex-wrap">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className={`px-4 py-2 rounded ${selected === option ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="border rounded-lg p-4">
        {children(selected)}
      </div>
    </div>
  );
}