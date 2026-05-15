'use client';

// ============================================================
// PAGE CATALOGUE — /products
// Affiche tous les produits avec filtres par catégorie et tri
// ============================================================

import { useState } from 'react';
import { products } from '@/lib/products';
import ProductCard from '@/components/ui/ProductCard';

type Category = 'all' | 'tee' | 'hoodie' | 'jacket' | 'accessory';
type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name';

// Labels affichés pour chaque catégorie de filtre
const CATEGORY_LABELS: Record<Category, string> = {
  all: 'Tout',
  tee: 'T-Shirts',
  hoodie: 'Hoodies',
  jacket: 'Vestes',
  accessory: 'Accessoires',
};

export default function ProductsPage() {
  const [category, setCategory] = useState<Category>('all');
  const [sort, setSort] = useState<SortOption>('default');

  // Filtre et tri des produits selon les sélections de l'utilisateur
  const filtered = products
    .filter((p) => category === 'all' || p.category === category)
    .sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'name') return a.name.localeCompare(b.name);
      return 0; // Ordre par défaut (ordre du tableau)
    });

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* ---- En-tête ---- */}
      <div className="mb-12">
        <p className="font-orbitron text-neon-cyan text-[10px] tracking-[0.6em] uppercase mb-3">
          Boutique
        </p>
        <h1 className="font-orbitron text-4xl md:text-5xl text-white tracking-wide mb-2">
          Collection
        </h1>
        <p className="font-dm-sans text-chrome/40 text-sm">
          {filtered.length} pièce{filtered.length > 1 ? 's' : ''}
        </p>
      </div>

      {/* ---- Barre de filtres ---- */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10 items-start sm:items-center justify-between">
        {/* Filtres catégorie */}
        <div className="flex flex-wrap gap-2">
          {(Object.keys(CATEGORY_LABELS) as Category[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`font-orbitron text-[10px] tracking-widest uppercase px-4 py-2 border transition-all duration-150 ${
                category === cat
                  ? 'bg-neon-cyan text-black border-neon-cyan'
                  : 'border-white/20 text-white/40 hover:border-neon-cyan/40 hover:text-white/70'
              }`}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>

        {/* Menu tri */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="font-orbitron text-[10px] tracking-widest uppercase bg-black border border-white/20 text-white/50 px-4 py-2 focus:outline-none focus:border-neon-cyan/50 hover:border-white/40 transition-colors"
        >
          <option value="default">Ordre par défaut</option>
          <option value="price-asc">Prix : croissant</option>
          <option value="price-desc">Prix : décroissant</option>
          <option value="name">Nom : A–Z</option>
        </select>
      </div>

      {/* ---- Grille produits ---- */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              animationDelay={i * 0.05}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <p className="font-orbitron text-white/20 tracking-widest uppercase text-sm">
            Aucun résultat
          </p>
          <button
            onClick={() => setCategory('all')}
            className="font-orbitron text-xs text-neon-cyan hover:text-white transition-colors tracking-widest uppercase"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  );
}
