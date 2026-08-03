import { supabase } from '../lib/supabase';

// --- Auth ---
export const signInWithWhatsApp = async (email: string) => {
  // Para fins de simplificação, usando OTP via email ou apenas senha.
  // Como o fluxo é ir para o WhatsApp da BioTenis após logar, 
  // o usuário precisa se autenticar primeiro (Email/Senha ou Magic Link).
};

export const signUp = async (email: string, password: string, name: string, phone: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
        phone: phone,
      }
    }
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  let role = 'user';
  if (data?.user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single();
    
    if (profile) {
      role = profile.role;
    }
  }

  return { data: { ...data, role }, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const resetPasswordForEmail = async (email: string) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  return { data, error };
};

export const updatePassword = async (newPassword: string) => {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword
  });
  return { data, error };
};

// --- Courts ---
export const getCourts = async () => {
  const { data, error } = await supabase
    .from('courts')
    .select('*')
    .eq('is_active', true);
  return { data, error };
};

// --- Reservations ---
export const createReservation = async (courtId: string, startTime: Date, endTime: Date) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error("Usuário não autenticado");
  }

  const { data, error } = await supabase
    .from('reservations')
    .insert([
      {
        profile_id: user.id,
        court_id: courtId,
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
        status: 'PENDING',
        type: 'RENTAL'
      }
    ])
    .select()
    .single();

  return { data, error };
};

export const getUserReservations = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { data: null, error: new Error('Não logado') };

  const { data, error } = await supabase
    .from('reservations')
    .select(`
      *,
      court:courts(name)
    `)
    .eq('profile_id', user.id)
    .order('start_time', { ascending: false });

  return { data, error };
};

// --- Live Matches ---
export const subscribeToMatches = (callback: (payload: any) => void) => {
  const subscription = supabase
    .channel('live-matches')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'matches' },
      (payload) => {
        callback(payload);
      }
    )
    .subscribe();

  return subscription;
};

export const getLiveMatches = async () => {
  const { data, error } = await supabase
    .from('matches')
    .select(`
      *,
      player1:profiles!matches_player1_id_fkey(name),
      player2:profiles!matches_player2_id_fkey(name),
      court:courts(name)
    `)
    .in('status', ['IN_PROGRESS', 'SCHEDULED']);
    
  return { data, error };
};
