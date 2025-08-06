import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/supabaseClient";
import { useAuth } from "../../provider/AuthContext";
import { FiMail, FiLock, FiUser, FiArrowLeft, FiCheckCircle } from "react-icons/fi";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!email || !password || password.length < 6) {
      setError("Please provide a valid email and a password of at least 6 characters.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error: signupError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`
        }
      });

      if (signupError) throw signupError;

      setSuccess({
        title: "Confirm Your Email",
        message: `A confirmation link has been sent to ${email}. Please check your inbox.`,
        instructions: [
          "Open your email inbox.",
          "Find the message from SnapTest.",
          "Click on the confirmation link provided.",
          "Please note: Email delivery may take up to a few minutes, especially for Gmail users."
        ],
        note: "If you do not see the email, check your Spam or Promotions folder. Be patient — it may take a few minutes to arrive."
      });
    } catch (err) {
      console.error("Signup error caught:", err);
      setError(err.message);
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
            <Link to="/" className="inline-flex items-center gap-2 text-indigo-200 hover:text-white mb-10">
              <FiArrowLeft className="text-sm" />
              Back to Home
            </Link>
            <h2 className="text-3xl font-bold text-white mb-4">Create Your Account</h2>
            <p className="text-indigo-200 max-w-xs">
              Join SnapTest to transform your study materials into interactive practice questions and track your progress.
            </p>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-indigo-500/30 flex items-center justify-center">
                <FiUser className="text-white text-xl" />
              </div>
              <p className="text-indigo-200">Already have an account?</p>
            </div>
            <Link 
              to="/login" 
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium rounded-full px-6 py-3 transition-all duration-300 backdrop-blur-sm"
            >
              Login Now
              <FiArrowLeft className="text-sm transform rotate-180" />
            </Link>
          </div>
        </div>
        
        {/* Signup Form */}
        <div className="w-full md:w-3/5 bg-white p-10">
          <div className="text-center mb-10">
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl p-4 inline-flex items-center justify-center">
              <FiUser className="text-white text-3xl" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mt-6 mb-2">Sign Up for SnapTest</h2>
            <p className="text-gray-600">Create your account to get started</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg text-center">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success ? (
            <div className="bg-indigo-50 rounded-2xl p-8 mb-6 border border-indigo-200">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                  <FiCheckCircle className="text-indigo-600 text-3xl" />
                </div>
                <h3 className="text-xl font-bold text-indigo-800 mb-2">{success.title}</h3>
                <p className="text-indigo-700 mb-4">{success.message}</p>

                <div className="bg-white p-5 rounded-xl w-full max-w-md mb-5">
                  <ul className="space-y-3">
                    {success.instructions.map((step, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
                            <span className="text-indigo-600 text-sm font-bold">{index + 1}</span>
                          </div>
                        </div>
                        <p className="ml-3 text-left text-indigo-700">{step}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-sm text-indigo-600 mb-6">{success.note}</p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => window.location.reload()}
                    className="px-5 py-2.5 text-indigo-600 font-medium bg-indigo-50 rounded-full hover:bg-indigo-100 transition"
                  >
                    Return to Signup
                  </button>
                  <button
                    onClick={async () => {
                      console.log("Resend confirmation for:", email);
                      const { error: resendError } = await supabase.auth.resendVerificationEmail({ email });
                      if (resendError) {
                        console.error("Resend error:", resendError);
                        setError(resendError.message);
                      }
                    }}
                    className="px-5 py-2.5 text-white font-medium bg-indigo-600 rounded-full hover:bg-indigo-700 transition"
                  >
                    Resend Confirmation
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSignup} className="space-y-6">
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
                  placeholder="Create a password"
                  required
                  minLength={6}
                />
              </div>
              <p className="text-xs text-gray-500 -mt-4">Minimum 6 characters</p>

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
                    Creating Account...
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>
          )}

          {!success && (
            <div className="mt-8 text-center">
              <p className="text-gray-600 text-sm">
                By signing up, you agree to our <a href="terms-policy" className="text-indigo-600 hover:underline">Terms</a> and <a href="terms-policy" className="text-indigo-600 hover:underline">Privacy Policy</a>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Signup;
