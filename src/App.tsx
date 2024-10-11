import React, { useState, useEffect, useCallback } from 'react';
import { Play, RefreshCw } from 'lucide-react';
import GameOver from './components/GameOver';
import WordContainer from './components/WordContainer';
import InputField from './components/InputField';
import ScoreBoard from './components/ScoreBoard';

const WORDS = [
  'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while',
  'class', 'import', 'export', 'async', 'await', 'try', 'catch', 'throw',
  'interface', 'type', 'enum', 'implements', 'extends', 'super', 'this',
  'new', 'delete', 'typeof', 'instanceof', 'void', 'null', 'undefined'
];

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [missedWords, setMissedWords] = useState(0);
  const [currentWords, setCurrentWords] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const addWord = useCallback(() => {
    if (currentWords.length < 5) {
      const newWord = WORDS[Math.floor(Math.random() * WORDS.length)];
      setCurrentWords(prev => [...prev, newWord]);
    }
  }, [currentWords]);

  const removeWord = useCallback((word: string) => {
    setCurrentWords(prev => prev.filter(w => w !== word));
  }, []);

  const handleCorrectWord = useCallback((word: string) => {
    setScore(prev => prev + word.length);
    removeWord(word);
  }, [removeWord]);

  const handleMissedWord = useCallback((word: string) => {
    setMissedWords(prev => prev + 1);
    removeWord(word);
  }, [removeWord]);

  useEffect(() => {
    if (missedWords >= 10) {
      setGameOver(true);
    }
  }, [missedWords]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setMissedWords(0);
    setCurrentWords([]);
  };

  const restartGame = () => {
    setGameOver(false);
    setScore(0);
    setMissedWords(0);
    setCurrentWords([]);
  };

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const interval = setInterval(addWord, 2000);
      return () => clearInterval(interval);
    }
  }, [gameStarted, gameOver, addWord]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 flex flex-col">
      <header className="bg-gray-800 p-4">
        <h1 className="text-2xl font-bold">React Typing Game</h1>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        {!gameStarted ? (
          <button
            onClick={startGame}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            <Play className="mr-2" /> Start Game
          </button>
        ) : gameOver ? (
          <GameOver score={score} missedWords={missedWords} onRestart={restartGame} />
        ) : (
          <>
            <ScoreBoard score={score} missedWords={missedWords} />
            <WordContainer
              words={currentWords}
              onMissedWord={handleMissedWord}
            />
            <InputField
              value={input}
              onChange={setInput}
              onCorrectWord={handleCorrectWord}
              words={currentWords}
            />
          </>
        )}
      </main>
      <footer className="bg-gray-800 p-4 text-center">
        <p>&copy; 2024 React Typing Game. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;