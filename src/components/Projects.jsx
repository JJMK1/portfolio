import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Eye } from "lucide-react";
import { Parallax, useSmoother } from "../components/SmoothScroll";
import MarqueeCards from "../components/MarqueeCards";

// Visual constants
const MARQUEE_GAP = 24; // px between cards

const Projects = () => {
  const smootherRef = useSmoother();

  const scrollTo = (hash) => {
    const target = document.querySelector(hash);
    if (!target) return;
    const nav = document.querySelector("nav");
    const navH = nav?.offsetHeight ?? 80;
    const y = target.getBoundingClientRect().top + window.scrollY - navH;
    const smoother = smootherRef?.current;
    smoother
      ? smoother.scrollTo(y, true)
      : window.scrollTo({ top: y, behavior: "smooth" });
  };

  const projects = [
    {
      title: "OSINT Dashboard",
      description:
        "Internal tooling concept for data ingestion, visualization, and alerting. Provides comprehensive OSINT investigation capabilities with real-time data processing and threat intelligence integration.",
      image: "/assets/project-osint.jpg",
      tech: ["React", "Node.js", "MongoDB", "D3.js", "Socket.io"],
      liveDemo: "#",
      sourceCode: "#",
      category: "OSINT",
    },
    {
      title: "RESTful API Service",
      description:
        "Robust backend service with authentication, CRUD operations, comprehensive logging, and automated testing. Built with modern best practices for scalability and security.",
      image: "/assets/project-api.jpg",
      tech: ["Node.js", "Express", "PostgreSQL", "JWT", "Jest"],
      liveDemo: "#",
      sourceCode: "#",
      category: "Backend",
    },
    {
      title: "Portfolio Builder",
      description:
        "React + Tailwind components library for developer portfolios. Features modern design patterns, responsive layouts, and customizable themes for professional presentation.",
      image: "/assets/project-portfolio.jpg",
      tech: ["React", "TailwindCSS", "Framer Motion", "Vite"],
      liveDemo: "#",
      sourceCode: "#",
      category: "Frontend",
    },
    {
      title: "Data Analysis Platform",
      description:
        "Comprehensive data analysis and visualization platform with advanced analytics capabilities, interactive dashboards, and automated reporting features.",
      image: "/assets/project-data.jpg",
      tech: ["Python", "Pandas", "Plotly", "FastAPI", "Redis"],
      liveDemo: "#",
      sourceCode: "#",
      category: "Data Science",
    },
    {
      title: "Security Monitoring Tool",
      description:
        "Real-time security monitoring and threat detection system with automated alerts, incident response workflows, and comprehensive audit trails.",
      image: "/assets/project-security.jpg",
      tech: ["Python", "Elasticsearch", "Kibana", "Docker", "Kubernetes"],
      liveDemo: "#",
      sourceCode: "#",
      category: "Cybersecurity",
    },
    {
      title: "E-commerce Platform",
      description:
        "Full-stack e-commerce solution with user authentication, payment processing, inventory management, and admin dashboard for complete business operations.",
      image: "/assets/project-ecommerce.jpg",
      tech: ["React", "Node.js", "Stripe", "MongoDB", "Redux"],
      liveDemo: "#",
      sourceCode: "#",
      category: "Full Stack",
    },
  ];

  const getCategoryColor = (category) => {
    const colors = {
      OSINT: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      Backend: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      Frontend: "bg-green-500/20 text-green-300 border-green-500/30",
      "Data Science": "bg-orange-500/20 text-orange-300 border-orange-500/30",
      Cybersecurity: "bg-red-500/20 text-red-300 border-red-500/30",
      "Full Stack": "bg-primary-500/20 text-primary-300 border-primary-500/30",
    };
    return colors[category] || colors["Full Stack"];
  };

  // Card renderer: auto height on mobile; fixed height on md+
  // Card renderer: auto height on mobile; fixed height on md+
  const renderProjectCard = (project) => (
    <div
      className={`
      card card-hover group shrink-0 flex flex-col
      w-[320px] md:w-[380px]
      h-auto md:h-[520px]
      overflow-hidden rounded-2xl
      focus-within:ring-2 focus-within:ring-primary-400/60
    `}
      tabIndex={-1}
    >
      {/* Visual preview with responsive aspect ratio */}
      <div className="relative">
        <div className="w-full aspect-[4/3] md:aspect-[16/9] bg-gradient-to-br from-dark-700 to-dark-800 flex items-center justify-center">
          {/* Replace with <img ... className="w-full h-full object-cover" /> when ready */}
          <div className="text-center px-4">
            <div className="w-14 h-14 bg-primary-500/20 rounded-full mx-auto mb-2 flex items-center justify-center">
              <Eye size={22} className="text-primary-400" />
            </div>
            <p className="text-gray-300 text-sm font-medium">Project Preview</p>
            <p className="text-gray-500 text-xs">{project.title}</p>
          </div>
        </div>

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-block px-3 py-1 rounded-full text-[11px] md:text-xs font-medium border ${getCategoryColor(
              project.category
            )}`}
          >
            {project.category}
          </span>
        </div>
      </div>

      {/* Content — tuned for readability */}
      <div className="flex flex-col gap-3 px-4 py-4 md:px-4 md:py-4">
        {/* Title: bigger, tighter leading, clamped to 2 lines */}
        <h3
          className="
          text-[18px] md:text-xl font-semibold text-white leading-snug
          group-hover:text-primary-300 transition-colors
          line-clamp-2
          tracking-tight
        "
        >
          {project.title}
        </h3>

        {/* Description: higher contrast, bigger font on mobile, generous line-height, nicer wraps */}
        <p
          className="
          text-gray-200
          text-[14.5px] md:text-[14px]
          leading-7 md:leading-7
          line-clamp-5 md:line-clamp-4
          antialiased
          hyphens-auto
          break-words
          [text-wrap:pretty]
        "
        >
          {project.description}
        </p>

        {/* Tech stack: slightly larger, better spacing, keeps from overflowing on desktop */}
        <div className="flex flex-wrap gap-2 md:max-h-16 md:overflow-hidden">
          {project.tech.map((tech) => (
            <motion.span
              key={`${project.title}-${tech}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              viewport={{ once: true }}
              className="
              skill-chip
              text-[12px] md:text-[11px]
              leading-5
              text-gray-100
            "
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-1 md:pt-3 md:mt-auto">
          <a
            href={project.liveDemo}
            target="_blank"
            rel="noreferrer"
            className="btn-outline flex-1 flex items-center justify-center gap-2 text-sm py-2"
            aria-label={`Open live demo of ${project.title}`}
          >
            <ExternalLink size={16} />
            Demo
          </a>
          <a
            href={project.sourceCode}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary flex-1 flex items-center justify-center gap-2 text-sm py-2"
            aria-label={`Open source code of ${project.title}`}
          >
            <Github size={16} />
            Code
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <section id="projects" className="section-padding bg-gradient-section">
      <div className="container-custom">
        <Parallax speed={1.06}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.25 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-3 md:mb-4 leading-[1.1]">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
              A showcase of my recent work and technical capabilities
            </p>
          </motion.div>
        </Parallax>

        {/* Respect reduced motion: pause marquee if user prefers */}
        <Parallax speed={1.0}>
          <div className="py-2">
            <MarqueeCards
              items={projects}
              renderItem={renderProjectCard}
              speed={150}
              gap={MARQUEE_GAP}
              direction="left"
              pauseOnHover
              // If your MarqueeCards supports it:
              // reduceMotionMatches prefers-reduced-motion media query to disable animation.
            />
          </div>
        </Parallax>

        <Parallax speed={1.04}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            viewport={{ once: true, amount: 0.25 }}
            className="text-center mt-12 md:mt-16"
          >
            <div className="card max-w-2xl mx-auto p-6 md:p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-white mb-3">
                Interested in Working Together?
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                I&apos;m always open to discussing new opportunities and
                exciting projects. Let&apos;s create something amazing together!
              </p>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("#contact");
                }}
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
  );
};

export default Projects;
