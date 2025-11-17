
import React, { useState, useCallback } from 'react';
import { readFileAsText } from '../utils';
import { UploadIcon } from './icons/UploadIcon';

interface ResumeUploadProps {
  onUpload: (text: string) => void;
}

export const ResumeUpload: React.FC<ResumeUploadProps> = ({ onUpload }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = useCallback(async (file: File | null) => {
    if (file) {
      setError(null);
      setFileName(file.name);
      setIsProcessing(true);
      try {
        const text = await readFileAsText(file);
        if (text.trim().length < 50) { // Simple validation for content length
            setError('Extracted text is too short. The PDF might be image-based or corrupted. Please upload a valid resume.');
            setFileName(null);
        } else {
            onUpload(text);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to read the file. Please try again.');
        setFileName(null);
      } finally {
        setIsProcessing(false);
      }
    }
  }, [onUpload]);

  const onDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const onDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };


  return (
    <div className="text-center p-4 sm:p-8">
      <h2 className="text-3xl font-bold mb-2 text-slate-800 dark:text-slate-200">Get Started</h2>
      <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-lg mx-auto">Upload your resume to let our AI agent find the best job matches, analyze your skills, and prepare you for interviews.</p>

      <div className="max-w-lg mx-auto">
        <label
          htmlFor="resume-upload"
          className={`relative block w-full p-8 border-2 border-dashed rounded-xl text-center cursor-pointer transition-colors duration-300 ${isDragging ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 dark:border-indigo-500' : 'border-slate-300 dark:border-slate-600 hover:border-indigo-500 dark:hover:border-indigo-600 hover:bg-indigo-50/50 dark:hover:bg-slate-700/50'}`}
          onDragEnter={onDragEnter}
          onDragOver={onDragEnter}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <UploadIcon className="mx-auto h-12 w-12 text-slate-400 dark:text-slate-500" />
          <span className="mt-4 block text-base font-medium text-slate-900 dark:text-slate-200">
            {isProcessing ? 'Processing...' : fileName ? `Selected: ${fileName}`: 'Drag & drop or click to upload'}
          </span>
          <span className="mt-1 block text-sm text-slate-500 dark:text-slate-400">.PDF or .TXT files accepted</span>
          <input
            id="resume-upload"
            name="resume-upload"
            type="file"
            accept=".txt,.pdf,application/pdf"
            className="sr-only"
            onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
            disabled={isProcessing}
          />
        </label>

        {error && <p className="mt-4 text-sm text-red-600 dark:text-red-400">{error}</p>}
        
      </div>
    </div>
  );
};
