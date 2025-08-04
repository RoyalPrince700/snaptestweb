import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../provider/AuthContext';
import { supabaseService } from '../services/supabaseService';

export const QuestionsPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const [title, setTitle] = useState('');
  const [setId, setSetId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);

  // Calculate answer distribution
  const answerDistribution = useMemo(() => {
    if (!state?.questions || state.questionType !== 'objective') return null;
    
    const dist = { A: 0, B: 0, C: 0, D: 0 };
    state.questions.forEach(q => {
      if (['A', 'B', 'C', 'D'].includes(q.answer)) {
        dist[q.answer]++;
      }
    });
    return dist;
  }, [state]);

  // Check if distribution is balanced
  const isBalanced = useMemo(() => {
    if (!answerDistribution || !state?.questions) return true;
    
    const maxAllowed = Math.ceil(state.questions.length * 0.3);
    return Object.values(answerDistribution).every(count => count <= maxAllowed);
  }, [answerDistribution, state]);

  // redirect if no state
  useEffect(() => {
    if (!state?.questions) navigate('/');
    else if (isAuthenticated) {
      setTimeout(() => setShowSaveModal(true), 300);
    }
  }, [state, navigate, isAuthenticated]);

  if (!state?.questions) return null;

  const {
    questions,
    originalText,
    questionType,
    count,
    difficulty,
    generatedCount,
    requestedCount
  } = state;

  return (
    <section className="min-h-screen py-12 bg-gradient-to-br from-indigo-50 to-white px-4">
      {/* Save Question Set Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
            <h3 className="text-xl font-semibold mb-4 text-indigo-900">Save Question Set</h3>
            
            {saveSuccess ? (
              <div className="text-center py-4">
                <div className="text-indigo-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="mt-2 font-medium">Saved successfully!</p>
                </div>
                <button
                  onClick={() => setShowSaveModal(false)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition w-full"
                >
                  Continue
                </button>
              </div>
            ) : (
              <>
                {saveError && (
                  <div className="p-3 bg-red-100 text-red-700 rounded-lg mb-4">
                    {saveError}
                  </div>
                )}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title your question set
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Biology Chapter 1 Quiz"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    autoFocus
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowSaveModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={async () => {
                      setSaveError('');
                      if (!title.trim()) {
                        setSaveError('Please enter a title');
                        return;
                      }
                      setIsSaving(true);
                      try {
                        const saved = await supabaseService.saveQuestionSet({
                          title,
                          questions,
                          questionType,
                          sourceText: originalText,
                        });
                        setSetId(saved.id);
                        setSaveSuccess(true);
                      } catch (err) {
                        console.error(err);
                        setSaveError('Failed to save question set');
                      } finally {
                        setIsSaving(false);
                      }
                    }}
                    disabled={isSaving}
                    className={`flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg transition ${
                      isSaving ? 'opacity-70 cursor-not-allowed' : 'hover:bg-indigo-700'
                    }`}
                  >
                    {isSaving ? 'Saving…' : 'Save'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Generated Questions</h2>
            <p className="text-gray-600 mt-1">
              {generatedCount || questions.length} of {requestedCount || count} {difficulty} {questionType === 'objective' ? 'Multiple Choice' : 'Theory'} Questions
            </p>
          </div>
          
          <button
            onClick={() => navigate('/')}
            className="order-first md:order-none px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition self-start md:self-auto"
          >
            Generate New
          </button>
        </div>

        {/* Answer Distribution Banner */}
        {answerDistribution && (
          <div className={`mb-6 p-4 rounded-lg flex flex-wrap items-center justify-between ${
            isBalanced ? 'bg-indigo-50 border border-indigo-100' : 'bg-yellow-50 border border-yellow-100'
          }`}>
            <h3 className="text-lg font-medium text-gray-900">Answer Distribution</h3>
            <div className="flex flex-wrap gap-4 mt-2 md:mt-0">
              {['A', 'B', 'C', 'D'].map(letter => (
                <div key={letter} className="flex items-center">
                  <span className="font-medium w-4">{letter}:</span>
                  <span className="ml-1 w-6 text-center">{answerDistribution[letter]}</span>
                  <div 
                    className={`ml-2 w-3 h-3 rounded-full ${
                      answerDistribution[letter] > Math.ceil(questions.length * 0.3)
                        ? 'bg-red-500' 
                        : 'bg-green-500'
                    }`}
                    title={
                      answerDistribution[letter] > Math.ceil(questions.length * 0.3)
                        ? 'This answer is overrepresented' 
                        : 'Balanced distribution'
                    }
                  />
                </div>
              ))}
            </div>
            {!isBalanced && (
              <div className="w-full mt-3 text-yellow-700 text-sm">
                Note: Some answers are overrepresented. We've adjusted the distribution to ensure fairness.
              </div>
            )}
          </div>
        )}

        {/* Original Text */}
        <div className="mb-8">
          <h3 className="text-lg md:text-xl font-semibold mb-3 text-indigo-900">Original Text</h3>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 max-h-60 overflow-y-auto">
            <p className="whitespace-pre-line">{originalText}</p>
          </div>
        </div>

        {/* Generated Questions */}
        <div className="mb-8">
          <h3 className="text-lg md:text-xl font-semibold mb-3 text-indigo-900">Questions</h3>
          <div className="space-y-4">
            {questions.map((q, i) => (
              <div key={q.id} className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                <p className="font-medium text-indigo-900 mb-3">
                  {i + 1}. {q.question}
                </p>
                {questionType === 'objective' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                    {q.options.map((opt, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-lg border ${
                          q.answer === String.fromCharCode(65 + idx)
                            ? 'border-indigo-500 bg-indigo-50'
                            : 'border-gray-200'
                        }`}
                      >
                        <span className="font-medium">{String.fromCharCode(65 + idx)}.</span> {opt}
                      </div>
                    ))}
                  </div>
                )}
                {questionType === 'objective' && (
                  <div className="mt-3 p-2 bg-indigo-50 text-indigo-800 rounded-lg inline-block">
                    <span className="font-medium">Answer:</span> {q.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Take Quiz Button */}
        <div className="mt-8 text-center">
          {saveSuccess && setId ? (
            <Link 
              to={`/quiz/${setId}`}
              className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-lg font-medium"
            >
              Take Quiz Now
            </Link>
          ) : isAuthenticated ? (
            <button
              onClick={() => setShowSaveModal(true)}
              className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-lg font-medium"
            >
              Save Set to Take Quiz
            </button>
          ) : (
            <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-lg text-center">
              <p className="text-indigo-800">
                <Link to="/login" className="font-medium text-indigo-600 hover:underline">
                  Log in
                </Link>{' '}
                to save your quiz and take it later.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuestionsPage;