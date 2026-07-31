import { useStore } from '../store/useStore';
import { motion } from 'motion/react';
import { Trophy, Clock, CheckCircle2, Radio } from 'lucide-react';

export default function LiveGames() {
  const liveGames = useStore(state => state.liveGames);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in_progress':
        return (
          <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-red-500 bg-red-500/10 px-3 py-1 rounded-md">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
            Ao Vivo
          </span>
        );
      case 'finished':
        return (
          <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-gray-400 bg-white/5 px-3 py-1 rounded-md">
            <CheckCircle2 size={12} />
            Final
          </span>
        );
      case 'scheduled':
      default:
        return (
          <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-[#cc4f33] bg-[#cc4f33]/10 px-3 py-1 rounded-md">
            <Clock size={12} />
            Agendado
          </span>
        );
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-[#000000]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-24">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Partidas</h1>
            <p className="text-gray-400 font-medium mt-2">Torneios e Rankings</p>
          </div>
          
          <div className="flex items-center gap-2 bg-[#1c1c1e] px-4 py-2 rounded-lg border border-white/5">
            <Radio className="text-red-500" size={16} />
            <span className="text-white text-xs font-semibold">Central ao Vivo</span>
          </div>
        </div>

        {liveGames.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 bg-[#1c1c1e] rounded-2xl border border-white/5 flex flex-col items-center justify-center"
          >
            <Trophy size={48} className="text-gray-500 mb-6" />
            <h3 className="text-white text-xl font-bold mb-2">Sem partidas no momento</h3>
            <p className="text-gray-500 font-medium">Os jogos de hoje ainda não começaram ou já terminaram.</p>
          </motion.div>
        ) : (
          <div className="flex flex-col gap-4">
            {liveGames.map((game, index) => (
              <motion.div 
                key={game.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-[#1c1c1e] rounded-2xl overflow-hidden"
              >
                {/* Game Header */}
                <div className="flex justify-between items-center px-5 py-3 border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">{game.tournament}</span>
                    <span className="w-1 h-1 rounded-full bg-white/20"></span>
                    <span className="text-gray-500 text-xs font-medium">{game.date}</span>
                  </div>
                  {getStatusBadge(game.status)}
                </div>

                {/* Scoreboard */}
                <div className="px-5 py-4">
                  <div className="flex flex-col">
                    
                    {/* Headers for scores */}
                    <div className="flex justify-end mb-2">
                      <div className="flex gap-4 sm:gap-6 w-32 sm:w-40 justify-end text-center">
                        <span className="w-8 text-[10px] font-bold text-gray-500 uppercase tracking-widest">S</span>
                        <span className="w-8 text-[10px] font-bold text-gray-500 uppercase tracking-widest">G</span>
                        <span className="w-10 text-[10px] font-bold text-gray-500 uppercase tracking-widest">P</span>
                      </div>
                    </div>

                    {/* Player 1 Row */}
                    <div className="flex items-center py-2 border-b border-white/5">
                      <div className="flex-1 flex items-center gap-3">
                        <div className={`w-1.5 h-1.5 rounded-full ${game.status === 'in_progress' ? 'bg-[#cc4f33]' : 'bg-transparent'}`}></div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-white text-lg font-bold">{game.player1.name}</h4>
                          <span className="text-gray-500 text-xs font-medium bg-white/5 px-2 py-0.5 rounded">{game.player1.class}</span>
                        </div>
                      </div>
                      <div className="flex gap-4 sm:gap-6 w-32 sm:w-40 justify-end text-center items-center">
                        <span className="w-8 text-white font-semibold text-lg">{game.score.player1.sets}</span>
                        <span className="w-8 text-white font-semibold text-lg">{game.score.player1.games}</span>
                        <div className="w-10">
                          <span className={`font-bold text-xl ${game.status === 'in_progress' ? 'text-[#cc4f33]' : 'text-gray-400'}`}>
                            {game.score.player1.points}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Player 2 Row */}
                    <div className="flex items-center py-2">
                      <div className="flex-1 flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-transparent"></div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-white text-lg font-bold">{game.player2.name}</h4>
                          <span className="text-gray-500 text-xs font-medium bg-white/5 px-2 py-0.5 rounded">{game.player2.class}</span>
                        </div>
                      </div>
                      <div className="flex gap-4 sm:gap-6 w-32 sm:w-40 justify-end text-center items-center">
                        <span className="w-8 text-white font-semibold text-lg">{game.score.player2.sets}</span>
                        <span className="w-8 text-white font-semibold text-lg">{game.score.player2.games}</span>
                        <div className="w-10">
                          <span className={`font-bold text-xl ${game.status === 'in_progress' ? 'text-[#cc4f33]' : 'text-gray-400'}`}>
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
