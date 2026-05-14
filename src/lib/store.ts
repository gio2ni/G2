// ============================================================
// STORE ZUSTAND — Gestion du panier G2
//
// Architecture :
//   - Un seul store global, pas de Provider React nécessaire
//   - `persist` middleware → données sauvegardées dans localStorage
//   - `partialize` → on ne persiste que `items`, pas `isOpen`
//
// Flux de données :
//   ProductCard.handleAddToCart()
//     → addItem(item)
//       → store.items mis à jour
//       → isOpen = true  (la CartSidebar s'ouvre automatiquement)
// ============================================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Type d'un article dans le panier
export interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
}

// Interface complète du store
interface CartStore {
  items: CartItem[];
  isOpen: boolean;

  // Actions
  addItem: (item: CartItem) => void;
  removeItem: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      // Ajoute un article ou incrémente la quantité s'il existe déjà
      addItem: (item) => {
        const existing = get().items.find(
          (i) => i.id === item.id && i.size === item.size
        );
        if (existing) {
          set((state) => ({
            items: state.items.map((i) =>
              i.id === item.id && i.size === item.size
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          }));
        } else {
          set((state) => ({ items: [...state.items, { ...item, quantity: 1 }] }));
        }
        // Ouvre automatiquement le sidebar après l'ajout
        set({ isOpen: true });
      },

      removeItem: (id, size) =>
        set((state) => ({
          items: state.items.filter((i) => !(i.id === id && i.size === size)),
        })),

      updateQuantity: (id, size, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id, size);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id && i.size === size ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      openCart: () => set({ isOpen: true }),

      closeCart: () => set({ isOpen: false }),
    }),
    {
      name: 'g2-cart',
      // On ne sauvegarde que le contenu du panier, pas l'état d'ouverture du sidebar
      partialize: (state) => ({ items: state.items }),
    }
  )
);

// --- Sélecteurs dérivés ---

// Nombre total d'articles dans le panier (affiché dans la Navbar)
export const useCartCount = () =>
  useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );

// Prix total du panier
export const useCartTotal = () =>
  useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );
