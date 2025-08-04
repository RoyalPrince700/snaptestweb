import { useEffect } from 'react';
import { supabase } from '../../supabase/supabaseClient';

export default function DashboardRedirect() {
  useEffect(() => {
    // Check if user is authenticated
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        window.location.href = '/app/dashboard';
      } else {
        window.location.href = '/auth/signin';
      }
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-4">Loading your dashboard...</p>
      </div>
    </div>
  );
}