import React from 'react';

interface ScoreBoardProps {
  score: number;
  missedWords: number;
  level: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, missedWords, level }) => {
  return (
    <div className="flex justify-between w-full max-w-md mb-4">
      <div className="text-lg">
        <span className="font-bold">Score:</span> {score}
      </div>
      <div className="text-lg">
        <span className="font-bold">Level:</span> {level}
      </div>
      <div className="text-lg">
        <span className="font-bold">Missed:</span> {missedWords}/10
      </div>
    </div>
  );
};

export default ScoreBoard;