import { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { motion } from 'motion/react';
import { Trophy, Clock, CheckCircle2, Radio, Edit2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LiveGames() {
  const liveGames = useStore(state => state.liveGames);
  const isAdmin = useStore(state => state.isAdmin);
  const navigate = useNavigate();

  // Polling via storage event to auto-refresh scores from Admin tab
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'biotenis-storage') {
        useStore.persist.rehydrate();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    
    // Fallback: poll every 5 seconds just in case
    const interval = setInterval(() => {
      useStore.persist.rehydrate();
    }, 5000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in_progress':
        return (
          <div className="relative group">
            <div className="absolute inset-0 bg-red-500/20 blur-md rounded-full group-hover:bg-red-500/30 transition-colors" />
            <span className="relative flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-red-500 bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
              Ao Vivo
            </span>
          </div>
        );
      case 'finished':
        return (
          <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg">
            <CheckCircle2 size={12} />
            Finalizado
          </span>
        );
      case 'scheduled':
      default:
        return (
          <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-[#cc4f33] bg-[#cc4f33]/10 border border-[#cc4f33]/20 px-3 py-1.5 rounded-lg">
            <Clock size={12} />
            Agendado
          </span>
        );
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#cc4f33]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-24 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4 border-b border-slate-200 pb-6">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-heading text-slate-900 tracking-tight"
            >
              Partidas
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-slate-600 font-medium mt-2 tracking-wide"
            >
              Torneios e Rankings Oficiais
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
            className="flex items-center gap-3 bg-white/80 backdrop-blur-md px-5 py-2.5 rounded-xl border border-slate-200 shadow-xl"
          >
            <Radio className="text-red-500 animate-pulse" size={16} />
            <span className="text-slate-900 text-[10px] uppercase tracking-widest font-bold">Central ao Vivo</span>
          </motion.div>
        </div>

        {liveGames.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24 bg-white/50 backdrop-blur-sm rounded-2xl border border-slate-200 flex flex-col items-center justify-center shadow-xl"
          >
            <Trophy size={48} className="text-slate-400 mb-6" />
            <h3 className="text-slate-900 text-xl font-bold mb-2 font-heading">Nenhuma partida encontrada</h3>
            <p className="text-slate-600 font-medium">Os jogos de hoje ainda não começaram ou já terminaram.</p>
          </motion.div>
        ) : (
          <div className="flex flex-col gap-6">
            {liveGames.map((game, index) => (
              <motion.div 
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`relative rounded-2xl overflow-hidden shadow-xl border transition-colors ${game.status === 'in_progress' ? 'bg-white border-slate-200' : 'bg-white/80 backdrop-blur-md border-slate-200 hover:border-slate-300'}`}
              >
                {/* Neon Top Border for In Progress */}
                {game.status === 'in_progress' && (
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#cc4f33] to-transparent opacity-50" />
                )}

                {/* Game Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200 bg-slate-50">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest bg-white px-3 py-1 rounded-md">{game.tournament}</span>
                    {game.status === 'in_progress' ? (
                      <>
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                        <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">
                          Jogando Agora
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                        <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest flex items-center gap-1.5">
                          {game.date} {game.time ? <><span className="w-1 h-1 rounded-full bg-slate-300 mx-1"/> {game.time}</> : ''}
                        </span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    {isAdmin && (
                      <button 
                        onClick={() => navigate('/admin/jogos', { state: { editGameId: game.id } })}
                        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-[10px] font-bold uppercase tracking-widest bg-white hover:bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200"
                      >
                        <Edit2 size={12} />
                        Editar
                      </button>
                    )}
                    {getStatusBadge(game.status)}
                  </div>
                </div>

                {/* Scoreboard */}
                <div className="px-6 py-6">
                  <div className="flex flex-col">
                    
                    {/* Headers for scores */}
                    <div className="flex justify-end mb-3">
                      <div className="flex gap-4 sm:gap-6 w-32 sm:w-48 justify-end text-center">
                        <span className="w-8 text-[9px] font-bold text-slate-500 uppercase tracking-widest">Sets</span>
                        <span className="w-8 text-[9px] font-bold text-slate-500 uppercase tracking-widest">Games</span>
                        <span className="w-12 text-[9px] font-bold text-[#cc4f33] uppercase tracking-widest">Pts</span>
                      </div>
                    </div>

                    {/* Player 1 Row */}
                    <div className="flex items-center py-3 border-b border-slate-200 group">
                      <div className="flex-1 flex items-center gap-4">
                        <div className={`w-1.5 h-6 rounded-full transition-colors ${game.status === 'in_progress' ? 'bg-[#cc4f33]' : 'bg-slate-200'}`}></div>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <h4 className={`text-xl font-bold leading-none tracking-tight ${game.status === 'in_progress' ? 'text-slate-900' : 'text-slate-600'}`}>{game.player1.name}</h4>
                            {game.player1.partnerName && (
                              <h4 className="text-slate-500 text-sm font-semibold mt-1">{game.player1.partnerName}</h4>
                            )}
                          </div>
                          <span className="text-slate-500 text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded ml-2 uppercase tracking-wider">{game.player1.class}</span>
                        </div>
                      </div>
                      <div className="flex gap-4 sm:gap-6 w-32 sm:w-48 justify-end text-center items-center">
                        <span className="w-8 text-slate-900 font-bold text-xl font-heading bg-slate-100 py-1 rounded">{game.score.player1.sets}</span>
                        <span className="w-8 text-slate-900 font-bold text-xl font-heading bg-slate-100 py-1 rounded">{game.score.player1.games}</span>
                        <div className="w-12">
                          <span className={`font-bold text-2xl font-heading tracking-tighter ${game.status === 'in_progress' ? 'text-[#cc4f33]' : 'text-slate-400'}`}>
                            {game.score.player1.points}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Player 2 Row */}
                    <div className="flex items-center py-3 group">
                      <div className="flex-1 flex items-center gap-4">
                        <div className="w-1.5 h-6 rounded-full bg-slate-200"></div>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <h4 className={`text-xl font-bold leading-none tracking-tight ${game.status === 'in_progress' ? 'text-slate-900' : 'text-slate-600'}`}>{game.player2.name}</h4>
                            {game.player2.partnerName && (
                              <h4 className="text-slate-500 text-sm font-semibold mt-1">{game.player2.partnerName}</h4>
                            )}
                          </div>
                          <span className="text-slate-500 text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded ml-2 uppercase tracking-wider">{game.player2.class}</span>
                        </div>
                      </div>
                      <div className="flex gap-4 sm:gap-6 w-32 sm:w-48 justify-end text-center items-center">
                        <span className="w-8 text-slate-900 font-bold text-xl font-heading bg-slate-100 py-1 rounded">{game.score.player2.sets}</span>
                        <span className="w-8 text-slate-900 font-bold text-xl font-heading bg-slate-100 py-1 rounded">{game.score.player2.games}</span>
                        <div className="w-12">
                          <span className={`font-bold text-2xl font-heading tracking-tighter ${game.status === 'in_progress' ? 'text-[#cc4f33]' : 'text-slate-400'}`}>
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
