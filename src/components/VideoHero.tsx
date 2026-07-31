import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';

export default function VideoHero() {
  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      {/* Autoplay looping video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        src="/hero-scroll.mp4"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Top gradient (navbar readability) */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/80 to-transparent" />

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-52 bg-gradient-to-t from-black to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-[#cc4f33] font-bold mb-7"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#cc4f33] animate-pulse" />
          A Tradição do Saibro em Maceió
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: 'easeOut' }}
          className="text-5xl md:text-7xl lg:text-[6.5rem] font-serif font-bold text-white leading-[1.02] tracking-tighter mb-10"
        >
          A Excelência do
          <br />
          <span className="text-[#cc4f33]">Tênis Clássico.</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            to="/reservas"
            className="group flex items-center justify-center gap-3 bg-white text-black px-10 py-3.5 tracking-widest text-xs font-bold transition-all duration-200 hover:bg-gray-100 active:scale-95 rounded-xl"
          >
            Reservar Quadra
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/aulas"
            className="group flex items-center justify-center gap-3 bg-transparent text-white border border-white/25 px-10 py-3.5 tracking-widest text-xs font-bold transition-all duration-200 hover:bg-white/10 active:scale-95 rounded-xl backdrop-blur-sm"
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
