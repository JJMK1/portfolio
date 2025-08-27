import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Award, Calendar, X } from "lucide-react";
import Modal from "react-modal";
import { Parallax } from "../components/SmoothScroll";

Modal.setAppElement("#root");

const Certifications = () => {
  // ===== CONFIG =====
  const ENABLE_SWIPE = true; // <- turn swipe on/off
  const ARROWS_OUTSIDE_MOBILE = true; // <- nudge arrows outside the card area on mobile

  const certifications = [
    {
      title: "Introduction to Software, Programming, and Databases",
      issuer: "Professional Certification",
      year: "2025",
      category: "Software Development",
      image: "/assets/CERTIFICATE_INTRODUCTION_TO_SOFTWARE.jpeg",
    },
    {
      title: "Introduction to Computers and Operating Systems and Security",
      issuer: "Professional Certification",
      year: "2025",
      category: "IT Fundamentals",
      image: "/assets/CERTIFICATE_INTRODUCTION_TO_COMPUTER.jpeg",
    },
    {
      title: "Introduction to Hardware and Operating Systems",
      issuer: "Professional Certification",
      year: "2025",
      category: "Hardware & OS",
      image: "/assets/CERTIFICATE_INTRODUCTION_TO_HARDWARE.jpeg",
    },
    {
      title: "AWS Cloud Practitioner",
      issuer: "Amazon Web Services",
      year: "2025",
      category: "Cloud Computing",
      image: "/assets/CERTIFICATE_AWS.jpeg",
    },
    {
      title: "Database Oracle and Network Foundations",
      issuer: "Oracle",
      year: "2022",
      category: "Database & Networking",
      image: "/assets/CERTIFICATE_DATABASE.jpeg",
    },
    {
      title: "Network Foundations",
      issuer: "Huawei",
      year: "2022",
      category: "Networking",
      image: "/assets/CERTIFICATE_NETWORK.jpeg",
    },
    {
      title: "SAP Business One",
      issuer: "SAP",
      year: "2023",
      category: "Enterprise Software",
    },
    {
      title: "Open-Source Intelligence Training",
      issuer: "Armed Forces of the Philippines",
      year: "2024",
      category: "OSINT",
    },
    {
      title: "On-the-Job Training",
      issuer: "Armed Forces of the Philippines",
      year: "2024",
      category: "Professional Training",
    },
  ];

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // === State for hamburger / sheet ===
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // === Functions ===
  const openSheet = () => setIsSheetOpen(true);
  const closeSheet = () => setIsSheetOpen(false);
  const toggleSheet = () => setIsSheetOpen((prev) => !prev);

  // === Optional: close sheet with ESC key ===
  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === "Escape") setIsSheetOpen(false);
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  // responsive page size
  const [perPage, setPerPage] = useState(3);
  const resolvePerPage = useCallback(() => {
    const w = window.innerWidth;
    if (w < 640) return 1;
    if (w < 1024) return 2;
    return 3;
  }, []);
  useEffect(() => {
    const handler = () => setPerPage(resolvePerPage());
    handler();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [resolvePerPage]);

  // carousel index
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = Math.max(0, certifications.length - perPage);

  const openModal = (image) => {
    if (image) {
      setSelectedImage(image);
      setModalIsOpen(true);
    }
  };
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  const nextCert = () =>
    setCurrentIndex((p) => Math.min(p + perPage, maxIndex));
  const prevCert = () => setCurrentIndex((p) => Math.max(p - perPage, 0));

  const getCategoryColor = (category) => {
    const colors = {
      "Software Development":
        "bg-primary-500/20 text-primary-400 border-primary-500/30",
      "IT Fundamentals": "bg-blue-500/20 text-blue-400 border-blue-500/30",
      "Hardware & OS": "bg-green-500/20 text-green-400 border-green-500/30",
      "Cloud Computing":
        "bg-purple-500/20 text-purple-400 border-purple-500/30",
      "Enterprise Software":
        "bg-orange-500/20 text-orange-400 border-orange-500/30",
      "Database & Networking": "bg-red-500/20 text-red-400 border-red-500/30",
      OSINT: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
      "Professional Training":
        "bg-teal-500/20 text-teal-400 border-teal-500/30",
    };
    return (
      colors[category] || "bg-teal-500/20 text-teal-400 border-teal-500/30"
    );
  };

  // keyboard nav
  const handleKey = useCallback(
    (e) => {
      if (modalIsOpen) {
        if (e.key === "Escape") closeModal();
      } else {
        if (e.key === "ArrowRight") nextCert();
        if (e.key === "ArrowLeft") prevCert();
      }
    },
    [modalIsOpen, perPage, maxIndex]
  );
  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  // ===== swipe (optional) =====
  const touchStartX = useRef(null);
  const onTouchStart = (e) => {
    if (!ENABLE_SWIPE) return;
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (!ENABLE_SWIPE || touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) dx < 0 ? nextCert() : prevCert(); // 40px threshold
    touchStartX.current = null;
  };

  const visible = certifications.slice(currentIndex, currentIndex + perPage);

  // arrow positions (outside on mobile if enabled)
  const leftPos = ARROWS_OUTSIDE_MOBILE ? "-left-1 sm:left-2" : "left-2";
  const rightPos = ARROWS_OUTSIDE_MOBILE ? "-right-1 sm:right-2" : "right-2";

  return (
    <section id="certifications" className="section-padding bg-dark-800">
      <div className="container-custom">
        <Parallax speed={1.06}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.25 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="gradient-text">Certifications</span> &amp;
              Training
            </h2>
          </motion.div>
        </Parallax>

        <Parallax speed={1.0}>
          {/* IMPORTANT: no overflow-hidden here so arrows can sit outside on mobile */}
          <div className="relative">
            {/* subtle side fades */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-dark-800 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-dark-800 to-transparent z-10" />

            {/* ARROWS */}
            <button
              onClick={prevCert}
              aria-label="Previous"
              disabled={currentIndex === 0}
              className={`absolute ${leftPos} top-1/2 -translate-y-1/2 z-20
              w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center
              bg-gradient-to-br from-primary-500 to-purple-500
              border border-primary-400/50 shadow-lg
              text-white text-xl font-bold
              hover:from-primary-400 hover:to-purple-400
              active:scale-95 transition
              ${currentIndex === 0 ? "opacity-40 cursor-not-allowed" : ""}`}
            >
              ‹
            </button>

            <button
              onClick={nextCert}
              aria-label="Next"
              disabled={currentIndex === maxIndex}
              className={`absolute ${rightPos} top-1/2 -translate-y-1/2 z-20
              w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center
              bg-gradient-to-br from-primary-500 to-purple-500
              border border-primary-400/50 shadow-lg
              text-white text-xl font-bold
              hover:from-primary-400 hover:to-purple-400
              active:scale-95 transition
              ${
                currentIndex === maxIndex ? "opacity-40 cursor-not-allowed" : ""
              }`}
            >
              ›
            </button>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.2 }}
              className="relative"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <div className="flex justify-center gap-4 md:gap-6 px-10 md:px-12">
                {visible.map((cert, idx) => (
                  <Parallax
                    key={`${cert.title}-${idx}`}
                    speed={1.03 + idx * 0.02}
                    lag={0.08 + idx * 0.03}
                    as="div"
                  >
                    <motion.div
                      className="card group hover:scale-105 transition-all duration-300 
                                 mx-auto w-72 h-[420px] md:w-80 md:h-[440px] 
                                 border-2 rounded-lg cursor-pointer 
                                 flex flex-col justify-between"
                      onClick={() => openModal(cert.image)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="flex items-center justify-center w-16 h-16 bg-primary-500/20 rounded-full mx-auto mt-6 group-hover:bg-primary-500/30 transition-colors duration-300">
                        <Award className="text-primary-400" size={28} />
                      </div>

                      <div className="flex-1 flex flex-col items-center text-center px-4 mt-4 space-y-3 overflow-hidden">
                        <h3 className="text-lg font-semibold text-white leading-tight line-clamp-3">
                          {cert.title}
                        </h3>
                        <p className="text-primary-400 font-medium text-sm">
                          {cert.issuer}
                        </p>
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

                      <div className="pb-5">
                        {cert.image ? (
                          <p className="text-xs text-gray-400/80 mt-2 text-center">
                            Click to preview
                          </p>
                        ) : (
                          <p className="text-xs text-gray-500/70 mt-2 italic text-center">
                            No image attached
                          </p>
                        )}
                      </div>
                    </motion.div>
                  </Parallax>
                ))}
              </div>
            </motion.div>
          </div>
        </Parallax>

        {/* Modal */}
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
          <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/35 to-transparent z-30" />
          <button
            onClick={closeModal}
            aria-label="Close"
            className="absolute top-3 right-3 z-40 inline-flex items-center justify-center
             w-10 h-10 rounded-full 
             bg-gradient-to-br from-primary-500 to-purple-500
             hover:from-primary-400 hover:to-purple-400
             border border-primary-400/50
             text-white shadow-md hover:shadow-lg
             backdrop-blur-md transition-all duration-300
             focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400/60"
          >
            <X size={20} strokeWidth={2.2} />
          </button>

          <div className="relative z-10 h-full w-full p-4 md:p-6 flex items-center justify-center">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Certification"
                loading="lazy"
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            ) : (
              <div className="text-center text-gray-400">
                No image available
              </div>
            )}
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/25 to-transparent z-20" />
        </Modal>
      </div>
    </section>
  );
};

export default Certifications;
