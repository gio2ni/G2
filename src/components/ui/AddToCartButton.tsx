'use client';

// Bouton "Ajouter au panier" pour la page produit (/products/[id])
// Séparé en Client Component pour pouvoir être imbriqué dans un Server Component
// Gère aussi le sélecteur de taille

import { useState } from 'react';
import { useCartStore } from '@/lib/store';
import type { Product } from '@/lib/products';

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCartStore();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
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
    <div className="flex flex-col gap-5">
      {/* Sélecteur de taille */}
      <div>
        <p className="font-orbitron text-[10px] tracking-[0.4em] text-chrome/40 uppercase mb-3">
          Taille — {selectedSize}
        </p>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`font-orbitron text-xs px-4 py-2 border tracking-widest transition-all duration-150 ${
                selectedSize === size
                  ? 'bg-neon-cyan text-black border-neon-cyan'
                  : 'border-white/20 text-white/50 hover:border-neon-cyan/50 hover:text-white'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Bouton principal */}
      <button
        onClick={handleAdd}
        className={`font-orbitron text-sm tracking-widest uppercase py-5 w-full transition-all duration-200 ${
          added
            ? 'bg-neon-purple text-white'
            : 'bg-neon-cyan text-black hover:bg-white'
        }`}
      >
        {added ? 'Ajouté au panier ✓' : `Ajouter — $${product.price}`}
      </button>

      {/* Infos livraison */}
      <p className="font-space-grotesk text-xs text-white/25 tracking-wide">
        Livraison gratuite dès 150€ · Retours sous 30 jours
      </p>
    </div>
  );
}
