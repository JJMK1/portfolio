import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget.jsx";

import SmoothScroll from "./components/SmoothScroll";

function App() {
  return (
    <div className="min-h-screen bg-dark-900">
      {/* Keep fixed/sticky nav OUTSIDE smooth-content */}
      <Navbar />

      {/* ✅ Keep the chat widget OUTSIDE SmoothScroll so it's not clipped or shifted */}
      <ChatWidget agentName="Jek" avatarUrl="/Frame1.png" position="right" />

      <SmoothScroll>
        <main>
          {/* Add scroll-mt so headings don't hide under the fixed navbar */}
          <section id="home" className="scroll-mt-24 md:scroll-mt-28">
            <Hero />
          </section>
          <section id="about" className="scroll-mt-24 md:scroll-mt-28">
            <About />
          </section>
          <section id="experience" className="scroll-mt-24 md:scroll-mt-28">
            <Experience />
          </section>
          <section id="skills" className="scroll-mt-24 md:scroll-mt-28">
            <Skills />
          </section>
          <section id="projects" className="scroll-mt-24 md:scroll-mt-28">
            <Projects />
          </section>
          <section id="certifications" className="scroll-mt-24 md:scroll-mt-28">
            <Certifications />
          </section>
          <section id="contact" className="scroll-mt-24 md:scroll-mt-28">
            <Contact />
          </section>
        </main>

        <Footer />
      </SmoothScroll>
    </div>
  );
}

export default App;
