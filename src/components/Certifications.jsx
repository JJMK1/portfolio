import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar, X } from 'lucide-react'; // Import the X icon for the close button
import Modal from 'react-modal';

// Initialize react-modal app element
Modal.setAppElement('#root');

const Certifications = () => {
  const certifications = [
    {
      title: 'Introduction to Software, Programming, and Databases',
      issuer: 'Professional Certification',
      year: '2025',
      category: 'Software Development',
      image: '/assets/CERTIFICATE_INTRODUCTION_TO_SOFTWARE.jpeg', // Image path
    },
    {
      title: 'Introduction to Computers and Operating Systems and Security',
      issuer: 'Professional Certification',
      year: '2025',
      category: 'IT Fundamentals',
      image: '/assets/CERTIFICATE_INTRODUCTION_TO_COMPUTER.jpeg', // Image path
    },
    {
      title: 'Introduction to Hardware and Operating Systems',
      issuer: 'Professional Certification',
      year: '2025',
      category: 'Hardware & OS',
      image: '/assets/CERTIFICATE_INTRODUCTION_TO_HARDWARE.jpeg', // Image path
    },
    {
      title: 'AWS Cloud Practitioner',
      issuer: 'Amazon Web Services',
      year: '2025',
      category: 'Cloud Computing',
      image: '/assets/CERTIFICATE_AWS.jpeg', // Image path
    },
    {
      title: 'Database Oracle and Network Foundations',
      issuer: 'Oracle',
      year: '2022',
      category: 'Database & Networking',
      image: '/assets/CERTIFICATE_DATABASE.jpeg', // Image path
    },
    {
      title: 'Network Foundations',
      issuer: 'Huawei',
      year: '2022',
      category: 'Networking',
      image: '/assets/CERTIFICATE_NETWORK.jpeg', // Image path
    },
    {
      title: 'SAP Business One',
      issuer: 'SAP',
      year: '2023',
      category: 'Enterprise Software',
    },
    {
      title: 'Open-Source Intelligence Training',
      issuer: 'Armed Forces of the Philippines',
      year: '2024',
      category: 'OSINT',
    },
    {
      title: 'On-the-Job Training',
      issuer: 'Armed Forces of the Philippines',
      year: '2024',
      category: 'Professional Training',
    }
  ];

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0); // Index to track the current certificate
  const [selectedImageIndex, setSelectedImageIndex] = useState(null); // Index to track which image is visible

  // Open the modal with the selected image
  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  // Show the image when clicked (only one image at a time)
  const handleImageClick = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  // Navigate to the next set of certifications (3 at a time)
  const nextCert = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 3, certifications.length - 1));
  };

  // Navigate to the previous set of certifications (3 at a time)
  const prevCert = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 3, 0));
  };

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
    };
    return colors[category] || colors['Professional Training'];
  };

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

        {/* Carousel with Arrow Navigation */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="w-full flex justify-between items-center">
              <button onClick={prevCert} className="text-white bg-primary-500/30 p-2 ml-10 mr-10 rounded-full hover:bg-primary-500/50 transition-colors">
                &lt;
              </button>

              {/* Display 3 Certifications */}
              <div className="flex justify-center space-x-6">
                {certifications.slice(currentIndex, currentIndex + 3).map((cert, index) => (
                  <motion.div 
                    key={index} 
                    className="card group hover:scale-110 transition-all duration-300 mx-auto w-full sm:w-72 md:w-80 border-2  rounded-lg" 
                    onClick={() => handleImageClick(cert.image)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="flex items-center justify-center w-16 h-16 bg-primary-500/20 rounded-full mx-auto mb-4 group-hover:bg-primary-500/30 transition-colors duration-300">
                      <Award className="text-primary-400" size={28} />
                    </div>
                
                    {/* Content */}
                    <div className="text-center space-y-3">
                      <h3 className="text-lg font-semibold text-white leading-tight">
                        {cert.title}
                      </h3>
                
                      <p className="text-primary-400 font-medium text-sm">{cert.issuer}</p>
                
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

              <button onClick={nextCert} className="text-white bg-primary-500/30 p-2 ml-10 rounded-full hover:bg-primary-500/50 transition-colors">
                &gt;
              </button>
            </div>
          </motion.div>
        </div>

        {/* Modal-style image display */}
        {modalIsOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-4xl mx-auto">
              <button
                className="absolute top-4 right-4 text-primary-500 hover:text-primary-400"
                onClick={closeModal}
              >
                <X size={24} /> {/* X icon from lucide-react */}
              </button>
              <img
                src={selectedImage}
                alt="Certification"
                className="max-w-full max-h-[80vh] object-contain"
              />
            </div>
          </div>
        )}

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
  );
};

export default Certifications;
