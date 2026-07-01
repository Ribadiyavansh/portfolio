import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectTags from './ProjectTags';
import ProjectButtons from './ProjectButtons';

export default function ProjectCard({ project, active }) {
  const cardVariants = {
    hidden: {
      scale: 0.8,
      opacity: 0,
      y: 100,
      rotate: 5,
    },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: {
      scale: 0.9,
      opacity: 0,
      y: -30,
      rotate: -2,
      transition: {
        duration: 0.15,
        ease: 'easeOut'
      }
    }
  };

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key={project.id}
          className="project-glass-card"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <h3 className="project-title">{project.title}</h3>
          <p className="project-desc">{project.description}</p>
          
          <ProjectTags tags={project.techStack} active={active} />
          
          <ProjectButtons 
            websiteUrl={project.buttons.website} 
            sourceUrl={project.buttons.source} 
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
