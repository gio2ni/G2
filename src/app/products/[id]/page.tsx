// ============================================================
// PAGE PRODUIT — /products/[id]
//
// Server Component — les données produits sont chargées côté serveur
// AddToCartButton est un Client Component imbriqué pour les interactions
// HeroScene est importé avec ssr:false (Three.js ne tourne pas côté serveur)
// generateStaticParams : toutes les pages produit sont pré-rendues au build
// ============================================================

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductById, products } from '@/lib/products';
import AddToCartButton from '@/components/ui/AddToCartButton';

// Pré-génère les routes statiques pour tous les produits au moment du build
export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export default function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = getProductById(params.id);

  // Redirige vers la page 404 si le produit n'existe pas
  if (!product) notFound();

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Lien retour */}
      <Link
        href="/products"
        className="inline-block font-orbitron text-[10px] tracking-[0.4em] text-white/30 hover:text-white uppercase transition-colors mb-10"
      >
        ← Retour à la collection
      </Link>

      {/* ---- Layout 2 colonnes ---- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

        {/* ---- Colonne gauche : image produit ---- */}
        <div className="relative">
          <div className="relative aspect-[3/4] overflow-hidden" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              {product.isNew && (
                <span className="font-orbitron text-[9px] tracking-widest bg-neon-cyan text-black px-2 py-1 uppercase">
                  New
                </span>
              )}
            </div>
          </div>

          {/* Pastilles couleurs */}
          {product.colors.length > 1 && (
            <div className="flex gap-3 mt-4">
              <span className="font-orbitron text-[10px] text-chrome/40 tracking-widest uppercase self-center">
                Coloris
              </span>
              {product.colors.map((color) => (
                <button
                  key={color}
                  className="w-5 h-5 rounded-full border border-white/20 hover:border-neon-cyan/60 transition-colors"
                  style={{ backgroundColor: color }}
                  aria-label={color}
                />
              ))}
            </div>
          )}
        </div>

        {/* ---- Colonne droite : infos + achat ---- */}
        <div className="flex flex-col gap-6 lg:pt-4">
          {/* Catégorie */}
          <p className="font-orbitron text-neon-cyan text-[10px] tracking-[0.5em] uppercase">
            {product.category}
          </p>

          {/* Nom produit */}
          <h1 className="font-orbitron text-3xl md:text-4xl text-white leading-tight tracking-wide">
            {product.name}
          </h1>

          {/* Prix */}
          <p className="font-orbitron text-2xl text-white">
            ${product.price}{' '}
            <span className="text-chrome/40 text-sm font-normal">USD</span>
          </p>

          {/* Ligne séparatrice */}
          <div className="h-px bg-white/10" />

          {/* Description */}
          <p className="font-dm-sans text-chrome/70 text-base leading-relaxed">
            {product.description}
          </p>

          {/* Bouton ajout panier (Client Component) */}
          <AddToCartButton product={product} />
        </div>
      </div>

      {/* ---- Produits liés (même catégorie) ---- */}
      <RelatedProducts currentId={product.id} category={product.category} />
    </div>
  );
}

// Composant serveur pour les produits liés
function RelatedProducts({
  currentId,
  category,
}: {
  currentId: string;
  category: string;
}) {
  const related = products
    .filter((p) => p.id !== currentId && p.category === category)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div className="mt-24 pt-12 border-t border-white/10">
      <h2 className="font-orbitron text-xl text-white tracking-wide mb-8">
        Dans la même catégorie
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {related.map((p) => (
          <Link key={p.id} href={`/products/${p.id}`}>
            <div className="glass-card group overflow-hidden">
              <div className="relative aspect-[3/4] overflow-hidden bg-black/40">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="33vw"
                />
              </div>
              <div className="p-4">
                <p className="font-orbitron text-xs text-white tracking-wide">{p.name}</p>
                <p className="font-orbitron text-neon-cyan text-sm mt-1">${p.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
