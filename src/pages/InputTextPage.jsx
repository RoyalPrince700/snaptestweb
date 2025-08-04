import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fireworksAIService } from '../services/fireworksService';
import { calculateWordCount, getMaxQuestionsForWordCount } from '../config/api'; 
import { FiFileText, FiArrowRight } from 'react-icons/fi';


export const InputTextPage = () => {
  const [text, setText] = useState('');
  const [questionType, setQuestionType] = useState('objective');
  const [count, setCount] = useState(10);
  const [difficulty, setDifficulty] = useState('medium');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [maxAllowedQuestions, setMaxAllowedQuestions] = useState(50);
  const [availableCounts, setAvailableCounts] = useState([10, 20, 30, 40, 50]);
  const navigate = useNavigate();

  // Calculate word count and update max allowed questions
  useEffect(() => {
    const wordCount = calculateWordCount(text);
    const maxAllowed = getMaxQuestionsForWordCount(wordCount);
    setMaxAllowedQuestions(maxAllowed);
    
    // Update available question counts
    const counts = [10, 20, 30, 40, 50].filter(n => n <= maxAllowed);
    setAvailableCounts(counts);
    
    // Adjust current count if it exceeds the new max
    if (count > maxAllowed) {
      setCount(maxAllowed > 0 ? Math.max(...counts) : 10);
    }
  }, [text, count]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!text.trim()) {
      setError('Please enter some text.');
      return;
    }
    
    const wordCount = calculateWordCount(text);
    if (wordCount < 20) {
      setError('Text is too short. Minimum 20 words required.');
      return;
    }
    
    setIsLoading(true);

    try {
      const result = await fireworksAIService.generateQuestions({
        text,
        questionType,
        count,
        difficulty,
      });

      if (!result.success) {
        setError(result.error);
      } else {
        if (result.questions.length < count) {
          setError(`Generated ${result.questions.length} questions instead of ${count}. Proceeding with available questions.`);
        }
        
        navigate('/questions', {
          state: { 
            questions: result.questions, 
            originalText: text, 
            questionType, 
            count: result.requestedCount,
            generatedCount: result.questions.length,
            difficulty 
          },
        });
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError(err.message || 'Unexpected error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white px-4 py-12">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Generate Practice Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Paste your study material below to create interactive questions instantly
          </p>
        </div>

        <div className="bg-white rounded-2xl overflow-hidden shadow-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <FiFileText className="text-indigo-600 text-xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Create Questions from Text</h3>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Text Input */}
            <div>
              <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-2">
                Paste Your Text
              </label>
              <div className="relative">
                <textarea
                  id="text"
                  rows={8}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg p-4 bg-gray-50 text-gray-800 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
                  placeholder="Type or paste your study material here..."
                  required
                />
                <div className="absolute bottom-3 right-3 bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-1 rounded">
                  {calculateWordCount(text)} words
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-500 flex justify-between">
                <span>Max questions: {maxAllowedQuestions}</span>
              </div>
            </div>

            {/* Options */}
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question Type
                </label>
                <div className="flex rounded-lg border border-gray-200 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQuestionType('objective')}
                    className={`flex-1 py-2 text-center text-sm font-medium transition-colors ${
                      questionType === 'objective'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Multiple Choice
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuestionType('theory')}
                    className={`flex-1 py-2 text-center text-sm font-medium transition-colors ${
                      questionType === 'theory'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Theory
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty
                </label>
                <div className="flex rounded-lg border border-gray-200 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setDifficulty('easy')}
                    className={`flex-1 py-2 text-center text-sm font-medium transition-colors ${
                      difficulty === 'easy'
                        ? 'bg-green-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Easy
                  </button>
                  <button
                    type="button"
                    onClick={() => setDifficulty('medium')}
                    className={`flex-1 py-2 text-center text-sm font-medium transition-colors ${
                      difficulty === 'medium'
                        ? 'bg-yellow-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Medium
                  </button>
                  <button
                    type="button"
                    onClick={() => setDifficulty('hard')}
                    className={`flex-1 py-2 text-center text-sm font-medium transition-colors ${
                      difficulty === 'hard'
                        ? 'bg-red-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Hard
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Questions
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="1"
                    max={maxAllowedQuestions}
                    value={count}
                    onChange={(e) => setCount(Number(e.target.value))}
                    disabled={maxAllowedQuestions === 0}
                    className="w-full h-2 bg-indigo-100 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="bg-indigo-600 text-white text-sm font-medium w-10 h-10 flex items-center justify-center rounded-full">
                    {count}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1</span>
                  <span>{maxAllowedQuestions > 0 ? `Max: ${maxAllowedQuestions}` : 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading || maxAllowedQuestions === 0}
              className={`w-full py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                isLoading || maxAllowedQuestions === 0 
                  ? 'opacity-70 cursor-not-allowed bg-gray-400 text-white' 
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg'
              }`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Generating Questions...
                </>
              ) : maxAllowedQuestions === 0 ? (
                'Add more text to generate questions'
              ) : (
                <>
                  Generate Questions
                  <FiArrowRight className="text-lg" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default InputTextPage;