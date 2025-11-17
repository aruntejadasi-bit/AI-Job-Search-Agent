import React, { useState } from 'react';
import type { Job, AnalysisResult } from '../types';
import { CheckIcon } from './icons/CheckIcon';
import { CrossIcon } from './icons/CrossIcon';
import { ClipboardIcon } from './icons/ClipboardIcon';

interface DashboardProps {
  job: Job;
  analysis: AnalysisResult;
  onReset: () => void;
}

type Tab = 'overview' | 'resume' | 'interview' | 'plan';

const StatCard: React.FC<{ title: string; children: React.ReactNode, className?: string }> = ({ title, children, className }) => (
    <div className={`bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200/80 dark:border-slate-700/60 ${className}`}>
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">{title}</h3>
        {children}
    </div>
);

const MatchScoreGauge: React.FC<{ score: number }> = ({ score }) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;
    const colorClass = score >= 75 ? 'text-green-500 dark:text-green-400' : score >= 50 ? 'text-yellow-500 dark:text-yellow-400' : 'text-red-500 dark:text-red-400';

    return (
        <div className="relative w-40 h-40 mx-auto">
            <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r={radius} className="text-gray-200 dark:text-slate-700" strokeWidth="10" stroke="currentColor" fill="transparent" />
                <circle
                    cx="50" cy="50" r={radius}
                    className={colorClass}
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    fill="transparent"
                    transform="rotate(-90 50 50)"
                    style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-4xl font-bold ${colorClass}`}>{score}%</span>
            </div>
        </div>
    );
};

export const Dashboard: React.FC<DashboardProps> = ({ job, analysis, onReset }) => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [copied, setCopied] = useState(false);

  const tabs: { id: Tab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'resume', label: 'Tailored Resume' },
    { id: 'interview', label: 'Interview Prep' },
    { id: 'plan', label: '7-Day Plan' },
  ];

  const handleCopyResume = () => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = analysis.tailoredResume;
    navigator.clipboard.writeText(tempDiv.textContent || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const renderTabContent = () => {
    switch(activeTab) {
        case 'overview':
            return (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1 space-y-6">
                         <StatCard title="Match Score">
                            <MatchScoreGauge score={analysis.matchScore} />
                            <p className="text-center mt-4 text-slate-600 dark:text-slate-400">{analysis.matchSummary}</p>
                        </StatCard>
                        <StatCard title="Salary Prediction">
                            <p className="text-3xl font-bold text-center text-green-600 dark:text-green-400 mb-2">
                                ${analysis.salaryPrediction.low.toLocaleString()} - ${analysis.salaryPrediction.high.toLocaleString()}
                            </p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{analysis.salaryPrediction.explanation}</p>
                        </StatCard>
                    </div>

                    <div className="lg:col-span-2">
                        <StatCard title="Skill Gap Analysis">
                            <div>
                                <h4 className="font-semibold text-green-700 dark:text-green-400 mb-3">Matching Skills</h4>
                                <ul className="flex flex-wrap gap-2">
                                    {analysis.matchingSkills.map(skill => (
                                        <li key={skill} className="flex items-center bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 text-sm font-medium px-3 py-1.5 rounded-full">
                                            <CheckIcon className="w-4 h-4 mr-1.5" /> {skill}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-6">
                                <h4 className="font-semibold text-red-700 dark:text-red-400 mb-3">Missing Skills</h4>
                                <ul className="flex flex-wrap gap-2">
                                     {analysis.missingSkills.map(skill => (
                                        <li key={skill} className="flex items-center bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-300 text-sm font-medium px-3 py-1.5 rounded-full">
                                            <CrossIcon className="w-4 h-4 mr-1.5" /> {skill}
                                        </li>
                                    ))}
                                     {analysis.missingSkills.length === 0 && (
                                        <p className="text-sm text-slate-500 dark:text-slate-400">No critical skills missing. Great job!</p>
                                    )}
                                </ul>
                            </div>
                        </StatCard>
                    </div>
                </div>
            );
        case 'resume':
            return (
                 <StatCard title="AI-Generated Tailored Resume">
                    <div className="relative">
                      <button onClick={handleCopyResume} className="absolute top-0 right-0 -mt-2 -mr-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 p-2 rounded-md transition-colors text-slate-600 dark:text-slate-300">
                          {copied ? <CheckIcon className="w-5 h-5 text-green-600 dark:text-green-400" /> : <ClipboardIcon className="w-5 h-5" />}
                      </button>
                      <div className="prose prose-slate dark:prose-invert max-w-none prose-h4:text-indigo-700 prose-ul:pl-5 dark:prose-h4:text-indigo-400" dangerouslySetInnerHTML={{ __html: analysis.tailoredResume }} />
                    </div>
                </StatCard>
            );
        case 'interview':
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <StatCard title="Technical Questions">
                        <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
                            {analysis.interviewQuestions.technical.map((q, i) => <li key={i}>{q}</li>)}
                        </ul>
                    </StatCard>
                    <StatCard title="HR & Behavioral Questions">
                        <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
                            {analysis.interviewQuestions.hr.map((q, i) => <li key={i}>{q}</li>)}
                        </ul>
                    </StatCard>
                    {analysis.interviewQuestions.systemDesign.length > 0 && (
                        <StatCard title="System Design Questions" className="md:col-span-2">
                            <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
                                {analysis.interviewQuestions.systemDesign.map((q, i) => <li key={i}>{q}</li>)}
                            </ul>
                        </StatCard>
                    )}
                </div>
            );
        case 'plan':
            return (
                <StatCard title="Your 7-Day Study Plan">
                    <div className="space-y-4">
                        {analysis.studyPlan.map(day => (
                            <div key={day.day} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50/50 dark:bg-slate-700/30">
                                <h4 className="font-bold text-indigo-700 dark:text-indigo-400">Day {day.day}: {day.focus}</h4>
                                <ul className="list-disc list-inside space-y-1.5 mt-2 text-slate-600 dark:text-slate-300 text-sm">
                                    {day.tasks.map((task, i) => <li key={i}>{task}</li>)}
                                </ul>
                            </div>
                        ))}
                    </div>
                </StatCard>
            );
    }
  }

  return (
    <div className="bg-gray-50 dark:bg-slate-800/50 p-4 sm:p-6 rounded-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b border-slate-200 dark:border-slate-700/60">
            <div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Analysis for <span className="text-indigo-600 dark:text-indigo-400">{job.title}</span></h2>
                <p className="text-slate-500 dark:text-slate-400">{job.company}</p>
            </div>
            <button onClick={onReset} className="mt-3 sm:mt-0 bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200 font-semibold py-2 px-4 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">Start New Analysis</button>
        </div>

        <div className="mb-6">
            <div className="border-b border-gray-200 dark:border-slate-700">
                <nav className="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`${
                            activeTab === tab.id
                            ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                            : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-slate-500'
                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors focus:outline-none`}
                    >
                    {tab.label}
                    </button>
                ))}
                </nav>
            </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-slate-800/50">
            {renderTabContent()}
        </div>
    </div>
  );
};