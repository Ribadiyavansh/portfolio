import React from 'react';

export default function ProjectsHeader({ progress }) {
  // Visible immediately from the start (0% to 15%), then fades out by 25%
  let opacity = 0;
  let translateY = 0;

  if (progress <= 0.25) {
    if (progress < 0.15) {
      // Visible phase
      opacity = 1;
      translateY = 0;
    } else {
      // Fade out phase (0.15 to 0.25)
      const t = (progress - 0.15) / 0.1;
      opacity = 1 - t;
      translateY = -30 * t;
    }
  } else {
    opacity = 0;
    translateY = -30;
  }

  return (
    <div 
      className="projects-header"
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        pointerEvents: opacity > 0 ? 'auto' : 'none',
        transition: 'opacity 0.1s ease-out, transform 0.1s ease-out'
      }}
    >
      <h2 className="projects-title">Projects</h2>
      <p className="projects-subtitle">
        Building products that solve real problems and create meaningful experiences.
      </p>
    </div>
  );
}
