import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase/supabaseClient';
import { FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';

export const EmailConfirmation = () => {
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        // Extract token from URL hash
        const hashParams = new URLSearchParams(location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        const tokenType = hashParams.get('token_type');
        const expiresIn = hashParams.get('expires_in');

        if (!accessToken) {
          throw new Error('Confirmation link is invalid or expired');
        }

        // Set the session using the token
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
          token_type: tokenType,
          expires_in: parseInt(expiresIn) || 3600
        });

        if (error) throw error;

        // Success - redirect after 3 seconds
        setStatus('success');
        setMessage('Email confirmed successfully! Redirecting to your dashboard...');
        setTimeout(() => navigate('/dashboard'), 3000);

      } catch (error) {
        setStatus('error');
        setMessage(error.message || 'Failed to confirm email address');
      }
    };

    verifyToken();
  }, [location, navigate]);

  const renderContent = () => {
    switch (status) {
      case 'verifying':
        return (
          <div className="text-center">
            <FaSpinner className="animate-spin h-12 w-12 mx-auto text-indigo-600 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">Verifying Your Email</h2>
            <p className="mt-2 text-gray-600">Please wait while we confirm your email address...</p>
          </div>
        );

      case 'success':
        return (
          <div className="text-center">
            <FaCheckCircle className="h-16 w-16 mx-auto text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">Confirmation Successful!</h2>
            <p className="mt-2 text-gray-600">{message}</p>
          </div>
        );

      case 'error':
        return (
          <div className="text-center">
            <FaTimesCircle className="h-16 w-16 mx-auto text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">Confirmation Failed</h2>
            <p className="mt-2 text-gray-600">{message}</p>
            <div className="mt-6 space-y-3">
              <button
                onClick={() => navigate('/signup')}
                className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Try Signing Up Again
              </button>
              <button
                onClick={() => navigate('/')}
                className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Return Home
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        {renderContent()}
      </div>
    </div>
  );
};