import { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Trophy, Target, ShieldCheck, Instagram, Facebook, MapPin, Phone, Mail } from 'lucide-react';
import VideoHero from '../components/VideoHero';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Sempre começa do topo ao entrar na página
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-scroll"
      style={{
        scrollSnapType: 'y mandatory',
        scrollBehavior: 'smooth',
      }}
    >

      {/* ══════════════════════════════════════════════════════════════════
          SEÇÃO 1 — Video Hero
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="relative w-full flex-shrink-0"
        style={{ height: '100svh', scrollSnapAlign: 'start' }}
      >
        <VideoHero />
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SEÇÃO 2 — O Santuário do Saibro
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="relative w-full flex-shrink-0 bg-[#050505] flex items-center px-6 overflow-hidden"
        style={{ height: '100svh', scrollSnapAlign: 'start' }}
      >
        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }}
        />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Texto */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            <span className="text-[#cc4f33] text-[10px] uppercase tracking-[0.35em] font-bold mb-5 block">
              Fundação
            </span>
            <h2 className="text-4xl md:text-5xl xl:text-[3.5rem] font-serif font-bold text-white mb-7 leading-[1.05] tracking-tight">
              O Santuário<br />do Saibro
            </h2>
            <p className="text-gray-400 font-light text-lg leading-relaxed mb-5">
              Nascida da paixão pelo verdadeiro tênis, a Biotenis Academia foi concebida para ser muito mais que um espaço esportivo — é um ponto de encontro para aqueles que exigem o melhor.
            </p>
            <p className="text-gray-400 font-light text-lg leading-relaxed">
              Nossas quadras são preparadas diariamente com o mais fino pó de telha, garantindo o deslize perfeito, o quique consistente e a segurança articular.
            </p>
          </motion.div>

          {/* Right: Feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: <Trophy className="text-[#cc4f33]" size={22} />,
                title: 'Alto Nível',
                desc: 'Torneios e rankings estruturados para desafiar seu potencial competitivo.',
              },
              {
                icon: <Target className="text-[#cc4f33]" size={22} />,
                title: 'Metodologia',
                desc: 'Abordagem exclusiva que une biomecânica e tática moderna.',
              },
              {
                icon: <ShieldCheck className="text-[#cc4f33]" size={22} />,
                title: 'Estrutura Premium',
                desc: 'Vestiários climatizados, lounge exclusivo e pro shop completa para sua comodidade.',
                full: true,
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 + 0.2 }}
                className={`glass-card p-6 rounded-2xl ${item.full ? 'sm:col-span-2' : ''}`}
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 font-light text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SEÇÃO 3 — Nossos Fundadores
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="relative w-full flex-shrink-0 bg-black flex flex-col items-center justify-center px-6 overflow-hidden"
        style={{ height: '100svh', scrollSnapAlign: 'start' }}
      >
        {/* Linha decorativa superior */}
        <div className="absolute top-0 left-0 right-0 h-px bg-white/5" />

        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-[#cc4f33] text-[10px] uppercase tracking-[0.35em] font-bold mb-4 block text-center"
        >
          A Visão
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl md:text-4xl xl:text-5xl font-serif font-bold text-white mb-10 tracking-tight text-center"
        >
          Nossos Fundadores
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto w-full">
          {[
            {
              name: 'Eusébio',
              role: 'Diretor Esportivo',
              desc: 'Ex-atleta profissional com mais de 20 anos de experiência na formação de tenistas.',
              img: '/eusebio.png',
            },
            {
              name: 'Zico',
              role: 'Diretor de Operações',
              desc: 'Especialista em gestão esportiva de luxo. O arquiteto por trás da infraestrutura da Biotenis.',
              img: '/zico.png',
            },
            {
              name: 'Adair',
              role: 'Diretor Geral',
              desc: 'Visionário por trás da Biotenis, une paixão pelo tênis à excelência na gestão e desenvolvimento humano.',
              img: '/adair.png',
            },
          ].map((founder, i) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8, ease: 'easeOut' }}
              className="flex flex-col items-center glass-card p-7 rounded-3xl"
            >
              <div className="w-28 h-28 rounded-full overflow-hidden mb-5 border-2 border-white/10 ring-2 ring-[#cc4f33]/20">
                <img
                  src={founder.img}
                  alt={founder.name}
                  className="w-full h-full object-cover object-top grayscale"
                />
              </div>
              <h3 className="text-xl font-serif font-bold text-white mb-1">{founder.name}</h3>
              <p className="text-[#cc4f33] text-[10px] uppercase tracking-widest mb-3 font-bold">
                {founder.role}
              </p>
              <p className="text-gray-400 font-light text-sm leading-relaxed text-center">
                {founder.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SEÇÃO 4 — Propósito + Mini Footer
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="relative w-full flex-shrink-0 flex flex-col overflow-hidden"
        style={{ height: '100svh', scrollSnapAlign: 'start' }}
      >
        {/* Background */}
        <div className="absolute inset-0 z-0 bg-black">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2940&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover grayscale opacity-10 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black" />
        </div>

        {/* Quote */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[#cc4f33] text-[10px] uppercase tracking-[0.4em] font-bold mb-8 block"
          >
            Nosso Propósito
          </motion.span>

          <motion.blockquote
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="text-2xl md:text-3xl xl:text-4xl text-white leading-relaxed mb-12 px-4 font-serif italic font-medium max-w-4xl"
          >
            "Elevar o padrão do tênis amador e profissional, forjando campeões através da disciplina, elegância e respeito absoluto ao esporte."
          </motion.blockquote>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/reservas"
              className="group flex items-center justify-center gap-3 bg-white text-black px-10 py-3.5 tracking-widest text-xs font-bold transition-all duration-200 hover:bg-gray-100 active:scale-95 rounded-xl"
            >
              Reservar uma Quadra
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/aulas"
              className="group flex items-center justify-center gap-3 bg-transparent text-white border border-white/20 px-10 py-3.5 tracking-widest text-xs font-bold transition-all duration-200 hover:bg-white/10 active:scale-95 rounded-xl"
            >
              Ver Aulas
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Mini footer */}
        <div className="relative z-10 border-t border-white/5 py-6 px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Biotenis Academia · Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-6 text-xs text-gray-500">
              <span className="flex items-center gap-1.5">
                <MapPin size={12} className="text-[#cc4f33]" />
                Av. Menino Marcelo, S/N · Serraria, Maceió — AL
              </span>
              <span className="flex items-center gap-1.5">
                <Phone size={12} className="text-[#cc4f33]" />
                (82) 3328-0000
              </span>
              <span className="flex items-center gap-1.5">
                <Mail size={12} className="text-[#cc4f33]" />
                contato@biotenis.com.br
              </span>
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-gray-500 hover:text-[#cc4f33] transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-[#cc4f33] transition-colors">
                <Facebook size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
