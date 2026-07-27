import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Trophy, Target, ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden py-24">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=2940&auto=format&fit=crop" 
            alt="Quadra de Saibro" 
            className="w-full h-full object-cover object-center grayscale opacity-20 transition-transform duration-[20s] ease-linear hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/30 to-[#0a0a0a]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#C89B3C]/10 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-center flex flex-col items-center mt-12">
          
          {/* Prominent Action Buttons at the Top */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto mb-16 md:mb-24"
          >
            <Link 
              to="/reservas"
              className="group relative flex items-center justify-center gap-3 bg-gradient-to-r from-[#C89B3C] to-[#e0af45] text-black px-12 py-4 uppercase tracking-[0.2em] text-xs font-bold transition-all duration-500 hover:shadow-[0_0_40px_rgba(200,155,60,0.4)] active:scale-95 rounded-full"
            >
              Reserva Já
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              to="/aulas"
              className="group relative flex items-center justify-center gap-3 bg-white/5 border border-white/10 backdrop-blur-md text-white px-12 py-4 uppercase tracking-[0.2em] text-xs font-bold transition-all duration-500 hover:bg-white/10 hover:border-white/20 active:scale-95 rounded-full"
            >
              Agendar Aula
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
            className="mb-10 flex items-center gap-4 border border-white/10 bg-[#121212]/60 backdrop-blur-xl px-6 py-2.5 rounded-full shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          >
            <span className="w-2 h-2 rounded-full bg-[#cc4f33] animate-pulse shadow-[0_0_10px_rgba(204,79,51,0.8)]"></span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-gray-200 font-bold">A Tradição do Saibro em Maceió</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="font-serif text-5xl md:text-7xl lg:text-[7.5rem] text-white mb-10 leading-[1.1] tracking-tight"
          >
            A Excelência do <br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#C89B3C] to-[#e0af45] font-light">Tênis Clássico.</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl font-light leading-relaxed px-4"
          >
            Mais que um esporte, um estilo de vida. Quadras impecáveis, infraestrutura premium e uma comunidade exclusiva para quem respira o verdadeiro tênis.
          </motion.p>
        </div>
      </section>

      {/* O Legado no Saibro - Bento Grid Style */}
      <section className="py-32 px-6 bg-[#0a0a0a] relative border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 glass-card p-10 lg:p-12 rounded-3xl flex flex-col justify-center"
          >
            <span className="text-[#C89B3C] text-[10px] uppercase tracking-[0.25em] font-semibold mb-6 block">
              Fundação
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-8 leading-[1.15] tracking-tight">
              O Santuário do Saibro
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-[#C89B3C] to-transparent mb-8"></div>
            <p className="text-gray-400 font-light text-lg leading-relaxed mb-6">
              Nascida da paixão pelo verdadeiro tênis, a Biotenis Academia foi concebida para ser muito mais que um espaço esportivo. É um ponto de encontro para aqueles que exigem o melhor.
            </p>
            <p className="text-gray-400 font-light text-lg leading-relaxed">
              Nossas quadras são preparadas diariamente com o mais fino pó de telha, garantindo o deslize perfeito, o quique consistente e a segurança articular.
            </p>
          </motion.div>
          
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="glass-card glass-card-hover p-8 rounded-3xl group"
            >
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#C89B3C]/10 transition-all duration-300">
                <Trophy className="text-[#C89B3C]" size={20} />
              </div>
              <h3 className="text-xl font-serif text-white mb-3">Alto Nível</h3>
              <p className="text-gray-400 font-light text-sm leading-relaxed">Torneios e rankings estruturados para desafiar seu potencial competitivo.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="glass-card glass-card-hover p-8 rounded-3xl group"
            >
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#C89B3C]/10 transition-all duration-300">
                <Target className="text-[#C89B3C]" size={20} />
              </div>
              <h3 className="text-xl font-serif text-white mb-3">Metodologia</h3>
              <p className="text-gray-400 font-light text-sm leading-relaxed">Abordagem exclusiva de treinamento que une biomecânica e tática moderna.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="sm:col-span-2 relative aspect-[21/9] sm:aspect-[21/10] overflow-hidden rounded-3xl border border-white/5 shadow-2xl group"
            >
              <img 
                src="https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=2000&auto=format&fit=crop" 
                alt="Legado" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-[0.5] group-hover:scale-105 transition-all duration-[1.5s] ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80"></div>
              <div className="absolute bottom-6 left-8 flex items-center gap-4">
                 <ShieldCheck className="text-[#C89B3C]" size={24} />
                 <span className="text-white font-serif text-xl">Estrutura Premium</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Nossos Fundadores */}
      <section className="py-32 px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto text-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[#C89B3C] text-[10px] uppercase tracking-[0.25em] font-semibold mb-6 block"
          >
            A Visão
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-20 tracking-tight"
          >
            Nossos Fundadores
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 max-w-5xl mx-auto">
            {[
              { name: "Roberto Almeida", role: "Diretor Esportivo", desc: "Ex-atleta profissional com mais de 20 anos de experiência na formação de tenistas.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop" },
              { name: "Carlos Fontes", role: "Diretor de Operações", desc: "Especialista em gestão esportiva de luxo. O arquiteto por trás da infraestrutura da Biotenis.", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop" }
            ].map((founder, i) => (
              <motion.div 
                key={founder.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 1, ease: "easeOut" }}
                className="flex flex-col items-center group"
              >
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden mb-10 border border-white/5 p-2 bg-[#0a0a0a] group-hover:border-[#C89B3C]/30 transition-colors duration-700 shadow-2xl">
                  <div className="w-full h-full rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 relative">
                    <img src={founder.img} alt={founder.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out" />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-700"></div>
                  </div>
                </div>
                <h3 className="font-serif text-3xl text-white mb-3">{founder.name}</h3>
                <p className="text-[#C89B3C] text-[10px] uppercase tracking-[0.2em] mb-6 font-semibold">{founder.role}</p>
                <p className="text-gray-400 font-light text-sm md:text-base max-w-sm leading-relaxed">{founder.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Nosso Propósito */}
      <section className="py-40 px-6 bg-[#0a0a0a] relative flex items-center justify-center text-center overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2940&auto=format&fit=crop" 
            alt="Propósito" 
            className="w-full h-full object-cover object-center grayscale opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <div className="w-16 h-16 border border-[#C89B3C]/30 rounded-full flex items-center justify-center mb-10 opacity-80 backdrop-blur-sm bg-black/20 shadow-[0_0_30px_rgba(200,155,60,0.1)]">
            <span className="w-2.5 h-2.5 bg-[#C89B3C] rounded-full"></span>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="font-serif text-3xl md:text-5xl lg:text-6xl text-white leading-[1.3] italic mb-14 px-4"
          >
            "Elevar o padrão do tênis amador e profissional, forjando campeões através da disciplina, elegância e respeito absoluto ao esporte."
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <Link 
              to="/reservas"
              className="group flex items-center gap-3 text-[#C89B3C] hover:text-white uppercase tracking-[0.2em] text-xs font-semibold transition-colors"
            >
              <span className="border-b border-[#C89B3C] group-hover:border-white pb-1 transition-colors">Conheça nossas quadras</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

