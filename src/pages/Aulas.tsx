import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Star, X, Phone, User, Calendar, MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '5582933280000';

import { useStore } from '../store/useStore';export default function Aulas() {
  const coaches = useStore(state => state.coaches);
  const [selectedCoach, setSelectedCoach] = useState(coaches[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trialName, setTrialName] = useState('');
  const [trialPhone, setTrialPhone] = useState('');
  const [trialDate, setTrialDate] = useState('');
  const [sent, setSent] = useState(false);

  const handleOpenModal = () => {
    setSent(false);
    setTrialName('');
    setTrialPhone('');
    setTrialDate('');
    setIsModalOpen(true);
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedDate = trialDate ? new Date(trialDate + 'T12:00:00').toLocaleDateString('pt-BR') : 'A combinar';
    const text = `Olá, Biotenis! Gostaria de agendar uma *Aula Teste*.\n\n*Nome:* ${trialName}\n*Telefone:* ${trialPhone}\n*Treinador:* ${selectedCoach.name}\n*Data desejada:* ${formattedDate}\n\nAguardo confirmação!`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`, '_blank');
    setSent(true);
  };

  return (
    <div className="pt-20 min-h-screen bg-slate-50 flex flex-col md:flex-row overflow-x-hidden md:overflow-hidden relative">
      {/* Background */}
      <div className="absolute inset-0 bg-transparent z-0 pointer-events-none"></div>

      {/* Roster Selection (Left Side on Desktop) */}
      <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-slate-200 z-10 flex flex-col bg-white">
        <div className="p-8 border-b border-slate-200">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-2">Treinadores</h1>
          <p className="text-slate-500 text-xs font-semibold">Selecione seu mentor</p>
        </div>
        
        <div className="flex-1 overflow-x-auto overflow-y-hidden md:overflow-y-auto md:overflow-x-hidden flex flex-row md:flex-col snap-x md:snap-y snap-mandatory p-4 md:p-4 gap-2">
          {coaches.map(coach => {
            const isSelected = selectedCoach.id === coach.id;
            return (
              <button
                key={coach.id}
                onClick={() => setSelectedCoach(coach)}
                className={`group flex-shrink-0 w-64 md:w-full flex items-center gap-4 p-4 snap-center transition-all duration-200 rounded-xl text-left
                  ${isSelected ? 'bg-slate-50 border border-slate-200 shadow-sm' : 'border border-transparent hover:bg-slate-50 opacity-70 hover:opacity-100'}
                `}
              >
                <div className={`w-14 h-14 rounded-full overflow-hidden shrink-0 transition-all duration-300 ${isSelected ? 'ring-2 ring-[#cc4f33] ring-offset-2 ring-offset-white grayscale-0' : 'grayscale group-hover:grayscale-[0.5]'}`}>
                  <img src={coach.img} alt={coach.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className={`text-base font-bold transition-colors ${isSelected ? 'text-slate-900' : 'text-slate-600 group-hover:text-slate-900'}`}>{coach.name}</h3>
                  <p className="text-slate-500 text-xs font-medium line-clamp-1">{coach.role}</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Character Profile (Right Side) */}
      <div className="w-full md:w-2/3 p-8 md:p-16 flex flex-col justify-center z-10 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCoach.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-2xl relative z-20"
          >
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center mb-8">
              <div className="shrink-0 relative">
                <div className="absolute inset-0 bg-[#cc4f33]/10 rounded-2xl transform translate-x-2 translate-y-2"></div>
                <img 
                  src={selectedCoach.img} 
                  alt={selectedCoach.name} 
                  className="w-32 h-32 md:w-48 md:h-48 rounded-2xl object-cover shadow-lg relative z-10 border-4 border-white"
                />
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#cc4f33] text-xs font-bold uppercase tracking-widest">{selectedCoach.role}</span>
                </div>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-slate-900 tracking-tight">{selectedCoach.name}</h2>
              </div>
            </div>
            
            <p className="text-slate-600 font-medium text-lg md:text-xl leading-relaxed mb-12">
              {selectedCoach.bio}
            </p>

            {/* Minimal Attributes */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {selectedCoach.attributes.map(attr => (
                <div key={attr.name} className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-center shadow-sm">
                  <span className="text-slate-500 text-xs font-semibold mb-1">{attr.name}</span>
                  <span className="text-slate-900 text-xl font-bold">{attr.value}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={handleOpenModal}
              className="group relative flex items-center justify-center gap-3 bg-[#cc4f33] text-white hover:bg-[#e06042] px-8 py-3.5 tracking-widest text-xs font-bold transition-all duration-200 rounded-xl w-full sm:w-auto active:scale-95 hover:shadow-[0_0_20px_rgba(204,79,51,0.4)] cursor-pointer"
            >
              Agendar Aula Teste
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </AnimatePresence>

      </div>

      {/* Trial Lesson Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white border border-slate-200 p-8 rounded-2xl max-w-md w-full shadow-2xl"
            >
              {!sent ? (
                <form onSubmit={handleSendWhatsApp} className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="font-heading font-bold text-2xl text-slate-900 mb-1">Aula Teste Gratuita</h2>
                      <p className="text-[#cc4f33] text-[10px] uppercase tracking-widest font-bold flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#cc4f33]" />
                        {selectedCoach.name}
                      </p>
                    </div>
                    <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-slate-900 p-1 transition-colors">
                      <X size={20} />
                    </button>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex items-center gap-4">
                    <img src={selectedCoach.img} alt={selectedCoach.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-[#cc4f33]/30" />
                    <div>
                      <p className="text-slate-900 text-sm font-bold">{selectedCoach.name}</p>
                      <p className="text-slate-500 text-xs">{selectedCoach.role}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                      <input 
                        type="text" required placeholder="Seu nome completo" value={trialName} onChange={e => setTrialName(e.target.value)}
                        className="w-full bg-white rounded-lg border border-slate-300 text-slate-900 pl-11 pr-4 py-3 outline-none focus:border-[#cc4f33] transition-colors text-sm shadow-sm"
                      />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                      <input 
                        type="tel" required placeholder="WhatsApp (DDD + Número)" value={trialPhone} onChange={e => setTrialPhone(e.target.value)}
                        className="w-full bg-white rounded-lg border border-slate-300 text-slate-900 pl-11 pr-4 py-3 outline-none focus:border-[#cc4f33] transition-colors text-sm shadow-sm"
                      />
                    </div>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                      <input 
                        type="date" value={trialDate} onChange={e => setTrialDate(e.target.value)} min={new Date().toISOString().split('T')[0]}
                        className="w-full bg-white rounded-lg border border-slate-300 text-slate-900 pl-11 pr-4 py-3 outline-none focus:border-[#cc4f33] transition-colors text-sm shadow-sm"
                      />
                      <span className="text-slate-500 text-[10px] mt-1 block pl-1">Opcional — podemos combinar a melhor data</span>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="group w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all active:scale-95 hover:shadow-[0_0_20px_rgba(37,211,102,0.3)]"
                  >
                    <MessageCircle size={18} />
                    Enviar via WhatsApp
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              ) : (
                <div className="text-center py-4">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }} className="w-16 h-16 bg-[#25D366]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle size={32} className="text-[#25D366]" />
                  </motion.div>
                  <h3 className="text-slate-900 font-heading text-xl font-bold mb-2">Mensagem Enviada!</h3>
                  <p className="text-slate-600 text-sm mb-6">Sua aula teste com <strong className="text-slate-900">{selectedCoach.name}</strong> foi solicitada. Aguarde a confirmação pelo WhatsApp.</p>
                  <button onClick={() => setIsModalOpen(false)} className="w-full py-3 rounded-xl border border-slate-300 text-slate-700 text-xs uppercase tracking-widest font-bold hover:bg-slate-100 transition-colors">
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
