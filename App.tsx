import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ResumeUpload } from './components/ResumeUpload';
import { JobList } from './components/JobList';
import { Dashboard } from './components/Dashboard';
import { getJobAnalysis } from './services/geminiService';
import type { Job, AnalysisResult } from './types';
import { JOBS_DATA } from './constants';
import { AnalyzingScreen } from './components/AnalyzingScreen';

type AppState = 'upload' | 'select_job' | 'analyzing' | 'dashboard' | 'error';

export default function App() {
  const [appState, setAppState] = useState<AppState>('upload');
  const [resumeText, setResumeText] = useState<string>('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleResumeUpload = (text: string) => {
    setResumeText(text);
    setAppState('select_job');
  };

  const handleJobSelect = useCallback(async (job: Job) => {
    setSelectedJob(job);
    setAppState('analyzing');
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await getJobAnalysis(resumeText, job);
      setAnalysisResult(result);
      setAppState('dashboard');
    } catch (e) {
      console.error(e);
      setError('An error occurred while analyzing. The AI model might be overloaded. Please try again.');
      setAppState('error');
    }
  }, [resumeText]);

  const handleReset = () => {
    setAppState('upload');
    setResumeText('');
    setSelectedJob(null);
    setAnalysisResult(null);
    setError(null);
  };
  
  const renderContent = () => {
    switch (appState) {
      case 'upload':
        return <ResumeUpload onUpload={handleResumeUpload} />;
      case 'select_job':
        return <JobList jobs={JOBS_DATA} onJobSelect={handleJobSelect} />;
      case 'analyzing':
        return <AnalyzingScreen jobTitle={selectedJob?.title} />;
      case 'dashboard':
        return analysisResult && selectedJob ? (
          <Dashboard
            job={selectedJob}
            analysis={analysisResult}
            onReset={handleReset}
          />
        ) : null;
       case 'error':
        return (
            <div className="text-center p-8 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 rounded-lg">
                <h2 className="text-2xl font-semibold text-red-700 dark:text-red-400">Analysis Failed</h2>
                <p className="text-red-600 dark:text-red-400/80 mt-2">{error}</p>
                <button
                    onClick={() => setAppState('select_job')}
                    className="mt-6 bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-300"
                >
                    Try Another Job
                </button>
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-5xl mx-auto bg-white dark:bg-slate-800/50 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-slate-950/50 border border-gray-200/80 dark:border-slate-700/60 p-4 sm:p-6 lg:p-8">
          {renderContent()}
        </div>
        <footer className="text-center py-8 text-slate-500 dark:text-slate-400 text-sm">
          <p>Powered by <span className="font-semibold text-slate-600 dark:text-slate-300">Gemini AI</span></p>
        </footer>
      </main>
    </div>
  );
}