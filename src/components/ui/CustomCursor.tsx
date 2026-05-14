'use client';

// Curseur personnalisé G2
// - Un petit dot cyan (8px) suit le curseur instantanément
// - Un ring (32px) suit avec un léger retard grâce au lerp (interpolation linéaire)
// - Performance : requestAnimationFrame, pas de useState (évite les re-renders)

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  // Refs pour les éléments DOM du curseur (accès direct sans re-render)
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Position réelle de la souris (mise à jour instantanément)
  const mousePos = useRef({ x: -100, y: -100 });

  // Position actuelle du ring (suit la souris avec un décalage)
  const ringPos = useRef({ x: -100, y: -100 });

  // ID de l'animation (pour cleanup)
  const rafId = useRef<number>(0);

  useEffect(() => {
    // Mise à jour de la position de la souris
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    // Boucle d'animation : dot = instantané, ring = lerp 0.12
    const animate = () => {
      // Dot — suit exactement la souris (centré : -4px)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mousePos.current.x - 4}px, ${mousePos.current.y - 4}px)`;
      }

      // Ring — interpolation linéaire vers la position de la souris (lag visuel)
      const LERP = 0.12;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * LERP;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * LERP;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 16}px, ${ringPos.current.y - 16}px)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    rafId.current = requestAnimationFrame(animate);

    // Cleanup au démontage du composant
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      {/* Dot — point central petit et vif */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-neon-cyan rounded-full z-[99999] pointer-events-none"
        style={{ willChange: 'transform' }}
      />

      {/* Ring — cercle de 32px avec léger retard */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 border border-neon-cyan/60 rounded-full z-[99998] pointer-events-none transition-none"
        style={{ willChange: 'transform' }}
      />
    </>
  );
}
