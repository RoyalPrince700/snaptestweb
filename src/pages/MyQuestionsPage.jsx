import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2, FiPlay, FiEye, FiPlusCircle } from 'react-icons/fi';
import { supabaseService } from '../services/supabaseService';
import { useAuth } from '../../provider/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const MyQuestionsPage = () => {
  const { user } = useAuth();
  const [sets, setSets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchSets();
  }, []);

  const fetchSets = async () => {
    setLoading(true);
    try {
      const data = await supabaseService.getAllQuestionSets();
      setSets(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this quiz? All questions will be permanently removed.')) return;
    setDeletingId(id);
    try {
      await supabaseService.deleteQuestionSet(id);
      await fetchSets();
    } catch (err) {
      console.error(err);
      alert('Could not delete quiz');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <div className="bg-indigo-50 min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">My Quizzes</h1>
          <p className="text-gray-600 text-base">View and manage your generated quizzes</p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full shadow transition"
          >
            <FiPlusCircle /> Create New Quiz
          </Link>
        </div>

        {sets.length === 0 ? (
          <div className="bg-white p-10 rounded-xl shadow text-center">
            <FiPlusCircle className="mx-auto text-indigo-500 text-4xl mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No quizzes created</h2>
            <p className="text-gray-500 mb-6">Click below to create your first quiz</p>
            <Link
              to="/"
              className="inline-block bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition"
            >
              Create Quiz
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sets.map((s) => (
              <div
                key={s.id}
                className="bg-white border border-indigo-100 rounded-xl p-5 shadow-sm hover:shadow-md transition relative"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-lg text-gray-800 truncate pr-6">{s.title}</h3>
                  <button
                    onClick={() => handleDelete(s.id)}
                    disabled={deletingId === s.id}
                    className="text-gray-400 hover:text-red-600"
                  >
                    {deletingId === s.id ? (
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <FiTrash2 size={18} />
                    )}
                  </button>
                </div>
                <span className="text-xs inline-block mb-4 px-2 py-1 bg-indigo-100 text-indigo-600 rounded-full">
                  {s.question_type?.toLowerCase() === 'objective' ? 'Multiple Choice' : 'Theory'}
                </span>
                <div className="text-sm text-gray-600 mb-2">Questions: <span className="font-medium">{s.questions?.length || 0}</span></div>
                <div className="text-sm text-gray-600 mb-2">Last Score: <span className="font-medium">{s.last_score ?? 'N/A'}</span></div>
                <div className="text-sm text-gray-500 mb-4">Created: {new Date(s.created_at).toLocaleDateString()}</div>
                <div className="flex gap-2">
                  <Link
                    to={`/quiz/${s.id}`}
                    className="flex-1 bg-indigo-600 text-white py-2 rounded-lg text-center hover:bg-indigo-700 transition"
                  >
                    <FiPlay className="inline-block mr-1" /> Take Quiz
                  </Link>
                  <Link
                    to={`/questions/${s.id}`}
                    className="flex-1 border border-indigo-600 text-indigo-600 py-2 rounded-lg text-center hover:bg-indigo-50 transition"
                  >
                    <FiEye className="inline-block mr-1" /> View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyQuestionsPage;
