'use client';

import { useState, useCallback } from 'react';
import { useCartStore } from '@/lib/store';
import type { Product } from '@/lib/products';

export default function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore(useCallback((s) => s.addItem, []));
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [added, setAdded] = useState(false);

  const handleAdd = useCallback(() => {
    addItem({ id: product.id, name: product.name, price: product.price,
              size: selectedSize, quantity: 1, image: product.image });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }, [addItem, product, selectedSize]);

  return (
    <div className="flex flex-col gap-5">
      {/* Taille */}
      <div>
        <p className="font-orbitron text-[10px] tracking-[0.4em] uppercase mb-3"
           style={{ color: 'var(--text-muted)' }}>
          Taille — {selectedSize}
        </p>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((size) => (
            <button key={size} onClick={() => setSelectedSize(size)}
              className="font-orbitron text-xs px-4 py-2 tracking-widest transition-all duration-150"
              style={{
                border: `1px solid ${selectedSize === size ? 'var(--accent)' : 'var(--border)'}`,
                background: selectedSize === size ? 'var(--accent)' : 'transparent',
                color: selectedSize === size ? 'var(--bg-primary)' : 'var(--text-muted)',
              }}>
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* CTA */}
      <button onClick={handleAdd}
        className="font-orbitron text-sm tracking-widest uppercase py-5 w-full transition-all duration-200"
        style={{
          background: added ? 'var(--accent-2)' : 'var(--accent)',
          color: 'var(--bg-primary)',
        }}>
        {added ? 'Ajouté au panier ✓' : `Ajouter — $${product.price}`}
      </button>

      <p className="font-space-grotesk text-xs" style={{ color: 'var(--text-muted)' }}>
        Livraison offerte dès 150€ · Retours sous 30 jours
      </p>
    </div>
  );
}
