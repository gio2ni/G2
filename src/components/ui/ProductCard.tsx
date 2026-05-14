'use client';

// ProductCard — React.memo pour éviter les re-renders inutiles
// Design premium avec CSS variables (s'adapte dark/light)

import Link from 'next/link';
import Image from 'next/image';
import { useState, memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useCartStore } from '@/lib/store';
import type { Product } from '@/lib/products';

interface Props {
  product: Product;
  animationDelay?: number;
}

const ProductCard = memo(function ProductCard({ product, animationDelay = 0 }: Props) {
  const addItem = useCartStore(useCallback((s) => s.addItem, []));
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [added, setAdded] = useState(false);

  const handleAdd = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ id: product.id, name: product.name, price: product.price,
              size: selectedSize, quantity: 1, image: product.image });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }, [addItem, product, selectedSize]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: animationDelay, ease: [0.4, 0, 0.2, 1] }}
    >
      <Link href={`/products/${product.id}`}>
        <motion.article
          className="group relative overflow-hidden"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
          whileHover={{ y: -5, boxShadow: '0 20px 60px var(--shadow)' }}
          transition={{ type: 'spring', stiffness: 280, damping: 24 }}
        >
          {/* Image */}
          <div className="relative aspect-[3/4] overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
            <Image src={product.image} alt={product.name} fill
              className="object-cover transition-transform duration-700 will-change-transform group-hover:scale-103"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
            />

            {/* Overlay hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                 style={{ background: 'linear-gradient(to top, var(--accent-glow) 0%, transparent 60%)' }} />

            {/* Badge New */}
            {product.isNew && (
              <span className="absolute top-3 left-3 font-orbitron text-[9px] tracking-widest uppercase px-2 py-1"
                    style={{ background: 'var(--accent)', color: 'var(--bg-primary)' }}>
                New
              </span>
            )}
          </div>

          {/* Infos */}
          <div className="p-4 flex flex-col gap-3">
            <div className="flex justify-between items-start gap-2">
              <h3 className="font-orbitron text-xs tracking-wide leading-snug flex-1"
                  style={{ color: 'var(--text-primary)' }}>
                {product.name}
              </h3>
              <span className="font-orbitron text-sm flex-shrink-0"
                    style={{ color: 'var(--accent)' }}>
                ${product.price}
              </span>
            </div>

            {/* Tailles */}
            <div className="flex flex-wrap gap-1.5">
              {product.sizes.map((size) => (
                <button key={size}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSelectedSize(size); }}
                  className="font-orbitron text-[9px] px-2 py-1 tracking-widest transition-all duration-150"
                  style={{
                    border: `1px solid ${selectedSize === size ? 'var(--accent)' : 'var(--border)'}`,
                    background: selectedSize === size ? 'var(--accent)' : 'transparent',
                    color: selectedSize === size ? 'var(--bg-primary)' : 'var(--text-muted)',
                  }}>
                  {size}
                </button>
              ))}
            </div>

            {/* Bouton panier */}
            <button onClick={handleAdd}
              className="w-full font-orbitron text-[10px] tracking-widest uppercase py-3 transition-all duration-200"
              style={{
                border: `1px solid ${added ? 'var(--accent-2)' : 'var(--border-hover)'}`,
                background: added ? 'var(--accent-2)' : 'transparent',
                color: added ? '#fff' : 'var(--accent)',
              }}>
              {added ? 'Ajouté ✓' : 'Ajouter au panier'}
            </button>
          </div>
        </motion.article>
      </Link>
    </motion.div>
  );
});

export default ProductCard;
