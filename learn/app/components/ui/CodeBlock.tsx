interface CodeBlockProps {
  code: string;
}

export default function CodeBlock({ code }: CodeBlockProps) {
  return (
    <pre className="bg-gray-100 p-2 rounded text-gray-900 text-sm">
      <code>{code}</code>
    </pre>
  );
}