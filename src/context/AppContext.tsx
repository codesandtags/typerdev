import React, { createContext, useState, ReactNode } from 'react';

interface AppContextProps {
  language: string;
  setLanguage: (language: string) => void;
  snippetsMap: Record<string, string>;
}

const defaultContext: AppContextProps = {
  language: 'JavaScript',
  setLanguage: () => {},
  snippetsMap: {
    javascript: '../snippets/javascript-keywords.json',
  },
};

export const AppContext = createContext<AppContextProps>(defaultContext);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<string>('JavaScript');

  return (
    <AppContext.Provider value={{ language, setLanguage }}>
      {children}
    </AppContext.Provider>
  );
};
