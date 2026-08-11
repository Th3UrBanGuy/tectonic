"use client";
import React, { useEffect, useRef } from 'react';

const LightParticles = () => {
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

    const colors = [
      { r: 20, g: 184, b: 166 },   // brand teal
      { r: 139, g: 92, b: 246 },   // purple
      { r: 34, g: 211, b: 238 },   // cyan
      { r: 99, g: 102, b: 241 },   // indigo
      { r: 45, g: 212, b: 191 },   // brand-400
    ];

    const particleCount = Math.min(80, Math.floor((width * height) / 18000));
    const webDist = 180;       // primary web connection range
    const threadDist = 280;    // secondary thread range

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: { r: number; g: number; b: number };
      opacity: number;
      pulse: number;
      pulseSpeed: number;
    }

    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.25,
      radius: Math.random() * 2.5 + 1.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.3 + 0.15,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.008 + 0.003,
    }));

    let animId: number;
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.005;

      // Update positions
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;

        // Gentle sine drift for organic movement
        p.x += Math.sin(time + p.pulse) * 0.15;
        p.y += Math.cos(time + p.pulse * 0.7) * 0.1;

        // Wrap
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;
      }

      // ── Draw secondary threads (thin, faint) ──
      ctx.lineWidth = 0.3;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < threadDist && dist > webDist) {
            const t = (dist - webDist) / (threadDist - webDist);
            const lineOpacity = (1 - t) * 0.06;
            ctx.strokeStyle = `rgba(20, 184, 166, ${lineOpacity})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // ── Draw primary web connections (thicker, colored) ──
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < webDist) {
            const t = 1 - dist / webDist;
            const lineOpacity = t * 0.2;

            // Blend the two particle colors
            const mr = Math.round((a.color.r + b.color.r) / 2);
            const mg = Math.round((a.color.g + b.color.g) / 2);
            const mb = Math.round((a.color.b + b.color.b) / 2);

            ctx.strokeStyle = `rgba(${mr}, ${mg}, ${mb}, ${lineOpacity})`;
            ctx.lineWidth = t * 1.2 + 0.3;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();

            // Glow on close connections
            if (t > 0.6) {
              ctx.strokeStyle = `rgba(${mr}, ${mg}, ${mb}, ${(t - 0.6) * 0.15})`;
              ctx.lineWidth = t * 3;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }

      // ── Draw particles (glow + core) ──
      for (const p of particles) {
        const pulsedOpacity = p.opacity + Math.sin(p.pulse) * 0.06;
        const pulsedRadius = p.radius + Math.sin(p.pulse) * 0.4;

        // Outer glow halo
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, pulsedRadius * 6);
        glow.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${pulsedOpacity * 0.35})`);
        glow.addColorStop(0.5, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${pulsedOpacity * 0.08})`);
        glow.addColorStop(1, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, pulsedRadius * 6, 0, Math.PI * 2);
        ctx.fill();

        // Core dot
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${pulsedOpacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, pulsedRadius, 0, Math.PI * 2);
        ctx.fill();

        // Bright center
        ctx.fillStyle = `rgba(255, 255, 255, ${pulsedOpacity * 0.5})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, pulsedRadius * 0.4, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
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
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
};

export default LightParticles;
