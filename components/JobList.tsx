import React, { useState } from 'react';
import type { Job } from '../types';
import { BuildingOfficeIcon } from './icons/BuildingOfficeIcon';
import { MapPinIcon } from './icons/MapPinIcon';
import { CurrencyDollarIcon } from './icons/CurrencyDollarIcon';

interface JobListProps {
  jobs: Job[];
  onJobSelect: (job: Job) => void;
}

export const JobList: React.FC<JobListProps> = ({ jobs, onJobSelect }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSelect = (job: Job) => {
    setSelectedId(job.id);
    onJobSelect(job);
  };
  
  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-2 text-slate-800 dark:text-slate-200">Select a Job Posting</h2>
      <p className="text-slate-500 dark:text-slate-400 text-center mb-8">Choose a job to analyze against your uploaded resume.</p>
      <div className="space-y-4">
        {jobs.map((job) => (
          <button
            key={job.id}
            onClick={() => handleSelect(job)}
            disabled={selectedId !== null}
            className={`w-full text-left p-5 border rounded-xl transition-all duration-300 transform-gpu hover:-translate-y-1 ${
              selectedId === job.id
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 ring-2 ring-indigo-500'
                : 'border-gray-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-lg bg-white dark:bg-slate-800/50'
            } disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none`}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start">
              <div className="flex-grow">
                <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-500">{job.title}</h3>
                <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1 text-slate-600 dark:text-slate-400">
                  <span className="flex items-center text-sm font-medium"><BuildingOfficeIcon className="w-4 h-4 mr-1.5 text-slate-400 dark:text-slate-500" /> {job.company}</span>
                  <span className="flex items-center text-sm"><MapPinIcon className="w-4 h-4 mr-1.5 text-slate-400 dark:text-slate-500" /> {job.location}</span>
                </div>
              </div>
              <div className="text-left sm:text-right flex-shrink-0 mt-3 sm:mt-0 sm:ml-4">
                {job.salary && <p className="flex items-center text-lg font-semibold text-green-600 dark:text-green-400"><CurrencyDollarIcon className="w-5 h-5 mr-1 text-green-400 dark:text-green-500"/> {job.salary}</p>}
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{job.experience} experience</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200/80 dark:border-slate-700/60">
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <span key={skill} className="bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300 text-xs font-medium px-2.5 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};