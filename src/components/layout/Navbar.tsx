'use client';

// Navbar fixée en haut — transparente au début, frosted-glass après 40px de scroll
// Badge panier dynamique via Zustand

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCartStore, useCartCount } from '@/lib/store';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { toggleCart } = useCartStore();
  const cartCount = useCartCount();

  // Passe en mode "frosted glass" dès 40px de scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-500 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-md border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Logo G2 */}
        <Link
          href="/"
          className="font-orbitron font-black text-2xl text-white hover:text-neon-cyan transition-colors duration-200 neon-text-cyan"
        >
          G2
        </Link>

        {/* Liens desktop — cachés sur mobile */}
        <div className="hidden md:flex items-center gap-10">
          {[
            ['/', 'ACCUEIL'],
            ['/products', 'SHOP'],
          ].map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="font-orbitron text-[11px] tracking-[0.3em] text-white/50 hover:text-white transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Côté droit — panier + menu mobile */}
        <div className="flex items-center gap-4">
          {/* Bouton panier */}
          <button
            onClick={toggleCart}
            className="relative flex items-center gap-2 font-orbitron text-[11px] tracking-[0.3em] uppercase text-white/50 hover:text-white transition-colors duration-200"
            aria-label="Ouvrir le panier"
          >
            <span>PANIER</span>
            {/* Badge — nombre d'articles */}
            {cartCount > 0 && (
              <span className="flex items-center justify-center w-5 h-5 bg-neon-cyan text-black text-[10px] font-orbitron rounded-full">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </button>

          {/* Bouton hamburger — mobile uniquement */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-1"
            aria-label="Menu"
          >
            <span
              className={`block w-5 h-px bg-white transition-all duration-200 ${
                menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-5 h-px bg-white transition-all duration-200 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-5 h-px bg-white transition-all duration-200 ${
                menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Menu mobile déroulant */}
      {menuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/10 px-4 py-6 flex flex-col gap-6">
          {[
            ['/', 'ACCUEIL'],
            ['/products', 'SHOP'],
            ['/cart', 'PANIER'],
          ].map(([href, label]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="font-orbitron text-sm tracking-[0.3em] text-white/70 hover:text-white transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
