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
      <label className="text-sm" htmlFor="selectProgrammingLanguage">
        Programming Language
      </label>
      <select
        id="selectProgrammingLanguage"
        onChange={(e) => onSelect(e.target.value)}
        className="mx-2 mt-2 rounded bg-gray-800 p-2 text-sm text-gray-300"
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
