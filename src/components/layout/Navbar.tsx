'use client';

// Navbar premium — transparent → frosted glass au scroll
// Inclut ThemeToggle + badge panier + menu mobile animé

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore, useCartCount } from '@/lib/store';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { toggleCart } = useCartStore();
  const cartCount = useCartCount();

  // useCallback évite de recréer la fonction à chaque render
  const onScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const links = [
    { href: '/', label: 'Accueil' },
    { href: '/products', label: 'Shop' },
  ];

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-30 transition-all duration-500"
        style={{
          background: scrolled ? 'var(--glass)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        }}
      >
        <nav className="max-w-7xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/"
            className="font-orbitron font-black text-xl tracking-widest neon-text flex-shrink-0"
            style={{ color: 'var(--text-primary)' }}>
            G2
          </Link>

          {/* Liens desktop */}
          <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="font-orbitron text-[10px] tracking-[0.3em] uppercase transition-colors duration-200"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Actions droite */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <ThemeToggle />

            {/* Bouton panier */}
            <button
              onClick={toggleCart}
              className="relative flex items-center gap-2 font-orbitron text-[10px] tracking-[0.3em] uppercase transition-colors duration-200 px-3 py-2 rounded"
              style={{ color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z" />
              </svg>
              <span className="hidden sm:inline">Panier</span>
              {/* Badge */}
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-orbitron"
                  style={{ background: 'var(--accent)', color: 'var(--bg-primary)' }}
                >
                  {cartCount > 9 ? '9+' : cartCount}
                </motion.span>
              )}
            </button>

            {/* Hamburger mobile */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col gap-1 p-1.5 justify-center items-center w-9 h-9"
              aria-label="Menu"
            >
              <span className={`block w-5 h-px transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}
                style={{ background: 'var(--text-primary)' }} />
              <span className={`block w-5 h-px transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
                style={{ background: 'var(--text-primary)' }} />
              <span className={`block w-5 h-px transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}
                style={{ background: 'var(--text-primary)' }} />
            </button>
          </div>
        </nav>
      </header>

      {/* Menu mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-20 md:hidden"
            style={{
              background: 'var(--bg-secondary)',
              borderBottom: '1px solid var(--border)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <nav className="flex flex-col px-5 py-6 gap-5">
              {[...links, { href: '/cart', label: 'Panier' }].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={closeMenu}
                  className="font-orbitron text-sm tracking-[0.3em] uppercase"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
