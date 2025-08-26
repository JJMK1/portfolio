import React from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Instagram, Mail, ArrowUp } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ]

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com/JJMK1', color: 'hover:text-gray-300' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/jericho-tupaz-668863269', color: 'hover:text-blue-400' },
    { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/strwbrrybluu', color: 'hover:text-blue-400' },
    { name: 'Email', icon: Mail, href: 'mailto:jerichoescorial16@gmail.com', color: 'hover:text-primary-400' }
  ]

  return (
    <footer className="bg-dark-950 border-t border-dark-800/50">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold gradient-text">JT</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Jericho E. Tupaz
              </h3>
              <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
                Software Developer and OSINT Specialist passionate about creating innovative solutions 
                and uncovering valuable insights through technology and data analysis.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1 }}
                    className={`w-10 h-10 bg-dark-800/50 border border-dark-700/50 rounded-lg flex items-center justify-center text-gray-400 transition-all duration-300 ${social.color}`}
                  >
                    <social.icon size={18} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-white mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-primary-400 transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-white mb-4">
                Contact
              </h4>
              <div className="space-y-2 text-sm">
                <p className="text-gray-400">
                  <span className="text-gray-300 font-medium">Email:</span><br />
                  <a 
                    href="mailto:jerichoescorial16@gmail.com"
                    className="text-primary-400 hover:text-primary-300 transition-colors duration-300"
                  >
                    jerichoescorial16@gmail.com
                  </a>
                </p>
                <p className="text-gray-400">
                  <span className="text-gray-300 font-medium">Phone:</span><br />
                  <a 
                    href="tel:09214051021"
                    className="text-primary-400 hover:text-primary-300 transition-colors duration-300"
                  >
                    +63 921 405 1021
                  </a>
                </p>
                <p className="text-gray-400">
                  <span className="text-gray-300 font-medium">Location:</span><br />
                  Quezon City, Philippines
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-dark-800/50 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-gray-400 text-sm"
            >
              © {currentYear} Jericho E. Tupaz. All rights reserved.
            </motion.p>
            
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              onClick={scrollToTop}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 bg-primary-500/20 border border-primary-500/30 rounded-lg flex items-center justify-center text-primary-400 hover:text-white hover:bg-primary-500/30 transition-all duration-300"
            >
              <ArrowUp size={18} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
