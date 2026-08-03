import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { getUserReservations, signOut } from '../services/api';
import { User as UserIcon, LogOut, Calendar, Clock, Map, Activity } from 'lucide-react';
import { motion } from 'motion/react';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate('/login');
          return;
        }
        setUser(user);

        const { data: resData } = await getUserReservations();
        if (resData) {
          setReservations(resData);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Activity className="animate-spin text-[#cc4f33]" size={32} />
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-slate-50 flex flex-col relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-[400px] bg-gradient-to-b from-[#cc4f33]/5 to-transparent pointer-events-none"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 w-full flex-1">
        
        {/* Header do Perfil */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 mb-16">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-xl">
              <UserIcon size={40} className="text-[#cc4f33]" />
            </div>
            <div>
              <h1 className="text-3xl text-slate-900 font-heading font-bold tracking-tight">
                {user?.user_metadata?.full_name || 'Usuário'}
              </h1>
              <p className="text-slate-500 mt-1">{user?.email}</p>
              <div className="mt-3 inline-block px-3 py-1 bg-[#cc4f33]/10 border border-[#cc4f33]/20 rounded-full text-[#cc4f33] text-[10px] font-bold tracking-widest uppercase">
                Membro BioTenis
              </div>
            </div>
          </div>

          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase bg-white text-slate-900 px-6 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 hover:border-red-200 hover:text-red-500 transition-all active:scale-95 shadow-sm"
          >
            <LogOut size={16} /> Sair da Conta
          </button>
        </div>

        {/* Histórico de Reservas */}
        <div>
          <h2 className="text-xl text-slate-900 font-heading font-bold mb-6 flex items-center gap-3">
            <Calendar size={20} className="text-[#cc4f33]" />
            Minhas Reservas
          </h2>

          {reservations.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center shadow-sm">
              <p className="text-slate-500 mb-6">Você ainda não possui nenhuma reserva agendada.</p>
              <button 
                onClick={() => navigate('/reservas')}
                className="bg-[#cc4f33] text-white px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#e06042] transition-colors"
              >
                Fazer uma Reserva
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reservations.map((res: any, index: number) => {
                const date = new Date(res.start_time).toLocaleDateString('pt-BR');
                const time = new Date(res.start_time).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                
                const isPast = new Date(res.start_time) < new Date();
                
                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={res.id} 
                    className={`bg-white border ${isPast ? 'border-slate-200 opacity-60' : 'border-[#cc4f33]/30 shadow-sm'} rounded-2xl p-6 transition-all hover:border-[#cc4f33]/50`}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 flex items-center gap-2">
                        <Map size={14} className="text-[#cc4f33]" />
                        <span className="text-xs font-bold text-slate-900">{res.court?.name || 'Quadra'}</span>
                      </div>
                      <span className={`text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded-md ${
                        isPast ? 'bg-slate-100 text-slate-500' : 'bg-[#cc4f33]/10 text-[#cc4f33]'
                      }`}>
                        {isPast ? 'Concluída' : 'Agendada'}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-slate-600 text-sm">
                        <Calendar size={16} />
                        <span>{date}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-600 text-sm">
                        <Clock size={16} />
                        <span>{time}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
