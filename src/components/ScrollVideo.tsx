import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function ScrollVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Drive video currentTime via scroll
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.load();

    const unsubscribe = scrollYProgress.on('change', (progress) => {
      if (video.readyState >= 2 && video.duration) {
        video.currentTime = Math.min(
          progress * video.duration,
          video.duration - 0.01
        );
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  // ── Overlay opacity ─────────────────────────────────────────────────────────
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.4, 0.85, 1],
    [0.6, 0.38, 0.25, 0.38, 0.6]
  );

  // ── BLOCK 1: Main Title  (0 → 28%) ─────────────────────────────────────────
  const b1Opacity = useTransform(
    scrollYProgress,
    [0.01, 0.07, 0.21, 0.28],
    [0, 1, 1, 0]
  );
  const b1Y = useTransform(
    scrollYProgress,
    [0.01, 0.07, 0.21, 0.28],
    [40, 0, 0, -40]
  );

  // ── BLOCK 2: Three-word manifesto (32 → 62%) ────────────────────────────────
  const b2Opacity = useTransform(
    scrollYProgress,
    [0.32, 0.39, 0.55, 0.62],
    [0, 1, 1, 0]
  );
  const b2Y = useTransform(
    scrollYProgress,
    [0.32, 0.39, 0.55, 0.62],
    [40, 0, 0, -40]
  );

  // Stagger within block 2
  const word1Opacity = useTransform(scrollYProgress, [0.32, 0.37], [0, 1]);
  const word2Opacity = useTransform(scrollYProgress, [0.35, 0.40], [0, 1]);
  const word3Opacity = useTransform(scrollYProgress, [0.38, 0.43], [0, 1]);

  // ── BLOCK 3: CTA (66 → 100%) ────────────────────────────────────────────────
  const b3Opacity = useTransform(
    scrollYProgress,
    [0.66, 0.73, 0.93, 1.0],
    [0, 1, 1, 1]
  );
  const b3Y = useTransform(
    scrollYProgress,
    [0.66, 0.73],
    [40, 0]
  );

  // ── Scroll indicator (0 → 4%) ────────────────────────────────────────────────
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.04], [1, 0]);

  return (
    <section ref={containerRef} className="relative" style={{ height: '500vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-black">

        {/* ── VIDEO ─────────────────────────────────────────────────────────── */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
          src="/hero-scroll.mp4"
        />

        {/* ── DARK OVERLAY ──────────────────────────────────────────────────── */}
        <motion.div
          className="absolute inset-0 bg-black pointer-events-none"
          style={{ opacity: overlayOpacity }}
        />

        {/* ── TOP GRADIENT (navbar readability) ────────────────────────────── */}
        <div className="absolute top-0 left-0 right-0 h-36 bg-gradient-to-b from-black/70 to-transparent pointer-events-none" />

        {/* ── BOTTOM GRADIENT ──────────────────────────────────────────────── */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent pointer-events-none" />

        {/* ══════════════════════════════════════════════════════════════════════
            BLOCK 1 — "A Excelência do Tênis Clássico."
        ══════════════════════════════════════════════════════════════════════ */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
          style={{ opacity: b1Opacity, y: b1Y }}
        >
          <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-[#cc4f33] font-bold mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-[#cc4f33] animate-pulse" />
            A Tradição do Saibro em Maceió
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-serif font-bold text-white leading-[1.02] tracking-tighter">
            A Excelência do
            <br />
            <span className="text-[#cc4f33]">Tênis Clássico.</span>
          </h1>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════════════
            BLOCK 2 — "Estrutura. Precisão. Elegância."
        ══════════════════════════════════════════════════════════════════════ */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
          style={{ opacity: b2Opacity, y: b2Y }}
        >
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#cc4f33] font-bold mb-10">
            Nossa Filosofia
          </p>
          <div className="flex flex-col gap-0">
            <motion.span
              style={{ opacity: word1Opacity }}
              className="text-6xl md:text-8xl lg:text-[8rem] font-serif font-bold text-white leading-[1.0] tracking-tighter"
            >
              Estrutura.
            </motion.span>
            <motion.span
              style={{ opacity: word2Opacity }}
              className="text-6xl md:text-8xl lg:text-[8rem] font-serif font-bold text-white/60 leading-[1.0] tracking-tighter"
            >
              Precisão.
            </motion.span>
            <motion.span
              style={{ opacity: word3Opacity }}
              className="text-6xl md:text-8xl lg:text-[8rem] font-serif font-bold text-[#cc4f33] leading-[1.0] tracking-tighter"
            >
              Elegância.
            </motion.span>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════════════
            BLOCK 3 — CTA Final
        ══════════════════════════════════════════════════════════════════════ */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
          style={{ opacity: b3Opacity, y: b3Y }}
        >
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#cc4f33] font-bold mb-6">
            Biotenis Academia · Maceió — AL
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-[1.08] tracking-tighter mb-6 max-w-3xl">
            O Santuário do<br />Saibro.
          </h2>
          <p className="text-gray-300 text-base md:text-lg max-w-md font-light leading-relaxed mb-10">
            Quadras impecáveis, infraestrutura premium e uma comunidade
            exclusiva para quem respira o verdadeiro tênis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
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
          </div>
        </motion.div>

        {/* ── SCROLL INDICATOR ─────────────────────────────────────────────── */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none"
          style={{ opacity: indicatorOpacity }}
        >
          <span className="text-[9px] uppercase tracking-[0.35em] text-white/35 font-bold">
            Role para descobrir
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-white/35 to-transparent" />
        </motion.div>

      </div>
    </section>
  );
}
