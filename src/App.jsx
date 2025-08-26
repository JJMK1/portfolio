import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'

import SmoothScroll from './components/SmoothScroll'

function App() {
  return (
    <div className="min-h-screen bg-dark-900">
      {/* keep fixed/sticky nav outside smooth-content */}
      <Navbar />

      <SmoothScroll>
        <main>
          <section id="home"><Hero /></section>
          <section id="about"><About /></section>
          <section id="experience"><Experience /></section>
          <section id="skills"><Skills /></section>
          <section id="projects"><Projects /></section>
          <section id="certifications"><Certifications /></section>
          <section id="contact"><Contact /></section>
        </main>
        <Footer />
      </SmoothScroll>
    </div>
  )
}

export default App
