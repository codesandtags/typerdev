import React from 'react';
import TitleBar from './TitleBar';
import BlinkingCursor from './BlinkingCursor';
import useTypedCode from '../hooks/useTypedCode';

interface CodeDisplayProps {
  codeSnippet: string;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ codeSnippet }) => {
  const [typedCode] = useTypedCode();

  const renderCode = () => {
    const snippetChars = codeSnippet.split('');
    const typedChars = typedCode.split('');

    return snippetChars.map((char, index) => {
      let className = 'text-dracula-foreground';
      if (index < typedChars.length) {
        className =
          char === typedChars[index] ? 'text-green-500' : 'text-red-500';
      }
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="w-full flex flex-col items-center justify-start bg-typerdev-background text-typerdev-foreground h-[80vh]">
      <div className="w-full max-w-4xl bg-slate-900 rounded-lg shadow-lg h-full">
        <TitleBar title="Code Snippet.js" />
        <div className="flex-grow p-4 bg-slate-900 rounded-b-lg overflow-y-auto">
          <pre className="mt-2 p-2 rounded text-dracula-foreground overflow-x-auto whitespace-pre-wrap">
            <code>
              {renderCode()}
              <BlinkingCursor />
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CodeDisplay;
