import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import ProjectsHeader from './ProjectsHeader';
import ProjectCard from './ProjectCard';
import CameraRig from './CameraRig';

// Local list of projects matching the prompt
const projectsData = [
  {
    id: 1,
    title: 'Placement Management System',
    duration: '',
    description: 'Web-based placement tracking platform with student profile management, resume builder, and job application features.',
    techStack: ['PHP', 'MySQL', 'HTML/CSS'],
    buttons: {
      website: '#',
      source: 'https://github.com/Ribadiyavansh/placementpro'
    }
  },
  {
    id: 2,
    title: 'QuickBite',
    duration: '',
    description: 'Online food ordering UI featuring menu browsing, cart functionality, and a smooth order placement flow.',
    techStack: ['JavaScript', 'Frontend', 'UI/UX'],
    buttons: {
      website: '#',
      source: 'https://github.com/Ribadiyavansh/quickbite'
    }
  }
];

// 3D Environment Components
function StudioBackground({ progress, isLightTheme }) {
  const pointsRef = useRef(null);
  const beamLeftRef = useRef(null);
  const beamRightRef = useRef(null);

  // Generating static particles
  const particleCount = 45;
  const positions = React.useMemo(() => {
    const arr = [];
    for (let i = 0; i < particleCount; i++) {
      arr.push((Math.random() - 0.5) * 20); // x
      arr.push((Math.random() - 0.5) * 10);  // y
      arr.push((Math.random() - 0.5) * 8);   // z
    }
    return new Float32Array(arr);
  }, []);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();

    // Rotate particles slowly
    if (pointsRef.current) {
      pointsRef.current.rotation.y = elapsed * 0.03;
      pointsRef.current.rotation.x = elapsed * 0.01;
    }

    // Animate moving light beams
    if (beamLeftRef.current) {
      beamLeftRef.current.position.x = -4 + Math.sin(elapsed * 0.5) * 2;
      beamLeftRef.current.position.y = 3 + Math.cos(elapsed * 0.5) * 0.5;
    }
    if (beamRightRef.current) {
      beamRightRef.current.position.x = 4 + Math.cos(elapsed * 0.6) * 2;
      beamRightRef.current.position.y = 3 + Math.sin(elapsed * 0.6) * 0.5;
    }
  });

  return (
    <>
      {/* Light beams */}
      <spotLight
        ref={beamLeftRef}
        position={[-4, 3, 2]}
        angle={0.4}
        penumbra={1}
        intensity={isLightTheme ? 1.0 : 1.8}
        color="#ffffff"
        castShadow
      />
      <spotLight
        ref={beamRightRef}
        position={[4, 3, 2]}
        angle={0.4}
        penumbra={1}
        intensity={isLightTheme ? 1.0 : 1.8}
        color="#ffffff"
        castShadow
      />

      {/* Floating particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.06} color="#ffffff" transparent opacity={0.65} sizeAttenuation />
      </points>

      {/* Large Floating Glass Panels (Crystals) */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
        <mesh position={[-3, 1, -3]} rotation={[0, 0.4, 0.1]}>
          <boxGeometry args={[4, 5, 0.1]} />
          <meshPhysicalMaterial
            color="#ffffff"
            transparent
            opacity={0.35}
            transmission={0.85}
            roughness={0.05}
            metalness={0.1}
            thickness={1.5}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
          />
        </mesh>
      </Float>

      <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
        <mesh position={[5, -1, -4]} rotation={[0, -0.3, -0.05]}>
          <boxGeometry args={[5, 6, 0.1]} />
          <meshPhysicalMaterial
            color="#ffffff"
            transparent
            opacity={0.28}
            transmission={0.85}
            roughness={0.05}
            metalness={0.1}
            thickness={1.5}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
          />
        </mesh>
      </Float>

      {/* Studio Floor with Reflections */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial
          color="#000000"
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>
    </>
  );
}

export default function ProjectsSection() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Smooth scroll tracking
  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      const container = containerRef.current;
      if (!container) return;

      const top = container.getBoundingClientRect().top + scrollY;
      const height = container.offsetHeight;
      const range = height - window.innerHeight;
      let progress = (scrollY - top) / range;
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dot timeline navigation click
  function handleDotClick(targetProgress) {
    const container = containerRef.current;
    if (!container) return;

    const top = container.getBoundingClientRect().top + window.scrollY;
    const height = container.offsetHeight;
    const range = height - window.innerHeight;
    const scrollPos = top + targetProgress * range;

    window.scrollTo({
      top: scrollPos,
      behavior: 'smooth'
    });
  }

  // Active Project Cards selection based on progress
  // Active Project Cards selection based on progress
  // Project 1 (Placement Management System): Active in 25% - 55% scroll
  // Project 2 (QuickBite): Active in 63% - 93% scroll
  const isProj1Active = scrollProgress >= 0.25 && scrollProgress <= 0.55;
  const isProj2Active = scrollProgress >= 0.63 && scrollProgress <= 0.93;

  const [activeProject, setActiveProject] = useState(projectsData[0]);
  const [isLightTheme, setIsLightTheme] = useState(false);

  useEffect(() => {
    if (isProj1Active) {
      setActiveProject(projectsData[0]);
    } else if (isProj2Active) {
      setActiveProject(projectsData[1]);
    }
  }, [isProj1Active, isProj2Active]);

  useEffect(() => {
    // Check initial body class state
    setIsLightTheme(document.body.classList.contains('light-theme'));

    // Listen for light-theme toggles in other parts of the DOM
    const observer = new MutationObserver(() => {
      setIsLightTheme(document.body.classList.contains('light-theme'));
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div id="projects" ref={containerRef} className="projects-scroll-container">
      <div className="projects-canvas-sticky">

        {/* React Three Fiber Studio Scene */}
        <div className="projects-3d-canvas">
          <Canvas camera={{ fov: 45, position: [0, 0, 10] }} gl={{ antialias: true }}>
            <ambientLight intensity={isLightTheme ? 0.85 : 0.5} />
            <directionalLight position={[5, 10, 5]} intensity={isLightTheme ? 1.5 : 1.2} />
            <pointLight position={[-10, -5, -5]} intensity={isLightTheme ? 0.25 : 0.5} color="#ffffff" />

            <StudioBackground progress={scrollProgress} isLightTheme={isLightTheme} />
            <CameraRig progress={scrollProgress} />
          </Canvas>
        </div>

        {/* 2D HTML overlays */}
        <div className="projects-overlay">
          {/* Header */}
          <ProjectsHeader progress={scrollProgress} />

          {/* Project Card display */}
          <div className="projects-card-container">
            <ProjectCard
              project={activeProject}
              active={isProj1Active || isProj2Active}
            />
          </div>


        </div>
      </div>
    </div>
  );
}
