'use client';

// Loader premium — disparaît après 2s, animation plus rapide et légère

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simule une progression fluide
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + 4;
      });
    }, 60);

    const timer = setTimeout(() => setVisible(false), 2000);
    return () => { clearTimeout(timer); clearInterval(interval); };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: 'var(--bg-primary)' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Ligne scan */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="w-full h-px opacity-20 animate-scan-line"
                 style={{ background: 'var(--accent)' }} />
          </div>

          {/* Contenu centré */}
          <motion.div
            className="relative flex flex-col items-center gap-5"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {/* Logo */}
            <h1 className="font-orbitron font-black text-8xl leading-none neon-text"
                style={{ color: 'var(--text-primary)' }}>
              G2
            </h1>

            {/* Sous-titre */}
            <p className="font-orbitron text-[10px] tracking-[0.6em] uppercase animate-flicker"
               style={{ color: 'var(--accent)' }}>
              Future Luxury
            </p>

            {/* Barre de progression */}
            <div className="w-36 h-px mt-3 overflow-hidden"
                 style={{ background: 'var(--border)' }}>
              <motion.div
                className="h-full"
                style={{ background: 'var(--accent)', width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>

            {/* Pourcentage */}
            <p className="font-orbitron text-[9px] tracking-widest"
               style={{ color: 'var(--text-muted)' }}>
              {progress}%
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
