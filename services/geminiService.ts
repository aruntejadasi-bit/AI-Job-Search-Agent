import { GoogleGenAI, Type } from '@google/genai';
import type { Job, AnalysisResult } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    matchScore: { type: Type.NUMBER, description: "A score from 0 to 100 representing how well the resume matches the job description." },
    matchSummary: { type: Type.STRING, description: "A brief, 2-3 sentence summary of the match." },
    matchingSkills: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Skills from the job description found in the resume." },
    missingSkills: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Key skills from the job description NOT found in the resume." },
    tailoredResume: { type: Type.STRING, description: "The user's resume, rewritten as a clean, semantic HTML string to be perfectly tailored for the job. Use headings (<h4>), paragraphs (<p>), and unordered lists (<ul><li>). Do not include <!DOCTYPE>, <html>, or <body> tags." },
    interviewQuestions: {
      type: Type.OBJECT,
      properties: {
        technical: { type: Type.ARRAY, items: { type: Type.STRING } },
        hr: { type: Type.ARRAY, items: { type: Type.STRING } },
        systemDesign: { type: Type.ARRAY, items: { type: Type.STRING } }
      }
    },
    salaryPrediction: {
      type: Type.OBJECT,
      properties: {
        low: { type: Type.NUMBER },
        high: { type: Type.NUMBER },
        explanation: { type: Type.STRING, description: "Justification for the predicted salary range." }
      }
    },
    studyPlan: {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                day: { type: Type.NUMBER },
                focus: { type: Type.STRING },
                tasks: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
        },
        description: "A 7-day study plan to prepare for the interview, focusing on missing skills."
    }
  },
  required: ['matchScore', 'matchSummary', 'matchingSkills', 'missingSkills', 'tailoredResume', 'interviewQuestions', 'salaryPrediction', 'studyPlan']
};


export const getJobAnalysis = async (resumeText: string, job: Job): Promise<AnalysisResult> => {
  const jobDescriptionText = `
    Title: ${job.title}
    Company: ${job.company}
    Location: ${job.location}
    Required Experience: ${job.experience}
    Required Skills: ${job.skills.join(', ')}
    Full Description: ${job.description}
  `;

  const prompt = `
    You are an expert AI career agent. Your task is to perform a comprehensive analysis of a user's resume against a specific job description.

    **User's Resume:**
    ---
    ${resumeText}
    ---

    **Job Description:**
    ---
    ${jobDescriptionText}
    ---

    Please provide a detailed analysis in the requested JSON format. The analysis should include:
    1.  **Match Score**: A percentage score of how well the resume matches the job.
    2.  **Match Summary**: A short summary explaining the score.
    3.  **Skill Gap Analysis**: Lists of matching and missing skills.
    4.  **Tailored Resume**: Rewrite the user's resume to highlight strengths for this specific job. Format this as a single block of clean, semantic HTML string. Use headings (e.g., <h4>), paragraphs (<p>), and unordered lists (<ul><li>) for structure. Do not include <!DOCTYPE>, <html>, or <body> tags.
    5.  **Interview Questions**: Generate relevant technical, HR, and system design questions.
    6.  **Salary Prediction**: Predict a salary range based on the job, location, skills, and candidate's experience.
    7.  **7-Day Study Plan**: Create a study plan to help the user prepare, focusing on the identified skill gaps.
  `;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: analysisSchema,
        temperature: 0.3,
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    return result as AnalysisResult;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get analysis from AI service.");
  }
};
