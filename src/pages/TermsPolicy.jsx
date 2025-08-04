// src/pages/TermsPolicy.jsx
import React, { useState } from 'react';
import { FiShield, FiFileText, FiLock, FiUser, FiDatabase, FiMail, FiCheck } from 'react-icons/fi';

const TermsPolicy = () => {
  const [activeSection, setActiveSection] = useState('terms');
  
  const sections = [
    { id: 'terms', label: 'Terms of Service', icon: <FiFileText /> },
    { id: 'privacy', label: 'Privacy Policy', icon: <FiLock /> },
    { id: 'cookies', label: 'Cookie Policy', icon: <FiShield /> }
  ];

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-white min-h-screen">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-indigo-600 to-indigo-800 text-white">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms & Policies</h1>
          <p className="text-xl max-w-3xl mx-auto mb-6">
            Understand how we protect your data and govern our services
          </p>
          <div className="flex justify-center">
            <div className="w-20 h-1 bg-indigo-300 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Side Navigation */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <FiShield className="text-indigo-600" />
                  Our Policies
                </h2>
                
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition ${
                        activeSection === section.id
                          ? 'bg-indigo-100 text-indigo-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-lg">{section.icon}</span>
                      {section.label}
                    </button>
                  ))}
                </nav>
                
                <div className="mt-8 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                  <h3 className="font-bold text-gray-900 mb-2">Last Updated</h3>
                  <p className="text-gray-600">August 4, 2025</p>
                </div>
              </div>
            </div>
            
            {/* Content Area */}
            <div className="lg:w-3/4">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Terms of Service */}
                {activeSection === 'terms' && (
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl p-4">
                        <FiFileText className="text-white text-2xl" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900">Terms of Service</h2>
                        <p className="text-gray-600">Effective: August 4, 2025</p>
                      </div>
                    </div>
                    
                    <div className="prose max-w-none">
                      <div className="mb-10">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h3>
                        <p className="text-gray-700 mb-4">
                          By accessing or using SnapTest ("Service"), you agree to be bound by these Terms of Service. 
                          If you do not agree to all the terms, do not use our Service.
                        </p>
                      </div>
                      
                      <div className="mb-10">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">2. Description of Service</h3>
                        <p className="text-gray-700 mb-4">
                          SnapTest provides an AI-powered platform that allows users to generate practice questions from 
                          various content sources including text, documents, and images.
                        </p>
                      </div>
                      
                      <div className="mb-10">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">3. User Accounts</h3>
                        <p className="text-gray-700 mb-4">
                          To access certain features, you must create an account. You are responsible for maintaining 
                          the confidentiality of your account and password.
                        </p>
                        <ul className="space-y-2 mb-4">
                          <li className="flex items-start">
                            <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                            <span>You must be at least 13 years old to use our Service</span>
                          </li>
                          <li className="flex items-start">
                            <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                            <span>You are responsible for all activities under your account</span>
                          </li>
                          <li className="flex items-start">
                            <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                            <span>You must provide accurate and complete information</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="mb-10">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">4. User Content</h3>
                        <p className="text-gray-700 mb-4">
                          You retain ownership of any content you submit to the Service. By uploading content, you grant 
                          SnapTest a license to use, reproduce, and process your content solely to provide the Service.
                        </p>
                      </div>
                      
                      <div className="mb-10">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">5. Prohibited Conduct</h3>
                        <p className="text-gray-700 mb-4">
                          You agree not to engage in any of the following prohibited activities:
                        </p>
                        <ul className="space-y-2 mb-4">
                          <li className="flex items-start">
                            <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mr-2 mt-0.5">
                              <span className="text-red-600 text-xs font-bold">!</span>
                            </div>
                            <span>Violating laws or infringing intellectual property rights</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mr-2 mt-0.5">
                              <span className="text-red-600 text-xs font-bold">!</span>
                            </div>
                            <span>Uploading malicious code or interfering with Service operations</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mr-2 mt-0.5">
                              <span className="text-red-600 text-xs font-bold">!</span>
                            </div>
                            <span>Attempting unauthorized access to other accounts or systems</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="mb-10">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">6. Termination</h3>
                        <p className="text-gray-700 mb-4">
                          We may terminate or suspend your access to the Service immediately, without prior notice, 
                          for any reason, including violation of these Terms.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Privacy Policy */}
                {activeSection === 'privacy' && (
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl p-4">
                        <FiLock className="text-white text-2xl" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900">Privacy Policy</h2>
                        <p className="text-gray-600">Effective: August 4, 2025</p>
                      </div>
                    </div>
                    
                    <div className="prose max-w-none">
                      <div className="mb-10">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">1. Information We Collect</h3>
                        <p className="text-gray-700 mb-4">
                          We collect information to provide better services to our users. The types of information we collect include:
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-100">
                            <div className="flex items-center gap-3 mb-3">
                              <FiUser className="text-indigo-600 text-xl" />
                              <h4 className="font-bold text-gray-900">Personal Information</h4>
                            </div>
                            <p className="text-gray-600">
                              When you create an account, we collect your email address and password.
                            </p>
                          </div>
                          
                          <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-100">
                            <div className="flex items-center gap-3 mb-3">
                              <FiDatabase className="text-indigo-600 text-xl" />
                              <h4 className="font-bold text-gray-900">Content Data</h4>
                            </div>
                            <p className="text-gray-600">
                              We process content you upload to generate questions, but we don't store it longer than necessary.
                            </p>
                          </div>
                          
                          <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-100">
                            <div className="flex items-center gap-3 mb-3">
                              <FiMail className="text-indigo-600 text-xl" />
                              <h4 className="font-bold text-gray-900">Communication Data</h4>
                            </div>
                            <p className="text-gray-600">
                              When you contact us, we collect your messages and contact information.
                            </p>
                          </div>
                          
                          <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-100">
                            <div className="flex items-center gap-3 mb-3">
                              <FiShield className="text-indigo-600 text-xl" />
                              <h4 className="font-bold text-gray-900">Usage Data</h4>
                            </div>
                            <p className="text-gray-600">
                              We collect information about how you interact with our Service.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-10">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">2. How We Use Information</h3>
                        <p className="text-gray-700 mb-4">
                          We use the information we collect for the following purposes:
                        </p>
                        <ul className="space-y-3 mb-4">
                          <li className="flex items-start">
                            <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                            <span>To provide, maintain, and improve our Service</span>
                          </li>
                          <li className="flex items-start">
                            <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                            <span>To personalize your experience and content</span>
                          </li>
                          <li className="flex items-start">
                            <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                            <span>To communicate with you about updates and support</span>
                          </li>
                          <li className="flex items-start">
                            <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                            <span>To ensure security and prevent fraud</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="mb-10">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">3. Information Sharing</h3>
                        <p className="text-gray-700 mb-4">
                          We do not sell your personal information. We may share information in the following limited circumstances:
                        </p>
                        <ul className="space-y-2 mb-4">
                          <li className="flex items-start">
                            <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center mr-2 mt-0.5">
                              <span className="text-indigo-700 text-xs font-bold">i</span>
                            </div>
                            <span>With service providers who assist in operating our Service</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center mr-2 mt-0.5">
                              <span className="text-indigo-700 text-xs font-bold">i</span>
                            </div>
                            <span>When required by law or legal process</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center mr-2 mt-0.5">
                              <span className="text-indigo-700 text-xs font-bold">i</span>
                            </div>
                            <span>To protect the rights, property, or safety of SnapTest or others</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="mb-10">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">4. Data Security</h3>
                        <p className="text-gray-700 mb-4">
                          We implement security measures designed to protect your information:
                        </p>
                        <div className="bg-indigo-50 rounded-xl p-5 mb-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                                <FiLock className="text-indigo-600" />
                              </div>
                              <span>End-to-end encryption for data in transit</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                                <FiShield className="text-indigo-600" />
                              </div>
                              <span>Regular security audits</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                                <FiDatabase className="text-indigo-600" />
                              </div>
                              <span>Secure storage with access controls</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                                <FiUser className="text-indigo-600" />
                              </div>
                              <span>Limited employee access to user data</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* <div className="mb-10">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">5. Your Rights</h3>
                        <p className="text-gray-700 mb-4">
                          You have certain rights regarding your personal information:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-white border border-indigo-100 rounded-lg p-4">
                            <h4 className="font-bold text-gray-900 mb-2">Access & Correction</h4>
                            <p className="text-gray-600">View and update your account information</p>
                          </div>
                          <div className="bg-white border border-indigo-100 rounded-lg p-4">
                            <h4 className="font-bold text-gray-900 mb-2">Data Portability</h4>
                            <p className="text-gray-600">Request a copy of your data</p>
                          </div>
                          <div className="bg-white border border-indigo-100 rounded-lg p-4">
                            <h4 className="font-bold text-gray-900 mb-2">Deletion</h4>
                            <p className="text-gray-600">Request deletion of your account and data</p>
                          </div>
                          <div className="bg-white border border-indigo-100 rounded-lg p-4">
                            <h4 className="font-bold text-gray-900 mb-2">Opt-Out</h4>
                            <p className="text-gray-600">Control marketing communications</p>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                )}
                
                {/* Cookie Policy */}
                {activeSection === 'cookies' && (
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl p-4">
                        <FiShield className="text-white text-2xl" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900">Cookie Policy</h2>
                        <p className="text-gray-600">Effective: August 4, 2025</p>
                      </div>
                    </div>
                    
                    <div className="prose max-w-none">
                      <div className="mb-10">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">1. What Are Cookies?</h3>
                        <p className="text-gray-700 mb-4">
                          Cookies are small text files stored on your device when you visit websites. 
                          They help websites remember information about your visit.
                        </p>
                      </div>
                      
                      <div className="mb-10">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">2. How We Use Cookies</h3>
                        <p className="text-gray-700 mb-4">
                          We use cookies for the following purposes:
                        </p>
                        
                        <div className="overflow-x-auto">
                          <table className="min-w-full border border-indigo-100">
                            <thead>
                              <tr className="bg-indigo-50">
                                <th className="py-3 px-4 text-left text-gray-700 font-bold">Purpose</th>
                                <th className="py-3 px-4 text-left text-gray-700 font-bold">Description</th>
                                <th className="py-3 px-4 text-left text-gray-700 font-bold">Example</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-indigo-100">
                                <td className="py-3 px-4 font-medium">Essential</td>
                                <td className="py-3 px-4">Required for site functionality</td>
                                <td className="py-3 px-4">Session management, security</td>
                              </tr>
                              <tr className="border-b border-indigo-100 bg-white">
                                <td className="py-3 px-4 font-medium">Preferences</td>
                                <td className="py-3 px-4">Remember your settings</td>
                                <td className="py-3 px-4">Language preference, theme</td>
                              </tr>
                              <tr className="border-b border-indigo-100">
                                <td className="py-3 px-4 font-medium">Analytics</td>
                                <td className="py-3 px-4">Improve our Service</td>
                                <td className="py-3 px-4">Usage patterns, popular features</td>
                              </tr>
                              <tr className="bg-white">
                                <td className="py-3 px-4 font-medium">Marketing</td>
                                <td className="py-3 px-4">Relevant advertising</td>
                                <td className="py-3 px-4">Campaign performance</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      
                      <div className="mb-10">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">3. Managing Cookies</h3>
                        <p className="text-gray-700 mb-4">
                          You can control cookies through your browser settings. However, disabling essential cookies may affect site functionality.
                        </p>
                        
                        <div className="bg-indigo-50 rounded-xl p-5 mb-4">
                          <h4 className="font-bold text-gray-900 mb-3">Browser Controls:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <a href="#" className="bg-white rounded-lg p-3 border border-indigo-100 hover:shadow transition flex items-center gap-2">
                              <div className="w-8 h-8 rounded-md bg-blue-100 flex items-center justify-center">
                                <span className="text-blue-700 font-bold text-xs">C</span>
                              </div>
                              Chrome Settings
                            </a>
                            <a href="#" className="bg-white rounded-lg p-3 border border-indigo-100 hover:shadow transition flex items-center gap-2">
                              <div className="w-8 h-8 rounded-md bg-orange-100 flex items-center justify-center">
                                <span className="text-orange-700 font-bold text-xs">F</span>
                              </div>
                              Firefox Settings
                            </a>
                            <a href="#" className="bg-white rounded-lg p-3 border border-indigo-100 hover:shadow transition flex items-center gap-2">
                              <div className="w-8 h-8 rounded-md bg-blue-100 flex items-center justify-center">
                                <span className="text-blue-700 font-bold text-xs">S</span>
                              </div>
                              Safari Settings
                            </a>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-10">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">4. Third-Party Cookies</h3>
                        <p className="text-gray-700 mb-4">
                          We may use third-party services that set their own cookies to provide features such as:
                        </p>
                        <ul className="space-y-2 mb-4">
                          <li className="flex items-start">
                            <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center mr-2 mt-0.5">
                              <span className="text-indigo-700 text-xs font-bold">i</span>
                            </div>
                            <span>Analytics (Google Analytics)</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center mr-2 mt-0.5">
                              <span className="text-indigo-700 text-xs font-bold">i</span>
                            </div>
                            <span>Advertising (Google Ads)</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center mr-2 mt-0.5">
                              <span className="text-indigo-700 text-xs font-bold">i</span>
                            </div>
                            <span>Video embedding (YouTube)</span>
                          </li>
                        </ul>
                        <p className="text-gray-700">
                          These third parties have their own privacy policies. We recommend reviewing them for more information.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Contact Card */}
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl p-8 mt-10 text-white">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4">Questions about our policies?</h3>
                    <p className="text-indigo-100">
                      Contact our support team for clarification on any policy or to exercise your data rights.
                    </p>
                  </div>
                  <div>
                    <a 
                      href="mailto:finetex700@gmail.com" 
                      className="px-8 py-3 bg-white text-indigo-600 font-bold rounded-full hover:bg-indigo-50 transition"
                    >
                      Contact Privacy Team
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsPolicy;