import React, { useState, useEffect } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

const messages = [
  "Parsing your resume...",
  "Cross-referencing skills with the job description...",
  "Identifying key strengths and weaknesses...",
  "Generating tailored recommendations...",
  "Preparing interview questions...",
  "Finalizing your personalized dashboard...",
];

export const AnalyzingScreen: React.FC<{ jobTitle?: string }> = ({ jobTitle }) => {
  const [currentMessage, setCurrentMessage] = useState(messages[0]);

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      index = (index + 1) % messages.length;
      setCurrentMessage(messages[index]);
    }, 2500); // Change message every 2.5 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="text-center p-8 flex flex-col items-center justify-center min-h-[400px]">
      <LoadingSpinner />
      <h2 className="text-2xl font-semibold mt-6 text-slate-800 dark:text-slate-200">
        Analyzing your profile for
      </h2>
      <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">{jobTitle || 'the selected role'}</p>
      <div className="relative h-6 mt-4 w-full max-w-sm overflow-hidden">
        <p key={currentMessage} className="text-slate-500 dark:text-slate-400 animate-fade-in-out absolute w-full">{currentMessage}</p>
      </div>

      <style>{`
        @keyframes fade-in-out {
          0% { opacity: 0; transform: translateY(10px); }
          20%, 80% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
        .animate-fade-in-out {
          animation: fade-in-out 2.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};