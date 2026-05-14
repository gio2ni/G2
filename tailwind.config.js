/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx,js,jsx}'],

  theme: {
    extend: {
      // --- Couleurs via CSS variables (s'adaptent au thème) ---
      colors: {
        // Thème-aware — pointent vers les CSS vars
        'bg-primary':   'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'bg-card':      'var(--bg-card)',
        'text-primary': 'var(--text-primary)',
        'text-secondary':'var(--text-secondary)',
        'text-muted':   'var(--text-muted)',
        'accent':       'var(--accent)',
        'accent-2':     'var(--accent-2)',
        'chrome':       'var(--chrome)',
        'border-color': 'var(--border)',

        // Couleurs fixes (indépendantes du thème)
        'neon-cyan':   '#00E5FF',
        'neon-purple': '#7C3AED',
        'neon-pink':   '#FF00FF',
        'electric':    '#0057FF',
      },

      // --- Polices ---
      fontFamily: {
        orbitron:        ['var(--font-orbitron)', 'sans-serif'],
        'space-grotesk': ['var(--font-space-grotesk)', 'sans-serif'],
      },

      // --- Fonds ---
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(135deg, #00E5FF 0%, #7C3AED 100%)',
        'premium-gradient': 'linear-gradient(135deg, var(--text-primary) 0%, var(--accent) 100%)',
        // Grille ultra subtile
        'grid-pattern':
          "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.015'%3E%3Cpath d='M0 0h1v60H0zm59 0h1v60h-1zM0 0v1h60V0zm0 59v1h60v-1z'/%3E%3C/g%3E%3C/svg%3E\")",
        'grid-pattern-light':
          "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.025'%3E%3Cpath d='M0 0h1v60H0zm59 0h1v60h-1zM0 0v1h60V0zm0 59v1h60v-1z'/%3E%3C/g%3E%3C/svg%3E\")",
      },

      // --- Espacements premium ---
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },

      // --- Animations ---
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '92%': { opacity: '1' },
          '94%': { opacity: '0.7' },
          '96%': { opacity: '1' },
          '98%': { opacity: '0.85' },
        },
        'scan-line': {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 8px var(--accent-glow)' },
          '50%':      { boxShadow: '0 0 24px var(--accent-glow), 0 0 48px var(--accent-glow)' },
        },
      },
      animation: {
        flicker:      'flicker 4s ease-in-out infinite',
        'scan-line':  'scan-line 10s linear infinite',
        float:        'float 4s ease-in-out infinite',
        'fade-up':    'fade-up 0.5s ease-out forwards',
        'pulse-glow': 'pulse-glow 2.5s ease-in-out infinite',
      },
    },
  },

  plugins: [],
};
