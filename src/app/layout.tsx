import type { Metadata } from 'next';
import { Orbitron, Space_Grotesk } from 'next/font/google';
import '@/styles/globals.css';

import { ThemeProvider } from '@/lib/theme';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartSidebar from '@/components/ui/CartSidebar';
import Loader from '@/components/ui/Loader';

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'G2 — Future Luxury Streetwear',
  description: 'Vêtements cyberpunk luxe. Portez le futur.',
  keywords: ['G2', 'cyberpunk', 'luxury streetwear', 'futuristic fashion'],
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning évite le flash lors de la lecture du thème localStorage
    <html lang="fr" className={`${orbitron.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <body>
        {/*
          Script inline exécuté AVANT le paint — lit le thème sauvegardé
          et applique data-theme avant que React ne s'hydrate.
          Cela élimine le flash blanc/noir au chargement.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem('g2-theme')==='dark'){document.documentElement.setAttribute('data-theme','dark');}}catch(e){}})();`,
          }}
        />

        <ThemeProvider>
          <Loader />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CartSidebar />
        </ThemeProvider>
      </body>
    </html>
  );
}
