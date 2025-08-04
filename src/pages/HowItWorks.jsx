import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../provider/AuthContext";
import {
  FiUserPlus,
  FiUpload,
  FiBarChart2,
  FiCheckCircle,
} from "react-icons/fi";

export const HowItWorks = () => {
  const { isAuthenticated } = useAuth();

  const steps = [
    {
      Icon: FiUserPlus,
      title: "Sign Up or Log In",
      description: "Create an account or log in to access SnapTest's features securely.",
      actionText: isAuthenticated ? "Go to My Questions" : "Sign Up Now",
      actionLink: isAuthenticated ? "/my-questions" : "/signup",
    },
    {
      Icon: FiUpload,
      title: "Upload Your Content",
      description: "Paste text, snap a photo, or upload docs. SnapTest supports all formats.",
      actionText: "Start Uploading",
      actionLink: isAuthenticated ? "/input-text" : "/login",
    },
    {
      Icon: FiBarChart2,
      title: "Generate Questions",
      description: "Use AI to create MCQs or theory questions in seconds.",
      actionText: "Try It Out",
      actionLink: isAuthenticated ? "/input-text" : "/login",
    },
    {
      Icon: FiCheckCircle,
      title: "Review & Practice",
      description: "Track your progress, review, and master every topic easily.",
      actionText: "View My Questions",
      actionLink: isAuthenticated ? "/my-questions" : "/login",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 to-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How SnapTest Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Follow these simple steps to turn your study materials into interactive practice questions!
          </p>
        </div>

        <div className="space-y-28">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-16`}
            >
              {/* Illustration */}
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute -inset-6 bg-indigo-100 rounded-2xl transform rotate-6"></div>
                  <div className="relative bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl p-10 flex items-center justify-center aspect-square">
                    <step.Icon className="text-white text-6xl md:text-7xl" />
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="text-indigo-700 font-bold">{index + 1}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {step.title}
                  </h3>
                </div>
                
                <p className="text-lg text-gray-600 mb-8">
                  {step.description}
                </p>
                
                <div>
                  <Link
                    to={step.actionLink}
                    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full px-6 py-3 transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    {step.actionText}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;