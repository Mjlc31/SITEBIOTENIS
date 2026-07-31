import { useState, useEffect } from 'react';
import { useStore, LiveGame } from '../store/useStore';
import { Plus, Edit2, Trash2, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export default function AdminGames() {
  const navigate = useNavigate();
  const isAdmin = useStore(state => state.isAdmin);
  const logoutAdmin = useStore(state => state.logoutAdmin);

  const liveGames = useStore(state => state.liveGames);
  const addLiveGame = useStore(state => state.addLiveGame);
  const updateLiveGame = useStore(state => state.updateLiveGame);
  const deleteLiveGame = useStore(state => state.deleteLiveGame);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGameId, setEditingGameId] = useState<string | null>(null);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/login');
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) return null;

  // Form State
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('');
  const [tournament, setTournament] = useState('');
  const [p1Name, setP1Name] = useState('');
  const [p1Partner, setP1Partner] = useState('');
  const [p1Class, setP1Class] = useState('');
  const [p2Name, setP2Name] = useState('');
  const [p2Partner, setP2Partner] = useState('');
  const [p2Class, setP2Class] = useState('');
  const [status, setStatus] = useState<'scheduled' | 'in_progress' | 'finished'>('scheduled');

  // Score State
  const [p1Sets, setP1Sets] = useState(0);
  const [p1Games, setP1Games] = useState(0);
  const [p1Points, setP1Points] = useState('0');
  
  const [p2Sets, setP2Sets] = useState(0);
  const [p2Games, setP2Games] = useState(0);
  const [p2Points, setP2Points] = useState('0');

  const resetForm = () => {
    setDate(new Date().toISOString().split('T')[0]);
    setTime('');
    setTournament('');
    setP1Name('');
    setP1Partner('');
    setP1Class('');
    setP2Name('');
    setP2Partner('');
    setP2Class('');
    setStatus('scheduled');
    setP1Sets(0);
    setP1Games(0);
    setP1Points('0');
    setP2Sets(0);
    setP2Games(0);
    setP2Points('0');
    setEditingGameId(null);
  };

  const openNewModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (game: LiveGame) => {
    setEditingGameId(game.id);
    setDate(game.date || '');
    setTime(game.time || '');
    setTournament(game.tournament || '');
    setP1Name(game.player1?.name || '');
    setP1Partner(game.player1?.partnerName || '');
    setP1Class(game.player1?.class || '');
    setP2Name(game.player2?.name || '');
    setP2Partner(game.player2?.partnerName || '');
    setP2Class(game.player2?.class || '');
    setStatus(game.status || 'scheduled');
    setP1Sets(game.score?.player1?.sets || 0);
    setP1Games(game.score?.player1?.games || 0);
    setP1Points(game.score?.player1?.points || '0');
    setP2Sets(game.score?.player2?.sets || 0);
    setP2Games(game.score?.player2?.games || 0);
    setP2Points(game.score?.player2?.points || '0');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    const gameData: LiveGame = {
      id: editingGameId || Date.now().toString(),
      date,
      time,
      tournament,
      player1: { name: p1Name, class: p1Class, partnerName: p1Partner },
      player2: { name: p2Name, class: p2Class, partnerName: p2Partner },
      status,
      score: {
        player1: { sets: p1Sets, games: p1Games, points: p1Points },
        player2: { sets: p2Sets, games: p2Games, points: p2Points }
      }
    };

    if (editingGameId) {
      updateLiveGame(editingGameId, gameData);
    } else {
      addLiveGame(gameData);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="pt-20 min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-red-500 text-xs uppercase tracking-widest font-semibold mb-4 block">Painel Administrativo</span>
            <h1 className="font-serif text-3xl md:text-4xl text-white">Gerenciar Jogos</h1>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => {
                logoutAdmin();
                navigate('/');
              }}
              className="flex items-center gap-2 border border-white/10 text-white px-6 py-3 uppercase tracking-widest text-xs font-semibold hover:bg-white/5 transition-colors"
            >
              <LogOut size={16} />
              Sair
            </button>
            <button 
              onClick={openNewModal}
              className="flex items-center gap-2 bg-[#C89B3C] text-black px-6 py-3 uppercase tracking-widest text-xs font-semibold hover:bg-[#b08732] transition-colors"
            >
              <Plus size={16} />
              Novo Jogo
            </button>
          </div>
        </div>

        <div className="bg-[#0a0a0a] border border-white/5 overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#121212] border-b border-white/5">
              <tr>
                <th className="px-6 py-4 text-xs uppercase tracking-widest text-gray-500 font-semibold">Data</th>
                <th className="px-6 py-4 text-xs uppercase tracking-widest text-gray-500 font-semibold">Torneio</th>
                <th className="px-6 py-4 text-xs uppercase tracking-widest text-gray-500 font-semibold">Jogadores</th>
                <th className="px-6 py-4 text-xs uppercase tracking-widest text-gray-500 font-semibold">Status</th>
                <th className="px-6 py-4 text-xs uppercase tracking-widest text-gray-500 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {liveGames.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">Nenhum jogo cadastrado.</td>
                </tr>
              ) : (
                liveGames.map(game => (
                  <React.Fragment key={game.id}>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4">
                        <div className="text-gray-300 text-sm">{game.date}</div>
                        {game.time && <div className="text-gray-500 text-xs">{game.time}</div>}
                      </td>
                      <td className="px-6 py-4 text-white text-sm">{game.tournament}</td>
                      <td className="px-6 py-4">
                        <div className="text-white text-sm">
                          {game.player1.name} {game.player1.partnerName && ` / ${game.player1.partnerName}`} <span className="text-gray-500 text-xs">({game.player1.class})</span>
                        </div>
                        <div className="text-gray-500 text-xs my-1">vs</div>
                        <div className="text-white text-sm">
                          {game.player2.name} {game.player2.partnerName && ` / ${game.player2.partnerName}`} <span className="text-gray-500 text-xs">({game.player2.class})</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <select 
                          value={game.status}
                          onChange={(e) => updateLiveGame(game.id, { status: e.target.value as any })}
                          className={`text-xs uppercase tracking-widest px-2 py-1 outline-none cursor-pointer ${
                            game.status === 'in_progress' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 
                            game.status === 'finished' ? 'bg-white/5 text-gray-400 border border-white/10' : 
                            'bg-[#cc4f33]/10 text-[#cc4f33] border border-[#cc4f33]/20'
                          }`}
                        >
                          <option value="scheduled" className="bg-[#121212] text-white">Agendado</option>
                          <option value="in_progress" className="bg-[#121212] text-white">Ao Vivo</option>
                          <option value="finished" className="bg-[#121212] text-white">Finalizado</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <button onClick={() => openEditModal(game)} className="text-gray-400 hover:text-white transition-colors" title="Editar Info">
                            <Edit2 size={16} />
                          </button>
                          <button onClick={() => deleteLiveGame(game.id)} className="text-gray-400 hover:text-red-500 transition-colors" title="Excluir">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                    
                    {/* Inline Score Controller for In Progress games */}
                    {game.status === 'in_progress' && (
                      <tr className="bg-[#1a1a1e]">
                        <td colSpan={5} className="px-6 py-4 border-b border-white/5">
                          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                            <div className="flex-1 w-full grid grid-cols-2 gap-8">
                              {/* Player 1 Score Control */}
                              <div className="flex flex-col gap-2">
                                <span className="text-white text-xs font-bold truncate">{game.player1.name}</span>
                                <div className="flex items-center gap-2">
                                  <label className="text-gray-500 text-[10px] uppercase w-8">Sets</label>
                                  <input type="number" min="0" value={game.score.player1.sets} onChange={e => updateLiveGame(game.id, { score: { ...game.score, player1: { ...game.score.player1, sets: Number(e.target.value) } } })} className="w-12 bg-black border border-white/10 text-white px-2 py-1 text-center outline-none focus:border-[#cc4f33]" />
                                  <label className="text-gray-500 text-[10px] uppercase w-8 ml-2">Games</label>
                                  <input type="number" min="0" value={game.score.player1.games} onChange={e => updateLiveGame(game.id, { score: { ...game.score, player1: { ...game.score.player1, games: Number(e.target.value) } } })} className="w-12 bg-black border border-white/10 text-white px-2 py-1 text-center outline-none focus:border-[#cc4f33]" />
                                  <label className="text-gray-500 text-[10px] uppercase w-8 ml-2">Pts</label>
                                  <select value={game.score.player1.points} onChange={e => updateLiveGame(game.id, { score: { ...game.score, player1: { ...game.score.player1, points: e.target.value } } })} className="w-16 bg-black border border-white/10 text-white px-2 py-1 text-center outline-none focus:border-[#cc4f33]">
                                    <option value="0">0</option>
                                    <option value="15">15</option>
                                    <option value="30">30</option>
                                    <option value="40">40</option>
                                    <option value="AD">AD</option>
                                  </select>
                                </div>
                              </div>
                              {/* Player 2 Score Control */}
                              <div className="flex flex-col gap-2">
                                <span className="text-white text-xs font-bold truncate">{game.player2.name}</span>
                                <div className="flex items-center gap-2">
                                  <label className="text-gray-500 text-[10px] uppercase w-8">Sets</label>
                                  <input type="number" min="0" value={game.score.player2.sets} onChange={e => updateLiveGame(game.id, { score: { ...game.score, player2: { ...game.score.player2, sets: Number(e.target.value) } } })} className="w-12 bg-black border border-white/10 text-white px-2 py-1 text-center outline-none focus:border-[#cc4f33]" />
                                  <label className="text-gray-500 text-[10px] uppercase w-8 ml-2">Games</label>
                                  <input type="number" min="0" value={game.score.player2.games} onChange={e => updateLiveGame(game.id, { score: { ...game.score, player2: { ...game.score.player2, games: Number(e.target.value) } } })} className="w-12 bg-black border border-white/10 text-white px-2 py-1 text-center outline-none focus:border-[#cc4f33]" />
                                  <label className="text-gray-500 text-[10px] uppercase w-8 ml-2">Pts</label>
                                  <select value={game.score.player2.points} onChange={e => updateLiveGame(game.id, { score: { ...game.score, player2: { ...game.score.player2, points: e.target.value } } })} className="w-16 bg-black border border-white/10 text-white px-2 py-1 text-center outline-none focus:border-[#cc4f33]">
                                    <option value="0">0</option>
                                    <option value="15">15</option>
                                    <option value="30">30</option>
                                    <option value="40">40</option>
                                    <option value="AD">AD</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="text-gray-500 text-[10px] uppercase tracking-widest text-right hidden lg:block">
                              As alterações aqui<br/>são salvas automaticamente.
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Editor Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-[#0D0D0D] border border-white/10 p-6 max-w-3xl w-full shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <h2 className="font-serif text-2xl text-white mb-6">
                {editingGameId ? 'Editar Jogo' : 'Novo Jogo'}
              </h2>
              
              <form onSubmit={handleSave} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-gray-400 text-xs uppercase tracking-widest mb-2 block">Data</label>
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} required className="w-full bg-[#1A1A1A] border border-white/10 text-white px-4 py-2 outline-none focus:border-[#cc4f33]" />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs uppercase tracking-widest mb-2 block">Horário (Opcional)</label>
                    <input type="time" value={time} onChange={e => setTime(e.target.value)} className="w-full bg-[#1A1A1A] border border-white/10 text-white px-4 py-2 outline-none focus:border-[#cc4f33]" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-gray-400 text-xs uppercase tracking-widest mb-2 block">Torneio</label>
                    <input type="text" value={tournament} onChange={e => setTournament(e.target.value)} required className="w-full bg-[#1A1A1A] border border-white/10 text-white px-4 py-2 outline-none focus:border-[#cc4f33]" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#121212] p-4 border border-white/5">
                  {/* Jogador 1 */}
                  <div className="space-y-4">
                    <h3 className="text-[#cc4f33] text-sm uppercase tracking-widest font-semibold">Jogador(es) 1</h3>
                    <div>
                      <input type="text" placeholder="Nome Jogador 1" value={p1Name} onChange={e => setP1Name(e.target.value)} required className="w-full bg-[#1A1A1A] border border-white/10 text-white px-4 py-2 outline-none focus:border-[#cc4f33] mb-2" />
                      <input type="text" placeholder="Nome Parceiro (Opcional - Duplas)" value={p1Partner} onChange={e => setP1Partner(e.target.value)} className="w-full bg-[#1A1A1A] border border-white/10 text-white px-4 py-2 outline-none focus:border-[#cc4f33] mb-2" />
                      <input type="text" placeholder="Classe (Ex: 1ª Classe)" value={p1Class} onChange={e => setP1Class(e.target.value)} required className="w-full bg-[#1A1A1A] border border-white/10 text-white px-4 py-2 outline-none focus:border-[#cc4f33]" />
                    </div>
                  </div>

                  {/* Jogador 2 */}
                  <div className="space-y-4">
                    <h3 className="text-[#cc4f33] text-sm uppercase tracking-widest font-semibold">Jogador(es) 2</h3>
                    <div>
                      <input type="text" placeholder="Nome Jogador 2" value={p2Name} onChange={e => setP2Name(e.target.value)} required className="w-full bg-[#1A1A1A] border border-white/10 text-white px-4 py-2 outline-none focus:border-[#cc4f33] mb-2" />
                      <input type="text" placeholder="Nome Parceiro (Opcional - Duplas)" value={p2Partner} onChange={e => setP2Partner(e.target.value)} className="w-full bg-[#1A1A1A] border border-white/10 text-white px-4 py-2 outline-none focus:border-[#cc4f33] mb-2" />
                      <input type="text" placeholder="Classe (Ex: 1ª Classe)" value={p2Class} onChange={e => setP2Class(e.target.value)} required className="w-full bg-[#1A1A1A] border border-white/10 text-white px-4 py-2 outline-none focus:border-[#cc4f33]" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-gray-400 text-xs uppercase tracking-widest mb-2 block">Status do Jogo</label>
                  <select value={status} onChange={e => setStatus(e.target.value as any)} className="w-full bg-[#1A1A1A] border border-white/10 text-white px-4 py-3 outline-none focus:border-[#cc4f33]">
                    <option value="scheduled">Agendado (Apenas info)</option>
                    <option value="in_progress">Ao Vivo (Placar ativo)</option>
                    <option value="finished">Finalizado</option>
                  </select>
                </div>

                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 border border-white/20 text-white uppercase tracking-widest text-xs hover:bg-white/5 transition-colors">
                    Cancelar
                  </button>
                  <button type="submit" className="flex-1 py-3 bg-[#cc4f33] text-white uppercase tracking-widest text-xs font-bold hover:bg-[#e06042] transition-colors rounded-xl">
                    Salvar Jogo
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
