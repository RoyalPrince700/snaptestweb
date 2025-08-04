import React from "react";
import {
  FiArrowRight,
  FiClipboard,
  FiCamera,
  FiImage,
  FiFileText,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../provider/AuthContext";

export const Hero = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleProtectedNavigation = (path) => {
    if (isAuthenticated) {
      navigate(path);
    } else {
      navigate(`/login?redirect=${encodeURIComponent(path)}`);
    }
  };

  return (
    <section className="py-8 md:py-16 bg-gradient-to-br from-indigo-50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12">
          {/* Text Content */}
          <div className="md:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full mb-4">
              <FiClipboard />
              <span className="text-sm font-medium">AI-powered learning</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Turn study materials into
              <br />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                practice questions in seconds
              </span>
            </h1>

            <p className="text-lg text-gray-600 mt-6 max-w-lg">
              Upload textbooks, notes, or PDFs. Get instant MCQs and theory
              questions tailored to your curriculum.
            </p>

            {/* Action Grid - Updated with new camera option */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <button
                onClick={() => handleProtectedNavigation("/input-text")}
                className="flex flex-col items-center justify-center gap-2 bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                  <FiClipboard className="text-indigo-600 text-xl" />
                </div>
                <span className="font-medium">Input Text</span>
              </button>

              <button
                onClick={() => handleProtectedNavigation("/snap-photo")}
                className="flex flex-col items-center justify-center gap-2 bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <FiCamera className="text-purple-600 text-xl" />
                </div>
                <span className="font-medium">Take Photo</span>
              </button>

              <button
                onClick={() => handleProtectedNavigation("/upload-image")}
                className="flex flex-col items-center justify-center gap-2 bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <FiImage className="text-blue-600 text-xl" />
                </div>
                <span className="font-medium">Upload Image</span>
              </button>

              <button
                onClick={() => handleProtectedNavigation("/upload-document")}
                className="flex flex-col items-center justify-center gap-2 bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                  <FiFileText className="text-amber-600 text-xl" />
                </div>
                <span className="font-medium">Add Document</span>
              </button>
            </div>

            {/* Sign Up and Login Buttons */}
            {!isAuthenticated && (
              <div className="flex gap-4 mt-8">
                <Link
                  to="/signup"
                  className="flex items-center justify-center gap-2 bg-indigo-600 text-white rounded-lg px-6 py-3 font-medium hover:bg-indigo-700 transition"
                >
                  Sign Up
                  <FiArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 border-2 border-indigo-600 text-indigo-600 rounded-lg px-6 py-3 font-medium hover:bg-indigo-50 transition"
                >
                  Login
                </Link>
              </div>
            )}
          </div>

          {/* Visual Element */}
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 transform rotate-1">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-3 w-3 rounded-full bg-red-400"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                  <div className="h-3 w-3 rounded-full bg-green-400"></div>
                </div>

                <div className="space-y-4">
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <p className="font-medium">
                      What is the primary function of mitochondria?
                    </p>
                    <div className="mt-2 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-indigo-200 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="font-medium">
                      Explain Newton&apos;s First Law of Motion
                    </p>
                    <div className="mt-2">
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;