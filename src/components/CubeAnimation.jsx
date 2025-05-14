'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CubeAnimation = () => {
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
    
    // 3D cube parameters
    const cube = {
      size: 100,
      position: { x: canvas.width / 2, y: canvas.height / 2, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      vertices: [],
      edges: [
        [0, 1], [1, 2], [2, 3], [3, 0], // Front face
        [4, 5], [5, 6], [6, 7], [7, 4], // Back face
        [0, 4], [1, 5], [2, 6], [3, 7]  // Connecting edges
      ],
      rotationSpeed: { x: 0.005, y: 0.007, z: 0.003 },
      colors: [
        { r: 79, g: 70, b: 229 }, // Indigo
        { r: 139, g: 92, b: 246 }, // Purple
        { r: 236, g: 72, b: 153 }, // Pink
        { r: 16, g: 185, b: 129 }, // Emerald
      ],
      colorIndex: 0,
      colorSpeed: 0.005,
    };
    
    // Initialize cube vertices
    const initCube = () => {
      const s = cube.size / 2;
      
      // Define the 8 vertices of the cube
      cube.vertices = [
        { x: -s, y: -s, z: -s }, // 0: front bottom left
        { x: s, y: -s, z: -s },  // 1: front bottom right
        { x: s, y: s, z: -s },   // 2: front top right
        { x: -s, y: s, z: -s },  // 3: front top left
        { x: -s, y: -s, z: s },  // 4: back bottom left
        { x: s, y: -s, z: s },   // 5: back bottom right
        { x: s, y: s, z: s },    // 6: back top right
        { x: -s, y: s, z: s }    // 7: back top left
      ];
    };
    
    // Project 3D point to 2D
    const project = (point) => {
      // Simple perspective projection
      const focalLength = 300;
      const scale = focalLength / (focalLength + point.z);
      
      return {
        x: point.x * scale + cube.position.x,
        y: point.y * scale + cube.position.y
      };
    };
    
    // Rotate point around axis
    const rotatePoint = (point) => {
      // Rotate around X axis
      let y = point.y * Math.cos(cube.rotation.x) - point.z * Math.sin(cube.rotation.x);
      let z = point.y * Math.sin(cube.rotation.x) + point.z * Math.cos(cube.rotation.x);
      
      // Rotate around Y axis
      let x = point.x * Math.cos(cube.rotation.y) - z * Math.sin(cube.rotation.y);
      z = point.x * Math.sin(cube.rotation.y) + z * Math.cos(cube.rotation.y);
      
      // Rotate around Z axis
      let tempX = x;
      x = x * Math.cos(cube.rotation.z) - y * Math.sin(cube.rotation.z);
      y = tempX * Math.sin(cube.rotation.z) + y * Math.cos(cube.rotation.z);
      
      return { x, y, z };
    };
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update rotation
      cube.rotation.x += cube.rotationSpeed.x;
      cube.rotation.y += cube.rotationSpeed.y;
      cube.rotation.z += cube.rotationSpeed.z;
      
      // Update color
      cube.colorIndex += cube.colorSpeed;
      if (cube.colorIndex >= cube.colors.length) {
        cube.colorIndex = 0;
      }
      
      // Get current and next color
      const currentColorIndex = Math.floor(cube.colorIndex);
      const nextColorIndex = (currentColorIndex + 1) % cube.colors.length;
      const colorRatio = cube.colorIndex - currentColorIndex;
      
      const currentColor = cube.colors[currentColorIndex];
      const nextColor = cube.colors[nextColorIndex];
      
      // Interpolate between colors
      const color = {
        r: Math.floor(currentColor.r + (nextColor.r - currentColor.r) * colorRatio),
        g: Math.floor(currentColor.g + (nextColor.g - currentColor.g) * colorRatio),
        b: Math.floor(currentColor.b + (nextColor.b - currentColor.b) * colorRatio),
      };
      
      // Calculate projected vertices
      const projectedVertices = cube.vertices.map(vertex => {
        const rotated = rotatePoint(vertex);
        return project(rotated);
      });
      
      // Draw edges
      ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.7)`;
      ctx.lineWidth = 2;
      
      cube.edges.forEach(edge => {
        const v1 = projectedVertices[edge[0]];
        const v2 = projectedVertices[edge[1]];
        
        ctx.beginPath();
        ctx.moveTo(v1.x, v1.y);
        ctx.lineTo(v2.x, v2.y);
        ctx.stroke();
      });
      
      // Draw vertices
      ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.9)`;
      
      projectedVertices.forEach(vertex => {
        ctx.beginPath();
        ctx.arc(vertex.x, vertex.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Initialize and start animation
    initCube();
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

export default CubeAnimation;
