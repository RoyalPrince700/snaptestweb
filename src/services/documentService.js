// documentService.js
import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export const extractTextFromDocument = async (file) => {
  const fileType = file.name.split('.').pop().toLowerCase();

  switch (fileType) {
    case 'pdf':
      return await extractTextFromPDF(file);
    case 'docx':
      return await extractTextFromDocx(file);
    case 'txt':
      return await extractTextFromTxt(file);
    default:
      throw new Error('Unsupported file type.');
  }
};

const extractTextFromPDF = async (file) => {
  const fileReader = new FileReader();
  const fileBuffer = await new Promise((resolve, reject) => {
    fileReader.onload = () => resolve(new Uint8Array(fileReader.result));
    fileReader.onerror = reject;
    fileReader.readAsArrayBuffer(file);
  });

  const pdf = await pdfjsLib.getDocument({ data: fileBuffer }).promise;
  let fullText = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const text = content.items.map(item => item.str).join(' ');
    fullText += text + '\n';
  }

  return fullText;
};

const extractTextFromDocx = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
};

const extractTextFromTxt = async (file) => {
  const text = await file.text();
  return text;
};

export const summarizeLargeTextIfNeeded = async (text, maxWords = 1000) => {
  const wordCount = text.trim().split(/\s+/).length;
  if (wordCount <= maxWords) return text;

  const chunks = splitTextIntoChunks(text, 1200);
  const summarizedChunks = await Promise.all(
    chunks.map(chunk => summarizeText(chunk))
  );

  return summarizedChunks.join(' ');
};

const splitTextIntoChunks = (text, chunkSize) => {
  const words = text.trim().split(/\s+/);
  const chunks = [];
  for (let i = 0; i < words.length; i += chunkSize) {
    chunks.push(words.slice(i, i + chunkSize).join(' '));
  }
  return chunks;
};

const summarizeText = async (text) => {
  const response = await fetch('/api/summarize', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text })
  });

  if (!response.ok) throw new Error('Failed to summarize text');

  const data = await response.json();
  return data.summary || '';
};