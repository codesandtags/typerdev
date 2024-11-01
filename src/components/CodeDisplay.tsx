import React, { useState, useEffect } from 'react';
import TitleBar from './TitleBar';
import BlinkingCursor from './BlinkingCursor';
import useTypedCode from '../hooks/useTypedCode';
import Confetti from 'react-confetti';

interface CodeDisplayProps {
  codeSnippet: string;
  isFinished: boolean;
  setIsFinished: (value: boolean) => void;
  startTime: number | null;
  setStartTime: (value: number | null) => void;
  endTime: number | null;
  setEndTime: (value: number | null) => void;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({
  codeSnippet,
  isFinished,
  setIsFinished,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
}) => {
  const [typedCode, resetTypedCode] = useTypedCode();
  const [correctWords, setCorrectWords] = useState<number>(0);
  const [correctLetters, setCorrectLetters] = useState<number>(0);
  const [currentCursorPosition, setCurrentCursorPosition] = useState<number>(0);

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
  }, [typedCode, codeSnippet, startTime, setIsFinished, setEndTime]);

  const renderCode = () => {
    const snippetWords = codeSnippet.split(/\s+/);
    const typedWords = typedCode.split(/\s+/);

    const currentWordIndex = typedWords.length - 1;
    const currentCharIndex = typedWords[currentWordIndex]?.length || 0;

    return snippetWords.map((word, wordIndex) => {
      const snippetChars = word.split('');
      const typedChars = typedWords[wordIndex]
        ? typedWords[wordIndex].split('')
        : [];

      return (
        <div className="word" key={wordIndex}>
          {snippetChars.map((char, charIndex) => {
            let className = 'text-gray-500';
            if (charIndex < typedChars.length) {
              className =
                char === typedChars[charIndex]
                  ? 'text-green-500'
                  : 'text-red-500';
            }
            return (
              <span key={charIndex} className={`${className} relative`}>
                {char}
                {wordIndex === currentWordIndex &&
                  charIndex === currentCharIndex && <BlinkingCursor />}
              </span>
            );
          })}
          {wordIndex < snippetWords.length - 1 && (
            <span className="letter-space relative">
              {' '}
              {wordIndex === currentWordIndex &&
                currentCharIndex === snippetChars.length && <BlinkingCursor />}
            </span>
          )}
        </div>
      );
    });
  };

  const totalWords = codeSnippet.split(/\s+/).length;
  const totalLetters = codeSnippet.length;
  const accuracy = ((correctLetters / totalLetters) * 100).toFixed(2);
  const timeTaken =
    startTime && endTime ? ((endTime - startTime) / 1000).toFixed(2) : null;

  const startNewGame = () => {
    resetTypedCode();
    setCorrectWords(0);
    setCorrectLetters(0);
    setIsFinished(false);
    setStartTime(null);
    setEndTime(null);
  };

  return (
    <div className="flex w-full max-w-4xl flex-col items-center justify-start rounded-lg bg-slate-900 shadow-lg">
      <TitleBar title="Code Snippet.js" />
      {isFinished && <Confetti />}
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
          <button
            onClick={startNewGame}
            className="mt-4 rounded bg-typerdev-purple p-2 text-typerdev-foreground"
          >
            Start New Game
          </button>
        </div>
      ) : (
        <>
          {/* <div className="p-4">
            <p>Correct Words: {correctWords}</p>
            <p>Correct Letters: {correctLetters}</p>
          </div> */}
          {codeSnippet && (
            <div className="flex-grow overflow-y-auto rounded-b-lg bg-slate-900 p-4">
              <pre className="mt-2 rounded p-2 text-typerdev-foreground">
                <code className="flex flex-wrap">{renderCode()}</code>
              </pre>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CodeDisplay;
