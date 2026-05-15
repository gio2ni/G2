'use client';

// CartSidebar premium — slide-in animé, thème-aware, optimisé

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
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={closeCart}
          />

          {/* Panel */}
          <motion.aside
            className="fixed top-0 right-0 h-full w-full max-w-[380px] z-50 flex flex-col"
            style={{ background: 'var(--bg-secondary)', borderLeft: '1px solid var(--border)' }}
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 250 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5"
                 style={{ borderBottom: '1px solid var(--border)' }}>
              <span className="font-orbitron text-sm tracking-[0.3em] uppercase"
                    style={{ color: 'var(--text-primary)' }}>
                Panier
                {items.length > 0 && (
                  <span className="ml-2 font-dm-sans text-xs" style={{ color: 'var(--text-muted)' }}>
                    ({items.reduce((s, i) => s + i.quantity, 0)})
                  </span>
                )}
              </span>
              <button onClick={closeCart} className="text-xl leading-none transition-colors"
                      style={{ color: 'var(--text-muted)' }}>✕</button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-5 py-16">
                  <span className="text-3xl opacity-20">∅</span>
                  <p className="font-orbitron text-xs tracking-widest uppercase"
                     style={{ color: 'var(--text-muted)' }}>Panier vide</p>
                  <Link href="/products" onClick={closeCart} className="btn-secondary text-xs py-2 px-6">
                    Voir la boutique
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div key={`${item.id}-${item.size}`}
                    initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }} transition={{ duration: 0.18 }}
                    className="flex gap-3 pb-4" style={{ borderBottom: '1px solid var(--border)' }}>
                    <div className="w-16 h-16 flex-shrink-0 overflow-hidden relative"
                         style={{ border: '1px solid var(--border)' }}>
                      <Image src={item.image} alt={item.name} fill
                        className="object-cover" sizes="64px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-orbitron text-[11px] tracking-wide truncate"
                         style={{ color: 'var(--text-primary)' }}>{item.name}</p>
                      <p className="font-dm-sans text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                        Taille: {item.size}
                      </p>
                      <p className="font-orbitron text-xs mt-1" style={{ color: 'var(--accent)' }}>
                        ${item.price}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <div className="flex items-center gap-2" style={{ border: '1px solid var(--border)' }}>
                        {[-1, null, 1].map((delta, i) =>
                          delta === null ? (
                            <span key="qty" className="font-orbitron text-xs w-4 text-center"
                                  style={{ color: 'var(--text-primary)' }}>{item.quantity}</span>
                          ) : (
                            <button key={i} className="w-6 h-6 transition-colors flex items-center justify-center"
                              style={{ color: 'var(--text-secondary)' }}
                              onClick={() => updateQuantity(item.id, item.size, item.quantity + delta)}>
                              {delta < 0 ? '−' : '+'}
                            </button>
                          )
                        )}
                      </div>
                      <button onClick={() => removeItem(item.id, item.size)}
                        className="font-orbitron text-[9px] tracking-widest uppercase transition-colors"
                        style={{ color: 'var(--text-muted)' }}>
                        Retirer
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 flex flex-col gap-3"
                   style={{ borderTop: '1px solid var(--border)' }}>
                <div className="flex justify-between items-center">
                  <span className="font-orbitron text-xs tracking-widest uppercase"
                        style={{ color: 'var(--text-muted)' }}>Total</span>
                  <span className="font-orbitron text-lg" style={{ color: 'var(--text-primary)' }}>
                    ${total.toFixed(2)}
                  </span>
                </div>
                <Link href="/checkout" onClick={closeCart} className="btn-primary text-center block">
                  Commander
                </Link>
                <Link href="/cart" onClick={closeCart}
                  className="font-orbitron text-[10px] tracking-widest text-center uppercase transition-colors"
                  style={{ color: 'var(--text-muted)' }}>
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
