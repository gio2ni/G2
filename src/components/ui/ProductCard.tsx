'use client';

// Carte produit — glassmorphism + hover glow + ajout panier intégré
// Le sélecteur de taille et le bouton "Ajouter" sont gérés en state local (useState)
// L'action panier est déléguée au store Zustand via addItem()

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCartStore } from '@/lib/store';
import type { Product } from '@/lib/products';

interface ProductCardProps {
  product: Product;
  // Délai optionnel pour l'animation d'apparition en cascade
  animationDelay?: number;
}

export default function ProductCard({ product, animationDelay = 0 }: ProductCardProps) {
  const { addItem } = useCartStore();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [added, setAdded] = useState(false);

  // Ajout au panier — feedback visuel temporaire "Ajouté ✓"
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Empêche la navigation du Link parent
    e.stopPropagation();

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      quantity: 1,
      image: product.image,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: animationDelay }}
    >
      <Link href={`/products/${product.id}`}>
        <motion.article
          className="glass-card group relative overflow-hidden"
          whileHover={{ y: -6 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        >
          {/* ---- Image produit ---- */}
          <div className="relative aspect-[3/4] overflow-hidden bg-black/40">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

            {/* Overlay de glow au hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-neon-cyan/10 via-transparent to-transparent" />

            {/* Ligne de brillance au hover (effet lumière) */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full"
              whileHover={{ translateX: '200%' }}
              transition={{ duration: 0.8 }}
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.isNew && (
                <span className="font-orbitron text-[9px] tracking-widest bg-neon-cyan text-black px-2 py-0.5 uppercase">
                  New
                </span>
              )}
            </div>
          </div>

          {/* ---- Infos produit ---- */}
          <div className="p-4 flex flex-col gap-3">
            {/* Nom et prix */}
            <div className="flex justify-between items-start gap-2">
              <h3 className="font-orbitron text-xs text-white tracking-wide leading-snug flex-1">
                {product.name}
              </h3>
              <span className="font-orbitron text-neon-cyan text-sm flex-shrink-0">
                ${product.price}
              </span>
            </div>

            {/* Catégorie */}
            <p className="font-space-grotesk text-chrome/40 text-xs uppercase tracking-widest">
              {product.category}
            </p>

            {/* Sélecteur de taille */}
            <div className="flex flex-wrap gap-1.5">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedSize(size);
                  }}
                  className={`font-orbitron text-[9px] px-2 py-1 border tracking-widest transition-all duration-150 ${
                    selectedSize === size
                      ? 'bg-neon-cyan text-black border-neon-cyan'
                      : 'border-white/20 text-white/40 hover:border-neon-cyan/50 hover:text-white/70'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* Bouton ajouter au panier */}
            <button
              onClick={handleAddToCart}
              className={`w-full font-orbitron text-[10px] tracking-widest uppercase py-3 transition-all duration-200 ${
                added
                  ? 'bg-neon-purple/80 text-white border border-neon-purple/60'
                  : 'border border-neon-cyan/40 text-neon-cyan hover:bg-neon-cyan hover:text-black hover:border-neon-cyan'
              }`}
            >
              {added ? 'Ajouté ✓' : 'Ajouter au panier'}
            </button>
          </div>
        </motion.article>
      </Link>
    </motion.div>
  );
}
