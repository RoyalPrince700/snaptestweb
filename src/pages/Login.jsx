// src/pages/Login.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../../supabase/supabaseClient";
import { useAuth } from "../../provider/AuthContext";
import { FiLock, FiMail, FiUser, FiArrowRight } from "react-icons/fi";


export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  // Log for debugging

  // Determine redirect destination
  const from = location.state?.from?.pathname || "/";

  // If already authenticated, redirect to homepage
  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);


    try {
      const { data, error: loginError } = await supabase.auth.signInWithPassword({ email, password });

      if (loginError) {
        console.log('Login error:', loginError);
        setError(loginError.message);
      } else if (data.user) {
        navigate(from, { replace: true });
      }
    } catch (err) {
      console.error('Unexpected login error:', err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white px-4">
      <div className="max-w-4xl w-full flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-xl">
        {/* Decorative Side Panel */}
        <div className="w-full md:w-2/5 bg-gradient-to-br from-indigo-600 to-indigo-800 p-10 flex flex-col justify-between relative">
          <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-indigo-500/20"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-indigo-400/10"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-4">Welcome Back!</h2>
            <p className="text-indigo-200 max-w-xs">
              Continue your learning journey with SnapTest. Generate questions, track progress, and master your subjects.
            </p>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-indigo-500/30 flex items-center justify-center">
                <FiUser className="text-white text-xl" />
              </div>
              <p className="text-indigo-200">Don't have an account?</p>
            </div>
            <Link 
              to="/signup" 
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium rounded-full px-6 py-3 transition-all duration-300 backdrop-blur-sm"
            >
              Sign Up Now
              <FiArrowRight className="text-sm" />
            </Link>
          </div>
        </div>
        
        {/* Login Form */}
        <div className="w-full md:w-3/5 bg-white p-10">
          <div className="text-center mb-10">
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl p-4 inline-flex items-center justify-center">
              <FiLock className="text-white text-3xl" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mt-6 mb-2">Login to SnapTest</h2>
            <p className="text-gray-600">Enter your credentials to continue</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="text-gray-400 text-xl" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-0 border-b-2 border-gray-200 focus:border-indigo-600 focus:outline-none focus:ring-0"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="text-gray-400 text-xl" />
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-0 border-b-2 border-gray-200 focus:border-indigo-600 focus:outline-none focus:ring-0"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-full font-medium transition-all duration-300 transform hover:-translate-y-0.5 disabled:bg-indigo-400 disabled:transform-none"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging In...
                </>
              ) : (
                <>
                  Login
                  <FiArrowRight className="text-sm" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link 
              to="/password-reset" 
              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
            >
              Forgot your password?
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;