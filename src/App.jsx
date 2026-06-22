import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import Hero from "./components/sections/Hero"
import About from "./components/sections/About"
import Skills from "./components/sections/Skills"
import Projects from "./components/sections/Projects"
import MLWorkflow from "./components/sections/MLWorkflow"
import Experience from "./components/sections/Experience"
import Certifications from "./components/sections/Certifications"
import Contact from "./components/sections/Contact"

export default function App() {
  return (
    <>
      {/* Skip navigation — accessibility first focusable element */}
      <a href="#main-content" className="skip-nav">
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <MLWorkflow />
        <Experience />
        <Certifications />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
