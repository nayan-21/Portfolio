import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Learning from './components/Learning'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-[--color-bg] text-[--color-text]">
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
