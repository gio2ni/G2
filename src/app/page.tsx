// ============================================================
// HOMEPAGE G2 — VERSION PREMIUM
// Sections : Hero 3D → Featured → New Collection → Best Sellers → Manifeste → Newsletter
// ============================================================

import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { getFeaturedProducts, products } from '@/lib/products';
import ProductCard from '@/components/ui/ProductCard';
import NewsletterForm from '@/components/ui/NewsletterForm';

// Import dynamique OBLIGATOIRE (Three.js = browser seulement)
const HeroScene = dynamic(() => import('@/components/3d/HeroScene'), {
  ssr: false,
  loading: () => <div className="w-full h-full" style={{ background: 'var(--bg-primary)' }} />,
});

export default function HomePage() {
  const featured = getFeaturedProducts();
  const newProducts = products.filter((p) => p.isNew);
  const bestSellers = products.filter((p) => p.featured).slice(0, 3);

  return (
    <>
      {/* ================================================================
          1. HERO — Fullscreen 3D
          ================================================================ */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Canvas 3D transparent — nuages qui dérivent */}
        <div className="absolute inset-0">
          <HeroScene />
        </div>

        {/* Dégradé bas pour transition vers la section suivante */}
        <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
             style={{ background: 'linear-gradient(to bottom, transparent, rgba(224,242,254,0.6))' }} />

        {/* Texte overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <p className="section-label mb-6 animate-flicker">Collection 01 — 2025</p>

          <h1 className="font-orbitron font-black text-[5.5rem] md:text-[9rem] leading-none mb-5 select-none"
              style={{
                color: 'white',
                letterSpacing: '-0.02em',
                textShadow: '0 2px 30px rgba(21,101,192,0.4), 0 0 60px rgba(255,255,255,0.3)',
              }}>
            G2
          </h1>

          <p className="font-dm-sans text-lg md:text-xl max-w-md mb-10 leading-relaxed"
             style={{ color: 'rgba(255,255,255,0.85)', textShadow: '0 1px 8px rgba(0,0,0,0.2)' }}>
            Wear the signal. Own the void.
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/products" className="btn-primary">Shop Now</Link>
            <a href="#manifesto" className="btn-secondary">Notre univers</a>
          </div>
        </div>

        {/* Indicateur de scroll */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
          <p className="font-orbitron text-[8px] tracking-[0.5em] uppercase" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Scroll
          </p>
          <div className="w-px h-12 animate-float" style={{ background: 'linear-gradient(to bottom, white, transparent)' }} />
        </div>
      </section>

      {/* ================================================================
          2. FEATURED DROPS
          ================================================================ */}
      <section className="py-24 px-5 md:px-8 max-w-7xl mx-auto">
        <SectionHeader label="Sélection" title="Featured Drops"
          subtitle="Unités limitées. Pas de réassort." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} animationDelay={i * 0.08} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/products" className="font-orbitron text-[10px] tracking-[0.4em] uppercase transition-colors"
                style={{ color: 'var(--text-muted)' }}>
            Voir toute la collection →
          </Link>
        </div>
      </section>

      {/* ================================================================
          3. NOUVELLE COLLECTION — Bande visuelle large
          ================================================================ */}
      <section className="py-20 overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(2px)' }} />

        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="flex flex-col lg:flex-row gap-10 items-center">
            {/* Texte gauche */}
            <div className="flex-1 max-w-lg">
              <p className="section-label mb-5">Nouveau</p>
              <h2 className="font-orbitron text-4xl md:text-5xl mb-6 leading-tight tracking-tight"
                  style={{ color: 'var(--text-primary)' }}>
                Nouvelle<br />
                <span style={{ color: 'var(--accent)' }}>Collection</span>
              </h2>
              <p className="font-dm-sans text-base leading-relaxed mb-8"
                 style={{ color: 'var(--text-secondary)' }}>
                Des pièces pensées pour la prochaine décennie. Chaque tissu, chaque couture,
                conçus à l&apos;intersection de la technologie et du style.
              </p>
              <Link href="/products" className="btn-primary inline-block">
                Découvrir
              </Link>
            </div>

            {/* Grille produits nouvelle collection */}
            <div className="flex-1 grid grid-cols-2 gap-4">
              {newProducts.slice(0, 4).map((p) => (
                <Link key={p.id} href={`/products/${p.id}`}>
                  <div className="relative aspect-square overflow-hidden group"
                       style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                    <Image src={p.image} alt={p.name} fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw" loading="lazy" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3"
                         style={{ background: 'linear-gradient(to top, var(--bg-primary) 0%, transparent 60%)' }}>
                      <p className="font-orbitron text-[10px] tracking-wide"
                         style={{ color: 'var(--text-primary)' }}>{p.name}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          4. BEST SELLERS — Mise en avant chiffrée
          ================================================================ */}
      <section className="py-24 px-5 md:px-8 max-w-7xl mx-auto">
        <SectionHeader label="Les plus demandés" title="Best Sellers" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-14">
          {bestSellers.map((p, idx) => (
            <Link key={p.id} href={`/products/${p.id}`}>
              <div className="group relative overflow-hidden"
                   style={{ border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                {/* Rang */}
                <div className="absolute top-4 left-4 z-10 font-orbitron text-4xl font-black leading-none opacity-10"
                     style={{ color: 'var(--accent)' }}>
                  {String(idx + 1).padStart(2, '0')}
                </div>

                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={p.image} alt={p.name} fill loading="lazy"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw" />
                </div>

                {/* Info */}
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-orbitron text-xs tracking-wide" style={{ color: 'var(--text-primary)' }}>
                      {p.name}
                    </p>
                    <p className="font-dm-sans text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                      {p.category}
                    </p>
                  </div>
                  <span className="font-orbitron text-sm" style={{ color: 'var(--accent)' }}>
                    ${p.price}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ================================================================
          5. MANIFESTE
          ================================================================ */}
      <section id="manifesto" className="py-28 px-5 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)' }} />
        <div className="absolute top-0 left-0 right-0 h-px"
             style={{ background: 'linear-gradient(to right, transparent, white, transparent)', opacity: 0.6 }} />

        <div className="relative max-w-2xl mx-auto text-center">
          <p className="section-label mb-10">Manifeste</p>
          <h2 className="font-orbitron text-3xl md:text-5xl mb-8 leading-tight"
              style={{ color: 'var(--text-primary)' }}>
            Construit pour le{' '}
            <span style={{ color: 'var(--accent)' }}>prochain signal</span>
          </h2>
          <p className="font-dm-sans text-base leading-loose mb-5"
             style={{ color: 'var(--text-secondary)' }}>
            G2 n&apos;est pas une marque. G2 est une fréquence. Chaque pièce est conçue
            à l&apos;intersection de l&apos;utilitaire et de l&apos;art — là où la fonction rencontre le vide.
          </p>
          <p className="font-dm-sans text-sm leading-relaxed"
             style={{ color: 'var(--text-muted)' }}>
            Nous ne suivons pas les tendances. Nous construisons le terrain sur lequel elles courent.
          </p>
          <div className="w-16 h-px mx-auto mt-10 animate-pulse-glow"
               style={{ background: 'var(--accent)' }} />
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px"
             style={{ background: 'linear-gradient(to right, transparent, var(--accent-2), transparent)', opacity: 0.2 }} />
      </section>

      {/* ================================================================
          6. NEWSLETTER
          ================================================================ */}
      <section className="py-20 px-5" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-lg mx-auto text-center">
          <p className="section-label mb-4">Rejoindre</p>
          <h3 className="font-orbitron text-2xl mb-8 tracking-wide"
              style={{ color: 'var(--text-primary)' }}>
            Accès en avant-première
          </h3>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}

// Composant réutilisable pour les en-têtes de section
function SectionHeader({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center">
      <p className="section-label mb-3">{label}</p>
      <h2 className="font-orbitron text-3xl md:text-4xl tracking-wide" style={{ color: 'var(--text-primary)' }}>
        {title}
      </h2>
      {subtitle && (
        <p className="font-dm-sans text-sm mt-3" style={{ color: 'var(--text-muted)' }}>{subtitle}</p>
      )}
    </div>
  );
}
