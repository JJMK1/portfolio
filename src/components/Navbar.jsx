import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useSmoother } from "./SmoothScroll"; // GSAP ScrollSmoother context
import GradientText from "./GradientText";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  // ScrollSmoother ref from context
  const smootherRef = useSmoother();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Certifications", href: "#certifications" },
    { name: "Contact", href: "#contact" },
  ];

  // Use GSAP ScrollSmoother: scrollTo(targetEl, smooth, offset)
  const scrollToSection = useCallback(
    (href) => {
      const el = document.querySelector(href);
      if (!el) {
        console.warn(
          `Target not found for ${href}. Ensure <section id="${href.slice(
            1
          )}"> exists inside #smooth-content.`
        );
        return;
      }

      const navH = navRef.current?.offsetHeight ?? 80;
      const smoother = smootherRef?.current;

      if (smoother && typeof smoother.scrollTo === "function") {
        // Negative offset leaves room for the fixed navbar
        smoother.scrollTo(el, true, -navH);
      } else {
        // Fallback if smoother isn't ready
        const y = window.scrollY + el.getBoundingClientRect().top - navH;
        window.scrollTo({ top: y, behavior: "smooth" });
      }

      // Keep the hash for deep-links/refresh
      if (history.pushState) {
        history.pushState(null, "", href);
      } else {
        window.location.hash = href;
      }

      setIsOpen(false); // close mobile menu after click
    },
    [smootherRef]
  );

  // Hash on load (e.g., visiting /#projects)
  useEffect(() => {
    const { hash } = window.location;
    if (hash) {
      setTimeout(() => scrollToSection(hash), 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-dark-900/95 backdrop-blur-md border-b border-dark-700/50 shadow-xl"
          : "bg-transparent"
      }`}
      aria-label="Primary"
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center"
          >
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#home");
              }}
              className="hover:scale-105 transition-transform duration-300"
            >
              <GradientText
                colors={["#c084fc", "#ffffff", "#a855f7", "#ffffff", "#c084fc"]}
                animationSpeed={3}
                className="text-2xl md:text-3xl font-bold"
              >
                JT
              </GradientText>
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden md:flex items-center space-x-8"
          >
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="nav-link text-sm font-medium"
              >
                {item.name}
              </motion.a>
            ))}
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            onClick={() => setIsOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg bg-dark-800/50 border border-dark-600/50 hover:bg-dark-700/50 transition-colors duration-300"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? (
              <X size={24} className="text-gray-300" />
            ) : (
              <Menu size={24} className="text-gray-300" />
            )}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2 border-t border-dark-700/50">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.href);
                    }}
                    className="block w-full px-4 py-3 text-gray-300 hover:text-primary-400 hover:bg-dark-800/50 rounded-lg transition-all duration-300 font-medium"
                  >
                    {item.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
