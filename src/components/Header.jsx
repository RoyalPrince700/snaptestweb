// Header.jsx
import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/supabaseClient";
import { useAuth } from "../../provider/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import LOGO from "../assets/snaptest-logo.png";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAuth(); // Added user from AuthContext
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  // Prevent background scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
  }, [mobileMenuOpen]);

  // Check admin status
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('is_admin')
            .eq('id', user.id)
            .single();
            
          if (error) throw error;
          
          if (data.is_admin) {
            setIsAdmin(true);
          }
        } catch (err) {
          console.error('Failed to verify admin status:', err);
        }
      }
    };

    checkAdminStatus();
  }, [user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setMobileMenuOpen(false);
    setIsAdmin(false); // Reset admin status on logout
    navigate("/login");
  };

  // Framer variants
  const menuVariants = {
    hidden: { y: "-100%" },
    visible: { y: 0 },
    exit:   { y: "-100%" }
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-sm">
        {/* Mobile & Tablet Header */}
        <div className="lg:hidden flex items-center justify-between py-4 px-4">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="text-indigo-600 focus:outline-none"
          >
            <FiMenu className="w-6 h-6" />
          </button>
          <Link to="/" className="flex items-center gap-2">
            <img src={LOGO} alt="SnapTest" className="h-6 w-6" />
          </Link>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-10">
                <Link to="/" className="flex items-center gap-2">
                  <img src={LOGO} alt="SnapTest" className="h-5 w-18" />
                </Link>
                <nav className="flex gap-6 text-gray-600 items-center">
                  <Link to="/how-it-works" className="hover:text-indigo-600 transition-colors">
                    How It Works
                  </Link>
                   <Link to="/about-us" className="hover:text-indigo-600 transition-colors">
                    About Us
                  </Link>
                  
                  {isAuthenticated && (
                    <Link to="/my-questions" className="hover:text-indigo-600 transition-colors">
                      My Questions
                    </Link>
                  )}
                  
                  {/* Admin Dashboard Link - Desktop */}
                  {isAuthenticated && isAdmin && (
                    <Link 
                      to="/admin" 
                      className="hover:text-indigo-600 transition-colors flex items-center gap-1"
                    >
                      <span>Admin</span>
                      <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                    </Link>
                  )}
                </nav>
              </div>
              <div className="flex gap-3">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/my-questions"
                      className="px-4 py-1.5 rounded-lg border border-indigo-600 text-indigo-600 font-medium hover:bg-indigo-50 transition-colors"
                    >
                      My Questions
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="bg-indigo-600 px-4 py-1.5 rounded-lg text-white font-medium hover:shadow-md transition-all"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="px-4 py-1.5 rounded-lg border border-indigo-600 text-indigo-600 font-medium hover:bg-indigo-50 transition-colors"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile/Tablet Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[999] bg-white flex flex-col overflow-auto"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Top Bar */}
            <div className="flex justify-between items-center p-4 border-b shadow-md bg-white">
              <Link
                to="/"
                className="flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <img src={LOGO} alt="SnapTest" className="h-6 w-6" />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-indigo-600 focus:outline-none"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            {/* Menu Content */}
            <nav className="flex flex-col gap-3 px-6 py-6 text-gray-700">
              <Link
                to="/how-it-works"
                className="hover:text-indigo-600 py-2 border-b"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </Link>
                <Link
                to="/about-us"
                className="hover:text-indigo-600 py-2 border-b"
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </Link>


              {isAuthenticated ? (
                <>
                  <Link
                    to="/my-questions"
                    className="hover:text-indigo-600 py-2 border-b"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Questions
                  </Link>
                  
                  {/* Admin Dashboard Link - Mobile */}
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="hover:text-indigo-600 py-2 border-b flex items-center gap-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Admin Dashboard
                      <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                    </Link>
                  )}
                  
                  <button
                    onClick={handleLogout}
                    className="mt-3 text-left text-red-500 hover:text-red-600 font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="mt-4 px-4 py-2 rounded-lg border border-indigo-600 text-indigo-600 font-medium hover:bg-indigo-50 text-left"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;