import { Court, Booking, User, Program } from '../types';

// Mock Data
export const mockCourts: Court[] = [
  { id: 'c1', name: 'Quadra Central (Philippe Chatrier)', surface_type: 'Clay' },
  { id: 'c2', name: 'Quadra 2 (Suzanne Lenglen)', surface_type: 'Clay' },
  { id: 'c3', name: 'Quadra 3', surface_type: 'Clay' },
  { id: 'c4', name: 'Quadra 4', surface_type: 'Clay' },
];

export const mockUser: User = {
  id: 'u1',
  name: 'Arthur Moraes',
  ranking_level: 'Pro',
  plan_type: 'VIP',
};

// Generate some mock bookings for today
const today = new Date();
today.setHours(0, 0, 0, 0);

const createDate = (hours: number) => {
  const d = new Date(today);
  d.setHours(hours);
  return d.toISOString();
};

export let mockBookings: Booking[] = [
  { id: 'b1', court_id: 'c1', user_id: 'u2', start_time: createDate(8), end_time: createDate(9), status: 'confirmed' },
  { id: 'b2', court_id: 'c1', user_id: 'u3', start_time: createDate(9), end_time: createDate(11), status: 'confirmed' },
  { id: 'b3', court_id: 'c2', user_id: 'u4', start_time: createDate(18), end_time: createDate(20), status: 'confirmed' },
  { id: 'b4', court_id: 'c3', user_id: 'u1', start_time: createDate(7), end_time: createDate(8), status: 'confirmed' },
  { id: 'b5', court_id: 'c4', user_id: 'u5', start_time: createDate(16), end_time: createDate(17), status: 'confirmed' },
];

export const mockPrograms: Program[] = [
  { id: 'p1', title: 'Treinamento de Alto Rendimento', coach_name: 'Carlos Moya', schedule: 'Seg, Qua, Sex 14:00 - 17:00', max_capacity: 12 },
  { id: 'p2', title: 'Clínica Infantil', coach_name: 'Ana Silva', schedule: 'Ter, Qui 09:00 - 11:00', max_capacity: 20 },
  { id: 'p3', title: 'Masterclass de Saque', coach_name: 'Goran', schedule: 'Sábados 08:00 - 10:00', max_capacity: 8 },
];

// Mock Supabase Client API
export const supabaseMock = {
  from: (table: string) => ({
    select: async () => {
      // simulate network
      await new Promise(r => setTimeout(r, 400));
      if (table === 'courts') return { data: mockCourts, error: null };
      if (table === 'bookings') return { data: mockBookings, error: null };
      if (table === 'programs') return { data: mockPrograms, error: null };
      return { data: [], error: null };
    },
    insert: async (data: any) => {
      await new Promise(r => setTimeout(r, 600));
      if (table === 'bookings') {
        const newBooking = { ...data, id: `b${Date.now()}`, status: 'confirmed' };
        mockBookings.push(newBooking);
        return { data: newBooking, error: null };
      }
      return { data: null, error: 'Table not supported in mock' };
    }
  })
};
