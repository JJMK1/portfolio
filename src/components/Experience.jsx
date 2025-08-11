import React from 'react'
import { motion } from 'framer-motion'
import { Briefcase, GraduationCap, Calendar, MapPin } from 'lucide-react'

const Experience = () => {
  const experience = [
    {
      type: 'work',
      title: 'Software Developer / OSINT',
      company: 'Armed Forces of the Philippines',
      location: 'Quezon City',
      period: 'May 2024 – Present',
      description: [
        'Conduct OSINT investigations to gather, analyze, and report actionable insights',
        'Design, develop, and maintain desktop/web apps with database integration',
        'Lead small teams, optimize delivery using project management tools'
      ]
    },
    {
      type: 'work',
      title: 'Software Developer Intern',
      company: 'Armed Forces of the Philippines',
      location: 'Quezon City',
      period: 'Feb 2024 – May 2024',
      description: [
        'Participated in code reviews and implemented feedback',
        'Built RESTful APIs for seamless data integration',
        'Implemented security measures to enhance application protection'
      ]
    }
  ]

  const education = [
    {
      type: 'education',
      title: 'B.S. in Information Technology',
      company: 'STI College – Cubao',
      location: 'Quezon City',
      period: 'Graduated 2024',
      description: [
        'Comprehensive study of software development, database management, and IT infrastructure',
        'Hands-on experience with modern programming languages and development tools',
        'Project-based learning focusing on real-world applications'
      ]
    }
  ]

  const allItems = [...experience, ...education]

  return (
    <section id="experience" className="section-padding bg-gradient-section">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Experience & <span className="gradient-text">Education</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            My professional journey and academic background
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-purple-500 to-primary-500"></div>

            {/* Timeline Items */}
            <div className="space-y-12">
              {allItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="timeline-item"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-6 top-0 w-4 h-4 bg-primary-500 rounded-full border-4 border-dark-800 shadow-lg"></div>

                  {/* Content Card */}
                  <div className="card card-hover ml-12">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          item.type === 'work' 
                            ? 'bg-primary-500/20 text-primary-400' 
                            : 'bg-purple-500/20 text-purple-400'
                        }`}>
                          {item.type === 'work' ? <Briefcase size={20} /> : <GraduationCap size={20} />}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{item.title}</h3>
                          <p className="text-primary-400 font-medium">{item.company}</p>
                        </div>
                      </div>
                    </div>

                    {/* Meta Information */}
                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{item.period}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>{item.location}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      {item.description.map((desc, descIndex) => (
                        <motion.p
                          key={descIndex}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: descIndex * 0.1 }}
                          viewport={{ once: true }}
                          className="text-gray-300 leading-relaxed flex items-start gap-2"
                        >
                          <span className="w-1.5 h-1.5 bg-primary-400 rounded-full mt-2 flex-shrink-0"></span>
                          {desc}
                        </motion.p>
                      ))}
                    </div>

                    {/* Type Badge */}
                    <div className="mt-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        item.type === 'work' 
                          ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30' 
                          : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      }`}>
                        {item.type === 'work' ? 'Work Experience' : 'Education'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
