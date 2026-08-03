import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Volume2, VolumeX } from 'lucide-react';

export default function VideoHero() {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className="relative w-full h-full bg-black overflow-hidden group">
      {/* Autoplay looping video */}
      <video
        className="absolute inset-0 w-full h-full object-cover scale-105"
        autoPlay
        muted={isMuted}
        loop
        playsInline
        preload="auto"
        src="/hero-scroll.mp4"
      />

      {/* 
        =========================================
        EFEITOS CINEMÁTICOS & NOSTÁLGICOS
        =========================================
      */}
      {/* 1. Vignette (Escurecer bordas para focar no centro) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />

      {/* 2. Color Grading Quente (Tom de Saibro/Vintage) */}
      <div className="absolute inset-0 bg-[#3b1a0d] mix-blend-color opacity-20 pointer-events-none" />

      {/* 3. Film Grain / Ruído Analógico (Textura nostálgica) */}
      <div 
        className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay"
        style={{ 
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" 
        }}
      />

      {/* Dark overlay base para leitura */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      {/* Top gradient (navbar readability) */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/90 to-transparent pointer-events-none" />

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-52 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />


      {/* Botão de Som (ASMR Experience) */}
      <button 
        onClick={() => setIsMuted(!isMuted)}
        className="absolute bottom-8 right-8 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 hover:border-white/30 hover:scale-105 transition-all duration-300"
        title={isMuted ? "Ouvir o som do saibro" : "Silenciar"}
      >
        {isMuted ? <VolumeX size={20} className="opacity-70" /> : <Volume2 size={20} className="text-[#cc4f33]" />}
      </button>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-[#cc4f33] font-bold mb-7 drop-shadow-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#cc4f33] animate-pulse" />
          A Tradição do Saibro em Maceió
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 35, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
          className="text-5xl md:text-7xl lg:text-[6.5rem] font-serif font-bold text-white leading-[1.02] tracking-tighter mb-10 drop-shadow-2xl"
        >
          A Excelência do
          <br />
          <span className="text-[#cc4f33] italic pr-2">Tênis Clássico.</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            to="/reservas"
            className="group flex items-center justify-center gap-3 bg-white text-black px-10 py-3.5 tracking-widest text-xs font-bold transition-all duration-300 hover:bg-[#cc4f33] hover:text-white hover:shadow-[0_0_20px_rgba(204,79,51,0.4)] active:scale-95 rounded-xl"
          >
            Reservar Quadra
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/aulas"
            className="group flex items-center justify-center gap-3 bg-black/40 text-white border border-white/20 px-10 py-3.5 tracking-widest text-xs font-bold transition-all duration-300 hover:bg-white/10 hover:border-white/40 active:scale-95 rounded-xl backdrop-blur-md"
          >
            Conhecer as Aulas
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 1 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[9px] uppercase tracking-[0.35em] text-white/40 font-bold">
          Role para descobrir
        </span>
        <ChevronDown className="text-white/40 animate-bounce mt-0.5" size={18} />
      </motion.div>
    </div>
  );
}
