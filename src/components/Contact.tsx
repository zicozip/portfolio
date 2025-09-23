import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, MessageCircle, CheckCircle, AlertCircle, Linkedin } from 'lucide-react';
import { ContactForm } from '../types/portfolio';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<ContactForm>>({});

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactForm> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof ContactForm]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send the form data to your backend
      console.log('Form submitted:', formData);
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="contact" className="py-20 bg-gray-900" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Get In Touch</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Ready to transform your business with automation? Let's discuss your project and 
              see how I can help streamline your workflows.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Let's Connect</h3>
                <p className="text-gray-300 mb-8">
                  Whether you need a simple automation or a complex workflow system, 
                  I'm here to help. Reach out for a free consultation.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Mail className="text-green-400" size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Email</h4>
                    <p className="text-gray-300">gudezkim@outlook.ph</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <MessageCircle className="text-green-400" size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Response Time</h4>
                    <p className="text-gray-300">Usually within 24 hours</p>
                  </div>
                </div>

              </div>

              <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl p-6">
                <h4 className="text-white font-semibold mb-3">What to Expect</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• Detailed analysis of your current workflows</li>
                  <li>• Custom automation strategy recommendations</li>
                  <li>• Timeline and cost estimation</li>
                  <li>• Ongoing support and optimization</li>
                </ul>
              </div>
              
              {/* Social Media Links */}
              <div className="mt-8">
                <h4 className="text-white font-semibold mb-4">Connect With Me</h4>
                <div className="flex gap-4">
                  {/* LinkedIn */}
                  <motion.a
                    href="https://www.linkedin.com/in/kim-joshua-gudez-331407386/" // Replace with your LinkedIn URL
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-[#0077b5] hover:bg-[#005885] rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title="LinkedIn Profile"
                  >
                    <Linkedin size={24} className="text-white" />
                  </motion.a>
                  
                  {/* Upwork */}
                  <motion.a
                    href="https://www.upwork.com/freelancers/~01fc57e7e3539e1d17?mp_source=share" // Replace with your Upwork URL
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-[#14a800] hover:bg-[#0f7a00] rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title="Upwork Profile"
                  >
                    <div className="text-white font-bold text-lg">U</div>
                  </motion.a>
                  
                  {/* OnlineJobs.ph */}
                  <motion.a
                    href="https://onlinejobs.ph/jobseekers/your-profile" // Replace with your OnlineJobs.ph URL
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-[#1e40af] hover:bg-[#1e3a8a] rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title="OnlineJobs.ph Profile"
                  >
                    <div className="text-white font-bold text-sm">OJ</div>
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-white font-semibold mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-800 border-2 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400 transition-colors ${
                      errors.name ? 'border-red-400' : 'border-gray-600'
                    }`}
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle size={16} />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-white font-semibold mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-800 border-2 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400 transition-colors ${
                      errors.email ? 'border-red-400' : 'border-gray-600'
                    }`}
                    placeholder="your.email@company.com"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle size={16} />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-white font-semibold mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-800 border-2 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400 transition-colors ${
                      errors.subject ? 'border-red-400' : 'border-gray-600'
                    }`}
                    placeholder="Automation project inquiry"
                  />
                  {errors.subject && (
                    <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle size={16} />
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-white font-semibold mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className={`w-full px-4 py-3 bg-gray-800 border-2 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400 transition-colors resize-y ${
                      errors.message ? 'border-red-400' : 'border-gray-600'
                    }`}
                    placeholder="Tell me about your automation needs, current workflows, and goals..."
                  />
                  {errors.message && (
                    <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle size={16} />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Status */}
                {submitStatus === 'success' && (
                  <div className="flex items-center gap-2 text-green-400 bg-green-500/10 px-4 py-3 rounded-lg">
                    <CheckCircle size={20} />
                    <span>Message sent successfully! I'll get back to you soon.</span>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="flex items-center gap-2 text-red-400 bg-red-500/10 px-4 py-3 rounded-lg">
                    <AlertCircle size={20} />
                    <span>Failed to send message. Please try again.</span>
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;