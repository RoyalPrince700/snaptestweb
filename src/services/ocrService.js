// src/services/ocrService.js
import { createWorker } from 'tesseract.js';

export async function extractTextFromImage(file) {
  const worker = await createWorker(); // Create and initialize the worker

  try {
    const {
      data: { text },
    } = await worker.recognize(file, 'eng'); // Directly pass language here

    return text;
  } catch (err) {
    console.error('OCR Error:', err);
    throw new Error('Failed to extract text from image');
  } finally {
    await worker.terminate(); // Clean up the worker
  }
}
