import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Map, Calendar, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { getCourts, createReservation } from '../services/api';

const TIME_SLOTS = [
  '07:00', '08:00', '09:00', '10:00', '11:00', 
  '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
];

// O número do WhatsApp para onde enviaremos a confirmação (Substitua quando tiver o número)
const WHATSAPP_NUMBER = '5511999999999'; 

export default function Reservas() {
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('');
  
  const [courts, setCourts] = useState<any[]>([]);
  const [reservations, setReservations] = useState<any[]>([]);
  const [selectedCourt, setSelectedCourt] = useState<any | null>(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  const navigate = useNavigate();

  // 1. Carregar quadras e checar usuário
  useEffect(() => {
    async function loadData() {
      const { data: courtsData } = await getCourts();
      if (courtsData) setCourts(courtsData);

      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    }
    loadData();
  }, []);

  // 2. Carregar reservas da data selecionada
  useEffect(() => {
    async function fetchReservations() {
      const startOfDay = new Date(`${date}T00:00:00`).toISOString();
      const endOfDay = new Date(`${date}T23:59:59`).toISOString();

      const { data } = await supabase
        .from('reservations')
        .select('*')
        .gte('start_time', startOfDay)
        .lte('start_time', endOfDay)
        .neq('status', 'CANCELLED');

      setReservations(data || []);
    }
    fetchReservations();
  }, [date]);

  const availableTimeSlots = useMemo(() => {
    return TIME_SLOTS.filter(t => {
      // Formata o horário do loop para bater com o banco de dados
      const timeIsoString = new Date(`${date}T${t}:00`).toISOString();
      const occupiedCourtsCount = reservations.filter(r => r.start_time === timeIsoString).length;
      return occupiedCourtsCount < courts.length;
    });
  }, [date, reservations, courts.length]);

  useEffect(() => {
    if (!availableTimeSlots.includes(time) && availableTimeSlots.length > 0) {
      setTime(availableTimeSlots[0]);
    } else if (availableTimeSlots.length === 0) {
      setTime('');
    }
  }, [date, availableTimeSlots]);

  const isCourtOccupied = (courtId: string) => {
    const timeIsoString = new Date(`${date}T${time}:00`).toISOString();
    return reservations.some(r => r.court_id === courtId && r.start_time === timeIsoString);
  };

  const handleCourtClick = (court: any) => {
    if (isCourtOccupied(court.id)) return;
    
    if (!user) {
      // Se não estiver logado, manda pro login antes de reservar
      alert("Você precisa fazer login para reservar uma quadra.");
      navigate('/login');
      return;
    }

    setSelectedCourt(court);
    setIsModalOpen(true);
    setIsSuccess(false);
  };

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourt || !user) return;
    
    setLoading(true);
    try {
      const startDateTime = new Date(`${date}T${time}:00`);
      // Fim da reserva (1 hora depois por padrão)
      const endDateTime = new Date(startDateTime);
      endDateTime.setHours(endDateTime.getHours() + 1);

      const { error } = await createReservation(selectedCourt.id, startDateTime, endDateTime);
      if (error) throw error;

      setIsSuccess(true);
    } catch (err) {
      alert("Erro ao criar reserva. Tente novamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const sendToWhatsApp = () => {
    const text = `Olá, BioTenis! Gostaria de confirmar minha reserva:\n\n*Nome:* ${user?.user_metadata?.full_name || user?.email}\n*Quadra:* ${selectedCourt?.name}\n*Data:* ${date}\n*Horário:* ${time}\n\nAguardando confirmação!`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`, '_blank');
    setIsModalOpen(false);
  };

  return (
    <div className="pt-20 min-h-screen bg-slate-50 flex flex-col relative overflow-hidden">
      {/* Background Decorativo */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-[#cc4f33]/10 to-transparent pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 w-full flex-1 flex flex-col">
        
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-slate-900 font-heading font-bold tracking-tight mb-4">Motor de Reservas</h1>
          <p className="text-slate-600 font-medium max-w-xl mx-auto">Experiência premium. Selecione a data, o melhor horário e garanta sua quadra no saibro.</p>
        </div>

        {/* Date Selector */}
        <div className="flex flex-col items-center mb-12">
          <label className="text-[#cc4f33] text-[10px] uppercase tracking-[0.2em] font-bold mb-4 flex items-center gap-2">
            <Calendar size={14} /> 1. Selecione a Data
          </label>
          <div className="relative group w-full max-w-sm">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#cc4f33] to-[#e06042] rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <input 
              type="date" 
              value={date}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setDate(e.target.value)}
              className="relative bg-white border border-slate-200 text-slate-900 px-8 py-4 outline-none focus:border-[#cc4f33] transition-all rounded-2xl w-full font-sans tracking-[0.1em] text-center shadow-lg"
            />
          </div>
        </div>

        {/* Time Selector */}
        <div className="mb-16">
          <label className="text-[#cc4f33] text-[10px] uppercase tracking-[0.2em] font-bold mb-6 flex justify-center items-center gap-2">
            <Clock size={14} /> 2. Horários Livres
          </label>
          {availableTimeSlots.length > 0 ? (
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.03 }
                }
              }}
              className="flex flex-wrap gap-3 md:gap-4 justify-center max-w-3xl mx-auto"
            >
              {availableTimeSlots.map(t => (
                <motion.button
                  key={t}
                  variants={{
                    hidden: { opacity: 0, scale: 0.9, y: 10 },
                    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.2 } }
                  }}
                  onClick={() => setTime(t)}
                  className={`px-6 py-3 md:px-8 md:py-3.5 rounded-xl border transition-all duration-300 font-medium tracking-wider active:scale-95 ${
                    time === t 
                      ? 'bg-[#cc4f33] text-white border-transparent shadow-[0_0_20px_rgba(204,79,51,0.4)] scale-105' 
                      : 'bg-white border-slate-200 text-slate-500 hover:border-[#cc4f33]/40 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {t}
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <div className="text-center text-slate-500 bg-white py-6 rounded-2xl max-w-sm mx-auto border border-slate-200 shadow-sm">Nenhum horário disponível nesta data.</div>
          )}
        </div>

        {/* Court Map */}
        {time && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative max-w-5xl mx-auto w-full flex-1 flex flex-col items-center justify-center bg-white border border-slate-200 shadow-xl rounded-3xl p-8 md:p-12 mb-12"
          >
            <div className="flex items-center gap-2 mb-10 relative z-10">
              <Map size={16} className="text-[#cc4f33]" />
              <label className="text-[#cc4f33] text-[10px] uppercase tracking-[0.2em] font-bold">3. Selecione sua Quadra</label>
            </div>

            {courts.length === 0 ? (
              <p className="text-slate-500">Carregando quadras...</p>
            ) : (
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
                  }
                }}
                className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 relative z-10 w-full"
              >
                {courts.map((court) => {
                  const occupied = isCourtOccupied(court.id);
                  if (occupied) return null; // Apenas quadras livres

                  return (
                    <motion.div 
                      key={court.id}
                      variants={{
                        hidden: { opacity: 0, scale: 0.95 },
                        visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
                      }}
                      onClick={() => handleCourtClick(court)}
                      className="relative aspect-[1/1.5] rounded-2xl border border-slate-200 transition-all duration-300 flex flex-col items-center justify-center p-6 bg-slate-50 hover:bg-white shadow-sm hover:border-[#cc4f33]/50 cursor-pointer hover:shadow-[0_0_40px_rgba(204,79,51,0.15)] group hover:-translate-y-2"
                    >
                      <span className="text-[#cc4f33] text-[10px] font-bold tracking-[0.2em] uppercase mb-4 z-10">{court.surface}</span>
                      <h3 className="relative z-10 text-slate-900 text-xl md:text-2xl font-heading font-bold text-center group-hover:scale-105 transition-transform duration-500">
                        {court.name}
                      </h3>
                      <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#cc4f33] shadow-[0_0_10px_rgba(204,79,51,0.8)] animate-pulse"></div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </motion.div>
        )}
      </div>

      {/* Checkout Modal */}
      <AnimatePresence>
        {isModalOpen && selectedCourt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl"
              onClick={() => !isSuccess && setIsModalOpen(false)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-white border border-slate-200 p-8 md:p-10 max-w-md w-full rounded-[2rem] shadow-2xl"
            >
              {!isSuccess ? (
                <form onSubmit={handleConfirm}>
                  <h3 className="text-3xl text-slate-900 font-heading font-bold tracking-tight mb-2">Confirmar Reserva</h3>
                  <p className="text-[#cc4f33] text-[10px] uppercase tracking-[0.2em] mb-8 font-bold flex gap-2">
                    <span>{selectedCourt.name}</span> • 
                    <span>{new Date(date + 'T12:00:00').toLocaleDateString('pt-BR')}</span> • 
                    <span>{time}</span>
                  </p>
                  
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mb-8 text-left space-y-3">
                    <p className="text-slate-900 text-sm flex items-center"><span className="text-slate-500 w-24 inline-block text-[10px] uppercase tracking-wider font-bold">Usuário</span> {user?.user_metadata?.full_name || user?.email}</p>
                    <p className="text-slate-900 text-sm flex items-center"><span className="text-slate-500 w-24 inline-block text-[10px] uppercase tracking-wider font-bold">Status</span> Pagamento via WhatsApp</p>
                  </div>

                  <div className="flex gap-4">
                    <button 
                      type="button"
                      disabled={loading}
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 py-4 rounded-xl border border-slate-300 text-slate-700 uppercase tracking-[0.15em] text-xs font-bold hover:bg-slate-100 active:scale-95 transition-all"
                    >
                      Cancelar
                    </button>
                    <button 
                      type="submit"
                      disabled={loading}
                      className="flex-1 py-4 rounded-xl bg-[#cc4f33] hover:bg-[#e06042] text-white uppercase tracking-[0.15em] text-xs font-bold hover:shadow-[0_0_20px_rgba(204,79,51,0.3)] active:scale-95 transition-all disabled:opacity-50"
                    >
                      {loading ? 'Reservando...' : 'Confirmar'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-6">
                  <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                  >
                    <CheckCircle2 size={40} className="text-emerald-500" />
                  </motion.div>
                  <h3 className="text-3xl text-slate-900 font-heading font-bold tracking-tight mb-2">Reserva Salva!</h3>
                  <p className="text-slate-600 font-medium text-sm mb-8 leading-relaxed">
                    Sua quadra foi reservada no sistema. Agora, vá para o WhatsApp finalizar o pagamento e confirmar.
                  </p>
                  
                  <button 
                    onClick={sendToWhatsApp}
                    className="group w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#25D366] text-white uppercase tracking-[0.15em] text-xs font-bold hover:shadow-[0_0_20px_rgba(37,211,102,0.3)] active:scale-95 transition-all"
                  >
                    Confirmar no WhatsApp
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
