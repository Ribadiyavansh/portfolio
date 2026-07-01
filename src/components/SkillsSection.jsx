import React, { useEffect, useRef } from 'react';

const skills = [
  { name: 'HTML5', icon: (
    <svg viewBox="0 0 24 24" width="70" height="70">
      <path fill="#E34F26" d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0z" />
      <path fill="#F06529" d="M12 2.2v19.6l6.8-2.2L20.2 4.4H12z" />
      <path fill="#EFEFEF" d="M12 9.6H9l-.2-2.3H12V5.1H6.3l.6 6.8H12V9.6zm0 5.4l-3.2-.9-.2-2.2H6.4l.4 4.4 5.2 1.4V15z" />
      <path fill="#FFF" d="M12 9.6v2.3h4.2l-.4 4.6-3.8 1v-2.2l1.6-.4.2-1.7H12v-3.6z" />
    </svg>
  )},
  { name: 'CSS3', icon: (
    <svg viewBox="0 0 24 24" width="70" height="70">
      <path fill="#1572B6" d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0z" />
      <path fill="#33A9DC" d="M12 2.2v19.6l6.8-2.2L20.2 4.4H12z" />
      <path fill="#EFEFEF" d="M12 9.6H9l-.2-2.3H12V5.1H6.3l.6 6.8H12V9.6zm0 5.4l-3.2-.9-.2-2.2H6.4l.4 4.4 5.2 1.4V15z" />
      <path fill="#FFF" d="M12 5.1v2.3h4.4l-.2 2.2H12v2.3h2.1l-.4 4.6-3.8 1v-2.2l1.6-.4.2-1.7H12v-3.6z" />
    </svg>
  )},
  { name: 'JavaScript', icon: (
    <svg viewBox="0 0 24 24" width="70" height="70">
      <rect width="24" height="24" rx="4" fill="#F7DF1E"/>
      <path fill="#000000" d="M22 22h-3.6v-5.2c0-1.2-.4-1.7-1.2-1.7-.8 0-1.2.5-1.2 1.7V22H12.4V11h3.6v1.4c.5-.9 1.4-1.6 2.6-1.6 2.2 0 3.4 1.4 3.4 3.8V22zM8.3 11v7.6c0 1.1-.3 1.7-1.1 1.7-.7 0-1.1-.5-1.1-1.7V11H2.5v7.6c0 3.2 1.6 4.9 4.7 4.9s4.7-1.7 4.7-4.9V11H8.3z"/>
    </svg>
  )},
  { name: 'React', icon: (
    <svg viewBox="0 0 24 24" width="70" height="70" fill="none" stroke="#61DAFB" stroke-width="1.5">
      <ellipse rx="10" ry="3.8" transform="rotate(0)" cx="12" cy="12"/>
      <ellipse rx="10" ry="3.8" transform="rotate(60)" cx="12" cy="12"/>
      <ellipse rx="10" ry="3.8" transform="rotate(120)" cx="12" cy="12"/>
      <circle r="1.8" fill="#61DAFB" cx="12" cy="12" stroke="none"/>
    </svg>
  )},
  { name: 'Next.js', icon: (
    <svg viewBox="0 0 24 24" width="70" height="70">
      <circle cx="12" cy="12" r="11" fill="#000000"/>
      <path d="M17.5 17.5l-6-8.5v8.5H9.5V6.5h2l6 8.5V6.5h2v11z" fill="#ffffff"/>
    </svg>
  )},
  { name: 'Tailwind CSS', icon: (
    <svg viewBox="0 0 32 32" width="70" height="70">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8 1 .25 1.62.89 2.37 1.65C13.8 10.65 15.38 12.25 18.8 12.25c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.97-.24-1.67-.93-2.42-1.69-1.22-1.23-2.8-2.76-6.18-2.76zm-6.8 6c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.97.24 1.66.93 2.42 1.69 1.22 1.23 2.8 2.76 6.18 2.76 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-1-.25-1.62-.89-2.37-1.65C10.2 12.05 8.62 10.45 5.2 10.45z" fill="#06B6D4"/>
    </svg>
  )},
  { name: 'Node.js', icon: (
    <svg viewBox="0 0 24 24" width="70" height="70">
      <path fill="#339933" d="M12 1.5L3 6.7v10.5l9 5.3 9-5.3V6.7L12 1.5zm7.3 14.8l-7.3 4.2-7.3-4.2V7.7L12 3.5l7.3 4.2v8.6z" />
      <path fill="#339933" d="M12 6.5l-5 2.9v5.8l5 2.9 5-2.9V9.4l-5-2.9zm0 1.7l3.3 1.9v3.8l-3.3 1.9-3.3-1.9v-3.8L12 8.2z" />
    </svg>
  )},
  { name: 'MongoDB', icon: (
    <svg viewBox="0 0 24 24" width="70" height="70">
      <path fill="#47A248" d="M12 0c-.3 0-.6.1-.9.2C7 2.1 4.5 6.4 4.5 11c0 5.8 4 9.8 7.5 13 .3.3.7.3 1 0 3.5-3.2 7.5-7.2 7.5-13C20.5 6.4 18 2.1 12.9.2c-.3-.1-.6-.2-.9-.2zm0 2.2c3.9 1.7 5.7 5.1 5.7 8.8 0 4.3-2.9 7.6-5.7 10.3V2.2zm0 20.3v-1.1c-1.9-1.9-3.8-4-3.8-7.3 0-3.3 1.8-6.1 3.8-7.8v16.2z"/>
    </svg>
  )},
  { name: 'Git', icon: (
    <svg viewBox="0 0 24 24" width="70" height="70">
      <path fill="#F05032" d="M23.3 11.5L12.5.7c-.5-.5-1.3-.5-1.8 0L9.4 2.1l3 3c.4-.1.9-.1 1.3.2.5.5.5 1.3 0 1.8-.4.4-1 .5-1.5.3l-2.9 3c.2.5.1 1.1-.3 1.5-.5.5-1.3.5-1.8 0s-.5-1.3 0-1.8c.4-.4.9-.5 1.4-.3l2.8-2.8V6.1c-.5-.2-1-.7-1-1.3 0-.8.6-1.4 1.4-1.4.3 0 .6.1.8.2L13.7.7c-.5-.5-1.3-.5-1.8 0L.7 11.5c-.5.5-.5 1.3 0 1.8l10.8 10.8c.5.5 1.3.5 1.8 0l10.8-10.8c.5-.5.5-1.3 0-1.8z" />
    </svg>
  )},
  { name: 'GSAP', icon: (
    <svg viewBox="0 0 100 100" width="70" height="70">
      <circle cx="50" cy="50" r="45" fill="none" stroke="#88CE02" stroke-width="6"/>
      <path d="M55 20L30 55h20l-10 25L65 45H45z" fill="#88CE02"/>
    </svg>
  )}
];

