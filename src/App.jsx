import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Education from './components/Education'
import Research from './components/Research'
import Skills from './components/Skills'
import Projects from './components/Projects'
import PersonalProjects from './components/PersonalProjects'
import Contact from './components/Contact'
import Navigation from './components/Navigation'

function App() {
  return (
    <div className="app">
      <Navigation />
      <Hero />
      <About />
      <Experience />
      <Education />
      <Research />
      <Skills />
      <Projects />
      <PersonalProjects />
      <Contact />
    </div>
  )
}

export default App
