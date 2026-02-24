import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import CinematicDivider from './components/CinematicDivider'
import Projects from './components/Projects'
import Learning from './components/Learning'
import Contact from './components/Contact'
import Footer from './components/Footer'
import DeadpoolMusic from './components/DeadpoolMusic'

function App() {
  return (
    <div className="min-h-screen bg-[--color-bg] text-[--color-text]">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <CinematicDivider />
        <Projects />
        <Learning />
        <Contact />
      </main>
      <DeadpoolMusic />
      <Footer />
    </div>
  )
}

export default App
