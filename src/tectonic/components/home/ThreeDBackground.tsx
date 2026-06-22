import React, { useEffect, useRef } from 'react';

const ThreeDBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Configuration
    const particleCount = 100;
    const connectionDistance = 150;
    const fov = 250;
    
    // 3D Points
    const particles = Array.from({ length: particleCount }, () => ({
      x: (Math.random() - 0.5) * width * 2,
      y: (Math.random() - 0.5) * height * 2,
      z: Math.random() * 2000,
    }));

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      const cx = width / 2;
      const cy = height / 2;

      // Update and project particles
      const projectedParticles = particles.map(p => {
        // Move towards viewer
        p.z -= 2;
        
        // Reset if passed viewer
        if (p.z <= 1) {
          p.z = 2000;
          p.x = (Math.random() - 0.5) * width * 2;
          p.y = (Math.random() - 0.5) * height * 2;
        }

        const scale = fov / (fov + p.z);
        return {
          x: p.x * scale + cx,
          y: p.y * scale + cy,
          scale: scale,
          originalZ: p.z
        };
      });

      // Draw Connections
      ctx.strokeStyle = '#14b8a6'; // Brand Teal
      ctx.lineWidth = 0.5;

      projectedParticles.forEach((p1, i) => {
        // Draw Particle
        const opacity = Math.max(0, 1 - p1.originalZ / 2000);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.scale * 3, 0, Math.PI * 2);
        ctx.fill();

        // Connect to neighbors
        for (let j = i + 1; j < projectedParticles.length; j++) {
          const p2 = projectedParticles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            // Calculate opacity based on distance and depth
            const lineOpacity = (1 - dist / connectionDistance) * opacity * 0.3;
            ctx.strokeStyle = `rgba(20, 184, 166, ${lineOpacity})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
};

export default ThreeDBackground;