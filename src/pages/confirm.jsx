import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../../supabase/supabaseClient';
import { FaCheckCircle, FaExclamationTriangle, FaSpinner } from 'react-icons/fa';

export default function EmailConfirmation() {
  const location = useLocation();
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const confirmUser = async () => {
      try {
        // Extract token from URL hash
        const hashParams = new URLSearchParams(location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        const tokenType = hashParams.get('token_type');
        const expiresIn = hashParams.get('expires_in');

        if (!accessToken) {
          throw new Error('Missing confirmation token');
        }

        // Set session from token
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
          token_type: tokenType,
          expires_in: parseInt(expiresIn)
        });

        if (error) throw error;

        // Success
        setStatus('success');
        setMessage('Email confirmed successfully! Redirecting to dashboard...');
        
        // Redirect after 3 seconds
        setTimeout(() => window.location.href = '/dashboard', 3000);
      } catch (error) {
        setStatus('error');
        setMessage(error.message || 'Failed to confirm email');
      }
    };

    confirmUser();
  }, [location]);

  const renderContent = () => {
    switch (status) {
      case 'verifying':
        return (
          <div className="text-center py-12">
            <FaSpinner className="animate-spin h-12 w-12 mx-auto text-indigo-600" />
            <p className="mt-4 text-lg">Verifying your email...</p>
          </div>
        );
      
      case 'success':
        return (
          <div className="text-center py-12">
            <FaCheckCircle className="h-16 w-16 mx-auto text-green-500" />
            <h2 className="mt-4 text-2xl font-bold">Confirmation Successful!</h2>
            <p className="mt-2 text-gray-600">{message}</p>
          </div>
        );
      
      case 'error':
        return (
          <div className="text-center py-12">
            <FaExclamationTriangle className="h-16 w-16 mx-auto text-red-500" />
            <h2 className="mt-4 text-2xl font-bold">Confirmation Failed</h2>
            <p className="mt-2 text-gray-600">{message}</p>
            <div className="mt-6 space-y-3 max-w-xs mx-auto">
              <button
                onClick={() => window.location.href = '/auth/signin'}
                className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Sign In
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Go Home
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto">
        {renderContent()}
      </div>
    </div>
  );
}