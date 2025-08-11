import React from 'react'
import { motion } from 'framer-motion'
import { Award, Calendar } from 'lucide-react'

const Certifications = () => {
  const certifications = [
    {
      title: 'Introduction to Software, Programming, and Databases',
      issuer: 'Professional Certification',
      year: '2025',
      category: 'Software Development'
    },
    {
      title: 'Introduction to Computers and Operating Systems and Security',
      issuer: 'Professional Certification',
      year: '2025',
      category: 'IT Fundamentals'
    },
    {
      title: 'Introduction to Hardware and Operating Systems',
      issuer: 'Professional Certification',
      year: '2025',
      category: 'Hardware & OS'
    },
    {
      title: 'AWS Cloud Practitioner',
      issuer: 'Amazon Web Services',
      year: '2025',
      category: 'Cloud Computing'
    },
    {
      title: 'SAP Business One',
      issuer: 'SAP',
      year: '2023',
      category: 'Enterprise Software'
    },
    {
      title: 'Database Oracle and Network Foundations',
      issuer: 'Oracle',
      year: '2022',
      category: 'Database & Networking'
    },
    {
      title: 'Armed Forces of the Philippines: Open-Source Intelligence Training',
      issuer: 'Armed Forces of the Philippines',
      year: '2024',
      category: 'OSINT'
    },
    {
      title: 'Armed Forces of the Philippines: On-the-Job Training',
      issuer: 'Armed Forces of the Philippines',
      year: '2024',
      category: 'Professional Training'
    }
  ]

  const getCategoryColor = (category) => {
    const colors = {
      'Software Development': 'bg-primary-500/20 text-primary-400 border-primary-500/30',
      'IT Fundamentals': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Hardware & OS': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Cloud Computing': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'Enterprise Software': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'Database & Networking': 'bg-red-500/20 text-red-400 border-red-500/30',
      'OSINT': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
      'Professional Training': 'bg-teal-500/20 text-teal-400 border-teal-500/30'
    }
    return colors[category] || colors['Professional Training']
  }

  return (
    <section id="certifications" className="section-padding bg-dark-800">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="gradient-text">Certifications</span> & Training
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card group hover:scale-105 transition-transform duration-300"
            >
              {/* Certificate Icon */}
              <div className="flex items-center justify-center w-16 h-16 bg-primary-500/20 rounded-full mx-auto mb-4 group-hover:bg-primary-500/30 transition-colors duration-300">
                <Award className="text-primary-400" size={28} />
              </div>

              {/* Content */}
              <div className="text-center space-y-3">
                <h3 className="text-lg font-semibold text-white leading-tight">
                  {cert.title}
                </h3>
                
                <p className="text-primary-400 font-medium text-sm">
                  {cert.issuer}
                </p>

                <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
                  <Calendar size={14} />
                  <span>{cert.year}</span>
                </div>

                <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(cert.category)}`}>
                  {cert.category}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="card max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-white mb-4">
              Continuous Professional Development
            </h3>
            <p className="text-gray-300 leading-relaxed">
              I believe in lifelong learning and continuously expanding my skill set. 
              These certifications represent my commitment to professional growth and 
              staying current with industry best practices. From foundational IT concepts 
              to specialized areas like OSINT and cloud computing, I'm dedicated to 
              maintaining expertise across diverse technology domains.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Certifications
