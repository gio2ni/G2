import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ borderTop: '1px solid var(--border)' }} className="py-14 px-5 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-12">
          {/* Logo + tagline */}
          <div>
            <Link href="/" className="font-orbitron font-black text-2xl neon-text"
                  style={{ color: 'var(--text-primary)' }}>
              G2
            </Link>
            <p className="font-dm-sans text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
              Future Luxury Streetwear
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap gap-8">
            {[
              ['/products', 'Shop'],
              ['/cart', 'Panier'],
            ].map(([href, label]) => (
              <Link key={href} href={href}
                className="font-orbitron text-[10px] tracking-[0.3em] uppercase transition-colors duration-200"
                style={{ color: 'var(--text-muted)' }}>
                {label}
              </Link>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex gap-6">
            {['Instagram', 'Twitter'].map((s) => (
              <a key={s} href="#"
                className="font-orbitron text-[10px] tracking-[0.3em] uppercase transition-colors duration-200"
                style={{ color: 'var(--text-muted)' }}>
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 pt-8"
             style={{ borderTop: '1px solid var(--border)' }}>
          <p className="font-dm-sans text-xs" style={{ color: 'var(--text-muted)' }}>
            © {year} G2. All rights reserved.
          </p>
          <p className="font-orbitron text-[9px] tracking-widest uppercase"
             style={{ color: 'var(--text-muted)' }}>
            Built for the future
          </p>
        </div>
      </div>
    </footer>
  );
}
