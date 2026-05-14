// Layout racine de l'application Next.js
// Charge les polices Google, injecte le CSS global, et monte les composants persistants
// (Loader, Curseur, Navbar, Footer, Sidebar panier)

import type { Metadata } from 'next';
import { Orbitron, Space_Grotesk } from 'next/font/google';
import '@/styles/globals.css';

// Composants persistants — présents sur toutes les pages
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartSidebar from '@/components/ui/CartSidebar';
import Loader from '@/components/ui/Loader';
import CustomCursor from '@/components/ui/CustomCursor';

// Police futuriste — utilisée pour tous les titres et labels
const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
});

// Police body — lisible et moderne
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

// Métadonnées de la page — SEO et onglet navigateur
export const metadata: Metadata = {
  title: 'G2 — Future Luxury Streetwear',
  description: 'Vêtements cyberpunk luxe. Portez le futur.',
  keywords: ['G2', 'cyberpunk', 'luxury streetwear', 'futuristic fashion', 'vêtements'],
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${orbitron.variable} ${spaceGrotesk.variable}`}
    >
      <body className="bg-black text-white">
        {/* Écran de chargement — plein écran, disparaît après 2.5s */}
        <Loader />

        {/* Curseur personnalisé (dot + ring) — remplace le curseur système */}
        <CustomCursor />

        {/* Navigation fixée en haut */}
        <Navbar />

        {/* Contenu principal de chaque page */}
        <main>{children}</main>

        {/* Pied de page */}
        <Footer />

        {/* Panneau panier slide-in — contrôlé par Zustand (isOpen) */}
        <CartSidebar />
      </body>
    </html>
  );
}
