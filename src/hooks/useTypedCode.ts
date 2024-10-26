import { useState, useEffect } from 'react';

const useTypedCode = () => {
  const [typedCode, setTypedCode] = useState<string>('');

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();
      // Ignore keys that do not produce a character
      if (
        event.key === 'Shift' ||
        event.key === 'Control' ||
        event.key === 'Alt' ||
        event.key === 'Meta' ||
        event.key === 'Command' ||
        event.key === 'Tab' ||
        event.key === 'Dead' ||
        event.key === 'ArrowLeft' ||
        event.key === 'ArrowRight' ||
        event.key === 'ArrowUp' ||
        event.key === 'ArrowDown'
      ) {
        return;
      }

      if (event.key === 'Enter') {
        setTypedCode((prev) => prev + '\n');
      } else if (event.key === 'Backspace') {
        setTypedCode((prev) => prev.slice(0, -1));
      } else {
        setTypedCode((prev) => prev + event.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return typedCode;
};

export default useTypedCode;
