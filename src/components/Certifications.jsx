import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar, X } from 'lucide-react';
import Modal from 'react-modal';
import { Parallax } from '../components/SmoothScroll'; // adjust the path if needed

// React-Modal portal target (outside smoother's transformed content)
Modal.setAppElement('#root');

const Certifications = () => {
  const certifications = [
    { title: 'Introduction to Software, Programming, and Databases', issuer: 'Professional Certification', year: '2025', category: 'Software Development', image: '/assets/CERTIFICATE_INTRODUCTION_TO_SOFTWARE.jpeg' },
    { title: 'Introduction to Computers and Operating Systems and Security', issuer: 'Professional Certification', year: '2025', category: 'IT Fundamentals', image: '/assets/CERTIFICATE_INTRODUCTION_TO_COMPUTER.jpeg' },
    { title: 'Introduction to Hardware and Operating Systems', issuer: 'Professional Certification', year: '2025', category: 'Hardware & OS', image: '/assets/CERTIFICATE_INTRODUCTION_TO_HARDWARE.jpeg' },
    { title: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', year: '2025', category: 'Cloud Computing', image: '/assets/CERTIFICATE_AWS.jpeg' },
    { title: 'Database Oracle and Network Foundations', issuer: 'Oracle', year: '2022', category: 'Database & Networking', image: '/assets/CERTIFICATE_DATABASE.jpeg' },
    { title: 'Network Foundations', issuer: 'Huawei', year: '2022', category: 'Networking', image: '/assets/CERTIFICATE_NETWORK.jpeg' },
    { title: 'SAP Business One', issuer: 'SAP', year: '2023', category: 'Enterprise Software' },
    { title: 'Open-Source Intelligence Training', issuer: 'Armed Forces of the Philippines', year: '2024', category: 'OSINT' },
    { title: 'On-the-Job Training', issuer: 'Armed Forces of the Philippines', year: '2024', category: 'Professional Training' },
  ];

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0); // carousel index

  const openModal = (image) => {
    if (!image) return; // only open if an image exists
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  const nextCert = () => {
    setCurrentIndex((prev) => Math.min(prev + 3, certifications.length - 1));
  };

  const prevCert = () => {
    setCurrentIndex((prev) => Math.max(prev - 3, 0));
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
      'Professional Training': 'bg-teal-500/20 text-teal-400 border-teal-500/30',
    };
    return colors[category] || 'bg-teal-500/20 text-teal-400 border-teal-500/30';
  };

  // Keyboard support for modal & carousel
  const handleKey = useCallback((e) => {
    if (modalIsOpen) {
      if (e.key === 'Escape') closeModal();
    } else {
      if (e.key === 'ArrowRight') nextCert();
      if (e.key === 'ArrowLeft') prevCert();
    }
  }, [modalIsOpen]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  return (
    <section id="certifications" className="section-padding bg-dark-800">
      <div className="container-custom">
        {/* Title block (slightly faster = foreground emphasis) */}
        <Parallax speed={1.06}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.25 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="gradient-text">Certifications</span> & Training
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto" />
          </motion.div>
        </Parallax>

        {/* Carousel row (neutral speed) */}
        <Parallax speed={1.0}>
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.2 }}
              className="text-center"
            >
              <div className="w-full flex justify-between items-center">
                <button
                  onClick={prevCert}
                  className="text-white bg-primary-500/30 p-2 ml-10 mr-10 rounded-full hover:bg-primary-500/50 transition-colors"
                  aria-label="Previous"
                >
                  &lt;
                </button>

                {/* Cards (each with a subtle parallax & lag) */}
                <div className="flex justify-center space-x-6">
                  {certifications.slice(currentIndex, currentIndex + 3).map((cert, idx) => (
                    <Parallax key={`${cert.title}-${idx}`} speed={1.03 + idx * 0.02} lag={0.08 + idx * 0.03} as="div">
                      <motion.div
  className="card group hover:scale-105 transition-all duration-300 
             mx-auto w-72 h-[420px] md:w-80 md:h-[440px] 
             border-2 rounded-lg cursor-pointer 
             flex flex-col justify-between"
  onClick={() => openModal(cert.image)}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  {/* Icon area */}
  <div className="flex items-center justify-center w-16 h-16 bg-primary-500/20 
                  rounded-full mx-auto mt-6 group-hover:bg-primary-500/30 
                  transition-colors duration-300">
    <Award className="text-primary-400" size={28} />
  </div>

  {/* Text + metadata */}
  <div className="flex-1 flex flex-col items-center text-center px-4 mt-4 space-y-3 overflow-hidden">
    <h3 className="text-lg font-semibold text-white leading-tight line-clamp-3">
      {cert.title}
    </h3>

    <p className="text-primary-400 font-medium text-sm">{cert.issuer}</p>

    <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
      <Calendar size={14} />
      <span>{cert.year}</span>
    </div>

    <div
      className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(
        cert.category
      )}`}
    >
      {cert.category}
    </div>
  </div>

  {/* Footer / hint */}
  <div className="pb-5">
    {cert.image ? (
      <p className="text-xs text-gray-400/80 mt-2 text-center">Click to preview</p>
    ) : (
      <p className="text-xs text-gray-500/70 mt-2 italic text-center">No image attached</p>
    )}
  </div>
</motion.div>

                    </Parallax>
                  ))}
                </div>

                <button
                  onClick={nextCert}
                  className="text-white bg-primary-500/30 p-2 ml-10 rounded-full hover:bg-primary-500/50 transition-colors"
                  aria-label="Next"
                >
                  &gt;
                </button>
              </div>
            </motion.div>
          </div>
        </Parallax>

        <Modal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  shouldCloseOnOverlayClick
  overlayClassName="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm"
  className="relative w-[94vw] max-w-3xl h-[82vh] md:h-[85vh]
             bg-[#0B0F1A] text-[#E2E8F0] rounded-2xl border border-white/10
             shadow-2xl overflow-hidden outline-none"
  contentLabel="Certificate preview"
>
  {/* Top overlay bar (subtle gradient) */}
  <div className="pointer-events-none absolute inset-x-0 top-0 h-16
                  bg-gradient-to-b from-black/35 to-transparent z-30" />

  {/* Close button (professional, accessible) */}
  <button
    onClick={closeModal}
    aria-label="Close"
    className="absolute top-3 right-3 z-40
               inline-flex items-center justify-center
               w-10 h-10 rounded-full
               bg-gradient-to-br from-gray-900/80 to-gray-800/70
               hover:from-gray-800 hover:to-gray-700
               border border-white/10 text-white/90 hover:text-white
               shadow-md hover:shadow-lg backdrop-blur-md
               transition-all duration-300
               focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400/60"
  >
    <X size={20} strokeWidth={2.2} />
  </button>

  {/* Content area */}
  <div className="relative z-10 h-full w-full p-4 md:p-6 flex items-center justify-center">
    {selectedImage ? (
      <img
        src={selectedImage}
        alt="Certification"
        loading="lazy"
        className="max-w-full max-h-full object-contain rounded-lg"
      />
    ) : (
      <div className="text-center text-gray-400">No image available</div>
    )}
  </div>

  {/* Subtle bottom fade to help contrast on bright images */}
  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16
                  bg-gradient-to-t from-black/25 to-transparent z-20" />
</Modal>


        {/* Summary (slightly slower = background feel) */}
        <Parallax speed={0.95}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            viewport={{ once: true, amount: 0.25 }}
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
        </Parallax>
      </div>
    </section>
  );
};

export default Certifications;
