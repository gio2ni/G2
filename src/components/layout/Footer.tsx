// Footer G2 — Pied de page sobre et futuriste
// Composant serveur — pas de state ni d'interactivité

import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">

        {/* Logo */}
        <Link
          href="/"
          className="font-orbitron font-black text-2xl text-white neon-text-cyan"
        >
          G2
        </Link>

        {/* Navigation footer */}
        <nav className="flex flex-wrap justify-center gap-8">
          {[
            ['/products', 'Shop'],
            ['/cart', 'Panier'],
          ].map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="font-orbitron text-[10px] tracking-[0.3em] uppercase text-white/30 hover:text-white transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Réseaux sociaux */}
        <div className="flex gap-6">
          {['Instagram', 'Twitter'].map((social) => (
            <a
              key={social}
              href="#"
              className="font-orbitron text-[10px] tracking-[0.3em] uppercase text-white/30 hover:text-neon-cyan transition-colors duration-200"
            >
              {social}
            </a>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/5 text-center">
        <p className="font-space-grotesk text-white/20 text-xs tracking-widest">
          © {year} G2. All rights reserved. Built for the future.
        </p>
      </div>
    </footer>
  );
}
