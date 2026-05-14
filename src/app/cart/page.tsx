'use client';

// ============================================================
// PAGE PANIER — /cart
// Affiche tous les articles du panier avec gestion des quantités
// ============================================================

import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore, useCartTotal } from '@/lib/store';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const total = useCartTotal();

  // Page panier vide
  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-8 pt-20 px-4">
        {/* Icône vide */}
        <div className="w-20 h-20 border border-white/10 flex items-center justify-center">
          <span className="font-orbitron text-white/20 text-2xl">∅</span>
        </div>

        <div className="text-center">
          <p className="font-orbitron text-white/30 text-sm tracking-[0.4em] uppercase mb-2">
            Panier vide
          </p>
          <p className="font-space-grotesk text-white/20 text-sm">
            Votre panier ne contient aucun article.
          </p>
        </div>

        <Link href="/products" className="btn-primary">
          Voir la boutique
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* ---- En-tête ---- */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="font-orbitron text-neon-cyan text-[10px] tracking-[0.6em] uppercase mb-2">
              Votre sélection
            </p>
            <h1 className="font-orbitron text-3xl text-white tracking-wide">
              Panier
            </h1>
          </div>
          <span className="font-space-grotesk text-chrome/40 text-sm">
            {items.reduce((s, i) => s + i.quantity, 0)} article
            {items.reduce((s, i) => s + i.quantity, 0) > 1 ? 's' : ''}
          </span>
        </div>

        {/* ---- Liste des articles ---- */}
        <div className="flex flex-col gap-4 mb-10">
          <AnimatePresence initial={false}>
            {items.map((item) => (
              <motion.div
                key={`${item.id}-${item.size}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="glass-card overflow-hidden"
              >
                <div className="flex gap-4 p-4">
                  {/* Image produit */}
                  <div className="relative w-24 h-24 flex-shrink-0 bg-black/50 border border-white/10 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>

                  {/* Infos */}
                  <div className="flex-1 min-w-0">
                    <p className="font-orbitron text-sm text-white tracking-wide truncate">
                      {item.name}
                    </p>
                    <p className="font-space-grotesk text-chrome/50 text-xs mt-1">
                      Taille : {item.size}
                    </p>
                    <p className="font-orbitron text-neon-cyan text-sm mt-2">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Contrôles quantité */}
                  <div className="flex flex-col items-end gap-3 flex-shrink-0">
                    <div className="flex items-center gap-3 border border-white/10">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.size, item.quantity - 1)
                        }
                        className="w-8 h-8 text-white/50 hover:text-white hover:bg-white/5 transition-colors flex items-center justify-center font-orbitron"
                      >
                        −
                      </button>
                      <span className="font-orbitron text-sm text-white w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.size, item.quantity + 1)
                        }
                        className="w-8 h-8 text-white/50 hover:text-white hover:bg-white/5 transition-colors flex items-center justify-center font-orbitron"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id, item.size)}
                      className="font-orbitron text-[10px] tracking-widest uppercase text-white/20 hover:text-red-400 transition-colors"
                    >
                      Retirer
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* ---- Récapitulatif de commande ---- */}
        <div className="glass-card p-6 flex flex-col gap-4">
          {/* Ligne sous-total */}
          <div className="flex justify-between text-sm">
            <span className="font-space-grotesk text-chrome/50">Sous-total</span>
            <span className="font-orbitron text-white">${total.toFixed(2)}</span>
          </div>

          {/* Ligne livraison */}
          <div className="flex justify-between text-sm">
            <span className="font-space-grotesk text-chrome/50">Livraison</span>
            <span className="font-orbitron text-neon-cyan text-xs tracking-widest uppercase">
              {total >= 150 ? 'Gratuite' : 'Calculée à la commande'}
            </span>
          </div>

          <div className="h-px bg-white/10" />

          {/* Total */}
          <div className="flex justify-between">
            <span className="font-orbitron text-chrome tracking-wide uppercase text-sm">
              Total
            </span>
            <span className="font-orbitron text-white text-xl">
              ${total.toFixed(2)}
            </span>
          </div>

          {/* Bouton checkout */}
          <button className="btn-primary w-full mt-2 py-5">
            Procéder au paiement
          </button>

          {/* Bouton vider le panier */}
          <button
            onClick={clearCart}
            className="font-orbitron text-[10px] tracking-widest uppercase text-white/20 hover:text-white/50 transition-colors text-center"
          >
            Vider le panier
          </button>
        </div>

        {/* ---- Continuer les achats ---- */}
        <div className="text-center mt-8">
          <Link
            href="/products"
            className="font-orbitron text-[10px] tracking-[0.4em] uppercase text-white/30 hover:text-neon-cyan transition-colors"
          >
            ← Continuer mes achats
          </Link>
        </div>
      </div>
    </div>
  );
}
