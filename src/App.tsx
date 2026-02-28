import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Code, Mail, Linkedin, Youtube,
  X, Zap, Layers, Target, Clock,
  Briefcase, Sparkles, CheckCircle, Folder, FileText
} from 'lucide-react'
import { projects } from './data/projects'
import BootLoader from './components/BootLoader'

// Terminal Window Component
const TerminalWindow = ({ children, title = "kim@portfolio", className = "" }: { children: React.ReactNode; title?: string; className?: string }) => (
  <div className={`terminal-window relative overflow-hidden ${className}`}>
    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#00fff5]/10">
      <div className="terminal-dot red" />
      <div className="terminal-dot yellow" />
      <div className="terminal-dot green" />
      <span className="ml-4 text-xs text-gray-500">{title}</span>
    </div>
    <div className="p-4">{children}</div>
  </div>
)

// Typing Text Component
const TypingText = ({ text, speed = 30 }: { text: string; speed?: number }) => {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
      }
    }, speed)
    return () => clearInterval(timer)
  }, [text, speed])

  return <span>{displayed}</span>
}

// Header
const Header = () => {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', 'skills', 'contact']
      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: 'about', label: '> about' },
    { id: 'projects', label: '> projects' },
    { id: 'skills', label: '> skills' },
    { id: 'contact', label: '> contact' }
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-[#00fff5]/10">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Zap className="text-[#00fff5]" size={20} />
            <span className="text-white font-semibold text-sm">kim@portfolio</span>
            <span className="text-gray-600">~</span>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`px-3 py-1 text-xs transition-colors ${
                  activeSection === item.id
                    ? 'text-[#00fff5] bg-[#00fff5]/10 rounded'
                    : 'text-gray-500 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}

// Hero Section
const Hero = () => {
  return (
    <section id="hero" className="pt-16 pb-6 px-4 relative">
      <div className="container mx-auto max-w-4xl relative z-10">
        <TerminalWindow className="glow-cyan">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#ffb800] text-sm">
              <span className="text-[#00fff5]">$</span>
              <span>whoami</span>
            </div>

            <div className="pl-3">
              <h1 className="text-2xl md:text-4xl font-bold text-white">
                <span className="text-[#00fff5]">Kim Joshua</span> Gudez
              </h1>
              <p className="text-gray-400 text-sm">AI Automation Specialist</p>
            </div>

            <div className="flex items-center gap-2 text-[#ffb800] text-sm">
              <span className="text-[#00fff5]">$</span>
              <TypingText text="cat intro.txt" />
            </div>

            <div className="pl-3 text-gray-400 text-sm leading-relaxed max-w-xl">
              Building powerful <span className="text-[#00fff5]">n8n workflows</span> that automate
              your business and save <span className="text-[#ffb800]">50+ hours/week</span>.
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#00fff5]/10 border border-[#00fff5]/30 text-[#00fff5] rounded text-sm hover:bg-[#00fff5]/20 transition-colors"
              >
                <Folder size={14} />
                View Projects
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#ffb800]/10 border border-[#ffb800]/30 text-[#ffb800] rounded text-sm hover:bg-[#ffb800]/20 transition-colors"
              >
                <Mail size={14} />
                Contact Me
              </motion.a>
            </div>

            <div className="flex items-center gap-2 text-[#ffb800] text-sm">
              <span className="text-[#00fff5]">$</span>
              <span>echo $status</span>
              <span className="terminal-cursor" />
            </div>

            <div className="pl-3">
              <span className="inline-flex items-center gap-2 px-2 py-1 bg-[#00fff5]/10 text-[#00fff5] rounded text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00fff5] animate-pulse" />
                Available for projects
              </span>
            </div>
          </div>
        </TerminalWindow>
      </div>
    </section>
  )
}

// About Section
const About = () => {
  return (
    <section id="about" className="py-3 px-4 -mt-2">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <TerminalWindow>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-[#ffb800] text-sm">
                <span className="text-[#00fff5]">$</span>
                <TypingText text="cat about.md" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h2 className="text-lg font-bold text-white">
                  The <span className="text-[#00fff5]">Story</span>
                </h2>
                <div className="space-y-2 text-gray-400 text-sm leading-relaxed">
                  <p>
                    <span className="text-[#ffb800]">const</span> background = <span className="text-[#00fff5]">"Doctor of Dental Medicine"</span>;
                  </p>
                  <p>
                    I'm a DMD graduate who discovered a passion for
                    <span className="text-[#00fff5]"> AI automation</span>. Building
                    workflows to save businesses thousands of hours became my calling.
                  </p>
                  <p>
                    My healthcare background gives me precision, attention to detail,
                    and focus on outcomes.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="text-lg font-bold text-white">
                  What <span className="text-[#ffb800]">Makes Me Different</span>
                </h2>
                <div className="space-y-2">
                  {[
                    { icon: <Sparkles size={14} />, text: 'DMD → AI unique path' },
                    { icon: <Target size={14} />, text: 'Healthcare-level precision' },
                    { icon: <Zap size={14} />, text: 'Rapid deployment' },
                    { icon: <CheckCircle size={14} />, text: 'Client-focused solutions' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-gray-400 text-sm">
                      <span className="text-[#00fff5]">{item.icon}</span>
                      {item.text}
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-[#00fff5]/5 border border-[#00fff5]/20 rounded-lg">
                  <div className="flex items-center gap-2 text-[#00fff5] text-xs font-semibold mb-2">
                    <Code size={14} />
                    Tech Stack
                  </div>
                  <div className="flex flex-wrap gap-1.5 text-xs text-gray-400">
                    <span className="px-2 py-0.5 bg-[#0a0a0a] rounded">n8n</span>
                    <span className="px-2 py-0.5 bg-[#0a0a0a] rounded">JavaScript</span>
                    <span className="px-2 py-0.5 bg-[#0a0a0a] rounded">APIs</span>
                    <span className="px-2 py-0.5 bg-[#0a0a0a] rounded">Webhooks</span>
                    <span className="px-2 py-0.5 bg-[#0a0a0a] rounded">AI/ML</span>
                  </div>
                </div>
              </div>
            </div>
          </TerminalWindow>
        </motion.div>
      </div>
    </section>
  )
}

// Projects Section
const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  return (
    <section id="projects" className="py-3 px-4 -mt-2">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <TerminalWindow>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-[#ffb800] text-sm">
                <span className="text-[#00fff5]">$</span>
                <TypingText text="ls ./projects/" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.01 }}
                onClick={() => setSelectedProject(project)}
                className="terminal-window p-4 cursor-pointer group hover:border-[#00fff5]/50 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <FileText size={14} className="text-[#00fff5]" />
                    <h3 className="font-semibold text-white text-sm group-hover:text-[#00fff5] transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <span className={`px-1.5 py-0.5 rounded text-xs ${
                    project.metrics.workflowComplexity === 'Expert' ? 'bg-red-500/20 text-red-400' :
                    project.metrics.workflowComplexity === 'Advanced' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {project.metrics.workflowComplexity}
                  </span>
                </div>

                <p className="text-gray-500 text-xs mb-2 line-clamp-1">
                  {project.description}
                </p>

                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <span className="flex items-center gap-1">
                    <Clock size={10} className="text-[#ffb800]" />
                    {project.metrics.automationSavings}
                  </span>
                  <span className="flex items-center gap-1">
                    <Target size={10} className="text-[#00fff5]" />
                    {project.metrics.accuracyImprovement}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
          </TerminalWindow>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="terminal-window max-w-xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between p-4 border-b border-[#00fff5]/10">
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedProject.title}</h3>
                  <span className="text-gray-500 text-xs">{selectedProject.category}</span>
                </div>
                <button onClick={() => setSelectedProject(null)} className="p-1.5 hover:bg-[#0a0a0a] rounded">
                  <X size={16} className="text-gray-500" />
                </button>
              </div>

              <div className="p-4 space-y-4">
                <p className="text-gray-400 text-sm">{selectedProject.description}</p>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Time Saved', value: selectedProject.metrics.automationSavings, color: '#ffb800' },
                    { label: 'Accuracy', value: selectedProject.metrics.accuracyImprovement, color: '#00fff5' },
                    { label: 'Integrations', value: selectedProject.metrics.integrations, color: '#00fff5' }
                  ].map((stat, i) => (
                    <div key={i} className="text-center p-2 bg-[#0a0a0a] rounded">
                      <div className="text-sm font-bold" style={{ color: stat.color }}>{stat.value}</div>
                      <div className="text-gray-500 text-xs">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div>
                  <h4 className="text-white font-semibold text-sm mb-2">Highlights</h4>
                  <ul className="space-y-1">
                    {selectedProject.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-400 text-xs">
                        <span className="w-1 h-1 rounded-full bg-[#00fff5]" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-semibold text-sm mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedProject.technologies.map((tech, i) => (
                      <span key={i} className="px-2 py-0.5 bg-[#00fff5]/10 text-[#00fff5] rounded text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

// Skills Section
const Skills = () => {
  const skillBars = [
    { name: 'n8n Workflow Development', level: 95 },
    { name: 'API Integration', level: 92 },
    { name: 'JavaScript', level: 88 },
    { name: 'Data Automation', level: 90 },
    { name: 'AI/ML Integration', level: 85 }
  ]

  const integrations = [
    'Gmail', 'Google Drive', 'Asana', 'Slack', 'Notion', 'Airtable',
    'Salesforce', 'HubSpot', 'Xero', 'OpenAI', 'MySQL', 'PostgreSQL'
  ]

  return (
    <section id="skills" className="py-3 px-4 -mt-2">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <TerminalWindow>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-[#ffb800] text-sm">
                <span className="text-[#00fff5]">$</span>
                <TypingText text="cat skills.json" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                {skillBars.map((skill, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-0.5">
                      <span className="text-gray-400 text-xs">{skill.name}</span>
                      <span className="text-[#00fff5] text-xs">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-[#0a0a0a] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                        className="h-full bg-gradient-to-r from-[#00fff5] to-[#00c4c4] rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-[#00fff5]/10">
                <h4 className="text-white font-semibold text-xs mb-2 flex items-center gap-2">
                  <Layers size={12} className="text-[#ffb800]" />
                  Integrations
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {integrations.map((item, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.02 }}
                      className="px-2 py-0.5 bg-[#0a0a0a] text-gray-400 rounded text-xs hover:text-[#00fff5] hover:border hover:border-[#00fff5]/30 transition-all cursor-default"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </TerminalWindow>
        </motion.div>
      </div>
    </section>
  )
}

// Contact Section
const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  const socialLinks = [
    { icon: <Linkedin size={16} />, label: 'LinkedIn', href: 'https://linkedin.com/in/kim-joshua-gudez-331407386', color: '#0077b5' },
    { icon: <Briefcase size={16} />, label: 'Upwork', href: 'https://upwork.com/freelancers/~01fc57e7e3539e1d17', color: '#14a800' },
    { icon: <Youtube size={16} />, label: 'YouTube', href: '#', color: '#ff0000' },
  ]

  return (
    <section id="contact" className="py-3 px-4 -mt-2">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <TerminalWindow>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-[#ffb800] text-sm">
                <span className="text-[#00fff5]">$</span>
                <TypingText text="./contact.sh" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3 items-stretch">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white mb-1">
                    Let's <span className="text-[#00fff5]">Connect</span>
                  </h2>
                  <p className="text-gray-500 text-xs">Have a project? Let's automate it.</p>
                </div>

                <div className="space-y-2 mt-4">
                  <a href="mailto:gudezkim@outlook.ph" className="flex items-center gap-2 text-gray-400 hover:text-[#00fff5] transition-colors text-sm">
                    <Mail size={14} className="text-[#ffb800]" />
                    gudezkim@outlook.ph
                  </a>
                </div>

                <div className="flex gap-2 mt-4">
                  {socialLinks.map((link, i) => (
                    <motion.a
                      key={i}
                      href={link.href}
                      target="_blank"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-8 h-8 rounded flex items-center justify-center transition-colors"
                      style={{ backgroundColor: `${link.color}20`, color: link.color }}
                    >
                      {link.icon}
                    </motion.a>
                  ))}
                </div>

                <div className="pt-4 mt-auto">
                  <div className="w-full p-2 bg-[#00fff5]/10 border border-[#00fff5]/30 rounded-lg flex items-center justify-center h-10">
                    <div className="flex items-center gap-2 text-[#00fff5] text-sm">
                      <Sparkles size={12} />
                      <span className="font-semibold">Response Time</span>
                      <span className="text-gray-500">|</span>
                      <span className="text-gray-500">Usually within 24 hours</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col h-full justify-between">
              {sent ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#ffb800] text-sm">
                    <span className="text-[#00fff5]">$</span>
                    <span>echo "message" | send</span>
                  </div>
                  <div className="pl-3 space-y-1 text-xs">
                    <p className="text-[#00fff5]">
                      <span className="text-[#ffb800]">➜</span> Message sent successfully
                    </p>
                    <p className="text-gray-500">
                      <span className="text-[#ffb800]">➜</span> Awaiting response from kim@portfolio
                    </p>
                    <p className="text-gray-600 mt-2">
                      Status: <span className="text-[#00fff5]">delivered</span>
                    </p>
                  </div>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-4 text-xs text-gray-500 hover:text-[#00fff5] transition-colors underline"
                  >
                    → Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-2 pt-4 md:pt-0">
                  <div className="space-y-1">
                    <label className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="text-[#00fff5]">$</span>
                      <span>name =</span>
                    </label>
                    <input
                      type="text"
                      placeholder='"Your Name"'
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#00fff5]/20 rounded text-white placeholder-gray-700 text-sm focus:border-[#00fff5] focus:outline-none transition-colors font-mono"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="text-[#00fff5]">$</span>
                      <span>email =</span>
                    </label>
                    <input
                      type="email"
                      placeholder='"your@email.com"'
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#00fff5]/20 rounded text-white placeholder-gray-700 text-sm focus:border-[#00fff5] focus:outline-none transition-colors font-mono"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="text-[#00fff5]">$</span>
                      <span>message =</span>
                    </label>
                    <textarea
                      placeholder='"Your message here..."'
                      rows={3}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#00fff5]/20 rounded text-white placeholder-gray-700 text-sm focus:border-[#00fff5] focus:outline-none transition-colors resize-none font-mono"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full p-2 bg-[#00fff5]/10 border border-[#00fff5]/30 text-[#00fff5] font-semibold rounded-lg text-sm hover:bg-[#00fff5]/20 transition-colors flex items-center justify-center gap-2 group"
                  >
                    <span className="text-[#ffb800] group-hover:text-[#00fff5] transition-colors">$</span>
                    ./send.sh
                    <span className="terminal-cursor" />
                  </button>
                </form>
              )}
            </div>
            </div>
          </TerminalWindow>
        </motion.div>
      </div>
    </section>
  )
}

// Footer
const Footer = () => (
  <footer className="py-4 px-4 border-t border-[#00fff5]/10">
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Zap className="text-[#00fff5]" size={16} />
          <span className="text-gray-600 text-xs">
            kim@portfolio <span className="text-gray-700">~</span> © {new Date().getFullYear()}
          </span>
        </div>
        <div className="text-gray-700 text-xs">Built with n8n & passion</div>
      </div>
    </div>
  </footer>
)

// Main App
function App() {
  const [showBoot, setShowBoot] = useState(true)

  const handleBootComplete = () => {
    setShowBoot(false)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Create floating particles
  useEffect(() => {
    const particleContainer = document.getElementById('particle-container')
    if (particleContainer) {
      for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div')
        particle.className = 'particle'
        particle.style.left = `${Math.random() * 100}%`
        particle.style.top = `${Math.random() * 100 + 100}%`
        particle.style.animationDelay = `${Math.random() * 20}s`
        particleContainer.appendChild(particle)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative">
      <div className="gradient-bg" />
      <div id="particle-container" />
      <AnimatePresence mode="wait">
        {showBoot && <BootLoader key="boot-loader" onComplete={handleBootComplete} />}
      </AnimatePresence>
      <Header />
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
