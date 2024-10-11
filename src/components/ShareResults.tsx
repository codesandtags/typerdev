import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import { Share2 } from 'lucide-react';

interface ShareResultsProps {
  score: number;
  level: number;
}

const ShareResults: React.FC<ShareResultsProps> = ({ score, level }) => {
  const scoreRef = useRef<HTMLDivElement>(null);

  const captureAndShare = async () => {
    if (scoreRef.current) {
      const canvas = await html2canvas(scoreRef.current);
      const imageData = canvas.toDataURL('image/png');
      
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'My Typing Game Score',
            text: `I scored ${score} points and reached level ${level} in the React Typing Game!`,
            files: [new File([dataURItoBlob(imageData)], 'score.png', { type: 'image/png' })],
          });
        } catch (error) {
          console.error('Error sharing:', error);
        }
      } else {
        // Fallback for browsers that don't support the Web Share API
        const shareUrl = `https://twitter.com/intent/tweet?text=I scored ${score} points and reached level ${level} in the React Typing Game!`;
        window.open(shareUrl, '_blank');
      }
    }
  };

  // Helper function to convert data URI to Blob
  const dataURItoBlob = (dataURI: string) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  return (
    <div>
      <div ref={scoreRef} className="bg-gray-800 p-6 rounded-lg shadow-lg mb-4">
        <h2 className="text-2xl font-bold mb-4">React Typing Game Results</h2>
        <p className="text-xl mb-2">Score: {score}</p>
        <p className="text-xl">Level: {level}</p>
      </div>
      <button
        onClick={captureAndShare}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center w-full"
      >
        <Share2 className="mr-2" /> Share Results
      </button>
    </div>
  );
};

export default ShareResults;