import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CharacterGuide({ progress }) {
  const headRef = useRef(null);
  const bodyRef = useRef(null);
  const leftArmRef = useRef(null);
  const rightArmRef = useRef(null);
  const leftLegRef = useRef(null);
  const rightLegRef = useRef(null);
  const containerRef = useRef(null);

  // Determine character position (X) and Pose based on scroll progress
  // 0.0 - 0.1: Offscreen left
  // 0.1 - 0.2: Enters walking
  // 0.2 - 0.3: Idle standing (intro header active)
  // 0.3 - 0.5: Project 1 (points at card)
  // 0.5 - 0.65: Walks to Project 2
  // 0.65 - 0.7: Idle standing
  // 0.7 - 0.9: Project 2 (points at card)
  // 0.9 - 1.0: Walks offscreen right

  let xPos = -160;
  let opacity = 0;
  let pose = 'idle';

  if (progress >= 0.1 && progress <= 1.0) {
    opacity = 1;
    if (progress < 0.2) {
      // Entrance walk (0.1 to 0.2)
      const t = (progress - 0.1) / 0.1;
      xPos = -160 + t * 240; // Enters to x = 80px
      pose = 'walk';
    } else if (progress >= 0.2 && progress < 0.3) {
      // Intro idle (0.2 to 0.3)
      xPos = 80;
      pose = 'idle';
    } else if (progress >= 0.3 && progress <= 0.5) {
      // Present Project 1 (0.3 to 0.5)
      xPos = 80;
      pose = 'point';
    } else if (progress > 0.5 && progress < 0.65) {
      // Walk to Project 2 (0.5 to 0.65)
      const t = (progress - 0.5) / 0.15;
      xPos = 80 + t * 40; // Walks slightly to right, camera follows
      pose = 'walk';
    } else if (progress >= 0.65 && progress < 0.7) {
      // Pre-Project 2 idle
      xPos = 120;
      pose = 'idle';
    } else if (progress >= 0.7 && progress <= 0.9) {
      // Present Project 2 (0.7 to 0.9)
      xPos = 120;
      pose = 'point';
    } else {
      // Exit walk (0.9 to 1.0)
      const t = (progress - 0.9) / 0.1;
      xPos = 120 + t * 300; // Walks offscreen
      opacity = 1 - t;
      pose = 'walk';
    }
  }

  // Manage GSAP loops for different poses
  useEffect(() => {
    // Clear any running tweens on body parts
    const targets = [headRef.current, bodyRef.current, leftArmRef.current, rightArmRef.current, leftLegRef.current, rightLegRef.current];
    gsap.killTweensOf(targets);

    if (pose === 'walk') {
      // Walking pendulum loop
      gsap.to(leftLegRef.current, {
        rotation: 22,
        duration: 0.4,
        yoyo: true,
        repeat: -1,
        ease: 'power1.inOut',
        transformOrigin: '12px 2px'
      });
      gsap.to(rightLegRef.current, {
        rotation: -22,
        duration: 0.4,
        yoyo: true,
        repeat: -1,
        ease: 'power1.inOut',
        transformOrigin: '12px 2px'
      });
      gsap.to(leftArmRef.current, {
        rotation: -18,
        duration: 0.4,
        yoyo: true,
        repeat: -1,
        ease: 'power1.inOut',
        transformOrigin: '10px 5px'
      });
      gsap.to(rightArmRef.current, {
        rotation: 18,
        duration: 0.4,
        yoyo: true,
        repeat: -1,
        ease: 'power1.inOut',
        transformOrigin: '10px 5px'
      });
      // Body bobbing up and down
      gsap.to(bodyRef.current, {
        y: -3,
        duration: 0.2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
      });
      gsap.to(headRef.current, {
        y: -2,
        duration: 0.2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
      });
    } else if (pose === 'point') {
      // Pointing pose: right arm raised pointing at card, left arm relaxed
      gsap.to(rightArmRef.current, {
        rotation: -75, // pointing angle
        duration: 0.5,
        ease: 'back.out(1.5)',
        transformOrigin: '10px 5px'
      });
      gsap.to(leftArmRef.current, {
        rotation: 8,
        duration: 0.6,
        ease: 'power1.out',
        transformOrigin: '10px 5px'
      });
      gsap.to([leftLegRef.current, rightLegRef.current], {
        rotation: 0,
        duration: 0.4,
        ease: 'power1.out'
      });

      // Breathing / Idle cycles
      gsap.to(bodyRef.current, {
        scaleY: 1.025,
        duration: 1.5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        transformOrigin: 'center bottom'
      });
      gsap.to(headRef.current, {
        y: 1,
        rotation: 2,
        duration: 1.5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        transformOrigin: 'center bottom'
      });
      gsap.to(leftArmRef.current, {
        rotation: 14,
        duration: 1.5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        transformOrigin: '10px 5px'
      });
    } else {
      // Idle pose: standing relaxed looking ahead
      gsap.to([leftArmRef.current, rightArmRef.current], {
        rotation: 5,
        duration: 0.5,
        ease: 'power1.out',
        transformOrigin: '10px 5px'
      });
      gsap.to([leftLegRef.current, rightLegRef.current], {
        rotation: 0,
        duration: 0.5,
        ease: 'power1.out'
      });

      // Breathing + minor gestures
      gsap.to(bodyRef.current, {
        scaleY: 1.02,
        duration: 1.8,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        transformOrigin: 'center bottom'
      });
      gsap.to(headRef.current, {
        rotation: -3,
        duration: 2.2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        transformOrigin: 'center bottom'
      });
      gsap.to(rightArmRef.current, {
        rotation: 10,
        duration: 1.8,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        transformOrigin: '10px 5px'
      });
    }

    return () => {
      gsap.killTweensOf(targets);
    };
  }, [pose]);

  return (
    <div
      ref={containerRef}
      className="character-guide-container"
      style={{
        transform: `translateX(${xPos}px)`,
        opacity: opacity,
        transition: 'transform 0.1s ease-out, opacity 0.2s ease-out'
      }}
    >
      <svg
        viewBox="0 0 120 220"
        className="character-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* CHARACTER DRAWING */}

        {/* Shadow */}
        <ellipse cx="60" cy="210" rx="25" ry="6" fill="rgba(0,0,0,0.25)" />

        {/* Left Leg */}
        <g ref={leftLegRef} id="char-left-leg">
          {/* Pants */}
          <path d="M 46,150 L 46,196 C 46,198 44,200 42,200 L 42,202 L 56,202 L 56,150 Z" fill="#312e81" />
          {/* Shoe */}
          <rect x="36" y="200" width="20" height="8" rx="3" fill="#ffffff" />
          <path d="M 36,204 L 56,204 L 56,208 L 36,208 Z" fill="#06b6d4" />
        </g>

        {/* Right Leg */}
        <g ref={rightLegRef} id="char-right-leg">
          {/* Pants */}
          <path d="M 64,150 L 64,196 C 64,198 66,200 68,200 L 68,202 L 82,202 L 82,150 Z" fill="#312e81" />
          {/* Shoe */}
          <rect x="64" y="200" width="20" height="8" rx="3" fill="#ffffff" />
          <path d="M 64,204 L 84,204 L 84,208 L 64,208 Z" fill="#06b6d4" />
        </g>

        {/* Torso / Hoodie */}
        <g ref={bodyRef} id="char-body">
          {/* Body */}
          <path d="M 40,90 L 80,90 L 85,152 L 35,152 Z" fill="#f97316" />

          {/* Hoodie Pocket */}
          <path d="M 48,125 L 72,125 L 76,145 L 44,145 Z" fill="#ea580c" />

          {/* Hoodie Strings */}
          <line x1="56" y1="92" x2="56" y2="108" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          <circle cx="56" cy="109" r="2.5" fill="#06b6d4" />
          <line x1="64" y1="92" x2="64" y2="112" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          <circle cx="64" cy="113" r="2.5" fill="#06b6d4" />
        </g>

        {/* Left Arm */}
        <g ref={leftArmRef} id="char-left-arm">
          {/* Shoulder -> Hand */}
          <path d="M 40,90 L 26,128 L 34,132 L 44,96 Z" fill="#f97316" />
          {/* Hand */}
          <circle cx="24" cy="132" r="6" fill="#fed7aa" />
        </g>

        {/* Right Arm */}
        <g ref={rightArmRef} id="char-right-arm">
          {/* Shoulder -> Hand */}
          <path d="M 80,90 L 94,128 L 86,132 L 76,96 Z" fill="#f97316" />
          {/* Hand (Pointing finger graphic is rotated by GSAP) */}
          <circle cx="96" cy="132" r="6" fill="#fed7aa" />
          {/* Pointing Finger extension */}
          <path d="M 96,130 L 104,130 L 104,133 L 96,134 Z" fill="#fed7aa" />
        </g>

        {/* Head and Face */}
        <g ref={headRef} id="char-head">
          {/* Neck */}
          <rect x="54" y="80" width="12" height="12" fill="#fdba74" />

          {/* Face */}
          <rect x="44" y="44" width="32" height="38" rx="8" fill="#fed7aa" />

          {/* Hair */}
          <path d="M 42,48 C 42,40 50,34 60,34 C 70,34 78,40 78,48 C 80,48 81,42 75,38 C 70,34 50,34 45,38 C 39,42 40,48 42,48 Z" fill="#1e1b4b" />

          {/* Glasses */}
          {/* Left Frame */}
          <circle cx="53" cy="58" r="7" fill="none" stroke="#111827" strokeWidth="2.5" />
          {/* Right Frame */}
          <circle cx="67" cy="58" r="7" fill="none" stroke="#111827" strokeWidth="2.5" />
          {/* Bridge */}
          <line x1="60" y1="58" x2="60" y2="58" stroke="#111827" strokeWidth="3" />
          {/* Ears */}
          <circle cx="43" cy="60" r="3.5" fill="#fed7aa" />
          <circle cx="77" cy="60" r="3.5" fill="#fed7aa" />

          {/* Smile */}
          <path d="M 54,70 Q 60,76 66,70" fill="none" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}
