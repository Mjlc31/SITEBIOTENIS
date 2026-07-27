export type PlanType = 'Basic' | 'Premium' | 'VIP';
export type SurfaceType = 'Clay' | 'Hard' | 'Grass';
export type BookingStatus = 'confirmed' | 'pending' | 'cancelled';

export interface User {
  id: string;
  name: string;
  ranking_level: string;
  plan_type: PlanType;
}

export interface Court {
  id: string;
  name: string;
  surface_type: SurfaceType;
}

export interface Booking {
  id: string;
  court_id: string;
  user_id: string;
  start_time: string; // ISO String
  end_time: string; // ISO String
  status: BookingStatus;
}

export interface Program {
  id: string;
  title: string;
  coach_name: string;
  schedule: string;
  max_capacity: number;
}
