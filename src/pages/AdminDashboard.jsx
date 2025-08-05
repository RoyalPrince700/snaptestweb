import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase/supabaseClient';
import { useAuth } from '../../provider/AuthContext';
import { 
  FiUsers, FiBarChart2, FiSettings, FiMail, FiFileText, 
  FiLock, FiDatabase, FiShoppingCart, FiMessageCircle, FiPlus, FiX 
} from 'react-icons/fi';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [questionSets, setQuestionSets] = useState([]);
  const [currentQuestionSet, setCurrentQuestionSet] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [error, setError] = useState('');

  // Check if user is admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        navigate('/login');
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', user.id)
          .single();
          
        if (error) throw error;
        
        if (data?.is_admin) {
          setIsAdmin(true);
          fetchStats();
          fetchUsers();
          fetchQuestionSets();
        } else {
          navigate('/');
        }
      } catch (err) {
        setError('Failed to verify admin status');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [user, navigate]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Get user count
      const { count: userCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact' });
      
      // Get question set count
      const { count: questionSetCount } = await supabase
        .from('question_sets')
        .select('*', { count: 'exact' });
      
      // Get today's signups
      const today = new Date().toISOString().split('T')[0];
      const { count: todaySignups } = await supabase
        .from('profiles')
        .select('*', { count: 'exact' })
        .gte('created_at', today);
      
      setStats({
        userCount,
        questionSetCount,
        todaySignups
      });
    } catch (err) {
      setError('Failed to load statistics');
      console.error(err);
    }
  };

  const fetchUsers = async () => {
    try {
      setError('');
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email, created_at, role')
        .order('created_at', { ascending: false })
        .limit(10);
        
      if (error) throw error;
      setUsers(data);
    } catch (err) {
      setError('Failed to load users');
      console.error(err);
    }
  };

  const fetchQuestionSets = async () => {
    try {
      setError('');
      const { data, error } = await supabase
        .from('question_sets')
        .select('id, title, question_type, created_at, user_id, last_score')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setQuestionSets(data);
    } catch (err) {
      setError('Failed to load question sets');
      console.error(err);
    }
  };

  const handleSaveQuestionSet = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const questionSetData = {
      title: formData.get('title'),
      question_type: formData.get('question_type'),
      questions: JSON.parse(formData.get('questions') || '[]'),
      source_text: formData.get('source_text'),
    };

    try {
      setError('');
      if (isEditing && currentQuestionSet) {
        // Update existing question set
        const { error } = await supabase
          .from('question_sets')
          .update({
            ...questionSetData,
            updated_at: new Date().toISOString()
          })
          .eq('id', currentQuestionSet.id);
          
        if (error) throw error;
      } else {
        // Create new question set
        const { error } = await supabase
          .from('question_sets')
          .insert({
            ...questionSetData,
            user_id: user.id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });
          
        if (error) throw error;
      }
      
      fetchQuestionSets();
      setCurrentQuestionSet(null);
      setIsEditing(false);
    } catch (err) {
      setError(`Failed to ${isEditing ? 'update' : 'create'} question set: ${err.message}`);
      console.error(err);
    }
  };

  const handleEditQuestionSet = (questionSet) => {
    setCurrentQuestionSet(questionSet);
    setIsEditing(true);
  };

  const handleDeleteQuestionSet = async (id) => {
    if (window.confirm('Are you sure you want to delete this question set?')) {
      try {
        setError('');
        const { error } = await supabase
          .from('question_sets')
          .delete()
          .eq('id', id);
          
        if (error) throw error;
        fetchQuestionSets();
      } catch (err) {
        setError('Failed to delete question set');
        console.error(err);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying admin privileges...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg text-center">
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
            <h3 className="font-bold text-lg">Access Denied</h3>
            <p>You do not have permission to view this page.</p>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span>{user?.email}</span>
            <button 
              onClick={() => supabase.auth.signOut()}
              className="bg-indigo-500 hover:bg-indigo-400 px-4 py-2 rounded-lg text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto p-4 flex flex-col md:flex-row gap-6 max-w-6xl">
        {/* Sidebar */}
        <nav className="md:w-64 bg-white rounded-2xl shadow-lg p-4 h-fit sticky top-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition ${
                  activeTab === 'dashboard' 
                    ? 'bg-indigo-100 text-indigo-700 font-medium' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FiBarChart2 className="text-lg" />
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('users')}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition ${
                  activeTab === 'users' 
                    ? 'bg-indigo-100 text-indigo-700 font-medium' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FiUsers className="text-lg" />
                User Management
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveTab('content');
                  setCurrentQuestionSet(null);
                  setIsEditing(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition ${
                  activeTab === 'content' 
                    ? 'bg-indigo-100 text-indigo-700 font-medium' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FiFileText className="text-lg" />
                Content Management
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition ${
                  activeTab === 'analytics' 
                    ? 'bg-indigo-100 text-indigo-700 font-medium' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FiDatabase className="text-lg" />
                Analytics
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition ${
                  activeTab === 'settings' 
                    ? 'bg-indigo-100 text-indigo-700 font-medium' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FiSettings className="text-lg" />
                Settings
              </button>
            </li>
          </ul>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1">
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
              
              {stats ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-2xl p-6 border border-indigo-200">
                    <div className="flex items-center gap-4">
                      <div className="bg-indigo-600 p-3 rounded-xl">
                        <FiUsers className="text-white text-2xl" />
                      </div>
                      <div>
                        <p className="text-gray-600">Total Users</p>
                        <p className="text-3xl font-bold">{stats.userCount}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-2xl p-6 border border-indigo-200">
                    <div className="flex items-center gap-4">
                      <div className="bg-indigo-600 p-3 rounded-xl">
                        <FiFileText className="text-white text-2xl" />
                      </div>
                      <div>
                        <p className="text-gray-600">Question Sets</p>
                        <p className="text-3xl font-bold">{stats.questionSetCount}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-2xl p-6 border border-indigo-200">
                    <div className="flex items-center gap-4">
                      <div className="bg-indigo-600 p-3 rounded-xl">
                        <FiMail className="text-white text-2xl" />
                      </div>
                      <div>
                        <p className="text-gray-600">Today's Signups</p>
                        <p className="text-3xl font-bold">{stats.todaySignups}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
                </div>
              )}
              
              <div className="bg-white rounded-2xl border border-indigo-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Users</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-indigo-100">
                    <thead className="bg-indigo-50">
                      <tr>
                        <th className="py-3 px-4 text-left text-gray-700 font-bold">Email</th>
                        <th className="py-3 px-4 text-left text-gray-700 font-bold">Role</th>
                        <th className="py-3 px-4 text-left text-gray-700 font-bold">Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(user => (
                        <tr key={user.id} className="border-b border-indigo-100 hover:bg-indigo-50">
                          <td className="py-3 px-4">{user.email}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              user.role === 'admin' 
                                ? 'bg-purple-100 text-purple-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {user.role || 'user'}
                            </span>
                          </td>
                          <td className="py-3 px-4">{new Date(user.created_at).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">User Management</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Search Users</h3>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Search by email..." 
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium">
                      Search
                    </button>
                  </div>
                </div>
                
                <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Admin Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full text-left bg-white p-3 rounded-lg border border-indigo-200 hover:bg-indigo-50 transition">
                      Export User Data
                    </button>
                    <button className="w-full text-left bg-white p-3 rounded-lg border border-indigo-200 hover:bg-indigo-50 transition">
                      Send Bulk Email
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl border border-indigo-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">All Users</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-indigo-100">
                    <thead className="bg-indigo-50">
                      <tr>
                        <th className="py-3 px-4 text-left text-gray-700 font-bold">Email</th>
                        <th className="py-3 px-4 text-left text-gray-700 font-bold">Role</th>
                        <th className="py-3 px-4 text-left text-gray-700 font-bold">Joined</th>
                        <th className="py-3 px-4 text-left text-gray-700 font-bold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(user => (
                        <tr key={user.id} className="border-b border-indigo-100 hover:bg-indigo-50">
                          <td className="py-3 px-4">{user.email}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              user.role === 'admin' 
                                ? 'bg-purple-100 text-purple-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {user.role || 'user'}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            {new Date(user.created_at).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <button className="text-indigo-600 hover:text-indigo-800">
                                Edit
                              </button>
                              <button className="text-red-600 hover:text-red-800">
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Content Management Tab */}
          {activeTab === 'content' && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Question Set Management</h2>
                <button 
                  onClick={() => {
                    setCurrentQuestionSet(null);
                    setIsEditing(!isEditing);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                    isEditing 
                      ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {isEditing ? (
                    <>
                      <FiX className="text-lg" /> Cancel
                    </>
                  ) : (
                    <>
                      <FiPlus className="text-lg" /> Create New
                    </>
                  )}
                </button>
              </div>
              
              {isEditing ? (
                <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100 mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {currentQuestionSet ? 'Edit Question Set' : 'Create New Question Set'}
                  </h3>
                  <form onSubmit={handleSaveQuestionSet}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-700 mb-2">Title *</label>
                        <input 
                          type="text" 
                          name="title"
                          required
                          defaultValue={currentQuestionSet?.title || ''}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Enter question set title"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 mb-2">Question Type *</label>
                        <select 
                          name="question_type"
                          required
                          defaultValue={currentQuestionSet?.question_type || 'multiple_choice'}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="multiple_choice">Multiple Choice</option>
                          <option value="true_false">True/False</option>
                          <option value="short_answer">Short Answer</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 mb-2">Questions (JSON) *</label>
                        <textarea 
                          name="questions"
                          required
                          defaultValue={currentQuestionSet?.questions ? JSON.stringify(currentQuestionSet.questions, null, 2) : '[]'}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
                          rows={8}
                          placeholder='[{"question": "Sample question", "options": ["A", "B", "C"], "correctAnswer": 0}]'
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          Enter questions in JSON format. Each question should have "question", "options", and "correctAnswer".
                        </p>
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 mb-2">Source Text</label>
                        <textarea 
                          name="source_text"
                          defaultValue={currentQuestionSet?.source_text || ''}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          rows={3}
                          placeholder="Optional source material for the questions"
                        />
                      </div>
                      
                      <button 
                        type="submit"
                        className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
                      >
                        {currentQuestionSet ? 'Update Question Set' : 'Create Question Set'}
                      </button>
                    </div>
                  </form>
                </div>
              ) : null}
              
              <div className="bg-white rounded-2xl border border-indigo-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">All Question Sets</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-indigo-100">
                    <thead className="bg-indigo-50">
                      <tr>
                        <th className="py-3 px-4 text-left text-gray-700 font-bold">Title</th>
                        <th className="py-3 px-4 text-left text-gray-700 font-bold">Type</th>
                        <th className="py-3 px-4 text-left text-gray-700 font-bold">Created</th>
                        <th className="py-3 px-4 text-left text-gray-700 font-bold">Last Score</th>
                        <th className="py-3 px-4 text-left text-gray-700 font-bold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {questionSets.map(set => (
                        <tr key={set.id} className="border-b border-indigo-100 hover:bg-indigo-50">
                          <td className="py-3 px-4">{set.title}</td>
                          <td className="py-3 px-4">
                            <span className="capitalize px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                              {set.question_type.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            {new Date(set.created_at).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            {set.last_score ? `${set.last_score}%` : 'N/A'}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <button 
                                onClick={() => handleEditQuestionSet(set)}
                                className="text-indigo-600 hover:text-indigo-800"
                              >
                                Edit
                              </button>
                              <button 
                                onClick={() => handleDeleteQuestionSet(set.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Analytics Dashboard</h2>
              <div className="text-center py-12 bg-indigo-50 rounded-2xl border border-indigo-100">
                <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-2xl p-6 inline-flex items-center justify-center mb-8">
                  <div className="bg-white rounded-xl p-4">
                    <FiBarChart2 className="text-indigo-600 text-4xl" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Advanced Analytics</h3>
                <p className="text-gray-600 max-w-md mx-auto mb-8">
                  View detailed usage statistics, user engagement metrics, and content performance.
                </p>
                <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition">
                  View Analytics
                </button>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">General Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Site Title</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        defaultValue="SnapTest"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Default Theme</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <option>Indigo</option>
                        <option>Blue</option>
                        <option>Green</option>
                        <option>Purple</option>
                      </select>
                    </div>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium w-full">
                      Save Settings
                    </button>
                  </div>
                </div>
                
                <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Security Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-indigo-100">
                      <div>
                        <h4 className="font-bold">Two-Factor Authentication</h4>
                        <p className="text-sm text-gray-600">Add extra security to admin accounts</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-indigo-100">
                      <div>
                        <h4 className="font-bold">Activity Logs</h4>
                        <p className="text-sm text-gray-600">Keep track of admin actions</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-indigo-100">
                      <div>
                        <h4 className="font-bold">IP Whitelisting</h4>
                        <p className="text-sm text-gray-600">Restrict admin access to specific IPs</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-indigo-900 text-indigo-100 py-8 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} SnapTest Admin Dashboard. All rights reserved.</p>
          <p className="mt-2 text-indigo-300">Restricted access - authorized personnel only</p>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;