import React from 'react';

interface TitleBarProps {
  title: string;
}

const TitleBar: React.FC<TitleBarProps> = ({ title }) => {
  return (
    <div className="flex items-center justify-between p-2 bg-slate-950 rounded-t-lg">
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
      </div>
      <h2 className="text-center text-dracula-foreground">{title}</h2>
      <div className="w-12"></div>{' '}
      {/* Placeholder to balance the flex layout */}
    </div>
  );
};

export default TitleBar;
