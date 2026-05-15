'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Le G2 fait 1 tour complet (1.4s) puis le loader disparaît (0.6s)
    const timer = setTimeout(() => setVisible(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{
            background: 'linear-gradient(180deg, #1565C0 0%, #42A5F5 50%, #E3F2FD 100%)',
            backdropFilter: 'blur(0px)',
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Card glass avec G2 qui tourne */}
          <div style={{ perspective: '600px' }}>
            <motion.div
              className="flex flex-col items-center justify-center gap-4"
              style={{
                width: 180,
                height: 180,
                background: 'rgba(255,255,255,0.22)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1.5px solid rgba(255,255,255,0.6)',
                borderRadius: 28,
                boxShadow: '0 24px 64px rgba(21,101,192,0.25), inset 0 1px 0 rgba(255,255,255,0.7)',
              }}
              initial={{ rotateY: 0, opacity: 0, scale: 0.85 }}
              animate={{ rotateY: 360, opacity: 1, scale: 1 }}
              transition={{
                rotateY: { duration: 1.4, ease: [0.4, 0, 0.2, 1] },
                opacity: { duration: 0.3 },
                scale:   { duration: 0.4, ease: 'easeOut' },
              }}
            >
              <h1
                className="font-orbitron font-black"
                style={{
                  fontSize: 72,
                  lineHeight: 1,
                  color: 'white',
                  textShadow: '0 2px 24px rgba(21,101,192,0.5)',
                }}
              >
                G2
              </h1>
              <p
                className="font-orbitron text-[9px] tracking-[0.5em] uppercase"
                style={{ color: 'rgba(255,255,255,0.7)' }}
              >
                Loading
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
