import React, { useState, useEffect, useCallback } from 'react';
import { Play, RefreshCw, FileTerminal } from 'lucide-react';
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

// Sound effects
const correctSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
const missSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2870/2870-preview.mp3');

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [missedWords, setMissedWords] = useState(0);
  const [currentWords, setCurrentWords] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [level, setLevel] = useState(1);
  const [wordsTyped, setWordsTyped] = useState(0);

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
    correctSound.play();
    setWordsTyped(prev => {
      const newWordsTyped = prev + 1;
      if (newWordsTyped % 5 === 0) {
        setLevel(prevLevel => prevLevel + 1);
      }
      return newWordsTyped;
    });
  }, [removeWord]);

  const handleMissedWord = useCallback(() => {
    setMissedWords(prev => {
      const newMissedWords = prev + 1;
      if (newMissedWords >= 10) {
        setGameOver(true);
      }
      missSound.play();
      return newMissedWords;
    });
  }, []);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setMissedWords(0);
    setCurrentWords([]);
    setLevel(1);
    setWordsTyped(0);
  };

  const restartGame = () => {
    setGameOver(false);
    setScore(0);
    setMissedWords(0);
    setCurrentWords([]);
    setLevel(1);
    setWordsTyped(0);
  };

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const interval = setInterval(addWord, 2000 / level);
      return () => clearInterval(interval);
    }
  }, [gameStarted, gameOver, addWord, level]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 flex flex-col">
      <header className="bg-gray-800 p-4">
        <h1 className="text-2xl font-bold flex items-center"><FileTerminal /> TyperDev</h1>
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
            <ScoreBoard score={score} missedWords={missedWords} level={level} />
            <WordContainer
              words={currentWords}
              onMissedWord={handleMissedWord}
              level={level}
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
      <footer className="bg-gray-800 p-4 text-center flex items-center flex-col">
        <div className="w-24 px-2 py-1 bg-gray-700 rounded text-sm mb-2"><code className="font-mono text-green-400">TyperDev</code></div>
        <div className='text-xs'>&copy; 2024  v.0.0.1 - codesandtags </div>
      </footer>
    </div>
  );
}

export default App;