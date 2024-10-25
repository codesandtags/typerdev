import React from 'react';
import { RefreshCw } from 'lucide-react';
import ShareResults from './ShareResults';

interface GameOverProps {
  score: number;
  missedWords: number;
  level: number;
  onRestart: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ score, missedWords, level, onRestart }) => {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4">Game Over</h2>
      <p className="text-xl mb-2">Final Score: {score}</p>
      <p className="text-xl mb-4">Missed Words: {missedWords}</p>
      <ShareResults score={score} level={level} />
      <button
        onClick={onRestart}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center mx-auto mt-4"
      >
        <RefreshCw className="mr-2" /> Play Again
      </button>
    </div>
  );
};

export default GameOver;