/* FloatingShapes.jsx
   Six CSS-3D wireframe cubes that slowly rotate in the background.
   Each cube is built from 6 absolutely-positioned faces with
   transform-style: preserve-3d, giving a genuine 3D wireframe look.
*/

const SHAPES = [
  { size: 90,  pos: { top: '7%',   left: '3%'   }, dur: '22s', delay: '0s',    color: 'rgba(99,102,241,0.30)',  bg: 'rgba(99,102,241,0.02)'  },
  { size: 60,  pos: { top: '12%',  right: '4%'  }, dur: '30s', delay: '-9s',   color: 'rgba(139,92,246,0.25)', bg: 'rgba(139,92,246,0.015)' },
  { size: 110, pos: { bottom:'8%', left: '6%'   }, dur: '38s', delay: '-17s',  color: 'rgba(59,130,246,0.22)', bg: 'rgba(59,130,246,0.01)'  },
  { size: 50,  pos: { bottom:'18%',right: '5%'  }, dur: '18s', delay: '-5s',   color: 'rgba(99,102,241,0.28)', bg: 'rgba(99,102,241,0.015)' },
  { size: 70,  pos: { top: '42%',  right: '2%'  }, dur: '25s', delay: '-12s',  color: 'rgba(139,92,246,0.20)', bg: 'rgba(139,92,246,0.01)'  },
  { size: 40,  pos: { top: '55%',  left: '1%'   }, dur: '15s', delay: '-4s',   color: 'rgba(6,182,212,0.22)',  bg: 'rgba(6,182,212,0.01)'   },
];

function WireframeCube({ size, pos, dur, delay, color, bg }) {
  const half = size / 2;

  /* 6 faces: front, back, left, right, top, bottom */
  const faces = [
    { transform: `translateZ(${half}px)` },
    { transform: `rotateY(180deg) translateZ(${half}px)` },
    { transform: `rotateY(90deg)  translateZ(${half}px)` },
    { transform: `rotateY(-90deg) translateZ(${half}px)` },
    { transform: `rotateX(90deg)  translateZ(${half}px)` },
    { transform: `rotateX(-90deg) translateZ(${half}px)` },
  ];

  return (
    <div
      className="absolute"
      style={{ ...pos, width: size, height: size, perspective: '600px' }}
    >
      {/* rotating inner wrapper */}
      <div
        style={{
          width: size,
          height: size,
          transformStyle: 'preserve-3d',
          animation: `rotateCube ${dur} linear ${delay} infinite`,
        }}
      >
        {faces.map((f, i) => (
          <div
            key={i}
            style={{
              position:  'absolute',
              inset:     0,
              border:    `1px solid ${color}`,
              background: bg,
              transform: f.transform,
              backfaceVisibility: 'visible',
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function FloatingShapes() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {SHAPES.map((s, i) => (
        <WireframeCube key={i} {...s} />
      ))}
    </div>
  );
}
