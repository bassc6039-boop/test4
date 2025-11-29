import React, { useEffect, useRef } from 'react';
import { Theme } from '../types';

interface BackgroundDotsProps {
  theme: Theme;
}

const BackgroundDots: React.FC<BackgroundDotsProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrameId: number;
    let mouseX = -1000;
    let mouseY = -1000;

    // Configuration based on theme
    const getDotColor = () => {
      switch (theme) {
        case 'onyx': return 'rgba(255, 255, 255, 0.15)';
        case 'catppuccin': return 'rgba(166, 173, 200, 0.2)';
        default: return 'rgba(0, 0, 0, 0.1)';
      }
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = getDotColor();

      const spacing = 30;
      const rows = Math.ceil(height / spacing);
      const cols = Math.ceil(width / spacing);

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const px = x * spacing;
          const py = y * spacing;

          // Calculate distance to mouse
          const dx = mouseX - px;
          const dy = mouseY - py;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 200;
          
          let size = 1.5;
          let alpha = 1;

          // Interaction: dots shrink and fade slightly when mouse is near (antigravity repulsion feel)
          if (distance < maxDistance) {
             const factor = 1 - distance / maxDistance;
             size = 1.5 + factor * 2; // Grow slightly
          }

          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    handleResize();
    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
};

export default BackgroundDots;