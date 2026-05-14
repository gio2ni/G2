'use client';

// Panneau panier slide-in depuis la droite
// Framer Motion gère l'animation spring à l'ouverture et le fade-out à la fermeture
// L'état d'ouverture est contrôlé par le store Zustand (isOpen)

import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore, useCartTotal } from '@/lib/store';

export default function CartSidebar() {
  const { isOpen, closeCart, items, removeItem, updateQuantity } = useCartStore();
  const total = useCartTotal();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop — fond semi-transparent, clic = fermer */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
          />

          {/* Panneau latéral */}
          <motion.aside
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-black border-l border-white/10 z-50 flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 240 }}
          >
            {/* En-tête */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <span className="font-orbitron text-sm tracking-[0.3em] text-white uppercase">
                Panier
              </span>
              {items.length > 0 && (
                <span className="font-space-grotesk text-xs text-white/30">
                  {items.reduce((s, i) => s + i.quantity, 0)} article
                  {items.reduce((s, i) => s + i.quantity, 0) > 1 ? 's' : ''}
                </span>
              )}
              <button
                onClick={closeCart}
                className="font-orbitron text-white/30 hover:text-white transition-colors text-xl leading-none"
                aria-label="Fermer le panier"
              >
                ✕
              </button>
            </div>

            {/* Liste des articles */}
            <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 py-16">
                  <p className="font-orbitron text-sm text-white/20 tracking-widest uppercase">
                    Panier vide
                  </p>
                  <Link
                    href="/products"
                    onClick={closeCart}
                    className="btn-secondary text-xs py-2 px-6"
                  >
                    Voir la boutique
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={`${item.id}-${item.size}`}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    transition={{ duration: 0.2 }}
                    className="flex gap-3 pb-4 border-b border-white/5 last:border-0"
                  >
                    {/* Image produit */}
                    <div className="w-16 h-16 bg-black/50 border border-white/10 flex-shrink-0 overflow-hidden relative">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>

                    {/* Infos produit */}
                    <div className="flex-1 min-w-0">
                      <p className="font-orbitron text-xs text-white tracking-wide truncate">
                        {item.name}
                      </p>
                      <p className="font-space-grotesk text-xs text-chrome/50 mt-0.5">
                        Taille: {item.size}
                      </p>
                      <p className="font-orbitron text-xs text-neon-cyan mt-1">
                        ${item.price}
                      </p>
                    </div>

                    {/* Quantité + supprimer */}
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.size, item.quantity - 1)
                          }
                          className="w-5 h-5 border border-white/20 text-white hover:border-neon-cyan transition-colors text-xs flex items-center justify-center"
                        >
                          −
                        </button>
                        <span className="font-orbitron text-xs text-white w-3 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.size, item.quantity + 1)
                          }
                          className="w-5 h-5 border border-white/20 text-white hover:border-neon-cyan transition-colors text-xs flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id, item.size)}
                        className="font-orbitron text-[10px] text-white/20 hover:text-red-400 transition-colors uppercase tracking-widest"
                      >
                        Retirer
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Pied — total et CTA */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-white/10 flex flex-col gap-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-orbitron text-xs tracking-widest text-chrome/60 uppercase">
                    Total
                  </span>
                  <span className="font-orbitron text-white text-lg">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="btn-primary text-center block"
                >
                  Voir le panier
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
