import React, { useEffect, useState } from 'react';

interface WordContainerProps {
  words: string[];
  onMissedWord: () => void;
  level: number;
}

const WordContainer: React.FC<WordContainerProps> = ({ words, onMissedWord, level }) => {
  const [positions, setPositions] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const interval = setInterval(() => {
      setPositions(prev => {
        const newPositions = { ...prev };
        words.forEach(word => {
          if (!(word in newPositions)) {
            newPositions[word] = 0;
          } else {
            newPositions[word] += 0.5 * level;
            if (newPositions[word] >= 100) {
              onMissedWord();
              delete newPositions[word];
            }
          }
        });
        return newPositions;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [words, onMissedWord, level]);

  return (
    <div className="w-full h-96 relative overflow-hidden bg-gray-800 rounded-lg mb-4">
      {words.map((word, index) => (
        <div
          key={`${word}-${index}`}
          className="absolute left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-700 rounded text-sm"
          style={{
            top: `${positions[word] || 0}%`,
            transition: 'top 0.05s linear',
          }}
        >
          <code className="font-mono text-green-400">{word}</code>
        </div>
      ))}
    </div>
  );
};

export default WordContainer;