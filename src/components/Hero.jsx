import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download, ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import TextType from "./TextType";

// ⬇️ import the smoother + parallax helpers (adjust path if needed)
import { useSmoother, Parallax } from "./SmoothScroll";

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const getImage = () => {
    if (isClicked) return "/assets/Alden.jpg"; // stay swapped if clicked
    return isHovered ? "/assets/Alden.jpg" : "/assets/Frame 1.png"; // hover preview
  };

  const smootherRef = useSmoother();
  const navRef = useRef(() => document.querySelector("nav")); // best-effort

  const scrollToProjects = () => {
    const target = document.querySelector("#projects");
    if (!target) return;

    const navH = document.querySelector("nav")?.offsetHeight ?? 80;
    const y = target.getBoundingClientRect().top + window.scrollY - navH;

    const smoother = smootherRef?.current;
    if (smoother) {
      smoother.scrollTo(y, true); // smooth scroll
    } else {
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero"
    >
      {/* Enhanced Animated Background */}
      <Parallax speed={0.94} as="div" className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-primary-500/5 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-3xl animate-pulse-slow" />
      </Parallax>

      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <Parallax speed={1.05} lag={0.12} as="div">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left space-y-8"
            >
              {/* Greeting */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-primary-400 font-semibold text-lg tracking-wide"
              >
                <TextType
                  text="Hello, I'm"
                  typingSpeed={50}
                  className="inline-block text-primary-400"
                  textColors={["#C084FC"]}
                />
              </motion.p>

              {/* Name */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
              >
                <TextType
                  text="Jericho E. Tupaz"
                  typingSpeed={130}
                  className="inline-block text-white"
                />
              </motion.h1>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-2xl md:text-3xl font-semibold gradient-text-strong"
              >
                <TextType
                  text="Software Developer / OSINT Specialist"
                  typingSpeed={60}
                  className="inline-block gradient-text-strong"
                  textColors={["#C084FC"]}
                />
              </motion.h2>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed"
              >
                Motivated IT professional specializing in software development,
                OSINT investigations, and data analysis.
              </motion.p>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 text-sm text-gray-400"
              >
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-primary-400" />
                  <span>jerichoescorial16@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-primary-400" />
                  <span>09214051021</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-primary-400" />
                  <span>Quezon City, Philippines</span>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center pt-4"
              >
                <button
                  onClick={scrollToProjects}
                  className="btn-primary flex items-center gap-2 group"
                >
                  View Projects
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </button>

                <a
                  href="/assets/Resume_Tupaz, Jericho.pdf"
                  download
                  className="btn-secondary flex items-center gap-2 group"
                >
                  <Download size={20} />
                  Download Resume
                </a>
              </motion.div>
            </motion.div>
          </Parallax>

          {/* Right Column - Profile Image */}
          <Parallax
            speed={0.98}
            lag={0.06}
            as="div"
            className="flex justify-center lg:justify-end"
          >
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="relative"
                >
                  {/* 👇 Image block with desktop + mobile support */}
                  <img
                    src={getImage()}
                    alt="Jericho E. Tupaz"
                    className="profile-image w-80 h-80 md:w-96 md:h-96 object-cover cursor-pointer transition duration-300"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => setIsClicked(!isClicked)}
                    onTouchStart={() => setIsClicked(!isClicked)} // 👈 mobile/touch toggle
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500/20 to-purple-500/20 blur-xl -z-10 animate-pulse-slow"></div>
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary-500 rounded-full animate-bounce-slow"></div>
                  <div
                    className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500 rounded-full animate-bounce-slow"
                    style={{ animationDelay: "1s" }}
                  ></div>
                </motion.div>
              </div>
            </motion.div>
          </Parallax>
        </div>

        {/* Scroll Indicator */}
        <Parallax speed={1.0} as="div">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-3 bg-primary-400 rounded-full mt-2"
              />
            </div>
          </motion.div>
        </Parallax>
      </div>
    </section>
  );
};

export default Hero;
