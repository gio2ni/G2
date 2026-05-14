// ============================================================
// CATALOGUE PRODUITS G2
// Toutes les données produits de la boutique.
// Pour ajouter un produit, il suffit d'ajouter un objet dans le tableau.
// ============================================================

export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'tee' | 'hoodie' | 'jacket' | 'accessory';
  sizes: string[];
  colors: string[];        // Codes hex des coloris disponibles
  description: string;
  image: string;           // URL de l'image (placehold.co pendant le dev)
  featured: boolean;       // Affiché sur la homepage
  isNew: boolean;          // Badge "New" sur la carte produit
}

export const products: Product[] = [
  {
    id: 'g2-tee-001',
    name: 'GRID BREACH TEE',
    price: 89,
    category: 'tee',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#000000', '#00FFFF'],
    description:
      'Coupe oversize. Coton heavyweight 380gsm. Broderie grille G2 sur la poitrine. Silhouette drop-shoulder.',
    image: '/images/tee-001.jpg',
    featured: true,
    isNew: true,
  },
  {
    id: 'g2-hoodie-001',
    name: 'CHROME VOID HOODIE',
    price: 189,
    category: 'hoodie',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#000000', '#808080'],
    description:
      'Intérieur polaire brossé. Fermeture éclair chrome réfléchissante. Coupe drop-shoulder. Logo G2 en relief.',
    image: '/images/hoodie-001.jpg',
    featured: true,
    isNew: false,
  },
  {
    id: 'g2-jacket-001',
    name: 'NEON RECON JACKET',
    price: 349,
    category: 'jacket',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#000000'],
    description:
      'Coque technique imperméable. Coutures soudées. Passepoil néon cyan. Fermetures magnétiques cachées.',
    image: '/images/jacket-001.jpg',
    featured: true,
    isNew: true,
  },
  {
    id: 'g2-tee-002',
    name: 'STATIC SIGNAL TEE',
    price: 79,
    category: 'tee',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['#000000', '#ffffff'],
    description:
      'Coupe regular. Impression sérigraphie motif noise. 100% coton biologique. Lavage à 30°.',
    image: '/images/tee-002.jpg',
    featured: false,
    isNew: true,
  },
  {
    id: 'g2-acc-001',
    name: 'CYBER CAP',
    price: 59,
    category: 'accessory',
    sizes: ['ONE SIZE'],
    colors: ['#000000'],
    description:
      'Casquette 6 panneaux structurée. Monogramme G2 brodé. Sangle ajustable métal brossé.',
    image: '/images/cap-001.jpg',
    featured: false,
    isNew: false,
  },
  {
    id: 'g2-hoodie-002',
    name: 'PHANTOM ZIP HOODIE',
    price: 209,
    category: 'hoodie',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#000000'],
    description:
      'Zip intégral. Poche kangourou. Panneaux de ventilation découpés au laser. Tissu anti-boulochage.',
    image: '/images/hoodie-002.jpg',
    featured: false,
    isNew: false,
  },
];

// Retourne uniquement les produits mis en avant (homepage)
export const getFeaturedProducts = (): Product[] =>
  products.filter((p) => p.featured);

// Retourne un produit par son ID
export const getProductById = (id: string): Product | undefined =>
  products.find((p) => p.id === id);
