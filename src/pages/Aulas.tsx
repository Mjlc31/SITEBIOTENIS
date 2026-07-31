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
    <div className="pt-20 min-h-screen bg-[#000000] flex flex-col md:flex-row overflow-hidden relative">
      {/* Background */}
      <div className="absolute inset-0 bg-black z-0 pointer-events-none"></div>

      {/* Roster Selection (Left Side on Desktop) */}
      <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-white/10 z-10 flex flex-col bg-[#000000]">
        <div className="p-8 border-b border-white/10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Treinadores</h1>
          <p className="text-gray-400 text-xs font-semibold">Selecione seu mentor</p>
        </div>
        
        <div className="flex-1 overflow-y-auto flex flex-row md:flex-col snap-x md:snap-y snap-mandatory p-4 md:p-4 gap-2">
          {COACHES.map(coach => {
            const isSelected = selectedCoach.id === coach.id;
            return (
              <button
                key={coach.id}
                onClick={() => setSelectedCoach(coach)}
                className={`group flex-shrink-0 w-64 md:w-full flex items-center gap-4 p-4 snap-center transition-all duration-200 rounded-xl text-left
                  ${isSelected ? 'bg-[#1c1c1e] border border-white/10' : 'border border-transparent hover:bg-white/5 opacity-70 hover:opacity-100'}
                `}
              >
                <div className={`w-14 h-14 rounded-full overflow-hidden shrink-0 transition-all duration-300 ${isSelected ? 'ring-2 ring-[#cc4f33] ring-offset-2 ring-offset-black grayscale-0' : 'grayscale group-hover:grayscale-[0.5]'}`}>
                  <img src={coach.img} alt={coach.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className={`text-base font-bold transition-colors ${isSelected ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>{coach.name}</h3>
                  <p className="text-gray-500 text-xs font-medium line-clamp-1">{coach.role}</p>
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
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[#cc4f33] text-xs font-bold uppercase tracking-widest">{selectedCoach.role}</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">{selectedCoach.name}</h2>
            
            <p className="text-gray-400 font-medium text-lg md:text-xl leading-relaxed mb-12">
              {selectedCoach.bio}
            </p>

            {/* Minimal Attributes */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {selectedCoach.attributes.map(attr => (
                <div key={attr.name} className="bg-[#1c1c1e] p-4 rounded-xl border border-white/5 flex flex-col justify-center">
                  <span className="text-gray-500 text-xs font-semibold mb-1">{attr.name}</span>
                  <span className="text-white text-xl font-bold">{attr.value}</span>
                </div>
              ))}
            </div>

            <button className="group relative flex items-center justify-center gap-3 bg-[#cc4f33] text-white hover:bg-[#e06042] px-8 py-3.5 tracking-widest text-xs font-bold transition-all duration-200 rounded-xl w-full sm:w-auto active:scale-95">
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
