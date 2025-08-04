// src/pages/ContactUs.jsx
import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend, FiMessageCircle, FiCheckCircle } from 'react-icons/fi';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-white min-h-screen">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-indigo-600 to-indigo-800 text-white">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl max-w-3xl mx-auto mb-6">
            Have questions, feedback, or need support? We're here to help!
          </p>
          <div className="flex justify-center">
            <div className="w-20 h-1 bg-indigo-300 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-indigo-100 hover:shadow-xl transition">
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl p-4 inline-flex items-center justify-center mb-6">
                <FiMail className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Email Us</h3>
              <p className="text-gray-600 mb-4">We'll respond as quickly as possible</p>
              <a 
                href="mailto:support@snaptest.com" 
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                support@snaptest.com
              </a>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-indigo-100 hover:shadow-xl transition">
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl p-4 inline-flex items-center justify-center mb-6">
                <FiPhone className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Call Us</h3>
              <p className="text-gray-600 mb-4">Mon-Fri, 9am-5pm EST</p>
              <a 
                href="tel:+11234567890" 
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                +1 (123) 456-7890
              </a>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-indigo-100 hover:shadow-xl transition">
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl p-4 inline-flex items-center justify-center mb-6">
                <FiMapPin className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Visit Us</h3>
              <p className="text-gray-600 mb-4">Based in the innovation hub</p>
              <p className="text-indigo-600 font-medium">
                123 Education Street<br />
                Tech City, TC 10001
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left Side - Decorative */}
              <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-10 text-white hidden lg:block">
                <div className="relative h-full flex flex-col justify-between">
                  <div>
                    <h2 className="text-3xl font-bold mb-6">Let's Connect</h2>
                    <p className="text-indigo-200 mb-8 max-w-md">
                      Whether you have questions about features, need technical support, or want to provide feedback, our team is ready to assist you.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-indigo-500/30 flex items-center justify-center">
                          <FiMessageCircle className="text-white text-xl" />
                        </div>
                        <div>
                          <h3 className="font-bold">Quick Responses</h3>
                          <p className="text-indigo-200 text-sm">Typically within 24 hours</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-indigo-500/30 flex items-center justify-center">
                          <FiCheckCircle className="text-white text-xl" />
                        </div>
                        <div>
                          <h3 className="font-bold">Expert Support</h3>
                          <p className="text-indigo-200 text-sm">From our dedicated team</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                    </div>
                    <div className="w-16 h-16 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                    </div>
                    <div className="w-16 h-16 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Side - Form */}
              <div className="p-10">
                <div className="text-center mb-8 lg:hidden">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Send Us a Message</h2>
                  <p className="text-gray-600">
                    Fill out the form and we'll get back to you as soon as possible
                  </p>
                </div>
                
                {submitSuccess && (
                  <div className="mb-8 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200 flex items-center gap-3">
                    <FiCheckCircle className="text-green-600 text-xl flex-shrink-0" />
                    <div>
                      <p className="font-medium">Message sent successfully!</p>
                      <p>We'll get back to you within 24 hours.</p>
                    </div>
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="How can we help?"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Tell us about your inquiry..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-lg font-medium transition-all duration-300 disabled:bg-indigo-400"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend className="text-sm" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-indigo-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find quick answers to common questions about SnapTest
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-indigo-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3">How does SnapTest generate questions?</h3>
              <p className="text-gray-600">
                SnapTest uses advanced AI algorithms to analyze your content and identify key concepts. It then generates relevant multiple-choice and theory questions based on the material, ensuring they accurately test understanding of the content.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-indigo-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Is my content secure with SnapTest?</h3>
              <p className="text-gray-600">
                Absolutely. We prioritize your privacy and security. All uploaded content is encrypted and stored securely. We never share your materials with third parties, and you retain full ownership of all content you upload.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-indigo-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Can I use SnapTest for commercial purposes?</h3>
              <p className="text-gray-600">
                Yes! SnapTest offers both free and premium plans suitable for individual learners, educators, and commercial organizations. Our premium plans provide additional features and higher usage limits for professional needs.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-indigo-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What file formats does SnapTest support?</h3>
              <p className="text-gray-600">
                SnapTest supports a wide range of formats including PDF, DOCX, TXT, and images (JPG, PNG). You can also paste text directly or take photos of physical documents using our mobile-friendly interface.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              Didn't find the answer you were looking for?
            </p>
            <a 
              href="mailto:support@snaptest.com" 
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full px-6 py-3 transition"
            >
              <FiMail className="text-sm" />
              Email Our Support Team
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;