export default function SkillsSection() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRefs = useRef([]);

  const mouseStateRef = useRef({
    mouseX: 0,
    mouseY: 0,
    lerpedMouseX: 0,
    lerpedMouseY: 0
  });

  const animStateRef = useRef({
    currentProgress: 0,
    targetProgress: 0,
    ease: 0.06,
    isLoopActive: false
  });

  useEffect(() => {
    cardsRefs.current = cardsRefs.current.slice(0, skills.length);

    function skillsAnimationLoop() {
      const animState = animStateRef.current;
      const mouseState = mouseStateRef.current;
      const diff = animState.targetProgress - animState.currentProgress;
      
      if (Math.abs(diff) < 0.001) {
        animState.currentProgress = animState.targetProgress;
      } else {
        animState.currentProgress += diff * animState.ease;
      }

      mouseState.lerpedMouseX += (mouseState.mouseX - mouseState.lerpedMouseX) * 0.08;
      mouseState.lerpedMouseY += (mouseState.mouseY - mouseState.lerpedMouseY) * 0.08;
      
      const parallaxX = mouseState.lerpedMouseX * 15;
      const parallaxY = mouseState.lerpedMouseY * 10;
      const progress = animState.currentProgress;

      // Animate Section Header
      let headerOpacity = 0;
      let headerY = 50;
      if (progress < 0.15) {
        const factor = progress / 0.15;
        headerOpacity = factor;
        headerY = 50 * (1 - factor);
      } else if (progress > 0.85) {
        const factor = (progress - 0.85) / 0.15;
        headerOpacity = 1 - factor;
        headerY = -50 * factor;
      } else {
        headerOpacity = 1;
        headerY = 0;
      }
      
      if (headerRef.current) {
        headerRef.current.style.opacity = headerOpacity;
        headerRef.current.style.transform = `translateY(${headerY}px)`;
      }

      // Position each card
      cardsRefs.current.forEach((card, index) => {
        if (!card) return;
        const t_i = (progress * 4.2) - (index * 0.35);
        
        if (t_i >= -0.2 && t_i <= 1.2) {
          const xPercent = -10 + (t_i + 0.2) * (120 / 1.4);
          const xPos = (xPercent / 100) * window.innerWidth + parallaxX;
          
          const centerY = window.innerHeight * 0.52;
          const waveAmplitude = window.innerHeight * 0.16;
          const yPos = centerY + Math.sin(t_i * Math.PI * 2.2) * waveAmplitude + parallaxY;
          
          const centerFactor = Math.max(0, Math.cos(Math.max(-0.5, Math.min(0.5, t_i - 0.5)) * Math.PI));
          
          const zDepth = -250 + (centerFactor * 250);
          const scale = 0.8 + (centerFactor * 0.4);
          const rotateY = (t_i - 0.5) * 10;
          
          let opacity = 0;
          if (t_i < 0.1) {
            opacity = (t_i + 0.2) / 0.3;
          } else if (t_i > 0.9) {
            opacity = (1.2 - t_i) / 0.3;
          } else {
            opacity = 1;
          }
          opacity = Math.max(0, Math.min(1, opacity));

          card.style.left = '0';
          card.style.top = '0';
          card.style.margin = '0';
          card.style.opacity = opacity;
          card.style.pointerEvents = opacity > 0.5 ? 'auto' : 'none';
          
          const offsetX = xPos - 140;
          const offsetY = yPos - 140;
          card.style.transform = `translate3d(${offsetX}px, ${offsetY}px, ${zDepth}px) rotateY(${rotateY}deg) scale(${scale})`;
        } else {
          card.style.opacity = 0;
          card.style.pointerEvents = 'none';
        }
      });

      const scrollY = window.scrollY;
      const container = containerRef.current;
      if (!container) return;

      const skillsTop = container.getBoundingClientRect().top + scrollY;
      const skillsHeight = container.offsetHeight;
      
      const isStillInViewport = (scrollY >= skillsTop - window.innerHeight && scrollY <= skillsTop + skillsHeight);
      const hasNotSettled = Math.abs(diff) > 0.001 || 
                           Math.abs(mouseState.mouseX - mouseState.lerpedMouseX) > 0.01 || 
                           Math.abs(mouseState.mouseY - mouseState.lerpedMouseY) > 0.01;

      if (isStillInViewport || hasNotSettled) {
        requestAnimationFrame(skillsAnimationLoop);
      } else {
        animStateRef.current.isLoopActive = false;
      }
    }

    function handleScroll() {
      const scrollY = window.scrollY;
      const container = containerRef.current;
      if (!container) return;

      const skillsTop = container.getBoundingClientRect().top + scrollY;
      const skillsHeight = container.offsetHeight;
      const skillsRange = skillsHeight - window.innerHeight;
      let skillsProgress = (scrollY - skillsTop) / skillsRange;
      skillsProgress = Math.max(0, Math.min(1, skillsProgress));
      
      animStateRef.current.targetProgress = skillsProgress;

      if (!animStateRef.current.isLoopActive && scrollY >= skillsTop - window.innerHeight && scrollY <= skillsTop + skillsHeight) {
        animStateRef.current.isLoopActive = true;
        requestAnimationFrame(skillsAnimationLoop);
      }
    }

    function handleMouseMove(e) {
      mouseStateRef.current.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseStateRef.current.mouseY = (e.clientY / window.innerHeight) * 2 - 1;

      const scrollY = window.scrollY;
      const container = containerRef.current;
      if (!container) return;
      const skillsTop = container.getBoundingClientRect().top + scrollY;
      const skillsHeight = container.offsetHeight;

      if (!animStateRef.current.isLoopActive && scrollY >= skillsTop - window.innerHeight && scrollY <= skillsTop + skillsHeight) {
        animStateRef.current.isLoopActive = true;
        requestAnimationFrame(skillsAnimationLoop);
      }
    }

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div id="skills" ref={containerRef} className="skills-scroll-container">
      <div className="skills-canvas-sticky">
        {/* SVG flowing background ribbon */}
        <div className="skills-ribbon-container">
          <svg className="skills-ribbon" preserveAspectRatio="none" viewBox="0 0 2880 400">
            <defs>
              <linearGradient id="ribbon-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#004741" />
                <stop offset="50%" stop-color="#008a7f" />
                <stop offset="100%" stop-color="#d8b17a" />
              </linearGradient>
            </defs>
            <path id="ribbon-path-1" fill="none" stroke="url(#ribbon-grad)" stroke-width="28" stroke-linecap="round" d="M 0,200 Q 360,100 720,200 T 1440,200 Q 1800,100 2160,200 T 2880,200" />
            <path id="ribbon-path-2" fill="none" stroke="url(#ribbon-grad)" stroke-width="12" stroke-linecap="round" opacity="0.4" d="M 0,220 Q 360,120 720,220 T 1440,220 Q 1800,120 2160,220 T 2880,220" />
          </svg>
        </div>

        {/* Section Header */}
        <div ref={headerRef} className="skills-section-header">
          <h2 className="skills-title">My Skills</h2>
        </div>

        {/* 3D Card Scene */}
        <div className="skills-3d-scene">
          {skills.map((skill, index) => (
            <div 
              key={skill.name}
              ref={el => cardsRefs.current[index] = el}
              className="skill-card-floating" 
              data-index={index}
            >
              <div className="card-icon">{skill.icon}</div>
              <div className="card-name">{skill.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
