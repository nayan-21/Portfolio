import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Learning from './components/Learning'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import Preloader from './components/Preloader'


const alreadySeen = sessionStorage.getItem('pl_seen')

function App() {
  const [showPreloader, setShowPreloader] = useState(!alreadySeen)

  function handlePreloaderDone() {
    sessionStorage.setItem('pl_seen', '1')
    setShowPreloader(false)
  }

  return (
    <div className="min-h-screen bg-[--color-bg] text-[--color-text]" style={{ cursor: 'none' }}>
      
      {showPreloader && (
        <Preloader onDone={handlePreloaderDone} />
      )}

      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Learning />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
