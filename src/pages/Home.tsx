import { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Trophy, Target, ShieldCheck, Instagram, Facebook, MapPin, Phone, Mail, ChevronDown } from 'lucide-react';
import VideoHero from '../components/VideoHero';

export default function Home() {
  // Sempre começa do topo ao entrar na página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="w-full bg-slate-50">

      {/* ══════════════════════════════════════════════════════════════════
          SEÇÃO 1 — Video Hero (Parallax)
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full h-[100dvh] overflow-hidden">
        <motion.div style={{ y: yHero, opacity: opacityHero }} className="absolute inset-0">
          <VideoHero />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SEÇÃO 2 — O Santuário do Saibro (Background Imagem Parallax CSS)
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[100dvh] flex items-center py-24 overflow-hidden">
        {/* Background Image with Pure CSS Parallax */}
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center md:bg-fixed opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/95 to-slate-50/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-slate-50" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Texto */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            <span className="text-[#cc4f33] text-[10px] uppercase tracking-[0.35em] font-bold mb-5 block">
              Fundação
            </span>
            <h2 className="text-4xl md:text-5xl xl:text-[3.5rem] font-heading font-bold text-slate-900 mb-7 leading-[1.05] tracking-tight">
              O Santuário<br />do Saibro
            </h2>
            <p className="text-slate-600 font-light text-lg leading-relaxed mb-5">
              Nascida da paixão pelo verdadeiro tênis, a Biotenis Academia foi concebida para ser muito mais que um espaço esportivo — é um ponto de encontro para aqueles que exigem o melhor.
            </p>
            <p className="text-slate-600 font-light text-lg leading-relaxed">
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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`glass-card bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-slate-200 hover:border-slate-300 shadow-sm transition-colors ${item.full ? 'sm:col-span-2' : ''}`}
              >
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-heading font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 font-light text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SEÇÃO 3 — Nossos Fundadores (Fundo Escuro Limpo)
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full py-32 bg-white flex flex-col items-center justify-center px-6 overflow-hidden">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-[#cc4f33] text-[10px] uppercase tracking-[0.35em] font-bold mb-4 block text-center"
        >
          A Visão
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl md:text-4xl xl:text-5xl font-heading font-bold text-slate-900 mb-16 tracking-tight text-center"
        >
          Nossos Fundadores
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto w-full">
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
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.15, duration: 0.8, ease: 'easeOut' }}
              className="flex flex-col items-center group"
            >
              <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-2 border-slate-200 ring-2 ring-transparent group-hover:ring-[#cc4f33]/30 transition-all duration-500">
                <img
                  src={founder.img}
                  alt={founder.name}
                  className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-heading font-bold text-slate-900 mb-1">{founder.name}</h3>
              <p className="text-[#cc4f33] text-[10px] uppercase tracking-widest mb-4 font-bold">
                {founder.role}
              </p>
              <p className="text-slate-600 font-light text-sm leading-relaxed text-center">
                {founder.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SEÇÃO 4 — Propósito + Mini Footer (Parallax Imagem)
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full flex flex-col overflow-hidden min-h-[100dvh]">
        {/* Background Parallax CSS */}
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center md:bg-fixed opacity-15 grayscale mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/90 to-transparent" />

        {/* Quote */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-32">
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
            className="text-2xl md:text-3xl xl:text-4xl text-slate-900 leading-relaxed mb-12 px-4 font-heading italic font-medium max-w-4xl"
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
              className="group flex items-center justify-center gap-3 bg-slate-900 text-white px-10 py-3.5 tracking-widest text-xs font-bold transition-all duration-200 hover:bg-slate-800 active:scale-95 rounded-xl"
            >
              Reservar uma Quadra
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/aulas"
              className="group flex items-center justify-center gap-3 bg-transparent text-slate-900 border border-slate-300 px-10 py-3.5 tracking-widest text-xs font-bold transition-all duration-200 hover:bg-slate-100 active:scale-95 rounded-xl backdrop-blur-sm"
            >
              Ver Aulas
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Mini footer */}
        <div className="relative z-10 border-t border-slate-200 bg-white/80 backdrop-blur-md py-6 px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
            <p className="text-xs text-slate-500 text-center md:text-left">
              © {new Date().getFullYear()} Biotenis Academia · Todos os direitos reservados.
            </p>
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-xs text-slate-500">
              <span className="flex items-center gap-1.5 hover:text-slate-900 transition-colors cursor-default">
                <MapPin size={12} className="text-[#cc4f33]" />
                Av. Menino Marcelo, S/N · Serraria, Maceió — AL
              </span>
              <span className="flex items-center gap-1.5 hover:text-slate-900 transition-colors cursor-pointer">
                <Phone size={12} className="text-[#cc4f33]" />
                (82) 3328-0000
              </span>
              <span className="flex items-center gap-1.5 hover:text-slate-900 transition-colors cursor-pointer">
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
