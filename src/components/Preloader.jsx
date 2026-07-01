import React, { useEffect, useState } from 'react';

const totalFrames = 240;
const totalEduFrames = 164;
const totalAllImages = totalFrames + totalEduFrames;

export default function Preloader({ onComplete, heroImagesRef, eduImagesRef, isFaded }) {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    let loadedCount = 0;

    function getFramePath(index) {
      const pad = String(index).padStart(3, '0');
      return `/assets/hero-frames/ezgif-frame-${pad}.jpg`;
    }

    function getEduFramePath(index) {
      const pad = String(index).padStart(3, '0');
      return `/assets/education-frames/ezgif-frame-${pad}.jpg`;
    }

    function onAssetLoaded() {
      loadedCount++;
      const currentPercent = Math.round((loadedCount / totalAllImages) * 100);
      setPercent(currentPercent);
      
      if (loadedCount === totalAllImages) {
        setTimeout(() => {
          onComplete();
        }, 200);
      }
    }

    heroImagesRef.current = [];
    eduImagesRef.current = [];

    // Preload Hero
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = onAssetLoaded;
      img.onerror = onAssetLoaded;
      heroImagesRef.current.push(img);
    }

    // Preload Education
    for (let i = 1; i <= totalEduFrames; i++) {
      const img = new Image();
      img.src = getEduFramePath(i);
      img.onload = onAssetLoaded;
      img.onerror = onAssetLoaded;
      eduImagesRef.current.push(img);
    }
  }, [onComplete, heroImagesRef, eduImagesRef]);

  return (
    <div id="preloader" className={`preloader ${isFaded ? 'fade-out' : ''}`}>
      <div className="preloader-orb"></div>
      <div className="preloader-content">
        <div className="preloader-logo">VANSH</div>
        <div className="loader-percent-modern">{percent}%</div>
        <div className="progress-bar-container">
          <div className="progress-bar-fill" style={{ width: `${percent}%` }}></div>
        </div>
        <p className="loader-text">Loading interactive experience</p>
      </div>
    </div>
  );
}
