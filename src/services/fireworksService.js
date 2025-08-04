// src/services/fireworksService.js
import {
  API_CONFIG,
  PROMPTS,
  ERROR_MESSAGES,
  calculateWordCount,
  getMaxQuestionsForWordCount,
} from '../config/api';

class FireworksAIService {
  constructor() {
    const cfg = API_CONFIG.FIREWORKS_AI;
    this.apiKey   = cfg.API_KEY;
    this.baseUrl  = cfg.BASE_URL;
    this.chatPath = '/chat/completions';
    this.model    = cfg.MODEL;
  }

  async makeRequest(prompt) {
    if (!this.apiKey) throw new Error(ERROR_MESSAGES.NO_API_KEY);

    const url = `${this.baseUrl}${this.chatPath}`;
    const body = { 
      model: this.model, 
      messages: [{ role: 'user', content: prompt }], 
      max_tokens: 4000,
      temperature: 0.7 
    };
    
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status}: ${text}`);
      }
      
      const json = await res.json();
      return json.choices?.[0]?.message?.content || '';
    } catch (err) {
      throw new Error(`Request failed: ${err.message}`);
    }
  }

  parseObjectiveQuestions(text) {
    const questions = [];
    const questionBlocks = text.split(/\d+\./).filter(block => block.trim());
    
    questionBlocks.forEach((block, index) => {
      const lines = block.trim().split('\n').filter(line => line.trim());
      if (lines.length === 0) return;

      const questionText = lines[0].trim();
      const options = [];
      let answer = '';

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.match(/^A\./)) {
          options[0] = line.substring(2).trim();
        } else if (line.match(/^B\./)) {
          options[1] = line.substring(2).trim();
        } else if (line.match(/^C\./)) {
          options[2] = line.substring(2).trim();
        } else if (line.match(/^D\./)) {
          options[3] = line.substring(2).trim();
        } else if (line.startsWith('Answer:')) {
          answer = line.substring(7).trim();
        }
      }

      if (
        questionText &&
        options.length === 4 &&
        options.every(opt => !!opt) &&
        answer &&
        ['A', 'B', 'C', 'D'].includes(answer)
      ) {
        questions.push({
          id: `q_${Date.now()}_${index}`,
          question: questionText,
          options,
          answer,
          type: 'objective',
        });
      }
    });

    return questions;
  }

  parseTheoryQuestions(text) {
    const questions = [];
    const questionBlocks = text.split(/\d+\./).filter(block => block.trim());
    
    questionBlocks.forEach((block, index) => {
      const questionText = block.trim();
      if (questionText) {
        questions.push({
          id: `q_${Date.now()}_${index}`,
          question: questionText,
          type: 'theory',
        });
      }
    });

    return questions;
  }

  // New: Answer balancing function
  balanceAnswers(questions) {
    if (questions.length === 0) return questions;
    
    // Calculate current distribution
    const distribution = { A: 0, B: 0, C: 0, D: 0 };
    questions.forEach(q => distribution[q.answer]++);
    
    // Determine max allowed (30% of total)
    const maxAllowed = Math.ceil(questions.length * 0.3);
    const letters = ['A', 'B', 'C', 'D'];
    
    // Check if balancing is needed
    const needsBalancing = Object.values(distribution).some(count => count > maxAllowed);
    
    if (!needsBalancing) return questions;
    
    // Create a copy to avoid mutation
    const balancedQuestions = [...questions];
    const newDistribution = {...distribution};
    
    // Rebalance questions
    balancedQuestions.forEach((q, index) => {
      // Find the most overrepresented and underrepresented answers
      let over = '';
      let under = '';
      let maxCount = -1;
      let minCount = Number.MAX_SAFE_INTEGER;
      
      letters.forEach(letter => {
        if (newDistribution[letter] > maxCount) {
          maxCount = newDistribution[letter];
          over = letter;
        }
        if (newDistribution[letter] < minCount) {
          minCount = newDistribution[letter];
          under = letter;
        }
      });
      
      // If current answer is overrepresented and we have alternatives
      if (q.answer === over && newDistribution[over] > maxAllowed) {
        // Only change if we can reduce overrepresented without creating new imbalance
        if (newDistribution[under] < maxAllowed) {
          balancedQuestions[index] = {
            ...q,
            answer: under
          };
          newDistribution[over]--;
          newDistribution[under]++;
        }
      }
    });
    
    return balancedQuestions;
  }

  async generateQuestions({ text, questionType = 'objective', count = 10, difficulty = 'medium' }) {
    const wc = calculateWordCount(text);
    const maxAllowed = getMaxQuestionsForWordCount(wc);
    
    if (wc < API_CONFIG.APP.MIN_WORDS_FOR_QUESTIONS) {
      return { success: false, error: ERROR_MESSAGES.INSUFFICIENT_WORDS, questions: [] };
    }
    
    if (count > maxAllowed) {
      return { 
        success: false, 
        error: `${ERROR_MESSAGES.TOO_MANY_QUESTIONS} Max ${maxAllowed} for ${wc} words.`, 
        questions: [] 
      };
    }

    try {
      const prompt = questionType === 'objective'
        ? PROMPTS.OBJECTIVE(text, count, difficulty)
        : PROMPTS.THEORY(text, count, difficulty);
      
      const raw = await this.makeRequest(prompt);
      let questions = questionType === 'objective'
        ? this.parseObjectiveQuestions(raw)
        : this.parseTheoryQuestions(raw);
      
      // Apply answer balancing for objective questions
      if (questionType === 'objective' && questions.length > 0) {
        questions = this.balanceAnswers(questions);
      }
      
      return { 
        success: true, 
        questions,
        generatedCount: questions.length,
        requestedCount: count
      };
    } catch (err) {
      return { 
        success: false, 
        error: err.message || ERROR_MESSAGES.GENERATION_FAILED, 
        questions: [] 
      };
    }
  }
}

export const fireworksAIService = new FireworksAIService();