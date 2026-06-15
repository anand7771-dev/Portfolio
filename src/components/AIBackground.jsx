import { useEffect, useRef } from 'react';

/* ================================================================
   AIBackground — Futuristic AI Robot background
   Hex grid · Circuit traces · Neural network · Robot silhouette
   ================================================================ */
export default function AIBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let animId, frame = 0;

    const onResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    onResize();
    window.addEventListener('resize', onResize);

    /* ── custom roundRect (cross-browser) ───────────────────── */
    const rrect = (x, y, w, h, r) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
    };

    /* ══════════════════════════════════════════════════════════
       1. NEURAL NETWORK NODES
    ══════════════════════════════════════════════════════════ */
    const nodes = Array.from({ length: 28 }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      r:  2.5 + Math.random() * 3,
      ph: Math.random() * Math.PI * 2,
      hue: Math.random() > 0.55 ? 195 : 265, // cyan or violet
    }));

    const drawNeural = () => {
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy; n.ph += 0.022;
        if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 190) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(139,92,246,${(1 - d / 190) * 0.30})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }
      nodes.forEach(n => {
        const pulse = 0.5 + 0.5 * Math.sin(n.ph);
        const a = 0.5 + 0.4 * pulse;
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 5);
        g.addColorStop(0, `hsla(${n.hue},85%,68%,${a * 0.35})`);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r * 5, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r * (0.8 + 0.2 * pulse), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${n.hue},85%,68%,${a})`; ctx.fill();
      });
    };

    /* ══════════════════════════════════════════════════════════
       2. ANIMATED CIRCUIT TRACES
    ══════════════════════════════════════════════════════════ */
    const buildCircuit = () => {
      const segs = [];
      let x = Math.random() * canvas.width;
      let y = Math.random() * canvas.height;
      let horiz = Math.random() > 0.5;
      let totalLen = 0;
      for (let s = 0; s < 3 + Math.floor(Math.random() * 4); s++) {
        const len  = 50 + Math.random() * 150;
        const sign = Math.random() > 0.5 ? 1 : -1;
        const nx = horiz ? x + len * sign : x;
        const ny = horiz ? y : y + len * sign;
        segs.push({ x1: x, y1: y, x2: nx, y2: ny });
        totalLen += len;
        x = nx; y = ny; horiz = !horiz;
      }
      const colors = ['#00d4ff', '#4488ff', '#7c5cfc'];
      return {
        segs, totalLen,
        prog: Math.random(), // stagger start
        pulse: -0.15,
        alpha: Math.random() * 0.6,
        phase: 'draw',       // draw → pulse → fade
        color: colors[Math.floor(Math.random() * colors.length)],
        spd: 0.004 + Math.random() * 0.004,
      };
    };

    const circuits = Array.from({ length: 22 }, buildCircuit);

    const ptAt = (segs, t, total) => {
      let rem = t * total;
      for (const s of segs) {
        const len = Math.hypot(s.x2 - s.x1, s.y2 - s.y1);
        if (rem <= len) {
          const f = rem / len;
          return { x: s.x1 + (s.x2 - s.x1) * f, y: s.y1 + (s.y2 - s.y1) * f };
        }
        rem -= len;
      }
      const l = segs[segs.length - 1];
      return { x: l.x2, y: l.y2 };
    };

    const drawCircuits = () => {
      circuits.forEach((c, idx) => {
        if (c.phase === 'draw') {
          c.alpha = Math.min(c.alpha + 0.018, 0.75);
          c.prog  = Math.min(c.prog + c.spd, 1);
          if (c.prog >= 1) { c.phase = 'pulse'; c.pulse = -0.05; }
        } else if (c.phase === 'pulse') {
          c.pulse += 0.014;
          if (c.pulse > 1.05) c.phase = 'fade';
        } else {
          c.alpha -= 0.012;
          if (c.alpha <= 0) { circuits[idx] = buildCircuit(); circuits[idx].prog = 0; circuits[idx].alpha = 0; circuits[idx].phase = 'draw'; }
        }

        ctx.save();
        ctx.shadowColor = c.color;
        ctx.shadowBlur  = 6;
        ctx.strokeStyle = c.color;
        ctx.lineWidth   = 1;
        ctx.globalAlpha = c.alpha * 0.55;

        let drawn = 0;
        const drawLen = c.prog * c.totalLen;
        for (const s of c.segs) {
          const slen = Math.hypot(s.x2 - s.x1, s.y2 - s.y1);
          if (drawn >= drawLen) break;
          const frac = Math.min(1, (drawLen - drawn) / slen);
          ctx.beginPath();
          ctx.moveTo(s.x1, s.y1);
          ctx.lineTo(s.x1 + (s.x2 - s.x1) * frac, s.y1 + (s.y2 - s.y1) * frac);
          ctx.stroke();
          if (frac >= 1) {
            ctx.beginPath(); ctx.arc(s.x2, s.y2, 2, 0, Math.PI * 2);
            ctx.fillStyle = c.color; ctx.globalAlpha = c.alpha; ctx.fill();
            ctx.globalAlpha = c.alpha * 0.55;
          }
          drawn += slen;
        }

        if (c.phase === 'pulse' && c.pulse >= 0 && c.pulse <= 1) {
          const pt = ptAt(c.segs, c.pulse, c.totalLen);
          ctx.globalAlpha = c.alpha;
          ctx.shadowBlur  = 18;
          ctx.beginPath(); ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff'; ctx.fill();
          ctx.beginPath(); ctx.arc(pt.x, pt.y, 8, 0, Math.PI * 2);
          const pg = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, 8);
          pg.addColorStop(0, `rgba(255,255,255,0.6)`);
          pg.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.fillStyle = pg; ctx.fill();
        }
        ctx.restore();
      });
    };

    /* ══════════════════════════════════════════════════════════
       3. HEX GRID
    ══════════════════════════════════════════════════════════ */
    let hexOff = 0;
    const drawHexGrid = () => {
      hexOff += 0.06;
      const S = 38, H = S * Math.sqrt(3), W = S * 2;
      ctx.save();
      ctx.globalAlpha = 0.038;
      ctx.strokeStyle = '#00aaff';
      ctx.lineWidth = 0.6;
      for (let row = -1; row < canvas.height / H + 2; row++) {
        for (let col = -1; col < canvas.width / (W * 0.75) + 2; col++) {
          const cx = col * W * 0.75 + (hexOff % (W * 0.75));
          const cy = row * H + (col % 2 === 0 ? 0 : H / 2);
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const a = (Math.PI / 3) * i - Math.PI / 6;
            const hx = cx + S * Math.cos(a);
            const hy = cy + S * Math.sin(a);
            i === 0 ? ctx.moveTo(hx, hy) : ctx.lineTo(hx, hy);
          }
          ctx.closePath(); ctx.stroke();
        }
      }
      ctx.restore();
    };

    /* ══════════════════════════════════════════════════════════
       4. SCANLINE
    ══════════════════════════════════════════════════════════ */
    let scanY = 0;
    const drawScanline = () => {
      scanY = (scanY + 0.55) % canvas.height;
      const sg = ctx.createLinearGradient(0, scanY - 40, 0, scanY + 40);
      sg.addColorStop(0,   'rgba(0,180,255,0)');
      sg.addColorStop(0.5, 'rgba(0,180,255,0.035)');
      sg.addColorStop(1,   'rgba(0,180,255,0)');
      ctx.fillStyle = sg;
      ctx.fillRect(0, scanY - 40, canvas.width, 80);
    };

    /* ══════════════════════════════════════════════════════════
       5. DATA STREAM PARTICLES (floating up)
    ══════════════════════════════════════════════════════════ */
    const dataParticles = Array.from({ length: 35 }, () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * canvas.height,
      speed: 0.3 + Math.random() * 0.6,
      char: Math.random() > 0.5 ? '1' : '0',
      alpha: 0.1 + Math.random() * 0.3,
      size: 8 + Math.floor(Math.random() * 6),
      timer: 0,
      interval: 15 + Math.floor(Math.random() * 25),
    }));

    const drawDataStream = () => {
      ctx.font = '10px monospace';
      dataParticles.forEach(p => {
        p.y -= p.speed;
        p.timer++;
        if (p.timer >= p.interval) { p.char = Math.random() > 0.5 ? '1' : '0'; p.timer = 0; }
        if (p.y < -20) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        ctx.fillStyle = `rgba(0,212,255,${p.alpha})`;
        ctx.font = `${p.size}px monospace`;
        ctx.fillText(p.char, p.x, p.y);
      });
    };

    /* ══════════════════════════════════════════════════════════
       6. AI ROBOT SILHOUETTE
    ══════════════════════════════════════════════════════════ */
    const drawRobot = (baseAlpha) => {
      const rx    = canvas.width  * 0.80;
      const ry    = canvas.height * 0.52;
      const sc    = Math.min(canvas.width, canvas.height) * 0.27;
      const blink = Math.abs(Math.sin(frame * 0.018));

      ctx.save();
      ctx.translate(rx, ry);
      ctx.strokeStyle = '#00aaff';
      ctx.lineWidth   = 1.2;
      ctx.shadowColor = '#00d4ff';
      ctx.shadowBlur  = 10;

      const s = (path, alpha = baseAlpha) => {
        ctx.globalAlpha = alpha;
        ctx.stroke();
      };
      const f = (color, alpha = baseAlpha * 1.5) => {
        ctx.globalAlpha = Math.min(1, alpha);
        ctx.fillStyle = color;
        ctx.fill();
      };

      /* ── ANTENNA ── */
      ctx.globalAlpha = baseAlpha;
      ctx.beginPath();
      ctx.moveTo(0, -sc * 0.70);
      ctx.lineTo(0, -sc * 0.96);
      ctx.stroke();
      // antenna tip glow
      const ag = ctx.createRadialGradient(0, -sc * 0.99, 0, 0, -sc * 0.99, sc * 0.06);
      ag.addColorStop(0, `rgba(0,212,255,${baseAlpha * 5})`);
      ag.addColorStop(1, 'rgba(0,212,255,0)');
      ctx.beginPath(); ctx.arc(0, -sc * 0.99, sc * 0.06, 0, Math.PI * 2);
      ctx.fillStyle = ag; f(ag, baseAlpha * 3);
      ctx.beginPath(); ctx.arc(0, -sc * 0.99, sc * 0.025, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,220,255,${baseAlpha * 6})`;
      ctx.globalAlpha = 1; ctx.fill();

      /* ── HEAD ── */
      const hw = sc * 0.52, hh = sc * 0.44;
      rrect(-hw / 2, -sc * 0.70, hw, hh, sc * 0.06);
      s(null, baseAlpha);

      /* ── HEAD panel lines ── */
      ctx.globalAlpha = baseAlpha * 0.6;
      ctx.lineWidth = 0.6;
      [-0.32, -0.18, -0.04, 0.10].forEach(yf => {
        ctx.beginPath();
        ctx.moveTo(-hw * 0.38, -sc * yf);
        ctx.lineTo( hw * 0.38, -sc * yf);
        ctx.stroke();
      });
      ctx.lineWidth = 1.2;

      /* ── EYES ── */
      const eyeY = -sc * 0.48, eyeR = sc * 0.072;
      [-0.17, 0.17].forEach(ex => {
        const eyeX = ex * sc;
        // eye glow
        const eg = ctx.createRadialGradient(eyeX, eyeY, 0, eyeX, eyeY, eyeR * 3.5);
        eg.addColorStop(0, `rgba(0,220,255,${blink * baseAlpha * 5})`);
        eg.addColorStop(1, 'rgba(0,220,255,0)');
        ctx.beginPath(); ctx.arc(eyeX, eyeY, eyeR * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = eg; ctx.globalAlpha = 1; ctx.fill();
        // eye ring
        ctx.beginPath(); ctx.arc(eyeX, eyeY, eyeR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,220,255,${baseAlpha * 6})`;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = 1; ctx.stroke();
        // inner pupil
        ctx.beginPath(); ctx.arc(eyeX, eyeY, eyeR * 0.45, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,200,${blink * baseAlpha * 8})`;
        ctx.globalAlpha = 1; ctx.fill();
      });
      ctx.strokeStyle = '#00aaff'; ctx.lineWidth = 1.2;

      /* ── MOUTH GRILL ── */
      const mouthY = -sc * 0.295;
      for (let i = -2; i <= 2; i++) {
        ctx.beginPath();
        ctx.moveTo(i * sc * 0.088, mouthY);
        ctx.lineTo(i * sc * 0.088, mouthY + sc * 0.055);
        ctx.globalAlpha = baseAlpha * 0.8; ctx.stroke();
      }
      // mouth border
      rrect(-sc * 0.22, mouthY - sc * 0.012, sc * 0.44, sc * 0.078, sc * 0.015);
      ctx.globalAlpha = baseAlpha * 0.6; ctx.stroke();

      /* ── EAR PANELS ── */
      [-1, 1].forEach(side => {
        const earX = side * (hw / 2 + sc * 0.04);
        rrect(earX - (side > 0 ? sc * 0.01 : sc * 0.15),
              -sc * 0.62, sc * 0.16, sc * 0.28, sc * 0.025);
        ctx.globalAlpha = baseAlpha * 0.65; ctx.stroke();
        // ear circuit detail
        ctx.beginPath();
        ctx.moveTo(earX + (side > 0 ? sc*0.04 : -sc*0.04), -sc * 0.55);
        ctx.lineTo(earX + (side > 0 ? sc*0.04 : -sc*0.04), -sc * 0.45);
        ctx.lineTo(earX + (side > 0 ? sc*0.10 : -sc*0.10), -sc * 0.45);
        ctx.globalAlpha = baseAlpha * 0.45; ctx.stroke();
      });

      /* ── NECK ── */
      rrect(-sc * 0.09, -sc * 0.265, sc * 0.18, sc * 0.10, sc * 0.02);
      ctx.globalAlpha = baseAlpha; ctx.stroke();

      /* ── BODY ── */
      const bw = sc * 0.72, bh = sc * 0.58;
      rrect(-bw / 2, -sc * 0.165, bw, bh, sc * 0.05);
      ctx.globalAlpha = baseAlpha; ctx.stroke();

      /* ── CHEST PANEL ── */
      rrect(-bw * 0.28, -sc * 0.05, bw * 0.56, bh * 0.52, sc * 0.025);
      ctx.globalAlpha = baseAlpha * 0.75; ctx.stroke();

      /* ── CHEST DISPLAY (pulsing) ── */
      const cpulse = 0.5 + 0.5 * Math.sin(frame * 0.04);
      const cg = ctx.createRadialGradient(0, sc * 0.12, 0, 0, sc * 0.12, sc * 0.12);
      cg.addColorStop(0, `rgba(0,212,255,${cpulse * baseAlpha * 3})`);
      cg.addColorStop(1, 'rgba(0,212,255,0)');
      ctx.beginPath(); ctx.arc(0, sc * 0.12, sc * 0.12, 0, Math.PI * 2);
      ctx.fillStyle = cg; ctx.globalAlpha = 1; ctx.fill();
      // core dot
      ctx.beginPath(); ctx.arc(0, sc * 0.12, sc * 0.04, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,220,255,${cpulse * baseAlpha * 8})`;
      ctx.globalAlpha = 1; ctx.fill();

      /* ── CHEST CIRCUIT LINES ── */
      const cl = [
        [-bw*0.22, sc*0.01, bw*0.22, sc*0.01],
        [-bw*0.22, sc*0.07, 0,       sc*0.07],
        [-bw*0.22, sc*0.13, bw*0.18, sc*0.13],
        [-bw*0.22, sc*0.20, bw*0.10, sc*0.20],
      ];
      cl.forEach(([x1,y1,x2,y2]) => {
        ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2);
        ctx.globalAlpha = baseAlpha * 0.55; ctx.stroke();
      });

      /* ── SHOULDERS ── */
      [-1, 1].forEach(side => {
        rrect(side > 0 ? bw/2 - sc*0.01 : -bw/2 - sc*0.21,
              -sc * 0.15, sc * 0.22, sc * 0.20, sc * 0.03);
        ctx.globalAlpha = baseAlpha; ctx.stroke();
      });

      /* ── ARMS ── */
      [-1, 1].forEach(side => {
        const ax = side * (bw / 2 + sc * 0.12);
        rrect(ax - sc * 0.085, sc * 0.05, sc * 0.17, sc * 0.40, sc * 0.04);
        ctx.globalAlpha = baseAlpha * 0.85; ctx.stroke();
        // arm band
        ctx.beginPath();
        ctx.moveTo(ax - sc * 0.085, sc * 0.21);
        ctx.lineTo(ax + sc * 0.085, sc * 0.21);
        ctx.globalAlpha = baseAlpha * 0.5; ctx.stroke();
      });

      /* ── LEGS ── */
      [-0.17, 0.17].forEach(lx => {
        rrect(lx * sc - sc * 0.115, sc * 0.41, sc * 0.23, sc * 0.42, sc * 0.035);
        ctx.globalAlpha = baseAlpha * 0.85; ctx.stroke();
        // knee band
        ctx.beginPath();
        ctx.moveTo(lx * sc - sc * 0.115, sc * 0.565);
        ctx.lineTo(lx * sc + sc * 0.115, sc * 0.565);
        ctx.globalAlpha = baseAlpha * 0.5; ctx.stroke();
      });

      ctx.restore();
    };

    /* ══════════════════════════════════════════════════════════
       MAIN LOOP
    ══════════════════════════════════════════════════════════ */
    const draw = () => {
      frame++;

      /* Background */
      const bg = ctx.createRadialGradient(
        canvas.width * 0.3, canvas.height * 0.35, 0,
        canvas.width * 0.5, canvas.height * 0.5,  canvas.width * 0.9
      );
      bg.addColorStop(0,   '#0b1122');
      bg.addColorStop(0.5, '#060a14');
      bg.addColorStop(1,   '#020408');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawHexGrid();
      drawScanline();
      drawDataStream();
      drawCircuits();
      drawNeural();

      /* Robot opacity gently breathes */
      const robotAlpha = 0.065 + 0.022 * Math.sin(frame * 0.012);
      drawRobot(robotAlpha);

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize); };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0" />;
}
