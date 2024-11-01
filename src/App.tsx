import React, { useState, useContext, useEffect } from 'react';
import LanguageSelector from './components/LanguageSelector';
import CodeDisplay from './components/CodeDisplay';
import { AppContext } from './context/AppContext';
import { FileTerminal } from 'lucide-react';
import useTypedCode from './hooks/useTypedCode';

const App: React.FC = () => {
  const { language, setLanguage } = useContext(AppContext);
  const [codeSnippet, setCodeSnippet] = useState<string>(''); // Placeholder for code snippet
  const [typedCode, resetTypedCode] = useTypedCode();
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const languages = ['JavaScript', 'Python', 'Java', 'Cpp', 'Go']; // Example languages

  const handleLanguageSelect = (selectedLanguage: string) => {
    setCodeSnippet('');
    setLanguage(selectedLanguage);
    startNewGame(); // Start a new game when the language changes
  };

  const getSnippet = async (language: string) => {
    if (language) {
      const response = await fetch(
        `/snippets/${language.toLowerCase()}-keywords.json`
      );
      const snippet = await response.json();
      setCodeSnippet(snippet.join(' '));
    }
  };

  // Fetch code snippet based on the selected language
  useEffect(() => {
    getSnippet(language);
  }, [language]);

  const startNewGame = () => {
    resetTypedCode();
    setIsFinished(false);
    setStartTime(null);
    setEndTime(null);
  };

  return (
    <div className="flex h-screen w-screen flex-col bg-gray-800 text-gray-300">
      <main className="flex flex-grow justify-center px-4 py-8">
        <CodeDisplay
          codeSnippet={codeSnippet}
          isFinished={isFinished}
          setIsFinished={setIsFinished}
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
        />
      </main>
      <div className="mx-auto">
        <LanguageSelector
          languages={languages}
          onSelect={handleLanguageSelect}
        />
      </div>
      <footer className="flex items-center justify-between p-4 text-center">
        <div className="flex w-24 rounded px-2 py-1">
          <span className="text-md">
            <FileTerminal className="text-typerdev-green" />{' '}
          </span>
          <span className="font-mono">TyperDev</span>
        </div>
        <div className="text-xs">&copy; 2024 v.0.0.1 - codesandtags </div>
      </footer>
    </div>
  );
};

export default App;
