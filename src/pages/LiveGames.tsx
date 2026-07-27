import { useStore } from '../store/useStore';
import { Trophy, Clock, CheckCircle2, Radio } from 'lucide-react';
import { motion } from 'motion/react';

export default function LiveGames() {
  const liveGames = useStore(state => state.liveGames);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in_progress':
        return (
          <span className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-red-500 bg-red-500/10 px-4 py-1.5 rounded-full border border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.2)]">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            Ao Vivo
          </span>
        );
      case 'finished':
        return (
          <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-gray-400 bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
            <CheckCircle2 size={12} />
            Finalizado
          </span>
        );
      case 'scheduled':
      default:
        return (
          <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-[#C89B3C] bg-[#C89B3C]/10 px-4 py-1.5 rounded-full border border-[#C89B3C]/20">
            <Clock size={12} />
            Agendado
          </span>
        );
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-black relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#C89B3C]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-red-900/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <span className="text-[#C89B3C] text-[10px] uppercase tracking-[0.25em] font-semibold mb-4 block">Central de Torneios</span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white">Jogos ao Vivo.</h1>
          </div>
          
          <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 px-5 py-3 rounded-full shadow-[0_0_20px_rgba(239,68,68,0.15)]">
            <Radio className="text-red-500 animate-pulse" size={18} />
            <span className="text-red-500 text-xs uppercase tracking-[0.1em] font-bold">Live Broadcasting</span>
          </div>
        </div>

        {liveGames.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24 glass-card rounded-3xl border border-white/5 flex flex-col items-center justify-center max-w-2xl mx-auto"
          >
            <Trophy size={48} className="text-white/10 mb-6" />
            <h3 className="text-white text-xl font-serif mb-2">Nenhuma Partida Ocorrendo</h3>
            <p className="text-gray-500 font-light max-w-sm">Os torneios oficiais ainda não começaram ou já foram encerrados por hoje.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {liveGames.map((game, index) => (
              <motion.div 
                key={game.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card overflow-hidden flex flex-col rounded-3xl shadow-xl hover:shadow-[0_0_30px_rgba(200,155,60,0.1)] transition-shadow duration-500"
              >
                {/* Header */}
                <div className="bg-[#121212]/80 backdrop-blur-md p-6 flex justify-between items-center border-b border-white/5">
                  <div>
                    <h3 className="text-white text-sm font-semibold tracking-wide">{game.tournament}</h3>
                    <p className="text-gray-500 text-xs mt-1">{game.date}</p>
                  </div>
                  {getStatusBadge(game.status)}
                </div>

                {/* Scoreboard */}
                <div className="p-8 md:p-10 flex-1 flex flex-col justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#C89B3C]/[0.02] to-transparent pointer-events-none"></div>
                  
                  <div className="w-full max-w-md mx-auto relative z-10">
                    
                    {/* Headers */}
                    <div className="flex text-gray-500 text-[10px] uppercase tracking-widest mb-6 font-bold">
                      <div className="flex-1"></div>
                      <div className="flex gap-4 sm:gap-8 w-32 sm:w-48 justify-end text-center">
                        <span className="w-8">Sets</span>
                        <span className="w-8">Games</span>
                        <span className="w-8">Pts</span>
                      </div>
                    </div>

                    {/* Player 1 */}
                    <div className="flex items-center mb-6 bg-white/[0.02] p-4 -mx-4 rounded-2xl border border-white/5">
                      <div className="flex-1 flex items-center gap-3">
                        {game.status === 'in_progress' && <div className="w-1.5 h-1.5 bg-[#C89B3C] rounded-full shadow-[0_0_8px_rgba(200,155,60,0.8)]"></div>}
                        <div>
                          <h4 className="text-white font-serif text-xl sm:text-2xl">{game.player1.name}</h4>
                          <span className="text-[#C89B3C] text-[10px] uppercase tracking-widest">{game.player1.class}</span>
                        </div>
                      </div>
                      <div className="flex gap-4 sm:gap-8 w-32 sm:w-48 justify-end text-center">
                        <span className="w-8 text-white font-mono text-xl">{game.score.player1.sets}</span>
                        <span className="w-8 text-white font-mono text-xl">{game.score.player1.games}</span>
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black rounded-xl border border-white/10 flex items-center justify-center -my-2 shadow-inner">
                          <span className={`font-mono text-xl ${game.status === 'in_progress' ? 'text-[#C89B3C]' : 'text-gray-500'}`}>
                            {game.score.player1.points}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Player 2 */}
                    <div className="flex items-center bg-white/[0.02] p-4 -mx-4 rounded-2xl border border-white/5">
                      <div className="flex-1 flex items-center gap-3">
                        {/* Indicador de serviço ficaria aqui na lógica real, por enquanto simulando sem */}
                        <div className="w-1.5 h-1.5 bg-transparent"></div>
                        <div>
                          <h4 className="text-white font-serif text-xl sm:text-2xl">{game.player2.name}</h4>
                          <span className="text-[#C89B3C] text-[10px] uppercase tracking-widest">{game.player2.class}</span>
                        </div>
                      </div>
                      <div className="flex gap-4 sm:gap-8 w-32 sm:w-48 justify-end text-center">
                        <span className="w-8 text-white font-mono text-xl">{game.score.player2.sets}</span>
                        <span className="w-8 text-white font-mono text-xl">{game.score.player2.games}</span>
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black rounded-xl border border-white/10 flex items-center justify-center -my-2 shadow-inner">
                          <span className={`font-mono text-xl ${game.status === 'in_progress' ? 'text-[#C89B3C]' : 'text-gray-500'}`}>
                            {game.score.player2.points}
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
