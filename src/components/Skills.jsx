import React from 'react'
import { motion } from 'framer-motion'
import { Code, Database, Shield, Monitor, Settings } from 'lucide-react'

const Skills = () => {
  const skillCategories = [
    {
      name: 'Programming',
      icon: Code,
      color: 'primary',
      skills: [
        'Java', 'JavaScript', 'HTML5', 'CSS', 'PHP', 'Python', 
        'VB.NET', 'C++', 'C#', 'React'
      ]
    },
    {
      name: 'IT Support & Tools',
      icon: Settings,
      color: 'purple',
      skills: [
        'PC Troubleshooting', 'Microsoft Office', 'System Administration',
        'Network Configuration', 'Hardware Maintenance'
      ]
    },
    {
      name: 'Data & Database',
      icon: Database,
      color: 'primary',
      skills: [
        'Data Collection', 'Data Visualization', 'Data Analysis', 
        'Database Administration', 'MySQL', 'SQL'
      ]
    },
    {
      name: 'OS & Virtualization',
      icon: Monitor,
      color: 'purple',
      skills: [
        'Linux', 'Shell Scripting', 'Virtual Machines', 'Containerization',
        'System Monitoring'
      ]
    },
    {
      name: 'Cybersecurity',
      icon: Shield,
      color: 'primary',
      skills: [
        'OSINT Investigations', 'Security Analysis', 'Threat Assessment',
        'Digital Forensics', 'Security Tools'
      ]
    }
  ]

  const getColorClasses = (color, isPrimary = false) => {
    if (color === 'primary') {
      return isPrimary 
        ? 'bg-primary-500/20 border-primary-500/30 text-primary-300 hover:bg-primary-500/30' 
        : 'bg-dark-700/80 border-dark-600/50 text-gray-200 hover:border-primary-500/50 hover:bg-primary-500/10 hover:text-primary-300'
    } else {
      return isPrimary 
        ? 'bg-purple-500/20 border-purple-500/30 text-purple-300 hover:bg-purple-500/30' 
        : 'bg-dark-700/80 border-dark-600/50 text-gray-200 hover:border-purple-500/50 hover:bg-purple-500/10 hover:text-purple-300'
    }
  }

  return (
    <section id="skills" className="section-padding bg-gradient-section">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Skills & <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            My technical skills and areas of specialization
          </p>
        </motion.div>

        <div className="space-y-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="card"
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  category.color === 'primary' 
                    ? 'bg-primary-500/20 text-primary-400' 
                    : 'bg-purple-500/20 text-purple-400'
                }`}>
                  <category.icon size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                  <p className="text-gray-400">{category.skills.length} skills</p>
                </div>
              </div>

              {/* Skills Grid */}
              <div className="grid-skills">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: skillIndex * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    className={`skill-chip ${getColorClasses(category.color)} cursor-pointer`}
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="card max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Technical Proficiency
            </h3>
            <p className="text-gray-300 leading-relaxed">
              With expertise spanning software development, data analysis, cybersecurity, and system administration, 
              I bring a comprehensive skill set to tackle complex technical challenges. My experience in OSINT 
              investigations and database management enables me to deliver robust, secure, and scalable solutions.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
