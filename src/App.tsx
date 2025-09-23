import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  // Ensure page starts at top on load/refresh
  useEffect(() => {
    // Prevent browser scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    // Force scroll to top immediately
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    
    // Also set body scroll position
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Hero />
          <About />
          <Skills />
          <Portfolio />
          <Contact />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
