// src/pages/upload/TextPreviewPage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ImagePreview from '../../components/ocr/ImagePreview';
import { fireworksAIService } from '../../services/fireworksService';
import { calculateWordCount, getMaxQuestionsForWordCount } from '../../config/api';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function TextPreviewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { text, source, fileName, imageUrl } = location.state || {};
  
  const [extractedText, setExtractedText] = useState(text || '');
  const [isLoading, setIsLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [questionType, setQuestionType] = useState('objective');
  const [questionCount, setQuestionCount] = useState(5);
  const [difficulty, setDifficulty] = useState('medium');
  const [wordCount, setWordCount] = useState(0);
  const [maxQuestions, setMaxQuestions] = useState(10);

  useEffect(() => {
    if (text) {
      const count = calculateWordCount(text);
      const maxQ = getMaxQuestionsForWordCount(count);
      setWordCount(count);
      setMaxQuestions(maxQ);
      setExtractedText(text);
    }
  }, [text]);

  const handleGenerate = async () => {
    if (wordCount < 20) {
      alert(`Text is too short. Minimum 20 words required. Current: ${wordCount}`);
      return;
    }
    
    setIsLoading(true);
    try {
      const result = await fireworksAIService.generateQuestions({
        text: extractedText,
        questionType,
        count: questionCount,
        difficulty,
      });
      
      if (result.success) {
        navigate('/questions', { 
          state: { 
            questions: result.questions, 
            source,
            originalText: extractedText 
          } 
        });
      } else {
        console.error('Generation Error:', result.error);
        alert(`Failed to generate questions: ${result.error}`);
      }
    } catch (error) {
      console.error('API Error:', error);
      alert('Unexpected error during question generation');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">
        Extracted Text Preview
        {fileName && <span className="text-gray-600 text-lg font-normal ml-2">({fileName})</span>}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Preview Column */}
        {imageUrl && source === 'image' && (
          <div>
            <h2 className="text-lg font-semibold mb-3">Original Image</h2>
            <ImagePreview imageUrl={imageUrl} />
          </div>
        )}
        
        {/* Text Preview Column */}
        <div className={`${imageUrl ? '' : 'md:col-span-2'}`}>
          <div className="bg-gray-50 rounded-lg p-4 mb-4 border">
            <div className="flex justify-between items-center mb-3">
              <div className="text-sm font-medium">
                {wordCount} words • Max {maxQuestions} questions
              </div>
              {wordCount < 20 && (
                <span className="text-sm text-yellow-700 bg-yellow-100 px-2 py-1 rounded">
                  Add more text
                </span>
              )}
            </div>
            
            <div className="bg-white p-4 rounded border max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap text-gray-800 font-sans">
                {extractedText || 'No text extracted...'}
              </pre>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={() => setShowOptions(true)}
              disabled={isLoading || wordCount < 20}
              className={`px-5 py-2.5 rounded-lg font-medium ${
                isLoading || wordCount < 20
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              Generate Questions
            </button>
            
            <button
              onClick={() => navigate('/upload/image')}
              className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Try Another Image
            </button>
          </div>
        </div>
      </div>
      
      {/* Options Modal */}
      {showOptions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Question Options</h2>
            
            <div className="space-y-5">
              {/* Question Type */}
              <div>
                <label className="block mb-2 font-medium">Question Type</label>
                <div className="flex space-x-2">
                  {['objective', 'theory'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setQuestionType(type)}
                      className={`flex-1 py-2 rounded-lg capitalize ${
                        questionType === type
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Difficulty */}
              <div>
                <label className="block mb-2 font-medium">Difficulty</label>
                <div className="grid grid-cols-3 gap-2">
                  {['easy', 'medium', 'hard'].map((level) => (
                    <button
                      key={level}
                      onClick={() => setDifficulty(level)}
                      className={`py-2 rounded-lg capitalize ${
                        difficulty === level
                          ? {
                              easy: 'bg-green-600',
                              medium: 'bg-yellow-600',
                              hard: 'bg-red-600'
                            }[level] + ' text-white'
                          : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Question Count */}
              <div>
                <label className="block mb-2 font-medium">
                  Number of Questions (Max: {maxQuestions})
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="1"
                    max={maxQuestions}
                    value={questionCount}
                    onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="w-10 text-center font-medium">
                    {questionCount}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowOptions(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerate}
                disabled={isLoading}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-70"
              >
                {isLoading ? <LoadingSpinner size="small" /> : 'Generate'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}