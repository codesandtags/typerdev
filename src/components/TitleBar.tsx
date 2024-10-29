import React from 'react';

interface TitleBarProps {
  title: string;
}

const TitleBar: React.FC<TitleBarProps> = ({ title }) => {
  return (
    <div className="flex h-7 w-full items-center justify-between bg-slate-700 px-2 sm:rounded-t-lg">
      <div className="flex items-center gap-2">
        <div className="invisible size-3 rounded-full bg-red-500 sm:visible"></div>
        <div className="invisible size-3 rounded-full bg-yellow-500 sm:visible"></div>
        <div className="invisible size-3 rounded-full bg-green-500 sm:visible"></div>
      </div>
      <div className="font-mono text-sm text-gray-200">{title}</div>
      <div className="h-3 w-14"></div>
    </div>
  );
};

export default TitleBar;
