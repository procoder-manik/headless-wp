import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import GlobalCTA from './components/sections/GlobalCTA';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import CaseStudies from './components/pages/CaseStudies';
import SingleCaseStudy from './components/pages/SingleCaseStudy';
import Posts from './components/pages/Posts';
import SinglePost from './components/pages/SinglePost';
import NotFound from './components/pages/NotFound';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
};

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, []);

  return (
    <div
      className={`custom-cursor ${isHovering ? 'hovering' : ''}`}
      style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
    >
      <div className="custom-cursor-dot"></div>
      <div className="custom-cursor-ring"></div>
      <div className="custom-cursor-text">Visit</div>
    </div>
  );
};

function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : false;
  });

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <Router>
      <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
        <div className="min-h-screen bg-white dark:bg-gray-950">
          <ScrollToTop />
          <CustomCursor />
          <Header isDark={isDark} toggleTheme={toggleTheme} />
          <main>
            <Routes>
              <Route path="/" element={<Home isDark={isDark} />} />
              <Route path="/about-us" element={<About isDark={isDark} />} />
              <Route path="/contact" element={<Contact isDark={isDark} />} />
              <Route path="/case-studies" element={<CaseStudies isDark={isDark} />} />
              <Route path="/case-studies/:slug" element={<SingleCaseStudy isDark={isDark} />} />
              <Route path="/blog" element={<Posts isDark={isDark} />} />
              <Route path="/blog/:slug" element={<SinglePost isDark={isDark} />} />
              <Route path="*" element={<NotFound isDark={isDark} />} />
            </Routes>
          </main>
          <GlobalCTA isDark={isDark} />
          <Footer isDark={isDark} />
        </div>
      </div>
    </Router>
  );
}

export default App;
