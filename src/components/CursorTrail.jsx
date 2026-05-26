import { useEffect, useRef } from 'react';

export default function CursorTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    const trail = [];
    const MAX = 28;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e) => {
      trail.push({ x: e.clientX, y: e.clientY, life: 1 });
      if (trail.length > MAX) trail.shift();
    };
    window.addEventListener('mousemove', onMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < trail.length; i++) {
        const p = trail[i];
        p.life -= 0.04;
        if (p.life <= 0) continue;

        const radius = (i / trail.length) * 7 + 1;
        const alpha = p.life * 0.6;

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 2);
        gradient.addColorStop(0, `rgba(139, 92, 246, ${alpha})`);
        gradient.addColorStop(0.5, `rgba(59, 130, 246, ${alpha * 0.5})`);
        gradient.addColorStop(1, `rgba(59, 130, 246, 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[5]"
    />
  );
}
