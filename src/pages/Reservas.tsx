import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, User, Phone, Map } from 'lucide-react';
import { useStore } from '../store/useStore';

const COURTS = [
  { id: 'c1', name: 'Quadra Central' },
  { id: 'c2', name: 'Quadra 2' },
  { id: 'c3', name: 'Quadra 3' },
  { id: 'c4', name: 'Quadra 4' },
];

const TIME_SLOTS = [
  '07:00', '08:00', '09:00', '10:00', '11:00', 
  '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
];

export default function Reservas() {
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('');
  
  const [selectedCourt, setSelectedCourt] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const bookings = useStore(state => state.bookings);
  const addBooking = useStore(state => state.addBooking);

  const availableTimeSlots = useMemo(() => {
    return TIME_SLOTS.filter(t => {
      const occupiedCourtsCount = bookings.filter(b => b.date === date && b.time === t).length;
      return occupiedCourtsCount < COURTS.length;
    });
  }, [date, bookings]);

  useEffect(() => {
    if (!availableTimeSlots.includes(time) && availableTimeSlots.length > 0) {
      setTime(availableTimeSlots[0]);
    } else if (availableTimeSlots.length === 0) {
      setTime('');
    }
  }, [date, availableTimeSlots]);

  const isCourtOccupied = (courtId: string) => {
    return bookings.some(b => b.courtId === courtId && b.date === date && b.time === time);
  };

  const handleCourtClick = (courtId: string) => {
    if (isCourtOccupied(courtId)) return;
    setSelectedCourt(courtId);
    setIsModalOpen(true);
    setIsSuccess(false);
    setUserName('');
    setUserPhone('');
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourt || !userName || !userPhone) return;
    
    addBooking({
      id: Date.now().toString(),
      courtId: selectedCourt,
      date,
      time,
      userName,
      userPhone
    });
    
    setIsSuccess(true);
  };

  return (
    <div className="pt-20 min-h-screen bg-black flex flex-col relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-[#121212] to-transparent pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 w-full flex-1 flex flex-col">
        
        <div className="mb-12 text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-4">Motor de Reservas</h1>
          <p className="text-gray-400 font-light max-w-xl mx-auto">Experiência premium de reserva. Selecione a data, escolha o melhor horário e garanta sua quadra no saibro.</p>
        </div>

        {/* Date Selector */}
        <div className="flex flex-col items-center mb-12">
          <label className="text-[#C89B3C] text-[10px] uppercase tracking-[0.2em] font-bold mb-4">1. Selecione a Data</label>
          <div className="relative group w-full max-w-sm">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#C89B3C] to-[#e0af45] rounded-full blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
            <input 
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="relative bg-[#0a0a0a] border border-white/10 text-white px-8 py-4 outline-none focus:border-[#C89B3C] transition-all rounded-full w-full font-sans tracking-[0.1em] text-center shadow-lg"
            />
          </div>
        </div>

        {/* Time Selector */}
        <div className="mb-16">
          <label className="text-[#C89B3C] text-[10px] uppercase tracking-[0.2em] font-bold mb-6 block text-center">2. Horários Livres</label>
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
                    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3 } }
                  }}
                  onClick={() => setTime(t)}
                  className={`px-6 py-3 md:px-8 md:py-3.5 rounded-full border transition-all duration-300 font-medium tracking-wider active:scale-95 ${
                    time === t 
                      ? 'bg-gradient-to-r from-[#C89B3C] to-[#e0af45] text-black border-transparent shadow-[0_0_20px_rgba(200,155,60,0.4)] scale-105' 
                      : 'bg-[#121212]/80 backdrop-blur-md border-white/5 text-gray-300 hover:border-[#C89B3C]/40 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {t}
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <div className="text-center text-gray-500 bg-[#121212]/50 backdrop-blur-md py-6 rounded-2xl max-w-sm mx-auto border border-white/5">Nenhum horário disponível nesta data.</div>
          )}
        </div>

        {/* Cinema Style Court Map */}
        {time && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative max-w-5xl mx-auto w-full flex-1 flex flex-col items-center justify-center glass-card rounded-3xl p-8 md:p-12 mb-12"
          >
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#C89B3C 1px, transparent 1px), linear-gradient(90deg, #C89B3C 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            
            <div className="flex items-center gap-2 mb-10 relative z-10">
              <Map size={16} className="text-[#C89B3C]" />
              <label className="text-[#C89B3C] text-[10px] uppercase tracking-[0.2em] font-bold">3. Selecione sua Quadra</label>
            </div>

            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.1, delayChildren: 0.2 }
                }
              }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 relative z-10 w-full"
            >
              {COURTS.map((court) => {
                const occupied = isCourtOccupied(court.id);
                if (occupied) return null; // Apenas quadras livres

                return (
                  <motion.div 
                    key={court.id}
                    variants={{
                      hidden: { opacity: 0, scale: 0.95 },
                      visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
                    }}
                    onClick={() => handleCourtClick(court.id)}
                    className="relative aspect-[1/1.5] rounded-2xl border border-white/5 transition-all duration-300 flex flex-col items-center justify-center p-6 bg-[#1a1a1a]/80 backdrop-blur-sm hover:border-[#C89B3C]/50 cursor-pointer hover:shadow-[0_0_40px_rgba(200,155,60,0.15)] group hover:-translate-y-2"
                  >
                    <span className="text-[#cc4f33] text-[10px] font-bold tracking-[0.2em] uppercase mb-4 z-10">Saibro</span>
                    <h3 className="relative z-10 text-white text-2xl md:text-3xl font-serif text-center group-hover:scale-105 transition-transform duration-500">
                      Quadra<br/>{court.name.replace('Quadra ', '')}
                    </h3>
                    
                    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#C89B3C] shadow-[0_0_10px_rgba(200,155,60,0.8)] animate-pulse"></div>
                  </motion.div>
                );
              })}
            </motion.div>
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
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
              onClick={() => !isSuccess && setIsModalOpen(false)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative glass-card p-8 md:p-10 max-w-md w-full rounded-[2rem]"
            >
              {!isSuccess ? (
                <form onSubmit={handleConfirm}>
                  <h3 className="font-serif text-3xl text-white mb-2">Finalizar Reserva</h3>
                  <p className="text-[#C89B3C] text-[10px] uppercase tracking-[0.2em] mb-8 font-bold flex gap-2">
                    <span>{COURTS.find(c => c.id === selectedCourt)?.name}</span> • 
                    <span>{date}</span> • 
                    <span>{time}</span>
                  </p>
                  
                  <div className="space-y-5 mb-10">
                    <div className="relative group">
                      <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#C89B3C] transition-colors" size={18} />
                      <input 
                        type="text" 
                        required
                        placeholder="Nome Completo"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full bg-[#121212] border border-white/5 text-white pl-12 pr-4 py-4 outline-none focus:border-[#C89B3C]/50 focus:bg-[#1a1a1a] transition-all rounded-2xl font-light"
                      />
                    </div>
                    <div className="relative group">
                      <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#C89B3C] transition-colors" size={18} />
                      <input 
                        type="tel" 
                        required
                        placeholder="WhatsApp"
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                        className="w-full bg-[#121212] border border-white/5 text-white pl-12 pr-4 py-4 outline-none focus:border-[#C89B3C]/50 focus:bg-[#1a1a1a] transition-all rounded-2xl font-light"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button 
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 py-4 rounded-2xl border border-white/10 text-white uppercase tracking-[0.15em] text-xs font-bold hover:bg-white/5 active:scale-95 transition-all"
                    >
                      Cancelar
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-[#C89B3C] to-[#e0af45] text-black uppercase tracking-[0.15em] text-xs font-bold hover:shadow-[0_0_20px_rgba(200,155,60,0.3)] active:scale-95 transition-all"
                    >
                      Confirmar
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-6">
                  <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="w-20 h-20 bg-[#C89B3C]/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(200,155,60,0.2)]"
                  >
                    <CheckCircle2 size={40} className="text-[#C89B3C]" />
                  </motion.div>
                  <h3 className="font-serif text-3xl text-white mb-2">Ticket Confirmado</h3>
                  <p className="text-gray-400 font-light text-sm mb-8 leading-relaxed">
                    Sua quadra foi reservada com sucesso. Apresente este ticket na recepção.
                  </p>
                  
                  <div className="bg-[#121212] p-6 rounded-2xl border border-white/5 mb-8 text-left space-y-3">
                    <p className="text-white text-sm flex items-center"><span className="text-gray-500 w-24 inline-block text-[10px] uppercase tracking-wider font-bold">Nome</span> {userName}</p>
                    <p className="text-white text-sm flex items-center"><span className="text-gray-500 w-24 inline-block text-[10px] uppercase tracking-wider font-bold">Quadra</span> {COURTS.find(c => c.id === selectedCourt)?.name}</p>
                    <p className="text-white text-sm flex items-center"><span className="text-gray-500 w-24 inline-block text-[10px] uppercase tracking-wider font-bold">Data</span> {date}</p>
                    <p className="text-white text-sm flex items-center"><span className="text-gray-500 w-24 inline-block text-[10px] uppercase tracking-wider font-bold">Horário</span> <span className="text-[#C89B3C] font-semibold">{time}</span></p>
                  </div>

                  <button 
                    onClick={() => {
                      setIsModalOpen(false);
                      setIsSuccess(false);
                    }}
                    className="w-full py-4 rounded-2xl border border-[#C89B3C] text-[#C89B3C] uppercase tracking-[0.15em] text-xs font-bold hover:bg-[#C89B3C] hover:text-black hover:shadow-[0_0_20px_rgba(200,155,60,0.2)] active:scale-95 transition-all"
                  >
                    Fechar
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
