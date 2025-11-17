
import * as pdfjsLib from 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.5.136/pdf.min.mjs';

// Configure the worker to process PDFs in a separate thread for performance.
// @ts-ignore
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.5.136/pdf.worker.min.mjs`;

const readPdfText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (event) => {
            if (!event.target?.result) {
                return reject(new Error("Failed to read file buffer."));
            }
            try {
                const pdf = await pdfjsLib.getDocument(event.target.result).promise;
                const texts = [];
                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const stream = await page.getTextContent();
                    const pageText = stream.items.map((item: any) => item.str).join(' ');
                    texts.push(pageText);
                }
                resolve(texts.join('\n\n'));
            } catch (error) {
                console.error('Error parsing PDF:', error);
                reject(new Error('Failed to parse PDF. It might be image-based or corrupted.'));
            }
        };
        reader.onerror = (error) => {
            reject(new Error('Failed to read the file.'));
        };
        reader.readAsArrayBuffer(file);
    });
};

const readTxtFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsText(file);
  });
};

export const readFileAsText = (file: File): Promise<string> => {
  if (file.type === 'application/pdf') {
    return readPdfText(file);
  } else if (file.type === 'text/plain') {
    return readTxtFile(file);
  } else {
    return Promise.reject(new Error('Unsupported file type. Please upload a .pdf or .txt file.'));
  }
};
