'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const LiquidMeshBackground = () => {
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
    
    // Mesh parameters
    const mesh = {
      width: canvas.width,
      height: canvas.height,
      cols: 20,
      rows: 20,
      points: [],
      time: 0,
      timeStep: 0.01,
      colors: [
        { r: 79, g: 70, b: 229, a: 0.1 }, // Indigo
        { r: 139, g: 92, b: 246, a: 0.1 }, // Purple
        { r: 236, g: 72, b: 153, a: 0.1 }, // Pink
        { r: 16, g: 185, b: 129, a: 0.1 }, // Emerald
      ],
      colorIndex: 0,
      colorSpeed: 0.005,
    };
    
    // Initialize mesh points
    const initMesh = () => {
      mesh.points = [];
      
      const cellWidth = mesh.width / (mesh.cols - 1);
      const cellHeight = mesh.height / (mesh.rows - 1);
      
      for (let y = 0; y < mesh.rows; y++) {
        for (let x = 0; x < mesh.cols; x++) {
          mesh.points.push({
            x: x * cellWidth,
            y: y * cellHeight,
            originX: x * cellWidth,
            originY: y * cellHeight,
            noiseOffsetX: Math.random() * 1000,
            noiseOffsetY: Math.random() * 1000,
            amplitude: Math.random() * 20 + 10,
            frequency: Math.random() * 0.02 + 0.01,
          });
        }
      }
    };
    
    // Simplified noise function (not as good as Perlin but simpler)
    const noise = (x, y) => {
      const X = Math.floor(x) & 255;
      const Y = Math.floor(y) & 255;
      
      const value = Math.sin(X * 0.1) * Math.cos(Y * 0.1) * Math.sin((X + Y) * 0.05);
      return value * 0.5 + 0.5; // Normalize to 0-1
    };
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, mesh.width, mesh.height);
      
      // Update time
      mesh.time += mesh.timeStep;
      
      // Update color
      mesh.colorIndex += mesh.colorSpeed;
      if (mesh.colorIndex >= mesh.colors.length) {
        mesh.colorIndex = 0;
      }
      
      // Get current and next color
      const currentColorIndex = Math.floor(mesh.colorIndex);
      const nextColorIndex = (currentColorIndex + 1) % mesh.colors.length;
      const colorRatio = mesh.colorIndex - currentColorIndex;
      
      const currentColor = mesh.colors[currentColorIndex];
      const nextColor = mesh.colors[nextColorIndex];
      
      // Interpolate between colors
      const color = {
        r: Math.floor(currentColor.r + (nextColor.r - currentColor.r) * colorRatio),
        g: Math.floor(currentColor.g + (nextColor.g - currentColor.g) * colorRatio),
        b: Math.floor(currentColor.b + (nextColor.b - currentColor.b) * colorRatio),
        a: currentColor.a + (nextColor.a - currentColor.a) * colorRatio,
      };
      
      // Update points
      mesh.points.forEach(point => {
        const noiseX = noise(point.noiseOffsetX + mesh.time, point.noiseOffsetY);
        const noiseY = noise(point.noiseOffsetX, point.noiseOffsetY + mesh.time);
        
        point.x = point.originX + Math.sin(noiseX * Math.PI * 2) * point.amplitude;
        point.y = point.originY + Math.sin(noiseY * Math.PI * 2) * point.amplitude;
      });
      
      // Draw mesh
      for (let y = 0; y < mesh.rows - 1; y++) {
        for (let x = 0; x < mesh.cols - 1; x++) {
          const index = y * mesh.cols + x;
          const p0 = mesh.points[index];
          const p1 = mesh.points[index + 1];
          const p2 = mesh.points[index + mesh.cols];
          const p3 = mesh.points[index + mesh.cols + 1];
          
          // Create gradient for each cell
          const gradient = ctx.createLinearGradient(p0.x, p0.y, p3.x, p3.y);
          gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`);
          gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a * 0.5})`);
          
          // Draw first triangle
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.closePath();
          ctx.fillStyle = gradient;
          ctx.fill();
          
          // Draw second triangle
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.lineTo(p3.x, p3.y);
          ctx.closePath();
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Initialize and start animation
    initMesh();
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

export default LiquidMeshBackground;
