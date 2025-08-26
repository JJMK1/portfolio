import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Download } from 'lucide-react'
import { Parallax } from '../components/SmoothScroll' // adjust path if needed

const About = () => {
  return (
    <section id="about" className="section-padding bg-gradient-section">
      <div className="container-custom">
        {/* Title block floats a touch faster */}
        <Parallax speed={1.08}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.25 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              About <span className="gradient-text">Me</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Get to know me better and understand my professional journey
            </p>
          </motion.div>
        </Parallax>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Profile Image: slightly slower (background feel) */}
          <Parallax speed={0.9}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.25 }}
              className="flex justify-center lg:justify-start"
            >
              <div className="relative">
                <img
                  src="/assets/Frame 1.png"
                  alt="Jericho E. Tupaz"
                  className="profile-image w-80 h-80 md:w-96 md:h-96 object-cover"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500/20 to-purple-500/20 blur-xl -z-10 animate-pulse-slow"></div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary-500 rounded-full animate-bounce-slow"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500 rounded-full animate-bounce-slow" style={{ animationDelay: '1s' }}></div>
              </div>
            </motion.div>
          </Parallax>

          {/* Right Column - Content: a bit faster for foreground emphasis */}
          <Parallax speed={1.06} lag={0.1}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.25 }}
              className="space-y-8"
            >
              {/* Bio */}
              <div className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  Motivated IT Professional
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Motivated and career‑driven IT professional with a foundation in programming, web development, and data analysis. Experienced in software development, database management, troubleshooting, and OSINT. Eager to contribute in a fast‑paced IT environment.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  I specialize in creating robust software solutions, conducting thorough OSINT investigations, and leveraging data analysis to drive informed decision-making. My passion lies in developing innovative applications and uncovering valuable insights through open-source intelligence.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-white mb-4">Contact Information</h4>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 text-gray-300 hover:text-primary-400 transition-colors duration-300"
                >
                  <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                    <Mail size={20} className="text-primary-400" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <a href="mailto:jerichoescorial16@gmail.com" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">
                      jerichoescorial16@gmail.com
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 text-gray-300 hover:text-primary-400 transition-colors duration-300"
                >
                  <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                    <Phone size={20} className="text-primary-400" />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <a href="tel:09214051021" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">
                      +63 921 405 1021
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 text-gray-300 hover:text-primary-400 transition-colors duration-300"
                >
                  <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                    <MapPin size={20} className="text-primary-400" />
                  </div>
                  <div>
                    <p className="font-medium">Location</p>
                    <span className="text-gray-400">
                      Pook Libis, U.P. Campus, Diliman, Quezon City
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Download Resume Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="pt-4"
              >
                <a
                  href="/assets/Resume_Tupaz, Jericho.pdf"
                  download
                  className="btn-outline inline-flex items-center gap-2 group"
                >
                  <Download size={20} className="group-hover:scale-110 transition-transform duration-300" />
                  Download Full Resume
                </a>
              </motion.div>
            </motion.div>
          </Parallax>
        </div>
      </div>
    </section>
  )
}

export default About
