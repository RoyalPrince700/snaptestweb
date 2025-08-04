// src/pages/upload/UploadDocumentPage.jsx
import React, { useState, useEffect } from 'react';
import { extractTextFromDocument } from '../../services/documentService';
import { calculateWordCount, getMaxQuestionsForWordCount } from '../../config/api';
import { fireworksAIService } from '../../services/fireworksService';
import { useNavigate } from 'react-router-dom';
import { FiUpload, FiFileText, FiSettings, FiArrowRight } from 'react-icons/fi';

export const UploadDocumentPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [loadingExtract, setLoadingExtract] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [error, setError] = useState('');

  const [questionType, setQuestionType] = useState('objective');
  const [count, setCount] = useState(10);
  const [difficulty, setDifficulty] = useState('medium');
  const [maxAllowedQuestions, setMaxAllowedQuestions] = useState(50);
  const [availableCounts, setAvailableCounts] = useState([10, 20, 30, 40, 50]);

  const navigate = useNavigate();

  useEffect(() => {
    const wordCount = calculateWordCount(extractedText);
    const maxAllowed = getMaxQuestionsForWordCount(wordCount);
    setMaxAllowedQuestions(maxAllowed);

    const counts = [10, 20, 30, 40, 50].filter(n => n <= maxAllowed);
    setAvailableCounts(counts);

    if (count > maxAllowed) {
      setCount(maxAllowed > 0 ? Math.max(...counts) : 10);
    }
  }, [extractedText, count]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError('');
      setExtractedText('');
    }
  };

  const handleExtractText = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError('Please select a document file.');
      return;
    }

    setLoadingExtract(true);
    setError('');
    try {
      const text = await extractTextFromDocument(selectedFile);
      setExtractedText(text);
    } catch (err) {
      console.error('Document Extract Error:', err);
      setError('Error extracting text from document.');
    } finally {
      setLoadingExtract(false);
    }
  };

  const handleGenerateQuestions = async (e) => {
    e.preventDefault();
    if (!extractedText.trim()) {
      setError('No text extracted from document.');
      return;
    }

    const wordCount = calculateWordCount(extractedText);
    if (wordCount < 20) {
      setError('Extracted text is too short. Minimum 20 words required.');
      return;
    }

    setLoadingQuestions(true);
    setError('');
    try {
      const result = await fireworksAIService.generateQuestions({
        text: extractedText,
        questionType,
        count,
        difficulty,
      });

      if (!result.success) {
        setError(result.error);
      } else {
        if (result.questions.length < count) {
          setError(`Generated ${result.questions.length} questions instead of ${count}. Proceeding anyway.`);
        }

        navigate('/questions', {
          state: {
            questions: result.questions,
            originalText: extractedText,
            questionType,
            count: result.requestedCount,
            generatedCount: result.questions.length,
            difficulty,
          },
        });
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError(err.message || 'Unexpected error occurred.');
    } finally {
      setLoadingQuestions(false);
    }
  };

 
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white px-4 py-12">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Transform Documents into Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload PDFs, Word docs, or text files to create practice questions instantly
          </p>
        </div>

        <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
          <div className={`grid ${extractedText ? 'md:grid-cols-2' : 'md:grid-cols-1'} gap-8 p-8`}>
            {/* Left Column - Upload */}
            <div className={`${extractedText ? 'md:border-r md:border-indigo-100 md:pr-8' : ''}`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <FiUpload className="text-indigo-600 text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Upload & Extract</h3>
              </div>

              {error && (
                <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-lg border border-red-100">
                  {error}
                </div>
              )}

              <form className="space-y-6" onSubmit={handleExtractText}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Document File
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-indigo-200 rounded-2xl cursor-pointer bg-indigo-50 hover:bg-indigo-100 transition">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FiUpload className="w-10 h-10 mb-3 text-indigo-500" />
                        <p className="mb-2 text-sm text-indigo-600 font-medium">
                          <span>Click to upload</span>
                        </p>
                        <p className="text-xs text-gray-500">
                          PDF, DOCX, DOC, or TXT (MAX. 10MB)
                        </p>
                      </div>
                      <input 
                        type="file" 
                        accept=".pdf,.doc,.docx,.txt"
                        onChange={handleFileChange}
                        className="hidden" 
                      />
                    </label>
                  </div>
                  {selectedFile && (
                    <p className="mt-2 text-sm text-gray-600 flex items-center gap-2">
                      <FiFileText className="text-indigo-500" />
                      {selectedFile.name}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loadingExtract}
                  className={`w-full py-3 px-4 text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2 ${
                    loadingExtract 
                      ? 'bg-indigo-300 cursor-not-allowed' 
                      : 'bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg'
                  }`}
                >
                  {loadingExtract ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Extracting Text...
                    </>
                  ) : (
                    <>
                      Extract Text from Document
                      <FiArrowRight className="text-lg" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right Column - Options */}
            {extractedText ? (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <FiSettings className="text-indigo-600 text-xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Generate Questions</h3>
                </div>

                <form onSubmit={handleGenerateQuestions} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Extracted Text
                    </label>
                    <div className="relative">
                      <textarea
                        readOnly
                        value={extractedText}
                        className="w-full border border-gray-200 rounded-lg p-4 bg-gray-50 text-gray-800 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 min-h-[150px]"
                        rows={4}
                      />
                      <div className="absolute bottom-3 right-3 bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-1 rounded">
                        {calculateWordCount(extractedText)} words
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500 flex justify-between">
                      <span>Max questions: {maxAllowedQuestions}</span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
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

                  <button
                    type="submit"
                    disabled={loadingQuestions || maxAllowedQuestions === 0}
                    className={`w-full py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                      loadingQuestions || maxAllowedQuestions === 0
                        ? 'opacity-70 cursor-not-allowed bg-gray-400 text-white'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg'
                    }`}
                  >
                    {loadingQuestions ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating Questions...
                      </>
                    ) : (
                      <>
                        Generate Questions
                        <FiArrowRight className="text-lg" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              // Empty state for desktop
              <div className="hidden md:flex items-center justify-center">
                <div className="text-center max-w-xs">
                  <div className="bg-indigo-50 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FiFileText className="text-indigo-500 text-5xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Text Preview</h3>
                  <p className="text-gray-600">
                    Upload a document to see extracted text here
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {!extractedText && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full text-sm">
              <svg className="animate-bounce w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span>Upload a document to get started</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default UploadDocumentPage;
