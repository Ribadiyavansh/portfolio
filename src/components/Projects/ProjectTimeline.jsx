import React from 'react';

export default function ProjectTimeline({ progress, onDotClick }) {
  const dots = [
    { label: 'Introduction', active: progress < 0.25, scrollPos: 0.1 },
    { label: 'Placement System', active: progress >= 0.25 && progress < 0.59, scrollPos: 0.4 },
    { label: 'QuickBite', active: progress >= 0.59 && progress < 0.95, scrollPos: 0.78 }
  ];

  return (
    <div className="project-timeline-indicator">
      {dots.map((dot, index) => (
        <div key={index} className="timeline-dot-wrapper">
          <button 
            className={`timeline-dot ${dot.active ? 'active' : ''}`}
            onClick={() => onDotClick(dot.scrollPos)}
            aria-label={`Go to ${dot.label}`}
          />
          <span className="timeline-label">{dot.label}</span>
        </div>
      ))}
    </div>
  );
}
