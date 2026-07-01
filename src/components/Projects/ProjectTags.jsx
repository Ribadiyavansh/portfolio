import React from 'react';
import { motion } from 'framer-motion';

export default function ProjectTags({ tags, active }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  if (!active) return null;

  return (
    <motion.div 
      className="project-tags-list"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {tags.map((tag, idx) => (
        <motion.span 
          key={tag} 
          className="project-tag"
          variants={itemVariants}
        >
          {tag}
        </motion.span>
      ))}
    </motion.div>
  );
}
