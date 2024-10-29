import React, { useState, useEffect } from 'react';
import TitleBar from './TitleBar';
import BlinkingCursor from './BlinkingCursor';
import useTypedCode from '../hooks/useTypedCode';

interface CodeDisplayProps {
  codeSnippet: string;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ codeSnippet }) => {
  const [typedCode] = useTypedCode();
  const [correctWords, setCorrectWords] = useState<number>(0);
  const [correctLetters, setCorrectLetters] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);

  useEffect(() => {
    if (typedCode.length === 1 && startTime === null) {
      setStartTime(Date.now());
    }

    const snippetWords = codeSnippet.split(/\s+/);
    const typedWords = typedCode.split(/\s+/);

    let correctWordCount = 0;
    let correctLetterCount = 0;

    snippetWords.forEach((word, wordIndex) => {
      if (typedWords[wordIndex] === word) {
        correctWordCount++;
        correctLetterCount += word.length;
      } else if (typedWords[wordIndex]) {
        const minLength = Math.min(word.length, typedWords[wordIndex].length);
        for (let i = 0; i < minLength; i++) {
          if (word[i] === typedWords[wordIndex][i]) {
            correctLetterCount++;
          }
        }
      }
    });

    setCorrectWords(correctWordCount);
    setCorrectLetters(correctLetterCount);

    // Check if the user has finished typing the entire code snippet
    if (typedCode.length > 0 && typedCode.length === codeSnippet.length) {
      setIsFinished(true);
      setEndTime(Date.now());
    }
  }, [typedCode, codeSnippet, startTime]);

  const renderCode = () => {
    const snippetChars = codeSnippet.split('');
    const typedChars = typedCode.split('');

    return snippetChars.map((char, index) => {
      let className = 'text-foreground-500';
      if (index < typedChars.length) {
        className =
          char === typedChars[index] ? 'text-green-500' : 'text-red-500';
      }
      return (
        <span key={index} className={`${className} relative`}>
          {char}
          {index === typedChars.length && <BlinkingCursor />}
        </span>
      );
    });
  };

  const totalWords = codeSnippet.split(/\s+/).length;
  const totalLetters = codeSnippet.length;
  const accuracy = ((correctLetters / totalLetters) * 100).toFixed(2);
  const timeTaken =
    startTime && endTime ? ((endTime - startTime) / 1000).toFixed(2) : null;

  return (
    <div className="flex w-full max-w-4xl flex-col items-center justify-start rounded-lg bg-slate-900 shadow-lg">
      <TitleBar title="Code Snippet.js" />
      {isFinished ? (
        <div className="p-4">
          <h2 className="text-2xl font-bold">Results</h2>
          <p>
            Correct Words: {correctWords} / {totalWords}
          </p>
          <p>
            Correct Letters: {correctLetters} / {totalLetters}
          </p>
          <p>Accuracy: {accuracy}%</p>
          <p>Time Taken: {timeTaken} seconds</p>
        </div>
      ) : (
        <>
          <div className="p-4">
            <p>Correct Words: {correctWords}</p>
            <p>Correct Letters: {correctLetters}</p>
          </div>
          {codeSnippet && (
            <div className="flex-grow overflow-y-auto rounded-b-lg bg-slate-900 p-4">
              <pre className="text-dracula-foreground mt-2 overflow-x-auto whitespace-pre-wrap rounded p-2">
                <code>{renderCode()}</code>
              </pre>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CodeDisplay;
