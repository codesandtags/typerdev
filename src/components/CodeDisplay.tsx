import React from 'react';

interface CodeDisplayProps {
  code: string;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ code }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Code Snippet</h2>
      <pre className="mt-2 p-2 border rounded bg-gray-100">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeDisplay;
