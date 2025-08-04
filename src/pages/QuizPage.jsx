// src/pages/QuizPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabaseService } from '../services/supabaseService';
import LoadingSpinner from '../components/LoadingSpinner';

const QuizPage = () => {
  const { setId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    setLoading(true);
    supabaseService.getQuestionSet(setId)
      .then((setData) => {
        setQuestions(setData.questions);
      })
      .catch((err) => {
        console.error('Failed to load quiz:', err);
        setError('Could not load quiz. Please try again.');
      })
      .finally(() => setLoading(false));
  }, [setId]);

  if (loading) return <LoadingSpinner fullScreen />;

  if (error) {
    return (
      <div className="p-8 text-center text-red-600">
        {error}
        <div className="mt-4">
          <button
            onClick={() => navigate('/my-questions')}
            className="px-4 py-2 bg-indigo-600 text-white rounded"
          >
            Back to My Quizzes
          </button>
        </div>
      </div>
    );
  }

  if (score !== null) {
    return (
      <div className="p-8 max-w-xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Your Score</h2>
        <p className="text-xl mb-6">{score} / {questions.length}</p>
        <Link to={`/questions/${setId}`} className="text-indigo-600 hover:underline">
          Review Quiz
        </Link>
      </div>
    );
  }

  const q = questions[current];
  const handleSelect = (opt) => {
    setAnswers(prev => ({ ...prev, [current]: opt }));
  };


const goNext = async () => {
  if (current < questions.length - 1) {
    setCurrent(current + 1);
  } else {
    // compute final score
    const total = questions.reduce(
      (sum, ques, idx) => sum + (answers[idx] === ques.answer ? 1 : 0),
      0
    );
    setScore(total);

    try {
      // Persist the score on the saved question set
      await supabaseService.updateQuestionSetScore(setId, total);
    } catch (err) {
      console.error('Failed to save score:', err);
      // optionally show an error to the user
    }
  }
};

  const goPrev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  return (
    <section className="p-8 max-w-xl mx-auto">
      <h3 className="text-xl font-semibold mb-4">
        Question {current + 1} of {questions.length}
      </h3>
      <p className="mb-4">{q.question}</p>

      {q.type === 'objective' && (
        <div className="space-y-2 mb-4">
          {q.options.map((opt, i) => {
            const letter = String.fromCharCode(65 + i);
            return (
              <label key={i} className="block cursor-pointer">
                <input
                  type="radio"
                  name="answer"
                  checked={answers[current] === letter}
                  onChange={() => handleSelect(letter)}
                  className="mr-2"
                />
                {letter}. {opt}
              </label>
            );
          })}
        </div>
      )}

      <div className="flex justify-between">
        <button
          onClick={goPrev}
          disabled={current === 0}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={goNext}
          className="px-4 py-2 bg-indigo-600 text-white rounded"
        >
          {current === questions.length - 1 ? 'Submit' : 'Next'}
        </button>
      </div>
    </section>
  );
};

export default QuizPage;
