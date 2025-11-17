import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';
import { ThemeToggle } from './ThemeToggle';

export const Header: React.FC = () => {
  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg sticky top-0 z-10 border-b border-gray-200/80 dark:border-slate-700/60">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <SparklesIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-500 mr-3" />
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-200 tracking-tight">
            AI Job Search Agent
          </h1>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
};