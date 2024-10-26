import React from 'react';
import useTypedCode from '../hooks/useTypedCode';
import TitleBar from './TitleBar';
import BlinkingCursor from './BlinkingCursor';

interface CodeDisplayProps {
  code: string;
}

const CodeDisplay: React.FC<CodeDisplayProps> = () => {
  const typedCode = useTypedCode();
  const title = 'Code Snippet.js';

  return (
    <div className="w-full flex flex-col items-center justify-start h-[80vh]">
      <div className="w-full max-w-4xl  rounded-lg shadow-lg h-full bg-typerdev-terminal">
        <TitleBar title={title} />
        <div className="flex-grow p-4 rounded-b-lg overflow-y-auto">
          <pre className="mt-2 p-2 rounded text-typerdev-foreground overflow-x-auto">
            <code>{typedCode}</code>
            <BlinkingCursor />
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CodeDisplay;
