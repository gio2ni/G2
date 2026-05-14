# G2 — Future Luxury Streetwear

Boutique e-commerce cyberpunk pour la marque de vêtements **G2**.
Design immersif, T-shirt 3D interactif, animations fluides.

---

## Stack technique

| Technologie | Rôle |
|---|---|
| Next.js 14 (App Router) | Framework React — routing, SSR, optimisation images |
| React 18 + TypeScript | UI + typage |
| Three.js + @react-three/fiber | Scène 3D (T-shirt chrome rotatif) |
| @react-three/drei | Helpers 3D (Float, Stars, Environment) |
| @react-three/postprocessing | Effets visuels (Bloom, ChromaticAberration) |
| Framer Motion | Animations UI (loader, panier, cartes) |
| Zustand | Gestion du panier (persist localStorage) |
| Tailwind CSS | Styles utilitaires + design system |

---

## Installation

```bash
# Cloner le projet
git clone https://github.com/TON_USERNAME/G2.git
cd G2

# Installer les dépendances
npm install
```

## Lancement en développement

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans le navigateur.

## Build pour la production

```bash
npm run build
npm start
```

---

## Structure du projet

```
src/
├── app/                          # Pages (Next.js App Router)
│   ├── layout.tsx                # Layout racine (fonts, composants globaux)
│   ├── page.tsx                  # Homepage (Hero 3D + Featured + Manifeste)
│   ├── products/
│   │   ├── page.tsx              # Catalogue avec filtres
│   │   └── [id]/page.tsx         # Fiche produit
│   └── cart/page.tsx             # Page panier
│
├── components/
│   ├── 3d/HeroScene.tsx          # Scène Three.js — T-shirt 3D (ssr:false)
│   ├── layout/
│   │   ├── Navbar.tsx            # Navigation fixée (transparent → frosted glass)
│   │   └── Footer.tsx            # Pied de page
│   └── ui/
│       ├── Loader.tsx            # Écran de chargement (2.5s)
│       ├── CustomCursor.tsx      # Curseur personnalisé (dot + ring)
│       ├── CartSidebar.tsx       # Panneau panier slide-in
│       ├── ProductCard.tsx       # Carte produit glassmorphism
│       └── AddToCartButton.tsx   # Bouton ajout panier (Client Component)
│
└── lib/
    ├── store.ts                  # Store Zustand — état du panier
    └── products.ts               # Données produits fictifs
```

---

## Décisions d'architecture

### Pourquoi `dynamic(..., { ssr: false })` pour HeroScene ?
Three.js utilise WebGL et `window` — ces APIs n'existent pas côté serveur.
Sans `ssr: false`, Next.js plante au build avec "window is not defined".

### Pourquoi `useRef` (pas `useState`) pour le tracking souris ?
La souris se déplace à 60fps+. `useState` déclencherait 60 re-renders/seconde.
`useRef` met à jour la valeur en mémoire sans déclencher de re-render.
La boucle `useFrame` de React Three Fiber lit le ref directement chaque frame.

### Pourquoi Zustand (pas Redux/Context) ?
- Pas de Provider wrapper nécessaire
- Middleware `persist` intégré → localStorage en une ligne
- Sélecteurs dérivés (`useCartCount`, `useCartTotal`) sans re-renders inutiles

---

## Déploiement

### Vercel (recommandé — gratuit)

**Option 1 — CLI :**
```bash
npx vercel
# Suivre les instructions interactives
```

**Option 2 — Interface web :**
1. Aller sur [vercel.com](https://vercel.com) → Sign Up (GitHub)
2. "New Project" → Importer le repo GitHub "G2"
3. Framework : Next.js (auto-détecté)
4. Cliquer "Deploy" → URL automatique fournie

Chaque `git push` sur `main` déclenche un redéploiement automatique.

---

### Netlify (alternative gratuite)

1. Aller sur [netlify.com](https://netlify.com) → Sign Up (GitHub)
2. "New site from Git" → Sélectionner repo "G2"
3. Paramètres build :
   - **Build command** : `npm run build`
   - **Publish directory** : `.next`
4. Cliquer "Deploy site"

**Note :** Pour un support complet de Next.js sur Netlify, installer le plugin :
```bash
npm install @netlify/plugin-nextjs
```

---

## Publier sur GitHub

```bash
# 1. Initialiser git (si pas encore fait)
git init
git add .
git commit -m "feat: initial G2 e-commerce project"

# 2. Créer un repo "G2" sur github.com (bouton "New repository")
#    Laisser vide (sans README ni .gitignore)

# 3. Connecter et pousser
git remote add origin https://github.com/TON_USERNAME/G2.git
git branch -M main
git push -u origin main
```

---

## Personnalisation rapide

| Quoi modifier | Fichier |
|---|---|
| Produits (noms, prix, images) | `src/lib/products.ts` |
| Couleurs de la marque | `tailwind.config.js` → `colors` |
| Polices | `src/app/layout.tsx` → `Orbitron`, `Space_Grotesk` |
| Slogan homepage | `src/app/page.tsx` → section Hero |
| Données du store panier | `src/lib/store.ts` |

---

## Licence

Projet personnel — tous droits réservés G2.
