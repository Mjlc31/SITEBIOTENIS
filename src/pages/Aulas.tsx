import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Star } from 'lucide-react';

const COACHES = [
  {
    id: 'carlos',
    name: 'Carlos Moya',
    role: 'Head Coach - Alto Rendimento',
    img: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=800&auto=format&fit=crop',
    bio: 'Ex-Top 100 ATP. Especialista em biomecânica do saque e estratégia de fundo de quadra. Treinamento focado em intensidade extrema.',
    attributes: [
      { name: 'Técnica', value: 98 },
      { name: 'Intensidade', value: 100 },
      { name: 'Tática', value: 95 },
      { name: 'Paciência Infantil', value: 40 },
    ]
  },
  {
    id: 'ana',
    name: 'Ana Silva',
    role: 'Coordenadora Base & Infantil',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop',
    bio: 'Especialista em desenvolvimento motor infantil e iniciação esportiva lúdica. Metodologia focada em amor pelo esporte.',
    attributes: [
      { name: 'Técnica', value: 85 },
      { name: 'Intensidade', value: 60 },
      { name: 'Tática', value: 75 },
      { name: 'Paciência Infantil', value: 100 },
    ]
  },
  {
    id: 'goran',
    name: 'Goran Ivic',
    role: 'Especialista de Saque & Voleio',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
    bio: 'Mestre do jogo de rede. Traz a agressividade do tênis clássico para o saibro moderno.',
    attributes: [
      { name: 'Técnica', value: 92 },
      { name: 'Intensidade', value: 88 },
      { name: 'Tática', value: 90 },
      { name: 'Paciência Infantil', value: 65 },
    ]
  }
];

export default function Aulas() {
  const [selectedCoach, setSelectedCoach] = useState(COACHES[0]);

  return (
    <div className="pt-20 min-h-screen bg-black flex flex-col md:flex-row overflow-hidden relative">
      {/* Background with subtle glow matching the selected coach (conceptually) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#C89B3C]/10 via-black to-black z-0 pointer-events-none transition-colors duration-1000"></div>

      {/* Roster Selection (Left Side on Desktop) */}
      <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-white/5 z-10 flex flex-col bg-[#050505]/80 backdrop-blur-3xl">
        <div className="p-8 border-b border-white/5">
          <h1 className="font-serif text-3xl md:text-4xl text-white mb-2">Treinadores</h1>
          <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Selecione seu mentor</p>
        </div>
        
        <div className="flex-1 overflow-y-auto flex flex-row md:flex-col snap-x md:snap-y snap-mandatory p-4 md:p-4 gap-2">
          {COACHES.map(coach => {
            const isSelected = selectedCoach.id === coach.id;
            return (
              <button
                key={coach.id}
                onClick={() => setSelectedCoach(coach)}
                className={`group flex-shrink-0 w-64 md:w-full flex items-center gap-4 p-4 snap-center transition-all duration-300 rounded-2xl text-left
                  ${isSelected ? 'bg-white/5 border border-white/10 shadow-[0_0_30px_rgba(200,155,60,0.1)]' : 'border border-transparent hover:bg-white/[0.02] opacity-60 hover:opacity-100 active:scale-95'}
                `}
              >
                <div className={`w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 transition-all duration-500 ${isSelected ? 'border-[#C89B3C] grayscale-0 shadow-[0_0_15px_rgba(200,155,60,0.4)] scale-105' : 'border-white/10 grayscale group-hover:grayscale-[0.5]'}`}>
                  <img src={coach.img} alt={coach.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className={`font-serif text-lg transition-colors ${isSelected ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>{coach.name}</h3>
                  <p className="text-[#C89B3C] text-[10px] uppercase tracking-widest line-clamp-1 mt-1 font-semibold">{coach.role}</p>
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
            <div className="flex items-center gap-3 mb-6">
              <Star className="text-[#C89B3C]" size={20} fill="#C89B3C" />
              <span className="text-[#C89B3C] text-[10px] uppercase tracking-[0.2em] font-bold">{selectedCoach.role}</span>
            </div>
            
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white mb-8 tracking-tight">{selectedCoach.name}</h2>
            
            <p className="text-gray-300 font-light text-lg md:text-xl leading-relaxed mb-12 border-l-2 border-gradient-to-b from-[#C89B3C] to-transparent pl-6">
              {selectedCoach.bio}
            </p>

            {/* RPG Style Attributes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
              {selectedCoach.attributes.map(attr => (
                <div key={attr.name} className="glass-card p-5 rounded-2xl">
                  <div className="flex justify-between items-end mb-3">
                    <span className="text-gray-300 text-[10px] uppercase tracking-widest font-bold">{attr.name}</span>
                    <span className="text-[#C89B3C] font-mono text-xs">{attr.value}/100</span>
                  </div>
                  <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${attr.value}%` }}
                      transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-[#C89B3C] to-[#e0af45] rounded-full shadow-[0_0_10px_rgba(200,155,60,0.5)]"
                    />
                  </div>
                </div>
              ))}
            </div>

            <button className="group relative flex items-center justify-center gap-3 bg-white/5 border border-white/10 backdrop-blur-md text-white hover:bg-white/10 hover:border-white/30 px-8 py-4 uppercase tracking-[0.2em] text-xs font-bold transition-all duration-500 rounded-full w-full sm:w-auto active:scale-95 shadow-lg">
              Agendar Aula Teste
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </AnimatePresence>

        {/* Large faint background image of coach */}
        <AnimatePresence mode="wait">
          <motion.img
            key={`bg-${selectedCoach.id}`}
            src={selectedCoach.img}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.15, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="absolute -right-20 top-0 h-full object-cover grayscale mix-blend-luminosity pointer-events-none z-[1] mask-image-linear"
          />
        </AnimatePresence>
      </div>
    </div>
  );
}
