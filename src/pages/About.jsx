// src/pages/AboutUs.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiTarget, FiBookOpen, FiBarChart2, FiGlobe, FiCode, FiShoppingCart, FiMessageCircle, FiAward } from 'react-icons/fi';
import royalPrince from "../assets/royal-prince.jpg";

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-indigo-800 text-white">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About SnapTest</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10">
            Transforming how students learn and educators teach with AI-powered question generation
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/signup" 
              className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-full hover:bg-indigo-50 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Get Started
            </Link>
            <Link 
              to="/howitworks" 
              className="px-8 py-4 bg-indigo-700 text-white font-bold rounded-full hover:bg-indigo-600 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute -inset-6 bg-indigo-100 rounded-2xl transform rotate-6"></div>
                <div className="relative bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl p-10 flex items-center justify-center aspect-square">
                  <FiTarget className="text-white text-6xl md:text-7xl" />
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-6">
                At SnapTest, we're revolutionizing the way students learn and educators teach. We believe that practice is the key to mastery, but creating quality practice materials is time-consuming and challenging.
              </p>
              <p className="text-lg text-gray-700 mb-8">
                Our mission is to empower learners and educators by transforming any content into personalized practice questions in seconds. Whether you're studying for exams, learning a new skill, or teaching a class, SnapTest makes practice accessible, efficient, and effective.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="bg-indigo-100 p-3 rounded-lg">
                    <FiBookOpen className="text-indigo-700 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">For Students</h3>
                    <p className="text-gray-600">Turn study materials into practice quizzes instantly</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-indigo-100 p-3 rounded-lg">
                    <FiUsers className="text-indigo-700 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">For Educators</h3>
                    <p className="text-gray-600">Create assessments in minutes, not hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-indigo-100 p-3 rounded-lg">
                    <FiBarChart2 className="text-indigo-700 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Track Progress</h3>
                    <p className="text-gray-600">Monitor your learning journey with detailed analytics</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-indigo-100 p-3 rounded-lg">
                    <FiGlobe className="text-indigo-700 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Accessible</h3>
                    <p className="text-gray-600">Learn anytime, anywhere on any device</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-indigo-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Technology</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powered by cutting-edge AI to deliver intelligent learning experiences
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-indigo-100">
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl p-4 inline-flex items-center justify-center mb-6">
                <FiCode className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Advanced NLP</h3>
              <p className="text-gray-600">
                Our Natural Language Processing engine understands context, extracts key concepts, and generates meaningful questions that test real understanding.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-indigo-100">
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl p-4 inline-flex items-center justify-center mb-6">
                <FiAward className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Adaptive Learning</h3>
              <p className="text-gray-600">
                SnapTest analyzes your performance to tailor question difficulty and focus on areas that need improvement, creating a personalized learning path.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-indigo-100">
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl p-4 inline-flex items-center justify-center mb-6">
                <FiMessageCircle className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Instant Feedback</h3>
              <p className="text-gray-600">
                Receive detailed explanations for every answer, helping you understand concepts deeply rather than just memorizing facts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Founder */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet the Founder</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The vision behind SnapTest
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-6 bg-indigo-100 rounded-full transform rotate-6"></div>
                <div className="relative w-64 h-64 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center overflow-hidden">
                  <div className="relative w-64 h-64 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center overflow-hidden">
  <img 
    src={royalPrince} 
    alt="Ologundudu Joseph" 
    className="w-full h-full object-cover rounded-full border-4 border-white"
  />
</div>

                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Ologundudu Joseph (Royal Prince)</h3>
              <p className="text-lg text-gray-700 mb-6">
                Joseph is a passionate solo builder and full-stack developer with a focus on creating websites that convert visitors into engaged users. With expertise in both design and development, Joseph crafts digital experiences that are not only visually appealing but also highly functional and user-focused.
              </p>
              
              <div className="mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-3">Skills & Expertise</h4>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full font-medium">Conversion Optimization</span>
                  <span className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full font-medium">UI/UX Design</span>
                  <span className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full font-medium">Full-Stack Development</span>
                  <span className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full font-medium">E-commerce Solutions</span>
                  <span className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full font-medium">AI Integration</span>
                </div>
              </div>
              
              <div className="mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-3">Featured Project</h4>
                <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-100">
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-xl p-3">
                      <FiShoppingCart className="text-white text-2xl" />
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-900 text-lg">Wifmart E-commerce</h5>
                      <p className="text-gray-600">A fully functional e-commerce platform</p>
                      <a 
                        href="https://www.wifmart.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:underline inline-block mt-2"
                      >
                        www.wifmart.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Connect with Joseph</h4>
                <div className="flex gap-4">
                  <a 
                    href="https://www.linkedin.com/in/ologundudu-joseph-adesukanmi-2172a1135/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition"
                  >
                    LinkedIn
                  </a>
                  <a 
                    href="https://x.com/Royalprincecube" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition"
                  >
                    Twitter/X
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-indigo-800">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Learning?</h2>
          <p className="text-xl text-indigo-100 mb-10 max-w-3xl mx-auto">
            Join thousands of students and educators who are already using SnapTest to make learning more effective and efficient.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/signup" 
              className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-full hover:bg-indigo-50 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Create Free Account
            </Link>
            <Link 
              to="/howitworks" 
              className="px-8 py-4 bg-indigo-700 text-white font-bold rounded-full hover:bg-indigo-600 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              See How It Works
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;