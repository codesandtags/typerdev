import React, { useState, useContext, useEffect } from 'react';
import LanguageSelector from './components/LanguageSelector';
import CodeDisplay from './components/CodeDisplay';
import { AppContext } from './context/AppContext';
import { FileTerminal } from 'lucide-react';

const App: React.FC = () => {
  const { language, setLanguage } = useContext(AppContext);
  const [codeSnippet, setCodeSnippet] = useState<string>(''); // Placeholder for code snippet
  const languages = ['JavaScript', 'Python', 'Java', 'C++', 'Go']; // Example languages

  const handleLanguageSelect = (selectedLanguage: string) => {
    setCodeSnippet('');
    setLanguage(selectedLanguage);
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

  return (
    <div className="flex min-h-screen flex-col bg-slate-900 text-gray-300">
      <header className="p-4">
        <LanguageSelector
          languages={languages}
          onSelect={handleLanguageSelect}
        />
      </header>
      <main className="flex flex-grow">
        <CodeDisplay codeSnippet={codeSnippet} />
      </main>
      <footer className="flex flex-col items-center p-4 text-center">
        <div className="0 mb-2 w-24 rounded px-2 py-1 text-sm">
          <FileTerminal className="inline-block" />
          <span className="font-mono">TyperDev</span>
        </div>
        <div className="text-xs">&copy; 2024 v.0.0.1 - codesandtags </div>
      </footer>
    </div>
  );
};

export default App;
