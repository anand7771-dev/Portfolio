import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth  / 2;
    let mouseY = window.innerHeight / 2;
    let ringX  = mouseX;
    let ringY  = mouseY;
    let animId;

    // Smoothly lerp the ring toward the cursor
    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      ringX = lerp(ringX, mouseX, 0.12);
      ringY = lerp(ringY, mouseY, 0.12);

      dot.style.transform  = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      animId = requestAnimationFrame(animate);
    };
    animate();

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Scale ring on hoverable elements
    const onEnter = () => {
      ring.style.width   = '52px';
      ring.style.height  = '52px';
      ring.style.borderColor = '#6366f1';
      ring.style.opacity = '0.7';
      dot.style.width    = '6px';
      dot.style.height   = '6px';
      dot.style.background = '#6366f1';
    };
    const onLeave = () => {
      ring.style.width   = '32px';
      ring.style.height  = '32px';
      ring.style.borderColor = '#93c5fd';
      ring.style.opacity = '0.5';
      dot.style.width    = '6px';
      dot.style.height   = '6px';
      dot.style.background = '#3b82f6';
    };
    const onDown = () => {
      ring.style.width   = '22px';
      ring.style.height  = '22px';
    };
    const onUp = () => {
      ring.style.width   = '32px';
      ring.style.height  = '32px';
    };

    const interactables = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, label'
    );
    interactables.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    window.addEventListener('mousemove',  onMove);
    window.addEventListener('mousedown',  onDown);
    window.addEventListener('mouseup',    onUp);

    // Hide default system cursor
    document.documentElement.style.cursor = 'none';

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup',   onUp);
      interactables.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
      document.documentElement.style.cursor = '';
    };
  }, []);

  return (
    <>
      {/* Dot — snaps instantly */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[999] rounded-full"
        style={{
          width: '6px',
          height: '6px',
          background: '#3b82f6',
          boxShadow: '0 0 6px rgba(59,130,246,0.6)',
          transition: 'width 0.2s, height 0.2s, background 0.2s',
          willChange: 'transform',
        }}
      />
      {/* Ring — lags behind smoothly */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[998] rounded-full"
        style={{
          width: '32px',
          height: '32px',
          border: '1.5px solid #93c5fd',
          opacity: 0.5,
          transition: 'width 0.25s ease, height 0.25s ease, border-color 0.25s, opacity 0.25s',
          willChange: 'transform',
        }}
      />
    </>
  );
}
