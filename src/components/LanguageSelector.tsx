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
      <h2 className="text-xl font-bold text-dracula-cyan">
        Select Programming Language
      </h2>
      <select
        onChange={(e) => onSelect(e.target.value)}
        className="mt-2 p-2 border rounded bg-dracula-currentLine text-dracula-foreground"
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
