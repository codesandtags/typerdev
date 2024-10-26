import React from 'react';

interface LanguageSelectorProps {
  languages: string[];
  onSelect: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  languages,
  onSelect,
}) => {
  return (
    <div className="p-4">
      <label className="text-xl font-bold" htmlFor="selectProgrammingLanguage">
        Select Programming Language
      </label>
      <select
        id="selectProgrammingLanguage"
        onChange={(e) => onSelect(e.target.value)}
        className="mx-2 p-2 bg-gray-800 text-gray-300 rounded mt-2"
      >
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
