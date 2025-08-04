// src/config/api.js
export const API_CONFIG = {
  FIREWORKS_AI: {
    API_KEY: import.meta.env.VITE_FIREWORKS_API_KEY || '',
    BASE_URL: 'https://api.fireworks.ai/inference/v1',
    MODEL: 'accounts/fireworks/models/llama4-maverick-instruct-basic',
  },

  APP: {
    MAX_QUESTIONS_PER_GENERATION: 50,
    WORD_COUNT_LIMITS: {
      0: 10,
      101: 20,
      201: 30,
      301: 40,
      501: 50,
    },
    MIN_WORDS_FOR_QUESTIONS: 20,
  },
};

export const calculateWordCount = (text) => {
  if (!text || typeof text !== 'string') return 0;

  const words = text.trim().split(/\s+/);
  const stopWords = new Set([
    'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
    'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the',
    'to', 'was', 'will', 'with',
  ]);

  return words.filter((word) => {
    const cleanWord = word.toLowerCase().replace(/[^\w]/g, '');
    return cleanWord.length > 0 && !stopWords.has(cleanWord);
  }).length;
};

export const getMaxQuestionsForWordCount = (wordCount) => {
  const limits = API_CONFIG.APP.WORD_COUNT_LIMITS;

  if (wordCount < API_CONFIG.APP.MIN_WORDS_FOR_QUESTIONS) {
    return 0;
  }

  const thresholds = Object.keys(limits).map(Number).sort((a, b) => a - b);

  for (let i = thresholds.length - 1; i >= 0; i--) {
    if (wordCount >= thresholds[i]) {
      return limits[thresholds[i]];
    }
  }

  return limits[0];
};

// ... existing API_CONFIG ...

export const PROMPTS = {
  OBJECTIVE: (text, count, difficulty) => `
Generate exactly ${count} objective questions of ${difficulty} difficulty with 4 options (A-D) and an answer for each, based strictly on the following text.

CRITICAL INSTRUCTIONS:
1. Answers MUST be evenly distributed across all options (A, B, C, D)
2. Each letter should be correct approximately 25% of the time
3. Randomize correct answer positions - don't favor any particular column
4. If you cannot generate a question with all 4 valid options, skip it
5. Do not include explanations or any extra text

FORMATTING RULES:
- Questions must be numbered sequentially
- Each option must be prefixed with A., B., C., or D.
- Answer line must start with "Answer: " followed by the correct letter

EXAMPLE FORMAT:
1. What is the capital of France?
   A. London
   B. Paris
   C. Berlin
   D. Madrid
Answer: B

Text:
"""
${text}
"""`,

  THEORY: (text, count, difficulty) => `
Generate exactly ${count} theory/essay questions of ${difficulty} difficulty based on the following text.

Text:
"""
${text}
"""

Format each question exactly like this:  
1. [Question text]

Generate exactly ${count} questions. Do not include any explanations, comments, or extra text.`,
};

// ... rest of config ...

export const ERROR_MESSAGES = {
  NO_API_KEY: 'Fireworks AI API key not configured',
  INSUFFICIENT_WORDS: 'Please add more text to generate questions (minimum 20 words)',
  TOO_MANY_QUESTIONS: 'Too many questions requested for the amount of text provided.',
  GENERATION_FAILED: 'Failed to generate questions',
};