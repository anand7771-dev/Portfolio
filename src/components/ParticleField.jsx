import { useEffect, useRef } from 'react';

const FOCAL    = 500;   // camera focal length
const RANGE    = 700;   // half-size of the 3D world
const COUNT    = 190;   // total particles

export default function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let animId;

    /* ── resize ──────────────────────────────────────── */
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    /* ── mouse tracking ──────────────────────────────── */
    let mouse = { x: 0, y: 0 };
    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    /* ── particles in 3D space ───────────────────────── */
    const particles = Array.from({ length: COUNT }, () => {
      const r = RANGE * Math.cbrt(Math.random()); // sphere distribution
      const θ = Math.random() * Math.PI * 2;
      const φ = Math.acos(2 * Math.random() - 1);
      return {
        x:  r * Math.sin(φ) * Math.cos(θ),
        y:  r * Math.sin(φ) * Math.sin(θ),
        z:  r * Math.cos(φ),
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        vz: (Math.random() - 0.5) * 0.18,
        hue: Math.random() > 0.5 ? 245 : 270, // indigo or violet
      };
    });

    /* ── rotation helpers ────────────────────────────── */
    let rotY = 0;
    let rotX = 0;

    const applyRotY = (x, z, a) => ({
      x:  x * Math.cos(a) + z * Math.sin(a),
      z: -x * Math.sin(a) + z * Math.cos(a),
    });
    const applyRotX = (y, z, a) => ({
      y: y * Math.cos(a) - z * Math.sin(a),
      z: y * Math.sin(a) + z * Math.cos(a),
    });

    /* ── perspective project ─────────────────────────── */
    const project = (x, y, z, cx, cy) => {
      const s = FOCAL / (FOCAL + z + RANGE);
      return { sx: cx + x * s, sy: cy + y * s, scale: s };
    };

    /* ── draw loop ───────────────────────────────────── */
    const draw = () => {
      rotY += 0.0007 + mouse.x * 0.0003;
      rotX += 0.0003 + mouse.y * 0.0002;

      const cx = canvas.width  / 2;
      const cy = canvas.height / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* transform & project */
      const pts = particles.map((p) => {
        /* drift */
        p.x += p.vx;  p.y += p.vy;  p.z += p.vz;
        if (Math.abs(p.x) > RANGE) p.vx *= -1;
        if (Math.abs(p.y) > RANGE) p.vy *= -1;
        if (Math.abs(p.z) > RANGE) p.vz *= -1;

        /* rotate */
        const ry = applyRotY(p.x, p.z, rotY);
        const rx = applyRotX(p.y, ry.z, rotX);

        const { sx, sy, scale } = project(ry.x, rx.y, rx.z, cx, cy);
        const depth = (rx.z + RANGE) / (RANGE * 2); // 0 far → 1 near

        return { sx, sy, scale, depth, rz: rx.z, hue: p.hue };
      });

      /* depth-sort (back → front) */
      pts.sort((a, b) => a.rz - b.rz);

      /* ── connections ──────────────────────────────── */
      const MAX_DIST = 110;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].sx - pts[j].sx;
          const dy = pts[i].sy - pts[j].sy;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < MAX_DIST) {
            const avg   = (pts[i].depth + pts[j].depth) * 0.5;
            const alpha = (1 - d / MAX_DIST) * avg * 0.45;
            ctx.beginPath();
            ctx.moveTo(pts[i].sx, pts[i].sy);
            ctx.lineTo(pts[j].sx, pts[j].sy);
            ctx.strokeStyle = `hsla(260, 80%, 65%, ${alpha})`;
            ctx.lineWidth   = 0.6;
            ctx.stroke();
          }
        }
      }

      /* ── dots ─────────────────────────────────────── */
      pts.forEach(({ sx, sy, scale, depth, hue }) => {
        const r     = Math.max(0.4, scale * 3.5);
        const alpha = 0.15 + depth * 0.8;

        /* glow halo for near particles */
        if (depth > 0.65) {
          const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, r * 5);
          g.addColorStop(0, `hsla(${hue}, 80%, 65%, ${alpha * 0.45})`);
          g.addColorStop(1, `hsla(${hue}, 80%, 65%, 0)`);
          ctx.beginPath();
          ctx.arc(sx, sy, r * 5, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        }

        /* solid dot */
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue}, 80%, 65%, ${alpha})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: 0.75 }}
    />
  );
}
