import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Skills: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const skillCategories = [
    {
      title: "AI Automation Platform",
      skills: [
        { name: "Workflow Design & Architecture", level: 95 },
        { name: "Node Development & Customization", level: 90 },
        { name: "Error Handling & Debugging", level: 95 },
        { name: "Performance Optimization", level: 88 }
      ]
    },
    {
      title: "Integration & APIs",
      skills: [
        { name: "REST API Integration", level: 95 },
        { name: "Webhook Configuration", level: 92 },
        { name: "Database Connections", level: 90 },
        { name: "Cloud Service Integration", level: 88 }
      ]
    },
    {
      title: "Business Applications",
      skills: [
        { name: "CRM Systems (Salesforce, HubSpot)", level: 92 },
        { name: "Project Management (Asana, Trello)", level: 95 },
        { name: "Email & Communication", level: 90 },
        { name: "Financial Systems (Xero, QuickBooks)", level: 85 }
      ]
    },
    {
      title: "Programming & Scripting",
      skills: [
        { name: "JavaScript", level: 90 },
        { name: "SQL", level: 88 },
        { name: "JSON/XML Processing", level: 95 },
        { name: "API Documentation", level: 85 }
      ]
    }
  ];

  const n8nNodes = [
    "HTTP Request", "Webhook", "Gmail", "Google Drive", "Google Sheets",
    "Slack", "Discord", "Asana", "Trello", "Notion", "Airtable",
    "Salesforce", "HubSpot", "Mailchimp", "Xero", "QuickBooks",
    "MySQL", "PostgreSQL", "MongoDB", "Redis", "FTP", "SSH",
    "OpenAI", "Microsoft Office 365", "Dropbox", "AWS", "Azure"
  ];

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
    <section id="skills" className="py-20 bg-gray-900" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Skills & Expertise</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive automation expertise spanning workflow design, integrations, 
              and business process optimization.
            </p>
          </motion.div>

          {/* Skill Categories */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                variants={itemVariants}
                className="bg-gray-800 rounded-xl p-6"
              >
                <h3 className="text-xl font-bold text-white mb-6">{category.title}</h3>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300">{skill.name}</span>
                        <span className="text-green-400 font-semibold">{skill.level}%</span>
                      </div>
                      <div className="bg-gray-700 rounded-full h-2">
                        <motion.div
                          className="bg-green-400 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ duration: 1, delay: categoryIndex * 0.2 + skillIndex * 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* n8n Nodes Expertise */}
          <motion.div variants={itemVariants} className="bg-gray-800 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Automation Workflow Mastery</h3>
            <p className="text-gray-300 text-center mb-8">
              Extensive experience with 30+ platforms and integrations
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {n8nNodes.map((node, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-700 hover:bg-green-500/20 text-gray-300 hover:text-green-400 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-center"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  {node}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certifications & Achievements */}
          <motion.div variants={itemVariants} className="mt-16">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Achievements & Certifications</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">50+</div>
                <div className="text-white font-semibold mb-2">Workflows Created</div>
                <div className="text-gray-300 text-sm">Successfully deployed automation solutions</div>
              </div>
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">95%</div>
                <div className="text-white font-semibold mb-2">Success Rate</div>
                <div className="text-gray-300 text-sm">Automation implementations working flawlessly</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">24/7</div>
                <div className="text-white font-semibold mb-2">Monitoring</div>
                <div className="text-gray-300 text-sm">Continuous workflow monitoring & optimization</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;