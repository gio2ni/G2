/** @type {import('tailwindcss').Config} */
module.exports = {
  // Tous les fichiers source que Tailwind doit analyser pour les classes utilisées
  content: ['./src/**/*.{ts,tsx,js,jsx}'],

  theme: {
    extend: {
      // --- Palette de couleurs de la marque G2 ---
      colors: {
        'neon-cyan': '#00FFFF',    // Couleur principale — accent néon
        'neon-purple': '#7C3AED', // Violet secondaire
        'neon-pink': '#FF00FF',   // Rose accent
        'chrome': '#C0C0C0',      // Gris chrome — texte secondaire
        'chrome-dark': '#808080', // Chrome foncé
      },

      // --- Polices personnalisées (injectées via CSS variables dans layout.tsx) ---
      fontFamily: {
        orbitron: ['var(--font-orbitron)', 'sans-serif'],
        'space-grotesk': ['var(--font-space-grotesk)', 'sans-serif'],
      },

      // --- Dégradés et fonds ---
      backgroundImage: {
        // Dégradé chrome (pour textes ou éléments)
        'chrome-gradient': 'linear-gradient(135deg, #C0C0C0 0%, #808080 50%, #C0C0C0 100%)',
        // Dégradé néon cyan → violet
        'cyber-gradient': 'linear-gradient(135deg, #00FFFF 0%, #7C3AED 100%)',
        // Grille SVG en data URI — fond de la homepage
        'grid-pattern':
          "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M0 0h1v40H0zm39 0h1v40h-1zM0 0v1h40V0zm0 39v1h40v-1z'/%3E%3C/g%3E%3C/svg%3E\")",
      },

      // --- Animations personnalisées ---
      keyframes: {
        // Scintillement subtil du logo
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
          '75%': { opacity: '0.95' },
        },
        // Ligne de scan cyberpunk qui descend
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        // Pulsation de glow
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 5px #00FFFF, 0 0 10px #00FFFF' },
          '50%': { boxShadow: '0 0 20px #00FFFF, 0 0 40px #00FFFF, 0 0 60px #00FFFF' },
        },
        // Indicateur de scroll qui pulse
        'scroll-indicator': {
          '0%, 100%': { opacity: '0.6', transform: 'scaleY(1)' },
          '50%': { opacity: '1', transform: 'scaleY(0.6)' },
        },
      },
      animation: {
        flicker: 'flicker 3s ease-in-out infinite',
        'scan-line': 'scan-line 8s linear infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'scroll-indicator': 'scroll-indicator 1.5s ease-in-out infinite',
      },
    },
  },

  plugins: [],
};
