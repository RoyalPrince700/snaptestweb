import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from "../provider/AuthContext";
import { AuthProvider } from "../provider/AuthContext";
import ScrollToTop from './components/ScrollToTop';
import { supabase } from '../supabase/supabaseClient';

import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import { Signup } from './pages/Signup';
import { Login } from './pages/Login';
import { InputTextPage } from './pages/InputTextPage';
import { QuestionsPage } from './pages/QuestionsPage';
import QuizPage from './pages/QuizPage';
import QuestionDetailPage from './pages/QuestionDetailPage';
import { CameraPage } from './pages/upload/CameraPage';
import { UploadDocumentPage } from './pages/upload/UploadDocumentPage';
import { UploadImagePage } from './pages/upload/UploadImagePage';
import MyQuestionsPage from './pages/MyQuestionsPage';
import { EmailConfirmation } from './pages/EmailConfirmation';
import LoadingSpinner from './components/LoadingSpinner';
import DashboardRedirect from './pages/DashboardRedirect';
import { HowItWorks } from './pages/HowItWorks';

// NEW: Import the text preview page
import TextPreviewPage from './pages/upload/TextPreviewPage';
import AboutUs from './pages/About';
import ContactUs from './pages/ContactUs';
import TermsPolicy from './pages/TermsPolicy';
import AdminDashboard from './pages/AdminDashboard';

// 🔐 Protected route component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

// 🌐 Public-only route component
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <LoadingSpinner fullScreen />;
  }
  if (user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
          <Route path="/confirm" element={<EmailConfirmation />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/terms-policy" element={<TermsPolicy />} />
          <Route path="/admin" element={<AdminDashboard />} />


          
          {/* Protected routes */}
          <Route path="/dashboard" element={<DashboardRedirect />} />
          <Route path="/input-text" element={<ProtectedRoute><InputTextPage /></ProtectedRoute>} />
          <Route path="/questions" element={<ProtectedRoute><QuestionsPage /></ProtectedRoute>} />
          <Route path="/questions/:setId" element={<ProtectedRoute><QuestionDetailPage /></ProtectedRoute>} />
          <Route path="/quiz/:setId" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
          <Route path="/snap-photo" element={<ProtectedRoute><CameraPage /></ProtectedRoute>} />
          <Route path="/upload-document" element={<ProtectedRoute><UploadDocumentPage /></ProtectedRoute>} />
          <Route path="/upload-image" element={<ProtectedRoute><UploadImagePage /></ProtectedRoute>} />
          
          {/* NEW: Text preview route (protected) */}
          <Route 
            path="/text-preview" 
            element={<ProtectedRoute><TextPreviewPage /></ProtectedRoute>} 
          />
          
          <Route path="/my-questions" element={<ProtectedRoute><MyQuestionsPage /></ProtectedRoute>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;