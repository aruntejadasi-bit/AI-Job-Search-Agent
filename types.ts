
export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary?: string;
  skills: string[];
  experience: string;
  description: string;
}

export interface AnalysisResult {
  matchScore: number;
  matchSummary: string;
  matchingSkills: string[];
  missingSkills: string[];
  tailoredResume: string;
  interviewQuestions: {
    technical: string[];
    hr: string[];
    systemDesign: string[];
  };
  salaryPrediction: {
    low: number;
    high: number;
    explanation: string;
  };
  studyPlan: {
    day: number;
    focus: string;
    tasks: string[];
  }[];
}
