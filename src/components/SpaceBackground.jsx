import { useEffect, useRef } from 'react';

/* ================================================================
   SpaceBackground — Galaxy scene with Jupiter
   ================================================================ */
export default function SpaceBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let animId;
    let frame  = 0;

    /* ── resize ──────────────────────────────────────────────── */
    const onResize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    onResize();
    window.addEventListener('resize', onResize);

    /* ── STAR FIELD (3 depth layers) ─────────────────────────── */
    const mkStars = () => [
      ...Array.from({ length: 750 }, () => ({           // distant
        x: Math.random(), y: Math.random(),
        r: 0.25 + Math.random() * 0.55,
        a: 0.25 + Math.random() * 0.5,
        ph: Math.random() * Math.PI * 2,
        sp: 0.004 + Math.random() * 0.006,
        hue: Math.random() > 0.88 ? 215 : Math.random() > 0.95 ? 45 : 0,
        sat: Math.random() > 0.88 ? 70 : 0,
        glow: false,
      })),
      ...Array.from({ length: 200 }, () => ({           // mid
        x: Math.random(), y: Math.random(),
        r: 0.7 + Math.random() * 1.0,
        a: 0.45 + Math.random() * 0.45,
        ph: Math.random() * Math.PI * 2,
        sp: 0.009 + Math.random() * 0.011,
        hue: Math.random() > 0.78 ? 210 : Math.random() > 0.9 ? 40 : 0,
        sat: Math.random() > 0.78 ? 80 : 0,
        glow: false,
      })),
      ...Array.from({ length: 50 }, () => ({            // near — bright with glow halo
        x: Math.random(), y: Math.random(),
        r: 1.4 + Math.random() * 1.6,
        a: 0.75 + Math.random() * 0.25,
        ph: Math.random() * Math.PI * 2,
        sp: 0.016 + Math.random() * 0.014,
        hue: Math.random() > 0.55 ? 210 : 0,
        sat: Math.random() > 0.55 ? 80 : 0,
        glow: true,
      })),
    ];
    let stars = mkStars();

    /* ── SHOOTING STARS ──────────────────────────────────────── */
    const shooters = [];
    let shootTimer = 280 + Math.random() * 350;

    const spawnShooter = () => {
      const ang = Math.PI / 5 + (Math.random() - 0.5) * 0.5;
      shooters.push({
        x: canvas.width  * (0.05 + Math.random() * 0.7),
        y: canvas.height * (0.02 + Math.random() * 0.4),
        vx: Math.cos(ang) * (9 + Math.random() * 7),
        vy: Math.sin(ang) * (9 + Math.random() * 7),
        len: 90 + Math.random() * 90,
        life: 0, maxLife: 40 + Math.floor(Math.random() * 25),
      });
    };

    /* ── NEBULA CONFIG ───────────────────────────────────────── */
    const nebulae = [
      { nx:0.07, ny:0.22, rx:340, ry:230, r:115, g:55,  b:240, a:0.10 },
      { nx:0.78, ny:0.18, rx:300, ry:190, r:55,  g:95,  b:220, a:0.09 },
      { nx:0.42, ny:0.04, rx:460, ry:145, r:175, g:55,  b:195, a:0.07 },
      { nx:0.18, ny:0.78, rx:270, ry:195, r:75,  g:55,  b:205, a:0.08 },
      { nx:0.62, ny:0.88, rx:310, ry:210, r:95,  g:75,  b:240, a:0.08 },
    ];

    /* ── helpers ─────────────────────────────────────────────── */
    const drawMilkyWay = () => {
      ctx.save();
      ctx.translate(canvas.width * 0.5, canvas.height * 0.5);
      ctx.rotate(-0.38);
      const bw = canvas.width  * 1.9;
      const bh = canvas.height * 0.40;
      const g  = ctx.createLinearGradient(0, -bh / 2, 0, bh / 2);
      g.addColorStop(0,   'rgba(70,50,130,0)');
      g.addColorStop(0.28,'rgba(70,50,130,0.05)');
      g.addColorStop(0.5, 'rgba(90,70,155,0.10)');
      g.addColorStop(0.72,'rgba(70,50,130,0.05)');
      g.addColorStop(1,   'rgba(70,50,130,0)');
      ctx.fillStyle = g;
      ctx.fillRect(-bw / 2, -bh / 2, bw, bh);
      ctx.restore();
    };

    const drawNebula = ({ nx, ny, rx, ry, r, g, b, a }) => {
      const x = nx * canvas.width;
      const y = ny * canvas.height;
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(1, ry / rx);
      const gr = ctx.createRadialGradient(0, 0, 0, 0, 0, rx);
      gr.addColorStop(0,   `rgba(${r},${g},${b},${a})`);
      gr.addColorStop(0.4, `rgba(${r},${g},${b},${a * 0.5})`);
      gr.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(0, 0, rx, 0, Math.PI * 2);
      ctx.fillStyle = gr;
      ctx.fill();
      ctx.restore();
    };

    const drawStars = () => {
      stars.forEach((s) => {
        s.ph += s.sp;
        const alpha = s.a * (0.72 + 0.28 * Math.sin(s.ph));
        const sx = s.x * canvas.width;
        const sy = s.y * canvas.height;

        if (s.glow) {
          const grd = ctx.createRadialGradient(sx, sy, 0, sx, sy, s.r * 6);
          grd.addColorStop(0, `hsla(${s.hue},${s.sat}%,96%,${alpha * 0.55})`);
          grd.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.beginPath();
          ctx.arc(sx, sy, s.r * 6, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(sx, sy, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.hue},${s.sat}%,96%,${alpha})`;
        ctx.fill();
      });
    };

    const drawShooters = () => {
      for (let i = shooters.length - 1; i >= 0; i--) {
        const s = shooters[i];
        s.x += s.vx;  s.y += s.vy;  s.life++;
        if (s.life > s.maxLife) { shooters.splice(i, 1); continue; }
        const p = s.life / s.maxLife;
        const a = p < 0.25 ? p / 0.25 : 1 - (p - 0.25) / 0.75;
        const mag  = Math.hypot(s.vx, s.vy);
        const tx   = s.x - (s.vx / mag) * s.len * a;
        const ty   = s.y - (s.vy / mag) * s.len * a;
        const g    = ctx.createLinearGradient(tx, ty, s.x, s.y);
        g.addColorStop(0, 'rgba(255,255,255,0)');
        g.addColorStop(0.6, `rgba(200,215,255,${a * 0.35})`);
        g.addColorStop(1, `rgba(255,255,255,${a})`);
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.8;
        ctx.stroke();
      }
    };

    /* ── RINGS ───────────────────────────────────────────────── */
    const drawRings = (jx, jy, jr, front) => {
      const rings = [
        { i:1.22, o:1.44, a:0.22, r:212, g:172, b:118 },
        { i:1.46, o:1.64, a:0.14, r:192, g:152, b:100 },
        { i:1.66, o:1.73, a:0.07, r:178, g:138, b: 92 },
      ];
      const ys = 0.155;

      rings.forEach(({ i, o, a, r, g, b }) => {
        ctx.save();
        ctx.beginPath();
        if (front) {
          // front = lower half (nearer to viewer)
          ctx.rect(jx - jr * 2.2, jy, jr * 4.4, jr * 2.2);
        } else {
          // back = upper half (behind planet)
          ctx.rect(jx - jr * 2.2, jy - jr * 2.2, jr * 4.4, jr * 2.2);
        }
        ctx.clip();

        ctx.beginPath();
        ctx.ellipse(jx, jy, jr * o, jr * o * ys, 0, 0, Math.PI * 2);
        ctx.ellipse(jx, jy, jr * i, jr * i * ys, 0, 0, Math.PI * 2, true);

        const rg = ctx.createLinearGradient(jx - jr * o, jy, jx + jr * o, jy);
        rg.addColorStop(0,   `rgba(${r},${g},${b},${a * 0.45})`);
        rg.addColorStop(0.28,`rgba(${r},${g},${b},${a})`);
        rg.addColorStop(0.5, `rgba(${r},${g},${b},${a * 0.65})`);
        rg.addColorStop(0.72,`rgba(${r},${g},${b},${a})`);
        rg.addColorStop(1,   `rgba(${r},${g},${b},${a * 0.45})`);
        ctx.fillStyle = rg;
        ctx.fill('evenodd');
        ctx.restore();
      });
    };

    /* ── JUPITER ─────────────────────────────────────────────── */
    const drawJupiter = () => {
      const jx = canvas.width  * 0.82;
      const jy = canvas.height * 0.70;
      const jr = Math.min(canvas.width, canvas.height) * 0.205;
      const grsPhase = frame * 0.00025; // very slow GRS drift

      /* outer atmospheric glow */
      const glow = ctx.createRadialGradient(jx, jy, jr * 0.75, jx, jy, jr * 2.3);
      glow.addColorStop(0,   'rgba(215,150,75,0.18)');
      glow.addColorStop(0.35,'rgba(185,100,48,0.09)');
      glow.addColorStop(0.7, 'rgba(110,65,30,0.04)');
      glow.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(jx, jy, jr * 2.3, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      /* rings BEHIND planet */
      drawRings(jx, jy, jr, false);

      /* ── planet surface ── */
      ctx.save();
      ctx.beginPath();
      ctx.arc(jx, jy, jr, 0, Math.PI * 2);
      ctx.clip();

      /* base */
      ctx.fillStyle = '#c2965c';
      ctx.fillRect(jx - jr, jy - jr, jr * 2, jr * 2);

      /* atmospheric bands [yRatio, hRatio, [R,G,B]] */
      const bands = [
        [-1.00, 0.165, [162, 138, 98 ]],   // North Polar Region
        [-0.835,0.125, [152, 78,  40 ]],   // North Temperate Belt
        [-0.710,0.100, [215, 190, 148]],   // North Temperate Zone
        [-0.610,0.185, [168, 84,  44 ]],   // North Equatorial Belt
        [-0.425,0.185, [228, 205, 162]],   // Equatorial Zone
        [-0.240,0.245, [158, 68,  34 ]],   // South Equatorial Belt (GRS)
        [ 0.005,0.135, [215, 192, 150]],   // South Temperate Zone
        [ 0.140,0.125, [155, 82,  46 ]],   // South Temperate Belt
        [ 0.265,0.735, [172, 142, 102]],   // South Polar Region
      ];

      bands.forEach(([yr, hr, [r, g, b]]) => {
        const y = jy + yr * jr;
        const h = hr * jr * 2;
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(jx - jr, y, jr * 2, h + 1);
      });

      /* subtle wavy streaks across belts */
      ctx.globalAlpha = 0.09;
      for (let k = 0; k < 18; k++) {
        const ly = jy - jr + (jr * 2 * k / 18);
        ctx.beginPath();
        ctx.moveTo(jx - jr, ly);
        for (let xi = -jr; xi <= jr; xi += 6) {
          ctx.lineTo(
            jx + xi,
            ly + Math.sin((xi * 0.055) + k * 1.8 + frame * 0.003) * 2.8
          );
        }
        ctx.strokeStyle = 'rgba(0,0,0,0.6)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      /* Great Red Spot */
      const grsX = jx - jr * (0.18 - Math.sin(grsPhase) * 0.05);
      const grsY = jy - jr * 0.095;
      const grsW = jr * 0.215;
      const grsH = jr * 0.120;

      // halo
      const grsHalo = ctx.createRadialGradient(grsX, grsY, 0, grsX, grsY, grsW * 1.6);
      grsHalo.addColorStop(0, 'rgba(198,60,20,0.45)');
      grsHalo.addColorStop(1, 'rgba(198,60,20,0)');
      ctx.beginPath();
      ctx.ellipse(grsX, grsY, grsW * 1.6, grsH * 1.7, 0, 0, Math.PI * 2);
      ctx.fillStyle = grsHalo;
      ctx.fill();

      // main oval
      ctx.beginPath();
      ctx.ellipse(grsX, grsY, grsW, grsH, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(188,55,18,0.96)';
      ctx.fill();

      // inner spiral layers
      [[0.66, 210, 72, 28], [0.38, 225, 88, 40], [0.15, 238, 108, 52]].forEach(
        ([sc, r, g, b]) => {
          ctx.beginPath();
          ctx.ellipse(grsX, grsY, grsW * sc, grsH * sc, 0, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},0.92)`;
          ctx.fill();
        }
      );

      /* limb darkening */
      const limb = ctx.createRadialGradient(
        jx - jr * 0.08, jy - jr * 0.08, jr * 0.45,
        jx, jy, jr
      );
      limb.addColorStop(0, 'rgba(0,0,0,0)');
      limb.addColorStop(0.62,'rgba(0,0,0,0)');
      limb.addColorStop(1,   'rgba(0,0,0,0.65)');
      ctx.fillStyle = limb;
      ctx.fillRect(jx - jr, jy - jr, jr * 2, jr * 2);

      /* specular highlight (sun from upper-left) */
      const spec = ctx.createRadialGradient(
        jx - jr * 0.38, jy - jr * 0.32, 0,
        jx - jr * 0.1,  jy - jr * 0.1, jr * 1.1
      );
      spec.addColorStop(0, 'rgba(255,220,155,0.14)');
      spec.addColorStop(0.4,'rgba(255,200,120,0.05)');
      spec.addColorStop(1,  'rgba(0,0,0,0)');
      ctx.fillStyle = spec;
      ctx.fillRect(jx - jr, jy - jr, jr * 2, jr * 2);

      ctx.restore();

      /* rings IN FRONT of planet */
      drawRings(jx, jy, jr, true);
    };

    /* ── MAIN LOOP ───────────────────────────────────────────── */
    const draw = () => {
      frame++;

      /* space background radial */
      const bg = ctx.createRadialGradient(
        canvas.width * 0.4, canvas.height * 0.25, 0,
        canvas.width * 0.5, canvas.height * 0.5,  canvas.width * 0.85
      );
      bg.addColorStop(0,   '#0b0f20');
      bg.addColorStop(0.45,'#060910');
      bg.addColorStop(1,   '#020407');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawMilkyWay();
      nebulae.forEach(drawNebula);
      drawStars();

      /* shooting stars */
      shootTimer--;
      if (shootTimer <= 0) {
        spawnShooter();
        shootTimer = 320 + Math.floor(Math.random() * 480);
      }
      drawShooters();

      drawJupiter();

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
