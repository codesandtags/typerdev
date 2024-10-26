import React, { useState, useContext } from 'react';
import LanguageSelector from './components/LanguageSelector';
import CodeDisplay from './components/CodeDisplay';
import { AppContext } from './context/AppContext';
import { FileTerminal } from 'lucide-react';

const App: React.FC = () => {
  const { language, setLanguage } = useContext(AppContext);
  const [codeSnippet, setCodeSnippet] = useState<string>(''); // Placeholder for code snippet

  const languages = ['JavaScript', 'Python', 'Java', 'C++', 'Go']; // Example languages

  const handleLanguageSelect = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
    // Fetch or generate a code snippet based on the selected language
    setCodeSnippet(`// Example code snippet for ${selectedLanguage}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 flex flex-col">
      <header className="bg-gray-800 p-4">
        <h1 className="text-2xl font-bold flex items-center">
          <FileTerminal /> TyperDev
        </h1>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <LanguageSelector
          languages={languages}
          onSelect={handleLanguageSelect}
        />
        <CodeDisplay code={codeSnippet} />
      </main>
      <footer className="bg-gray-800 p-4 text-center flex items-center flex-col">
        <div className="w-24 px-2 py-1 bg-gray-700 rounded text-sm mb-2">
          <code className="font-mono text-green-400">TyperDev</code>
        </div>
        <div className="text-xs">&copy; 2024 v.0.0.1 - codesandtags </div>
      </footer>
    </div>
  );
};

export default App;
