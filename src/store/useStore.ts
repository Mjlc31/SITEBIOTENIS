import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CoachAttribute {
  name: string;
  value: number;
}

export interface Coach {
  id: string;
  name: string;
  role: string;
  img: string;
  bio: string;
  attributes: CoachAttribute[];
}

const initialCoaches: Coach[] = [
  {
    id: 'gefferson',
    name: 'Gefferson',
    role: 'Head Coach',
    img: '/gefferson.png',
    bio: 'Treinador especialista em desenvolvimento técnico e tático.',
    attributes: [
      { name: 'Técnica', value: 95 },
      { name: 'Intensidade', value: 90 },
      { name: 'Tática', value: 95 },
      { name: 'Paciência Infantil', value: 85 },
    ]
  },
  {
    id: 'laninho',
    name: 'Laninho',
    role: 'Treinador Avançado',
    img: '/laninho.png',
    bio: 'Foco no alto rendimento e torneios competitivos.',
    attributes: [
      { name: 'Técnica', value: 90 },
      { name: 'Intensidade', value: 95 },
      { name: 'Tática', value: 90 },
      { name: 'Paciência Infantil', value: 80 },
    ]
  },
  {
    id: 'adeilson',
    name: 'Adeilson',
    role: 'Coordenador Infantil',
    img: '/adeilson.png',
    bio: 'Especialista em tênis para crianças e iniciantes.',
    attributes: [
      { name: 'Técnica', value: 85 },
      { name: 'Intensidade', value: 80 },
      { name: 'Tática', value: 85 },
      { name: 'Paciência Infantil', value: 100 },
    ]
  },
  {
    id: 'adair',
    name: 'Adair',
    role: 'Treinador Master',
    img: '/adair.png',
    bio: 'Vasta experiência, com foco na técnica e evolução constante.',
    attributes: [
      { name: 'Técnica', value: 98 },
      { name: 'Intensidade', value: 85 },
      { name: 'Tática', value: 95 },
      { name: 'Paciência Infantil', value: 90 },
    ]
  }
];

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
  time?: string;
  tournament: string;
  player1: { name: string; class: string; partnerName?: string };
  player2: { name: string; class: string; partnerName?: string };
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
  coaches: Coach[];
  updateCoach: (id: string, updatedCoach: Partial<Coach>) => void;
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
      coaches: initialCoaches,
      updateCoach: (id, updatedCoach) => set((state) => ({
        coaches: state.coaches.map(c => c.id === id ? { ...c, ...updatedCoach } : c)
      })),
    }),
    {
      name: 'biotenis-storage',
    }
  )
);
