import { motion } from 'framer-motion'
import { Linkedin, Heart, Zap } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          {/* Logo & Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Zap className="text-primary" size={20} />
            </div>
            <div>
              <div className="text-white font-bold">Kim Joshua Gudez</div>
              <div className="text-xs text-gray-500">AI Automation Specialist</div>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <a href="#hero" className="hover:text-primary transition-colors">Home</a>
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#skills" className="hover:text-primary transition-colors">Skills</a>
            <a href="#portfolio" className="hover:text-primary transition-colors">Projects</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </div>

          {/* Social & Copyright */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/kim-joshua-gudez-331407386/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:bg-primary/10 transition-colors"
            >
              <Linkedin size={18} className="text-gray-400 hover:text-primary" />
            </a>

            <div className="text-sm text-gray-500">
              © {currentYear} All rights reserved
            </div>
          </div>
        </motion.div>

        {/* Made with love */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-center"
        >
          <p className="text-sm text-gray-600 flex items-center justify-center gap-1">
            Built with <Heart size={14} className="text-red-500" /> and lots of <Zap size={14} className="text-primary" /> automation
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
