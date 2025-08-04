// src/pages/QuestionDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabaseService } from '../services/supabaseService';

const QuestionDetailPage = () => {
  const { setId } = useParams();
  const navigate = useNavigate();
  const [setData, setSetData] = useState(null);

  useEffect(() => {
    supabaseService
      .getQuestionSet(setId)
      .then((questions) => setSetData(questions))
      .catch(() => navigate('/my-questions'));
  }, [setId, navigate]);

  if (!setData) return <p>Loading…</p>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{setData.title}</h2>
      <div className="space-y-6">
        {setData.questions.map((q, i) => (
          <div key={q.id} className="p-4 bg-white rounded shadow">
            <p className="font-medium mb-2">{i + 1}. {q.question}</p>
            {q.type === 'objective' && (
              <ul className="list-disc pl-6 mb-2">
                {q.options.map((opt, idx) => (
                  <li key={idx}>{String.fromCharCode(65 + idx)}. {opt}</li>
                ))}
              </ul>
            )}
            {q.type === 'objective' && <p><strong>Answer:</strong> {q.answer}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionDetailPage;
