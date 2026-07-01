import React, { useState, useRef, useEffect } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const cardRef = useRef(null);
  
  const mouseStateRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    isHovered: false
  });
  const rafIdRef = useRef(null);

  useEffect(() => {
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    fetch("https://formsubmit.co/ajax/vanshribadiya13@gmail.com", {
      method: "POST",
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      })
    })
    .then(response => {
      return response.json().then(data => {
        if (!response.ok || data.success === "false" || data.success === false) {
          throw data;
        }
        return data;
      });
    })
    .then(data => {
      setIsSubmitting(false);
      setIsSuccess(true);
    })
    .catch(error => {
      setIsSubmitting(false);
      const errMsg = error?.message || error?.error || "";
      if (errMsg.toLowerCase().includes('activate') || errMsg.toLowerCase().includes('confirm') || errMsg.toLowerCase().includes('first submit')) {
        setIsSuccess(true);
        alert("Form submitted! Since this is the first submission, please check your inbox at vanshribadiya13@gmail.com to activate this form.");
      } else {
        alert("Form submission failed: " + (errMsg || "Please try again."));
        console.error(error);
      }
    });
  }

  function updateTilt() {
    const card = cardRef.current;
    if (!card) {
      rafIdRef.current = null;
      return;
    }

    const state = mouseStateRef.current;
    const ease = 0.08;
    state.x += (state.targetX - state.x) * ease;
    state.y += (state.targetY - state.y) * ease;

    card.style.transform = `perspective(1000px) rotateX(${state.x}deg) rotateY(${state.y}deg) translateY(${state.isHovered ? -5 : 0}px)`;

    const diff = Math.max(Math.abs(state.targetX - state.x), Math.abs(state.targetY - state.y));
    
    if (diff > 0.01 || state.isHovered) {
      rafIdRef.current = requestAnimationFrame(updateTilt);
    } else {
      state.x = 0;
      state.y = 0;
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
      rafIdRef.current = null;
    }
  }

  function handleMouseMove(e) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const xVal = e.clientX - rect.left;
    const yVal = e.clientY - rect.top;
    
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    mouseStateRef.current.targetX = -(yVal - yc) / 18;
    mouseStateRef.current.targetY = (xVal - xc) / 18;
    mouseStateRef.current.isHovered = true;

    if (!rafIdRef.current) {
      rafIdRef.current = requestAnimationFrame(updateTilt);
    }
  }

  function handleMouseLeave() {
    mouseStateRef.current.isHovered = false;
    mouseStateRef.current.targetX = 0;
    mouseStateRef.current.targetY = 0;
  }

  return (
    <section id="contact" className="section contact-section">
      <div className="container container-narrow">
        <div className="section-header text-center">
          <h2 className="section-title">Let's Create Together</h2>
          <p className="section-intro">Have a project idea, want to collaborate, or just want to chat about creative frontend code? Feel free to reach out!</p>
        </div>

        <div 
          className="glass-card contact-card"
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transformStyle: 'preserve-3d',
            transition: 'none'
          }}
        >
          {!isSuccess ? (
            <form id="contact-form" className="contact-form" onSubmit={handleSubmit} style={{ transformStyle: 'preserve-3d' }}>
              <div className="form-row">
                <div className="form-group">
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    placeholder=" " 
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                  <label htmlFor="name">Your Name</label>
                  <div className="input-line"></div>
                </div>
                <div className="form-group">
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    placeholder=" " 
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                  <label htmlFor="email">Your Email</label>
                  <div className="input-line"></div>
                </div>
              </div>
              
              <div className="form-group">
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  required 
                  placeholder=" " 
                  value={formData.subject}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                <label htmlFor="subject">Subject</label>
                <div className="input-line"></div>
              </div>

              <div className="form-group">
                <textarea 
                  id="message" 
                  name="message" 
                  required 
                  rows="5" 
                  placeholder=" " 
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                ></textarea>
                <label htmlFor="message">Message</label>
                <div className="input-line"></div>
              </div>

              <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </form>
          ) : (
            <div id="form-success" className="form-success-message show">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#00d2ff" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <h3>Message Sent!</h3>
              <p>Thank you for reaching out. I'll get back to you shortly.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
