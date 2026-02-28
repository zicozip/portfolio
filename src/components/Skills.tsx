import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Workflow, Globe, Briefcase, Code2, BadgeCheck, Clock, TrendingUp, Shield } from 'lucide-react'

const Skills = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const skillCategories = [
    {
      title: "n8n Workflow",
      icon: <Workflow size={24} />,
      skills: ["Workflow Design", "Node Development", "Error Handling", "Performance Tuning"],
      color: "from-primary/30 to-green-600/30"
    },
    {
      title: "Integrations",
      icon: <Globe size={24} />,
      skills: ["REST APIs", "Webhooks", "Database", "Cloud Services"],
      color: "from-blue-500/30 to-cyan-500/30"
    },
    {
      title: "Business Apps",
      icon: <Briefcase size={24} />,
      skills: ["CRM Systems", "Project Mgmt", "Email Platforms", "Finance Tools"],
      color: "from-purple-500/30 to-pink-500/30"
    },
    {
      title: "Programming",
      icon: <Code2 size={24} />,
      skills: ["JavaScript", "SQL", "JSON/XML", "API Docs"],
      color: "from-orange-500/30 to-red-500/30"
    }
  ]

  const n8nNodes = [
    "HTTP Request", "Webhook", "Gmail", "Google Drive", "Google Sheets",
    "Slack", "Asana", "Notion", "Airtable", "Salesforce", "HubSpot",
    "Mailchimp", "Xero", "MySQL", "PostgreSQL", "OpenAI", "Microsoft 365"
  ]

  const achievements = [
    { icon: <BadgeCheck size={20} />, value: "50+", label: "Workflows Created" },
    { icon: <Clock size={20} />, value: "24/7", label: "Monitoring" },
    { icon: <TrendingUp size={20} />, value: "95%", label: "Success Rate" },
    { icon: <Shield size={20} />, value: "100%", label: "Client Satisfaction" }
  ]

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
    <section id="skills" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-dark-950/50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="text-primary text-sm font-medium uppercase tracking-wider">Skills & Expertise</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
              Mastery in <span className="gradient-text">Automation</span>
            </h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Comprehensive expertise spanning workflow design, integrations, and business process optimization
            </p>
          </motion.div>

          {/* Bento Grid - Skill Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {skillCategories.map((category, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4`}>
                  <div className="text-white">{category.icon}</div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{category.title}</h3>
                <ul className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <li key={skillIndex} className="text-sm text-gray-400 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* n8n Expertise - Large Bento Card */}
          <motion.div
            variants={itemVariants}
            className="glass rounded-3xl p-8 mb-12"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Workflow className="text-primary" size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">n8n Workflow Mastery</h3>
                  <p className="text-gray-400">Extensive experience with 30+ platforms and integrations</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-primary font-medium">Expert Level</span>
              </div>
            </div>

            {/* Node Tags */}
            <div className="flex flex-wrap gap-2">
              {n8nNodes.map((node, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: index * 0.03 }}
                  className="px-3 py-1.5 bg-dark-800/50 hover:bg-primary/10 text-gray-300 hover:text-primary rounded-lg text-sm transition-colors cursor-default"
                >
                  {node}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Achievements - Horizontal Bento */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="glass rounded-2xl p-6 text-center hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <div className="text-primary">{achievement.icon}</div>
                </div>
                <div className="text-3xl font-bold text-white mb-1">{achievement.value}</div>
                <div className="text-sm text-gray-400">{achievement.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
