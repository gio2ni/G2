'use client';

// Curseur personnalisé — version allégée
// Utilise requestAnimationFrame natif, pas de state React du tout

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos     = useRef({ x: -100, y: -100 });
  const ring    = useRef({ x: -100, y: -100 });
  const rafId   = useRef<number>(0);
  const isHovering = useRef(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    // Agrandit le ring au survol d'éléments cliquables
    const onEnter = () => { isHovering.current = true; };
    const onLeave = () => { isHovering.current = false; };

    const loop = () => {
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      ring.current.x += (pos.current.x - ring.current.x) * 0.1;
      ring.current.y += (pos.current.y - ring.current.y) * 0.1;
      if (ringRef.current) {
        const scale = isHovering.current ? 1.5 : 1;
        ringRef.current.style.transform =
          `translate(${ring.current.x - 16}px, ${ring.current.y - 16}px) scale(${scale})`;
      }
      rafId.current = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    rafId.current = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full z-[99999] pointer-events-none"
        style={{ background: 'var(--accent)', willChange: 'transform' }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full z-[99998] pointer-events-none"
        style={{
          border: '1px solid var(--accent)',
          opacity: 0.5,
          willChange: 'transform',
          transition: 'transform 0.1s ease, opacity 0.2s ease',
        }}
      />
    </>
  );
}
