'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const FireflyBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Firefly parameters
    const fireflies = {
      count: 100,
      particles: [],
      colors: [
        { r: 79, g: 70, b: 229 }, // Indigo
        { r: 139, g: 92, b: 246 }, // Purple
        { r: 236, g: 72, b: 153 }, // Pink
        { r: 16, g: 185, b: 129 }, // Emerald
      ],
      time: 0,
    };
    
    // Initialize fireflies
    const initFireflies = () => {
      fireflies.particles = [];
      
      for (let i = 0; i < fireflies.count; i++) {
        const colorIndex = Math.floor(Math.random() * fireflies.colors.length);
        const color = fireflies.colors[colorIndex];
        
        fireflies.particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: Math.random() * 2 - 1,
          speedY: Math.random() * 2 - 1,
          color: color,
          alpha: Math.random() * 0.5 + 0.2,
          alphaSpeed: Math.random() * 0.01 + 0.005,
          alphaOffset: Math.random() * Math.PI * 2,
        });
      }
    };
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update time
      fireflies.time += 0.01;
      
      // Update and draw fireflies
      fireflies.particles.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Update alpha (pulsing effect)
        const alpha = particle.alpha * (0.6 + 0.4 * Math.sin(fireflies.time + particle.alphaOffset));
        
        // Draw firefly
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${alpha})`;
        ctx.fill();
        
        // Draw glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        );
        gradient.addColorStop(0, `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${alpha})`);
        gradient.addColorStop(1, `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, 0)`);
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Initialize and start animation
    initFireflies();
    animate();
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default FireflyBackground;
