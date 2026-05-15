'use client';

// Nuages pixel retro — fixed, dérivent sur toutes les pages

const CLOUDS = [
  { top: '7%',  w: 384, h: 128, dur: 30, delay: 0,    opacity: 0.88 },
  { top: '18%', w: 256, h: 85,  dur: 42, delay: -14,  opacity: 0.70 },
  { top: '28%', w: 480, h: 160, dur: 26, delay: -8,   opacity: 0.82 },
  { top: '40%', w: 320, h: 107, dur: 38, delay: -22,  opacity: 0.65 },
  { top: '53%', w: 416, h: 138, dur: 34, delay: -18,  opacity: 0.75 },
  { top: '64%', w: 224, h: 75,  dur: 24, delay: -6,   opacity: 0.60 },
  { top: '74%', w: 352, h: 117, dur: 46, delay: -32,  opacity: 0.78 },
  { top: '85%', w: 288, h: 96,  dur: 28, delay: -10,  opacity: 0.68 },
];

// Nuage pixel art style retro (pattern 12×5)
function PixelCloud({ w, h, opacity }: { w: number; h: number; opacity: number }) {
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 12 5"
      style={{ imageRendering: 'pixelated', display: 'block', opacity }}
    >
      <rect x="4" y="0" width="4" height="1" fill="white" />
      <rect x="2" y="1" width="8" height="1" fill="white" />
      <rect x="0" y="2" width="12" height="1" fill="white" />
      <rect x="0" y="3" width="12" height="1" fill="white" />
      <rect x="1" y="4" width="10" height="1" fill="white" />
    </svg>
  );
}

export default function PixelBackground() {
  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden
    >
      {CLOUDS.map((c, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: c.top,
            left: 0,
            animation: `pixelCloudDrift ${c.dur}s linear ${c.delay}s infinite`,
          }}
        >
          <PixelCloud w={c.w} h={c.h} opacity={c.opacity} />
        </div>
      ))}
    </div>
  );
}
