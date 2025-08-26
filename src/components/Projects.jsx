import React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, Eye } from 'lucide-react'
import { Parallax, useSmoother } from '../components/SmoothScroll' // ⬅️ adjust path if needed

const Projects = () => {
  const smootherRef = useSmoother()
  const scrollTo = (hash) => {
    const target = document.querySelector(hash)
    if (!target) return
    const nav = document.querySelector('nav')
    const navH = nav?.offsetHeight ?? 80
    const y = target.getBoundingClientRect().top + window.scrollY - navH
    const smoother = smootherRef?.current
    smoother ? smoother.scrollTo(y, true) : window.scrollTo({ top: y, behavior: 'smooth' })
  }

  const projects = [
    {
      title: 'OSINT Dashboard',
      description: 'Internal tooling concept for data ingestion, visualization, and alerting. Provides comprehensive OSINT investigation capabilities with real-time data processing and threat intelligence integration.',
      image: '/assets/project-osint.jpg',
      tech: ['React', 'Node.js', 'MongoDB', 'D3.js', 'Socket.io'],
      liveDemo: '#',
      sourceCode: '#',
      category: 'OSINT'
    },
    {
      title: 'RESTful API Service',
      description: 'Robust backend service with authentication, CRUD operations, comprehensive logging, and automated testing. Built with modern best practices for scalability and security.',
      image: '/assets/project-api.jpg',
      tech: ['Node.js', 'Express', 'PostgreSQL', 'JWT', 'Jest'],
      liveDemo: '#',
      sourceCode: '#',
      category: 'Backend'
    },
    {
      title: 'Portfolio Builder',
      description: 'React + Tailwind components library for developer portfolios. Features modern design patterns, responsive layouts, and customizable themes for professional presentation.',
      image: '/assets/project-portfolio.jpg',
      tech: ['React', 'TailwindCSS', 'Framer Motion', 'Vite'],
      liveDemo: '#',
      sourceCode: '#',
      category: 'Frontend'
    },
    {
      title: 'Data Analysis Platform',
      description: 'Comprehensive data analysis and visualization platform with advanced analytics capabilities, interactive dashboards, and automated reporting features.',
      image: '/assets/project-data.jpg',
      tech: ['Python', 'Pandas', 'Plotly', 'FastAPI', 'Redis'],
      liveDemo: '#',
      sourceCode: '#',
      category: 'Data Science'
    },
    {
      title: 'Security Monitoring Tool',
      description: 'Real-time security monitoring and threat detection system with automated alerts, incident response workflows, and comprehensive audit trails.',
      image: '/assets/project-security.jpg',
      tech: ['Python', 'Elasticsearch', 'Kibana', 'Docker', 'Kubernetes'],
      liveDemo: '#',
      sourceCode: '#',
      category: 'Cybersecurity'
    },
    {
      title: 'E-commerce Platform',
      description: 'Full-stack e-commerce solution with user authentication, payment processing, inventory management, and admin dashboard for complete business operations.',
      image: '/assets/project-ecommerce.jpg',
      tech: ['React', 'Node.js', 'Stripe', 'MongoDB', 'Redux'],
      liveDemo: '#',
      sourceCode: '#',
      category: 'Full Stack'
    }
  ]

  const getCategoryColor = (category) => {
    const colors = {
      'OSINT': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      'Backend': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      'Frontend': 'bg-green-500/20 text-green-300 border-green-500/30',
      'Data Science': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
      'Cybersecurity': 'bg-red-500/20 text-red-300 border-red-500/30',
      'Full Stack': 'bg-primary-500/20 text-primary-300 border-primary-500/30'
    }
    return colors[category] || colors['Full Stack']
  }

  return (
    <section id="projects" className="section-padding bg-gradient-section">
      <div className="container-custom">
        {/* Title (slightly faster = foreground) */}
        <Parallax speed={1.06}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.25 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A showcase of my recent work and technical capabilities
            </p>
          </motion.div>
        </Parallax>

        {/* Cards grid (neutral) */}
        <Parallax speed={1.0}>
          <div className="grid-cards">
            {projects.map((project, index) => (
              // each card gets a tiny variance for depth and a small lag
              <Parallax key={project.title} speed={1.02 + (index % 3) * 0.02} lag={0.06 + (index % 3) * 0.04} as="div">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="card card-hover group"
                >
                  {/* Project Image */}
                  <div className="relative mb-6 overflow-hidden rounded-xl">
                    <div className="w-full h-48 bg-gradient-to-br from-dark-700 to-dark-800 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-primary-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                          <Eye size={24} className="text-primary-400" />
                        </div>
                        <p className="text-gray-400 text-sm">Project Preview</p>
                        <p className="text-gray-500 text-xs">{project.title}</p>
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(project.category)}`}>
                        {project.category}
                      </span>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 w-full">
                        <div className="flex gap-2">
                          <a
                            href={project.liveDemo}
                            target="_blank" rel="noreferrer"
                            className="flex-1 bg-primary-500/20 hover:bg-primary-500/30 text-primary-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            <ExternalLink size={16} />
                            Live Demo
                          </a>
                          <a
                            href={project.sourceCode}
                            target="_blank" rel="noreferrer"
                            className="flex-1 bg-dark-700/50 hover:bg-dark-600/50 text-gray-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            <Github size={16} />
                            Source
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors duration-300">
                      {project.title}
                    </h3>

                    <p className="text-gray-300 leading-relaxed text-sm">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <motion.span
                          key={`${project.title}-${tech}`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: techIndex * 0.05 }}
                          viewport={{ once: true }}
                          className="skill-chip text-xs"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                      <a
                        href={project.liveDemo}
                        target="_blank" rel="noreferrer"
                        className="btn-outline flex-1 flex items-center justify-center gap-2 text-sm py-2"
                      >
                        <ExternalLink size={16} />
                        View Demo
                      </a>
                      <a
                        href={project.sourceCode}
                        target="_blank" rel="noreferrer"
                        className="btn-secondary flex-1 flex items-center justify-center gap-2 text-sm py-2"
                      >
                        <Github size={16} />
                        Source Code
                      </a>
                    </div>
                  </div>
                </motion.div>
              </Parallax>
            ))}
          </div>
        </Parallax>

        {/* Call to Action (smooth-scroll to contact with offset) */}
        <Parallax speed={1.04}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true, amount: 0.25 }}
            className="text-center mt-16"
          >
            <div className="card max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                Interested in Working Together?
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                I&apos;m always open to discussing new opportunities and exciting projects.
                Let&apos;s create something amazing together!
              </p>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollTo('#contact') }}
                className="btn-primary inline-flex items-center gap-2"
              >
                Get In Touch
                <ExternalLink size={20} />
              </a>
            </div>
          </motion.div>
        </Parallax>
      </div>
    </section>
  )
}

export default Projects
