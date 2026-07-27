import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface BookingData {
  id: string;
  courtId: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  userName: string;
  userPhone: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface PlayerScore {
  sets: number;
  games: number;
  points: string;
}

export interface LiveGame {
  id: string;
  date: string;
  tournament: string;
  player1: { name: string; class: string };
  player2: { name: string; class: string };
  score: {
    player1: PlayerScore;
    player2: PlayerScore;
  };
  status: 'scheduled' | 'in_progress' | 'finished';
}

interface AppState {
  bookings: BookingData[];
  addBooking: (booking: BookingData) => void;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  liveGames: LiveGame[];
  addLiveGame: (game: LiveGame) => void;
  updateLiveGame: (id: string, game: Partial<LiveGame>) => void;
  deleteLiveGame: (id: string) => void;
  isAdmin: boolean;
  loginAdmin: () => void;
  logoutAdmin: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      bookings: [],
      addBooking: (booking) => set((state) => ({ bookings: [...state.bookings, booking] })),
      cart: [],
      addToCart: (item) => set((state) => {
        const existing = state.cart.find(i => i.id === item.id);
        if (existing) {
          return { cart: state.cart.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i) };
        }
        return { cart: [...state.cart, item] };
      }),
      removeFromCart: (id) => set((state) => ({ cart: state.cart.filter(i => i.id !== id) })),
      clearCart: () => set({ cart: [] }),
      liveGames: [],
      addLiveGame: (game) => set((state) => ({ liveGames: [...state.liveGames, game] })),
      updateLiveGame: (id, updatedGame) => set((state) => ({
        liveGames: state.liveGames.map(g => g.id === id ? { ...g, ...updatedGame } : g)
      })),
      deleteLiveGame: (id) => set((state) => ({
        liveGames: state.liveGames.filter(g => g.id !== id)
      })),
      isAdmin: false,
      loginAdmin: () => set({ isAdmin: true }),
      logoutAdmin: () => set({ isAdmin: false }),
    }),
    {
      name: 'biotenis-storage',
    }
  )
);
