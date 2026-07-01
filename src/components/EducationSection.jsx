import React, { useEffect, useRef } from 'react';

const totalEduFrames = 164;

export default function EducationSection({ images }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const step1Ref = useRef(null);
  const step2Ref = useRef(null);
  const step3Ref = useRef(null);

  const animStateRef = useRef({
    currentFrame: 0,
    targetFrame: 0,
    ease: 0.08,
    isLoopActive: false
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const narrativeSteps = [
      { ref: step1Ref, start: 0.0, active: 0.15, end: 0.33 },
      { ref: step2Ref, start: 0.35, active: 0.5, end: 0.65 },
      { ref: step3Ref, start: 0.68, active: 0.83, end: 1.0 }
    ];

    function drawCoverImage(context, img) {
      const width = window.innerWidth;
      const height = window.innerHeight;
      context.clearRect(0, 0, width, height);

      const imgRatio = img.width / img.height;
      const canvasRatio = width / height;
      let sWidth, sHeight, sx, sy;

      if (imgRatio > canvasRatio) {
        sHeight = img.height;
        sWidth = img.height * canvasRatio;
        sx = (img.width - sWidth) / 2;
        sy = 0;
      } else {
        sWidth = img.width;
        sHeight = img.width / canvasRatio;
        sx = 0;
        sy = (img.height - sHeight) / 2;
      }

      context.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, width, height);
    }

    function renderFrame(frameIndex) {
      const index = Math.max(0, Math.min(totalEduFrames - 1, frameIndex));
      const img = images[index];
      if (!img) return;
      drawCoverImage(ctx, img);
    }

    function resizeCanvas() {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      renderFrame(Math.round(animStateRef.current.currentFrame));
    }

    function updateNarrativesGeneric(progress) {
      narrativeSteps.forEach((step) => {
        const el = step.ref.current;
        if (!el) return;

        let opacity = 0;
        let yOffset = 30;

        if (progress >= step.start && progress <= step.end) {
          if (progress < step.active) {
            const range = step.active - step.start;
            const current = progress - step.start;
            const factor = current / range;
            opacity = factor;
            yOffset = 30 * (1 - factor);
          } else {
            const range = step.end - step.active;
            const current = progress - step.active;
            const factor = current / range;
            opacity = 1 - factor;
            yOffset = -30 * factor;
          }
        } else if (progress > step.end) {
          opacity = 0;
          yOffset = -30;
        } else {
          opacity = 0;
          yOffset = 30;
        }

        el.style.opacity = opacity;
        el.style.transform = `translateY(calc(-50% + ${yOffset}px))`;
        el.style.pointerEvents = opacity > 0 ? 'auto' : 'none';
      });
    }

    function eduAnimationLoop() {
      const animState = animStateRef.current;
      const diff = animState.targetFrame - animState.currentFrame;
      updateNarrativesGeneric(animState.currentFrame / (totalEduFrames - 1));

      if (Math.abs(diff) < 0.05) {
        animState.currentFrame = animState.targetFrame;
        renderFrame(Math.round(animState.currentFrame));
        updateNarrativesGeneric(animState.currentFrame / (totalEduFrames - 1));
        animState.isLoopActive = false;
        return;
      }

      animState.currentFrame += diff * animState.ease;
      renderFrame(Math.round(animState.currentFrame));
      requestAnimationFrame(eduAnimationLoop);
    }

    function handleScroll() {
      const scrollY = window.scrollY;
      const container = containerRef.current;
      if (!container) return;

      const eduTop = container.getBoundingClientRect().top + scrollY;
      const eduHeight = container.offsetHeight;
      const eduRange = eduHeight - window.innerHeight;
      let eduProgress = (scrollY - eduTop) / eduRange;
      eduProgress = Math.max(0, Math.min(1, eduProgress));

      animStateRef.current.targetFrame = eduProgress * (totalEduFrames - 1);

      if (!animStateRef.current.isLoopActive && scrollY >= eduTop - window.innerHeight && scrollY <= eduTop + eduHeight) {
        animStateRef.current.isLoopActive = true;
        requestAnimationFrame(eduAnimationLoop);
      }
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', handleScroll);

    renderFrame(0);
    handleScroll();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [images]);

  return (
    <div id="education" ref={containerRef} className="education-scroll-container">
      <div className="education-canvas-sticky">
        <canvas ref={canvasRef} id="education-canvas"></canvas>

        <div className="glow-orb orb-education-1"></div>
        <div className="glow-orb orb-education-2"></div>

        <div className="education-narrative">
          <div ref={step1Ref} className="education-narrative-step step-edu-1" id="step-edu-1">
            <span className="badge">Secondary Education</span>
            <h2>Jawahar Navodaya Vidyalaya</h2>
            <p>2021 - 2023 | Completed with a score of 86%.</p>
          </div>

          <div ref={step2Ref} className="education-narrative-step step-edu-2" id="step-edu-2">
            <span className="badge">Higher Education</span>
            <h2>Atmiya University</h2>
            <p>2021 - 2026 | Bachelor of Computer Applications (BCA)</p>
          </div>

          <div ref={step3Ref} className="education-narrative-step step-edu-3" id="step-edu-3">
            <span className="badge">Work Experience</span>
            <h2>Simform Software LLP</h2>
            <p>April 2025 - August 2025 | Frontend Developer. Simform is a digital engineering and software development company that helps businesses build scalable digital products and provides agile teams to extend.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
