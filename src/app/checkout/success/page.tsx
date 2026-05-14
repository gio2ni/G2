'use client';

// Page de confirmation de commande — affichée après un paiement réussi

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCartStore } from '@/lib/store';

export default function SuccessPage() {
  const { clearCart } = useCartStore();

  // Vide le panier à l'arrivée sur cette page
  useEffect(() => {
    clearCart();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 text-center"
         style={{ background: 'var(--bg-primary)' }}>

      {/* Cercle de confirmation animé */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.1 }}
        className="w-20 h-20 rounded-full flex items-center justify-center mb-8"
        style={{ border: '2px solid var(--accent)', background: 'var(--accent-glow)' }}
      >
        <motion.svg
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"
          style={{ color: 'var(--accent)' }}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <polyline points="20 6 9 17 4 12" />
        </motion.svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col items-center gap-4"
      >
        <p className="section-label">Commande confirmée</p>

        <h1 className="font-orbitron text-3xl md:text-4xl tracking-wide"
            style={{ color: 'var(--text-primary)' }}>
          Merci pour votre achat
        </h1>

        <p className="font-space-grotesk text-base max-w-sm leading-relaxed"
           style={{ color: 'var(--text-secondary)' }}>
          Votre commande a été reçue et est en cours de traitement.
          Un email de confirmation vous sera envoyé sous peu.
        </p>

        <div className="flex flex-wrap gap-3 mt-6 justify-center">
          <Link href="/products" className="btn-primary">
            Continuer les achats
          </Link>
          <Link href="/" className="btn-secondary">
            Accueil
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
