'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const AuroraBackground = () => {
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
    
    // Aurora parameters
    const aurora = {
      width: canvas.width,
      height: canvas.height,
      particles: [],
      particleCount: 100,
      particleSize: 3,
      colors: [
        { r: 79, g: 70, b: 229 }, // Indigo
        { r: 139, g: 92, b: 246 }, // Purple
        { r: 236, g: 72, b: 153 }, // Pink
        { r: 16, g: 185, b: 129 }, // Emerald
      ],
      colorIndex: 0,
      colorSpeed: 0.002,
      waveAmplitude: 50,
      waveFrequency: 0.005,
      waveSpeed: 0.001,
      time: 0,
    };
    
    // Initialize particles
    const initParticles = () => {
      aurora.particles = [];
      
      for (let i = 0; i < aurora.particleCount; i++) {
        aurora.particles.push({
          x: Math.random() * aurora.width,
          y: Math.random() * aurora.height * 0.5 + aurora.height * 0.25,
          size: Math.random() * aurora.particleSize + 1,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.2 - 0.1,
          colorOffset: Math.random() * 2,
        });
      }
    };
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, aurora.width, aurora.height);
      
      // Update time
      aurora.time += 0.01;
      aurora.colorIndex += aurora.colorSpeed;
      if (aurora.colorIndex >= aurora.colors.length) {
        aurora.colorIndex = 0;
      }
      
      // Get current and next color
      const currentColorIndex = Math.floor(aurora.colorIndex);
      const nextColorIndex = (currentColorIndex + 1) % aurora.colors.length;
      const colorRatio = aurora.colorIndex - currentColorIndex;
      
      const currentColor = aurora.colors[currentColorIndex];
      const nextColor = aurora.colors[nextColorIndex];
      
      // Interpolate between colors
      const color = {
        r: Math.floor(currentColor.r + (nextColor.r - currentColor.r) * colorRatio),
        g: Math.floor(currentColor.g + (nextColor.g - currentColor.g) * colorRatio),
        b: Math.floor(currentColor.b + (nextColor.b - currentColor.b) * colorRatio),
      };
      
      // Draw aurora waves
      for (let y = aurora.height * 0.3; y < aurora.height * 0.7; y += 5) {
        ctx.beginPath();
        
        for (let x = 0; x <= aurora.width; x += 5) {
          const waveOffset = Math.sin(x * aurora.waveFrequency + aurora.time * aurora.waveSpeed) * aurora.waveAmplitude;
          const yPos = y + waveOffset;
          
          if (x === 0) {
            ctx.moveTo(x, yPos);
          } else {
            ctx.lineTo(x, yPos);
          }
        }
        
        // Create gradient for each wave
        const gradient = ctx.createLinearGradient(0, y - 50, 0, y + 50);
        const alpha = 0.03 - Math.abs(y - aurora.height * 0.5) / aurora.height;
        
        gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
        gradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`);
        gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      
      // Update and draw particles
      aurora.particles.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = aurora.width;
        if (particle.x > aurora.width) particle.x = 0;
        if (particle.y < aurora.height * 0.25) particle.y = aurora.height * 0.75;
        if (particle.y > aurora.height * 0.75) particle.y = aurora.height * 0.25;
        
        // Draw particle
        const particleColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${0.3 + Math.sin(aurora.time + particle.colorOffset) * 0.2})`;
        ctx.fillStyle = particleColor;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Initialize and start animation
    initParticles();
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

export default AuroraBackground;
