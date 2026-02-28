import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, MessageCircle, CheckCircle, AlertCircle, Linkedin } from 'lucide-react'

interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

const Contact = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Partial<ContactForm>>({})

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactForm> = {}

    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    else if (formData.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof ContactForm]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <section id="contact" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-dark-950" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="text-primary text-sm font-medium uppercase tracking-wider">Get In Touch</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
              Let's <span className="gradient-text">Connect</span>
            </h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Ready to transform your business with automation? Let's discuss your project
              and see how I can help streamline your workflows.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Let's Talk</h3>
                <p className="text-gray-400 leading-relaxed">
                  Whether you need a simple automation or a complex workflow system,
                  I'm here to help. Reach out for a free consultation.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 glass rounded-xl">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Mail className="text-primary" size={20} />
                  </div>
                  <div>
                    <div className="text-white font-medium">Email</div>
                    <div className="text-gray-400 text-sm">gudezkim@outlook.ph</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 glass rounded-xl">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MessageCircle className="text-primary" size={20} />
                  </div>
                  <div>
                    <div className="text-white font-medium">Response Time</div>
                    <div className="text-gray-400 text-sm">Usually within 24 hours</div>
                  </div>
                </div>
              </div>

              {/* What to Expect */}
              <div className="glass rounded-2xl p-6">
                <h4 className="text-lg font-semibold text-white mb-4">What to Expect</h4>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-primary" />
                    Detailed analysis of your workflows
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-primary" />
                    Custom automation strategy
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-primary" />
                    Timeline and cost estimation
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-primary" />
                    Ongoing support and optimization
                  </li>
                </ul>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Connect With Me</h4>
                <div className="flex gap-3">
                  <a
                    href="https://www.linkedin.com/in/kim-joshua-gudez-331407386/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 glass rounded-xl flex items-center justify-center hover:bg-[#0077b5]/20 hover:border-[#0077b5]/30 transition-all duration-300"
                  >
                    <Linkedin size={20} className="text-gray-400 hover:text-[#0077b5]" />
                  </a>
                  <a
                    href="https://www.upwork.com/freelancers/~01fc57e7e3539e1d17"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 glass rounded-xl flex items-center justify-center hover:bg-[#14a800]/20 hover:border-[#14a800]/30 transition-all duration-300"
                  >
                    <span className="text-gray-400 hover:text-[#14a800] font-bold">U</span>
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 glass rounded-xl flex items-center justify-center hover:bg-[#1e40af]/20 hover:border-[#1e40af]/30 transition-all duration-300"
                  >
                    <span className="text-gray-400 hover:text-[#1e40af] font-bold text-sm">OJ</span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-dark-800 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors ${
                        errors.name ? 'border-red-400' : 'border-white/10'
                      }`}
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle size={14} /> {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-dark-800 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors ${
                        errors.email ? 'border-red-400' : 'border-white/10'
                      }`}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle size={14} /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-dark-800 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors ${
                      errors.subject ? 'border-red-400' : 'border-white/10'
                    }`}
                    placeholder="Project inquiry"
                  />
                  {errors.subject && (
                    <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle size={14} /> {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className={`w-full px-4 py-3 bg-dark-800 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors resize-none ${
                      errors.message ? 'border-red-400' : 'border-white/10'
                    }`}
                    placeholder="Tell me about your automation needs..."
                  />
                  {errors.message && (
                    <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle size={14} /> {errors.message}
                    </p>
                  )}
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="flex items-center gap-2 text-green-400 bg-green-400/10 px-4 py-3 rounded-xl">
                    <CheckCircle size={18} />
                    <span>Message sent successfully!</span>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="flex items-center gap-2 text-red-400 bg-red-400/10 px-4 py-3 rounded-xl">
                    <AlertCircle size={18} />
                    <span>Failed to send. Please try again.</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-primary hover:bg-primary-600 disabled:bg-dark-700 disabled:cursor-not-allowed text-dark-950 font-semibold rounded-xl transition-all duration-300"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
