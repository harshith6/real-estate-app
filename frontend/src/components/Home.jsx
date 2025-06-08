import React from 'react'
import Header from './Header'
import About from './About'
import Projects from './Projects'
import Footer from './Footer'

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Header />
      <main>
        <About />
        <Projects />
      </main>
      <Footer />
    </div>
  )
}

export default Home