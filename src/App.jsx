import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Education from './components/Education'
import Skills from './components/Skills'
import Projects from './components/Projects'
import PersonalProjects from './components/PersonalProjects'
import Contact from './components/Contact'
import Navigation from './components/Navigation'
import LoadingScreen from './components/LoadingScreen'

function App() {
  return (
    <div className="app">
      <Suspense fallback={<LoadingScreen />}>
        <Navigation />
        <Hero />
        <About />
        <Experience />
        <Education />
        <Skills />
        <Projects />
        <PersonalProjects />
        <Contact />
      </Suspense>
    </div>
  )
}

export default App
