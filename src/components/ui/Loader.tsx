'use client';

// Écran de chargement plein-écran
// Apparaît au premier chargement de la page et disparaît après 2.5 secondes
// Framer Motion gère l'animation d'apparition et de disparition

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader() {
  const [visible, setVisible] = useState(true);

  // Disparaît automatiquement après 2.5 secondes
  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Ligne de scan cyberpunk qui descend */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="w-full h-px bg-neon-cyan/20 animate-scan-line" />
          </div>

          {/* Grille de fond */}
          <div className="absolute inset-0 bg-grid-pattern opacity-30" />

          {/* Logo G2 — apparaît avec scale */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {/* Logo principal */}
            <h1 className="font-orbitron font-black text-9xl text-white neon-text-cyan leading-none">
              G2
            </h1>

            {/* Tagline */}
            <motion.p
              className="font-orbitron text-xs text-neon-cyan tracking-[0.6em] uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Future Luxury
            </motion.p>

            {/* Barre de progression */}
            <motion.div
              className="w-48 h-px bg-white/10 overflow-hidden mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              <motion.div
                className="h-full bg-neon-cyan"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.5, duration: 1.8, ease: 'easeOut' }}
              />
            </motion.div>

            {/* Texte de chargement */}
            <motion.p
              className="font-orbitron text-[10px] text-white/20 tracking-[0.5em] uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Chargement...
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
