// ============================================================
// PAGE D'ACCUEIL G2
//
// Structure :
//   1. Hero Section — scène 3D fullscreen + texte overlay
//   2. Featured Products — 3 cartes produits en avant
//   3. Brand Manifesto — section texte immersive
//
// Note : HeroScene est importé avec dynamic + ssr:false
// car Three.js requiert le DOM (pas de rendu côté serveur)
// ============================================================

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { getFeaturedProducts } from '@/lib/products';
import ProductCard from '@/components/ui/ProductCard';

// Import dynamique OBLIGATOIRE — Three.js ne peut pas tourner sur le serveur
const HeroScene = dynamic(() => import('@/components/3d/HeroScene'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-black" />,
});

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <>
      {/* ================================================================
          HERO SECTION — Fullscreen avec T-shirt 3D en arrière-plan
          ================================================================ */}
      <section className="relative h-screen w-full bg-black overflow-hidden">
        {/* Grille de fond subtile */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

        {/* Canvas Three.js — occupe tout l'écran */}
        <div className="absolute inset-0">
          <HeroScene />
        </div>

        {/* Texte overlay — centré sur le canvas */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          {/* Label collection */}
          <p className="font-orbitron text-neon-cyan text-xs tracking-[0.5em] uppercase mb-6 animate-flicker">
            Collection 01 — 2025
          </p>

          {/* Logo principal G2 */}
          <h1 className="font-orbitron font-black text-8xl md:text-[10rem] text-white neon-text-cyan leading-none mb-6 select-none">
            G2
          </h1>

          {/* Slogan */}
          <p className="font-space-grotesk text-chrome/80 text-xl md:text-2xl max-w-lg mb-10 leading-relaxed">
            Wear the signal. Own the void.
          </p>

          {/* Boutons CTA */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/products" className="btn-primary">
              Shop Now
            </Link>
            <a href="#manifesto" className="btn-secondary">
              Notre univers
            </a>
          </div>
        </div>

        {/* Indicateur de scroll */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none">
          <span className="font-orbitron text-[9px] text-white/30 tracking-[0.5em] uppercase">
            Scroll
          </span>
          <div className="w-px h-14 bg-gradient-to-b from-neon-cyan/60 to-transparent animate-scroll-indicator" />
        </div>
      </section>

      {/* ================================================================
          FEATURED PRODUCTS — Les 3 articles phares
          ================================================================ */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
        {/* En-tête de section */}
        <div className="text-center mb-14">
          <p className="font-orbitron text-neon-cyan text-[10px] tracking-[0.6em] uppercase mb-3">
            Sélection
          </p>
          <h2 className="font-orbitron text-3xl md:text-4xl text-white tracking-wide">
            Featured Drops
          </h2>
          <p className="font-space-grotesk text-chrome/40 mt-3 text-sm">
            Unités limitées. Pas de réassort.
          </p>
        </div>

        {/* Grille de cartes produits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              animationDelay={i * 0.1}
            />
          ))}
        </div>

        {/* Lien vers le catalogue complet */}
        <div className="text-center mt-12">
          <Link
            href="/products"
            className="font-orbitron text-xs tracking-[0.3em] uppercase text-white/40 hover:text-neon-cyan transition-colors duration-200"
          >
            Voir toute la collection →
          </Link>
        </div>
      </section>

      {/* ================================================================
          BRAND MANIFESTO — Texte de marque immersif
          ================================================================ */}
      <section id="manifesto" className="py-32 px-4 bg-black relative overflow-hidden">
        {/* Fond grille subtil */}
        <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

        {/* Ligne décorative haut */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="font-orbitron text-neon-cyan text-[10px] tracking-[0.7em] uppercase mb-10">
            Manifeste
          </p>

          <h2 className="font-orbitron text-4xl md:text-6xl text-white mb-10 leading-tight tracking-wide">
            Construit pour le{' '}
            <span className="text-neon-cyan neon-text-cyan">prochain signal</span>
          </h2>

          <p className="font-space-grotesk text-chrome/60 text-lg leading-relaxed mb-6">
            G2 n&apos;est pas une marque. G2 est une fréquence. Chaque pièce est conçue
            à l&apos;intersection de l&apos;utilitaire et de l&apos;art — là où la fonction rencontre
            le vide.
          </p>
          <p className="font-space-grotesk text-chrome/40 text-base leading-relaxed">
            Nous ne suivons pas les tendances. Nous construisons le terrain sur lequel elles courent.
          </p>

          {/* Ligne séparatrice décorative */}
          <div className="w-24 h-px bg-neon-cyan/40 mx-auto mt-12 animate-glow-pulse" />
        </div>

        {/* Ligne décorative bas */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-purple/30 to-transparent" />
      </section>

      {/* ================================================================
          NEWSLETTER — Section simple en bas
          ================================================================ */}
      <section className="py-20 px-4 border-t border-white/5">
        <div className="max-w-xl mx-auto text-center">
          <p className="font-orbitron text-[10px] text-neon-cyan tracking-[0.6em] uppercase mb-4">
            Rejoindre
          </p>
          <h3 className="font-orbitron text-2xl text-white mb-8 tracking-wide">
            Accès en avant-première
          </h3>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="votre@email.com"
              className="flex-1 bg-white/5 border border-white/10 px-4 py-3 font-space-grotesk text-sm text-white placeholder-white/20 focus:outline-none focus:border-neon-cyan/50 transition-colors"
            />
            <button className="btn-primary whitespace-nowrap">
              Rejoindre
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
