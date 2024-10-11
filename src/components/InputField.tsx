import React, { useState, useEffect, useRef } from 'react';

interface InputFieldProps {
  value: string;
  onChange: (value: string) => void;
  onCorrectWord: (word: string) => void;
  words: string[];
}

const InputField: React.FC<InputFieldProps> = ({ value, onChange, onCorrectWord, words }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);

    const matchedWord = words.find(word => word === newValue.trim());
    if (matchedWord) {
      onCorrectWord(matchedWord);
      onChange('');
    }
  };

  return (
    <div className="w-full max-w-md">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
        placeholder="Type the words here..."
      />
    </div>
  );
};

export default InputField;