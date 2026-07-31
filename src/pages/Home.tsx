import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Trophy, Target, ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden py-24">
        <div className="absolute inset-0 z-0 bg-black">
          <img 
            src="https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=2940&auto=format&fit=crop" 
            alt="Quadra de Saibro" 
            className="w-full h-full object-cover object-center grayscale opacity-40 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
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
              className="group relative flex items-center justify-center gap-3 bg-[#cc4f33] text-white px-10 py-3.5 tracking-widest text-xs font-bold transition-all duration-200 hover:bg-[#e06042] active:scale-95 rounded-xl"
            >
              Reserva Já
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              to="/aulas"
              className="group relative flex items-center justify-center gap-3 bg-[#1c1c1e] text-white border border-white/10 px-10 py-3.5 tracking-widest text-xs font-bold transition-all duration-200 hover:bg-[#2c2c2e] active:scale-95 rounded-xl"
            >
              Agendar Aula
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
            className="mb-8 flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2 rounded-full"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#cc4f33]"></span>
            <span className="text-[10px] uppercase tracking-widest text-gray-300 font-bold">A Tradição do Saibro em Maceió</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-[7.5rem] font-bold text-white mb-8 leading-[1.05] tracking-tighter"
          >
            A Excelência do <br />
            <span className="text-[#cc4f33]">Tênis Clássico.</span>
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
      <section className="py-24 px-6 bg-[#000000] relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 glass-card p-10 lg:p-12 rounded-3xl flex flex-col justify-center"
          >
            <span className="text-[#cc4f33] text-[10px] uppercase tracking-widest font-bold mb-4 block">
              Fundação
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
              O Santuário do Saibro
            </h2>
            <p className="text-gray-400 font-light text-lg leading-relaxed mb-6">
              Nascida da paixão pelo verdadeiro tênis, a Biotenis Academia foi concebida para ser muito mais que um espaço esportivo. É um ponto de encontro para aqueles que exigem o melhor.
            </p>
            <p className="text-gray-400 font-light text-lg leading-relaxed">
              Nossas quadras são preparadas diariamente com o mais fino pó de telha, garantindo o deslize perfeito, o quique consistente e a segurança articular.
            </p>
          </motion.div>
          
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="glass-card p-8 rounded-3xl"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6">
                <Trophy className="text-[#cc4f33]" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Alto Nível</h3>
              <p className="text-gray-400 font-light text-sm leading-relaxed">Torneios e rankings estruturados para desafiar seu potencial competitivo.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="glass-card p-8 rounded-3xl"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6">
                <Target className="text-[#cc4f33]" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Metodologia</h3>
              <p className="text-gray-400 font-light text-sm leading-relaxed">Abordagem exclusiva de treinamento que une biomecânica e tática moderna.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="sm:col-span-2 relative aspect-[21/9] sm:aspect-[21/10] overflow-hidden rounded-3xl bg-[#1c1c1e] border border-white/5"
            >
              <img 
                src="https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=2000&auto=format&fit=crop" 
                alt="Legado" 
                className="w-full h-full object-cover grayscale opacity-60 mix-blend-luminosity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent opacity-90"></div>
              <div className="absolute bottom-6 left-8 flex items-center gap-4">
                 <ShieldCheck className="text-[#cc4f33]" size={24} />
                 <span className="text-white font-bold text-xl">Estrutura Premium</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Nossos Fundadores */}
      <section className="py-32 px-6 bg-black">
        <div className="max-w-7xl mx-auto text-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[#cc4f33] text-[10px] uppercase tracking-widest font-bold mb-6 block"
          >
            A Visão
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-20 tracking-tight"
          >
            Nossos Fundadores
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
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
                className="flex flex-col items-center glass-card p-10 rounded-3xl"
              >
                <div className="w-32 h-32 rounded-full overflow-hidden mb-8 border border-white/10 p-1">
                  <div className="w-full h-full rounded-full overflow-hidden grayscale">
                    <img src={founder.img} alt={founder.name} className="w-full h-full object-cover" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{founder.name}</h3>
                <p className="text-[#cc4f33] text-[10px] uppercase tracking-widest mb-4 font-bold">{founder.role}</p>
                <p className="text-gray-400 font-light text-sm leading-relaxed">{founder.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Nosso Propósito */}
      <section className="py-32 px-6 bg-black relative flex items-center justify-center text-center overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2940&auto=format&fit=crop" 
            alt="Propósito" 
            className="w-full h-full object-cover object-center grayscale opacity-10 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-2xl md:text-4xl text-white leading-relaxed mb-12 px-4 font-medium"
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
              className="group flex items-center gap-2 text-[#cc4f33] hover:text-white uppercase tracking-widest text-xs font-bold transition-colors"
            >
              <span className="pb-0.5">Conheça nossas quadras</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

