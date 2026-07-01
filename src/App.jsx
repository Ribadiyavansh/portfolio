import React, { useState, useEffect, useRef } from 'react';
import Preloader from './components/Preloader';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import EducationSection from './components/EducationSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/Projects/ProjectsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFaded, setIsFaded] = useState(false);
  const heroImagesRef = useRef([]);
  const eduImagesRef = useRef([]);

  function handleComplete() {
    setIsFaded(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }

  // Butter-smooth wheel scroll lerping to make scroll-bound animations feel extremely smooth
  useEffect(() => {
    // Avoid smooth scroll intercept on mobile/touch devices
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    let targetScroll = window.scrollY;
    let currentScroll = window.scrollY;
    const ease = 0.08;
    let rafId = null;

    const onWheel = (e) => {
      e.preventDefault();
      // Temporarily disable CSS smooth scrolling to prevent conflict with JS lerp
      document.documentElement.style.scrollBehavior = 'auto';
      
      // Interpolate target scroll position based on delta
      targetScroll += e.deltaY;
      targetScroll = Math.max(0, Math.min(targetScroll, document.documentElement.scrollHeight - window.innerHeight));
      
      if (rafId === null) {
        rafId = requestAnimationFrame(update);
      }
    };

    const update = () => {
      const diff = targetScroll - currentScroll;
      if (Math.abs(diff) < 0.1) {
        currentScroll = targetScroll;
        window.scrollTo(0, currentScroll);
        
        // Restore CSS smooth scrolling for navbar click navigations
        document.documentElement.style.scrollBehavior = 'smooth';
        
        rafId = null;
        return;
      }
      currentScroll += diff * ease;
      window.scrollTo(0, currentScroll);
      rafId = requestAnimationFrame(update);
    };

    // Update target scroll when window is scrolled by other means (like clicking nav links or page up/down)
    const onScroll = () => {
      if (rafId === null) {
        targetScroll = window.scrollY;
        currentScroll = window.scrollY;
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {isLoading && (
        <Preloader
          onComplete={handleComplete}
          heroImagesRef={heroImagesRef}
          eduImagesRef={eduImagesRef}
          isFaded={isFaded}
        />
      )}
      {!isLoading && (
        <>
          <Header />
          <HeroSection images={heroImagesRef.current} />
          <main className="main-content">
            <EducationSection images={eduImagesRef.current} />
            <SkillsSection />
            <ProjectsSection />
            <ContactSection />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
