import React, { useEffect, useRef } from 'react';

const totalFrames = 240;

export default function HeroSection({ images }) {
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
      { ref: step1Ref, start: 0.0, active: 0.1, end: 0.25 },
      { ref: step2Ref, start: 0.35, active: 0.5, end: 0.65 },
      { ref: step3Ref, start: 0.75, active: 0.9, end: 1.0 }
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
      const index = Math.max(0, Math.min(totalFrames - 1, frameIndex));
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

    function heroAnimationLoop() {
      const animState = animStateRef.current;
      const diff = animState.targetFrame - animState.currentFrame;
      updateNarrativesGeneric(animState.currentFrame / (totalFrames - 1));

      if (Math.abs(diff) < 0.05) {
        animState.currentFrame = animState.targetFrame;
        renderFrame(Math.round(animState.currentFrame));
        updateNarrativesGeneric(animState.currentFrame / (totalFrames - 1));
        animState.isLoopActive = false;
        return;
      }

      animState.currentFrame += diff * animState.ease;
      renderFrame(Math.round(animState.currentFrame));
      requestAnimationFrame(heroAnimationLoop);
    }

    function handleScroll() {
      const scrollY = window.scrollY;
      const container = containerRef.current;
      if (!container) return;

      const heroTop = container.getBoundingClientRect().top + scrollY;
      const heroHeight = container.offsetHeight;
      const heroRange = heroHeight - window.innerHeight;
      let heroProgress = (scrollY - heroTop) / heroRange;
      heroProgress = Math.max(0, Math.min(1, heroProgress));

      animStateRef.current.targetFrame = heroProgress * (totalFrames - 1);

      if (!animStateRef.current.isLoopActive && scrollY < heroTop + heroHeight) {
        animStateRef.current.isLoopActive = true;
        requestAnimationFrame(heroAnimationLoop);
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
    <div id="hero" ref={containerRef} className="hero-scroll-container">
      <div className="hero-canvas-sticky">
        <canvas ref={canvasRef} id="animation-canvas"></canvas>

        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>

        <div className="hero-narrative">
          <div ref={step1Ref} className="narrative-step step-1" id="step-1">
            <span className="badge">Creative Developer</span>
            <h1>Hi, I'm <span className="text-glow">Vansh</span></h1>
            <p>I build web experiences where imagination meets execution.</p>
          </div>

          <div ref={step2Ref} className="narrative-step step-2" id="step-2">
            <h2>Entrepreneur & IT Developer</h2>
            <p>I am an entrepreneur and IT developer focused on building scalable digital products and growth-driven brands. My work sits at the intersection of technology, business strategy, and execution.</p>
          </div>

          <div ref={step3Ref} className="narrative-step step-3" id="step-3">
            <h2>Industrial Venture Builder</h2>
            <p>I am an entrepreneur with the capability to conceptualize, establish, and scale industrial ventures — including manufacturing plants, operational firms, and structured business ecosystems.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
