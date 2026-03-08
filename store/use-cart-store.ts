import { create } from 'zustand';

import { PetItem } from '@/types/pet';

type CartItem = {
  pet: PetItem;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  addToCart: (pet: PetItem) => void;
  removeFromCart: (petId: string) => void;
  incrementQuantity: (petId: string) => void;
  decrementQuantity: (petId: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  addToCart: (pet) =>
    set((state) => {
      const existing = state.items.find((item) => item.pet.id === pet.id);
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.pet.id === pet.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      }

      return {
        items: [...state.items, { pet, quantity: 1 }],
      };
    }),
  removeFromCart: (petId) =>
    set((state) => ({
      items: state.items.filter((item) => item.pet.id !== petId),
    })),
  incrementQuantity: (petId) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.pet.id === petId ? { ...item, quantity: item.quantity + 1 } : item
      ),
    })),
  decrementQuantity: (petId) =>
    set((state) => ({
      items: state.items
        .map((item) =>
          item.pet.id === petId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0),
    })),
  clearCart: () => set({ items: [] }),
}));
