import { useState, useEffect, Fragment } from 'react';
import { useStore, LiveGame } from '../store/useStore';
import { Plus, Edit2, Trash2, LogOut, Search, X, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function AdminGames() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = useStore(state => state.isAdmin);
  const logoutAdmin = useStore(state => state.logoutAdmin);

  const liveGames = useStore(state => state.liveGames);
  const addLiveGame = useStore(state => state.addLiveGame);
  const updateLiveGame = useStore(state => state.updateLiveGame);
  const deleteLiveGame = useStore(state => state.deleteLiveGame);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGameId, setEditingGameId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/login');
    }
  }, [isAdmin, navigate]);

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

  const [showP1Partner, setShowP1Partner] = useState(false);
  const [showP2Partner, setShowP2Partner] = useState(false);

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
    setShowP1Partner(false);
    setP1Class('');
    setP2Name('');
    setP2Partner('');
    setShowP2Partner(false);
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
    setShowP1Partner(!!game.player1?.partnerName);
    setP1Class(game.player1?.class || '');
    setP2Name(game.player2?.name || '');
    setP2Partner(game.player2?.partnerName || '');
    setShowP2Partner(!!game.player2?.partnerName);
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

  // Auto-open modal if navigated from LiveGames with a specific game ID
  useEffect(() => {
    if (location.state && location.state.editGameId && liveGames.length > 0) {
      const gameToEdit = liveGames.find(g => g.id === location.state.editGameId);
      if (gameToEdit) {
        openEditModal(gameToEdit);
        // Clear state so it doesn't reopen on refresh
        window.history.replaceState({}, document.title);
      }
    }
  }, [location.state, liveGames]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    const gameData: LiveGame = {
      id: editingGameId || Date.now().toString(),
      date,
      time,
      tournament,
      player1: { name: p1Name, class: p1Class, partnerName: showP1Partner ? p1Partner : undefined },
      player2: { name: p2Name, class: p2Class, partnerName: showP2Partner ? p2Partner : undefined },
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

  if (!isAdmin) return null;

  return (
    <div className="pt-24 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6 border-b border-slate-200 pb-6">
          <div>
            <motion.span 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="text-[#cc4f33] text-[10px] uppercase tracking-widest font-bold mb-3 block"
            >
              Painel Administrativo
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="font-heading text-4xl md:text-5xl text-slate-900 tracking-tight"
            >
              Gerenciar Jogos
            </motion.h1>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            className="flex gap-4"
          >
            <button 
              onClick={() => {
                logoutAdmin();
                navigate('/');
              }}
              className="flex items-center justify-center gap-2 border border-slate-300 text-slate-900 px-5 py-2.5 rounded-lg uppercase tracking-widest text-[10px] font-bold hover:bg-slate-100 transition-all active:scale-95"
            >
              <LogOut size={14} />
              Sair
            </button>
            <button 
              onClick={() => navigate('/admin/professores')}
              className="flex items-center justify-center gap-2 border border-slate-300 text-slate-900 px-5 py-2.5 rounded-lg uppercase tracking-widest text-[10px] font-bold hover:bg-slate-100 transition-all active:scale-95"
            >
              Professores
            </button>
            <button 
              onClick={openNewModal}
              className="flex items-center justify-center gap-2 bg-[#cc4f33] text-white px-6 py-2.5 rounded-lg uppercase tracking-widest text-[10px] font-bold hover:bg-[#e06042] transition-all hover:shadow-[0_0_20px_rgba(204,79,51,0.4)] active:scale-95"
            >
              <Plus size={14} />
              Novo Jogo
            </button>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xl"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-500 font-bold">Data & Torneio</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-500 font-bold">Jogadores</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-500 font-bold">Status</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-500 font-bold text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {liveGames.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <Search size={32} className="text-slate-400" />
                        <span className="text-slate-500 font-medium">Nenhum jogo cadastrado.</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  liveGames.map(game => (
                    <Fragment key={game.id}>
                      <tr className="hover:bg-slate-50 transition-colors group">
                        <td className="px-6 py-5">
                          <div className="text-slate-900 text-sm font-semibold mb-1">{game.tournament}</div>
                          <div className="text-slate-500 text-xs flex items-center gap-2">
                            {game.date} {game.time && <span className="bg-slate-200 px-2 py-0.5 rounded text-[10px]">{game.time}</span>}
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                            <span className="text-slate-900 text-sm font-medium">
                              {game.player1.name} {game.player1.partnerName && <span className="text-slate-500">/ {game.player1.partnerName}</span>}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                            <span className="text-slate-900 text-sm font-medium">
                              {game.player2.name} {game.player2.partnerName && <span className="text-slate-500">/ {game.player2.partnerName}</span>}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <select 
                            value={game.status}
                            onChange={(e) => updateLiveGame(game.id, { status: e.target.value as any })}
                            className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-md outline-none cursor-pointer transition-colors ${
                              game.status === 'in_progress' ? 'bg-red-50 text-red-600 border border-red-200' : 
                              game.status === 'finished' ? 'bg-slate-100 text-slate-500 border border-slate-200' : 
                              'bg-[#cc4f33]/10 text-[#cc4f33] border border-[#cc4f33]/20'
                            }`}
                          >
                            <option value="scheduled" className="bg-white text-slate-900">Agendado</option>
                            <option value="in_progress" className="bg-white text-slate-900">Ao Vivo</option>
                            <option value="finished" className="bg-white text-slate-900">Finalizado</option>
                          </select>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <div className="flex items-center justify-end gap-3 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => openEditModal(game)} className="bg-slate-100 p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors" title="Editar Info">
                              <Edit2 size={16} />
                            </button>
                            <button onClick={() => setDeleteConfirmId(game.id)} className="bg-slate-100 p-2 rounded-lg text-slate-500 hover:text-red-500 hover:bg-red-50 transition-colors" title="Excluir">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                      
                      {/* Inline Score Controller for In Progress games */}
                      {game.status === 'in_progress' && (
                        <tr className="bg-gradient-to-r from-red-500/5 to-transparent relative">
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500" />
                          <td colSpan={4} className="px-6 py-6 border-b border-slate-200">
                            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
                              
                              <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Player 1 Score Control */}
                                <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200">
                                  <span className="text-slate-900 text-sm font-bold truncate max-w-[150px]">{game.player1.name}</span>
                                  <div className="flex items-center gap-3">
                                    <div className="flex flex-col items-center">
                                      <span className="text-slate-500 text-[9px] uppercase tracking-wider mb-1">Sets</span>
                                      <input type="number" min="0" value={game.score.player1.sets} onChange={e => updateLiveGame(game.id, { score: { ...game.score, player1: { ...game.score.player1, sets: Number(e.target.value) } } })} className="w-12 h-10 bg-white rounded-md border border-slate-300 text-slate-900 text-center font-bold outline-none focus:border-red-500 transition-colors" />
                                    </div>
                                    <div className="flex flex-col items-center">
                                      <span className="text-slate-500 text-[9px] uppercase tracking-wider mb-1">Games</span>
                                      <input type="number" min="0" value={game.score.player1.games} onChange={e => updateLiveGame(game.id, { score: { ...game.score, player1: { ...game.score.player1, games: Number(e.target.value) } } })} className="w-12 h-10 bg-white rounded-md border border-slate-300 text-slate-900 text-center font-bold outline-none focus:border-red-500 transition-colors" />
                                    </div>
                                    <div className="flex flex-col items-center">
                                      <span className="text-[#cc4f33] font-bold text-[9px] uppercase tracking-wider mb-1">Pontos</span>
                                      <select value={game.score.player1.points} onChange={e => updateLiveGame(game.id, { score: { ...game.score, player1: { ...game.score.player1, points: e.target.value } } })} className="w-16 h-10 bg-white rounded-md border border-[#cc4f33]/30 text-[#cc4f33] text-center font-bold outline-none focus:border-[#cc4f33] transition-colors cursor-pointer appearance-none">
                                        <option value="0">0</option>
                                        <option value="15">15</option>
                                        <option value="30">30</option>
                                        <option value="40">40</option>
                                        <option value="AD">AD</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>

                                {/* Player 2 Score Control */}
                                <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200">
                                  <span className="text-slate-900 text-sm font-bold truncate max-w-[150px]">{game.player2.name}</span>
                                  <div className="flex items-center gap-3">
                                    <div className="flex flex-col items-center">
                                      <span className="text-slate-500 text-[9px] uppercase tracking-wider mb-1">Sets</span>
                                      <input type="number" min="0" value={game.score.player2.sets} onChange={e => updateLiveGame(game.id, { score: { ...game.score, player2: { ...game.score.player2, sets: Number(e.target.value) } } })} className="w-12 h-10 bg-white rounded-md border border-slate-300 text-slate-900 text-center font-bold outline-none focus:border-red-500 transition-colors" />
                                    </div>
                                    <div className="flex flex-col items-center">
                                      <span className="text-slate-500 text-[9px] uppercase tracking-wider mb-1">Games</span>
                                      <input type="number" min="0" value={game.score.player2.games} onChange={e => updateLiveGame(game.id, { score: { ...game.score, player2: { ...game.score.player2, games: Number(e.target.value) } } })} className="w-12 h-10 bg-white rounded-md border border-slate-300 text-slate-900 text-center font-bold outline-none focus:border-red-500 transition-colors" />
                                    </div>
                                    <div className="flex flex-col items-center">
                                      <span className="text-[#cc4f33] font-bold text-[9px] uppercase tracking-wider mb-1">Pontos</span>
                                      <select value={game.score.player2.points} onChange={e => updateLiveGame(game.id, { score: { ...game.score, player2: { ...game.score.player2, points: e.target.value } } })} className="w-16 h-10 bg-white rounded-md border border-[#cc4f33]/30 text-[#cc4f33] text-center font-bold outline-none focus:border-[#cc4f33] transition-colors cursor-pointer appearance-none">
                                        <option value="0">0</option>
                                        <option value="15">15</option>
                                        <option value="30">30</option>
                                        <option value="40">40</option>
                                        <option value="AD">AD</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="text-slate-600 text-[10px] uppercase tracking-widest xl:text-right flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-lg">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                Salvamento Automático
                              </div>

                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* Editor Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white border border-slate-200 p-8 rounded-2xl max-w-3xl w-full shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <h2 className="font-heading font-bold text-3xl text-slate-900 mb-8 border-b border-slate-200 pb-4">
                {editingGameId ? 'Editar Partida' : 'Nova Partida'}
              </h2>
              
              <form onSubmit={handleSave} className="space-y-8">
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                    <label className="text-slate-600 text-[10px] uppercase font-bold tracking-widest mb-2 block">Data</label>
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} required className="w-full bg-slate-50 rounded-lg border border-slate-300 text-slate-900 px-4 py-3 outline-none focus:border-[#cc4f33] transition-colors" />
                  </div>
                  <div>
                    <label className="text-slate-600 text-[10px] uppercase font-bold tracking-widest mb-2 block">Horário</label>
                    <input type="time" value={time} onChange={e => setTime(e.target.value)} className="w-full bg-slate-50 rounded-lg border border-slate-300 text-slate-900 px-4 py-3 outline-none focus:border-[#cc4f33] transition-colors" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-slate-600 text-[10px] uppercase font-bold tracking-widest mb-2 block">Torneio / Evento</label>
                    <input type="text" placeholder="Ex: Open de Tênis 2024" value={tournament} onChange={e => setTournament(e.target.value)} required className="w-full bg-slate-50 rounded-lg border border-slate-300 text-slate-900 px-4 py-3 outline-none focus:border-[#cc4f33] transition-colors" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-xl border border-slate-200">
                  {/* Jogador 1 */}
                  <div className="space-y-4">
                    <h3 className="text-[#cc4f33] text-xs uppercase tracking-widest font-bold flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#cc4f33]" />
                      Equipe 1
                    </h3>
                    <div className="space-y-3">
                      <input type="text" placeholder="Nome do Jogador 1" value={p1Name} onChange={e => setP1Name(e.target.value)} required className="w-full bg-white rounded-lg border border-slate-300 text-slate-900 px-4 py-3 outline-none focus:border-[#cc4f33] transition-colors" />
                      
                      {showP1Partner ? (
                        <div className="flex gap-2">
                          <input type="text" placeholder="Nome do Parceiro (Duplas)" value={p1Partner} onChange={e => setP1Partner(e.target.value)} className="flex-1 bg-white rounded-lg border border-slate-300 text-slate-900 px-4 py-3 outline-none focus:border-[#cc4f33] transition-colors" />
                          <button type="button" onClick={() => { setShowP1Partner(false); setP1Partner(''); }} className="px-3 text-slate-500 hover:text-red-500 transition-colors bg-white rounded-lg border border-slate-300">
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <button type="button" onClick={() => setShowP1Partner(true)} className="flex items-center justify-center gap-2 w-full py-3 rounded-lg border border-dashed border-slate-300 text-slate-500 hover:text-slate-900 hover:bg-slate-100 hover:border-slate-400 transition-all text-xs font-bold uppercase tracking-widest">
                          <Plus size={14} />
                          Adicionar Parceiro (Duplas)
                        </button>
                      )}

                      <input type="text" placeholder="Classe (Ex: 1ª Classe)" value={p1Class} onChange={e => setP1Class(e.target.value)} required className="w-full bg-white rounded-lg border border-slate-300 text-slate-900 px-4 py-3 outline-none focus:border-[#cc4f33] transition-colors" />
                    </div>
                  </div>

                  {/* Jogador 2 */}
                  <div className="space-y-4">
                    <h3 className="text-slate-600 text-xs uppercase tracking-widest font-bold flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-slate-500" />
                      Equipe 2
                    </h3>
                    <div className="space-y-3">
                      <input type="text" placeholder="Nome do Jogador 2" value={p2Name} onChange={e => setP2Name(e.target.value)} required className="w-full bg-white rounded-lg border border-slate-300 text-slate-900 px-4 py-3 outline-none focus:border-[#cc4f33] transition-colors" />
                      
                      {showP2Partner ? (
                        <div className="flex gap-2">
                          <input type="text" placeholder="Nome do Parceiro (Duplas)" value={p2Partner} onChange={e => setP2Partner(e.target.value)} className="flex-1 bg-white rounded-lg border border-slate-300 text-slate-900 px-4 py-3 outline-none focus:border-[#cc4f33] transition-colors" />
                          <button type="button" onClick={() => { setShowP2Partner(false); setP2Partner(''); }} className="px-3 text-slate-500 hover:text-red-500 transition-colors bg-white rounded-lg border border-slate-300">
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <button type="button" onClick={() => setShowP2Partner(true)} className="flex items-center justify-center gap-2 w-full py-3 rounded-lg border border-dashed border-slate-300 text-slate-500 hover:text-slate-900 hover:bg-slate-100 hover:border-slate-400 transition-all text-xs font-bold uppercase tracking-widest">
                          <Plus size={14} />
                          Adicionar Parceiro (Duplas)
                        </button>
                      )}

                      <input type="text" placeholder="Classe (Ex: 1ª Classe)" value={p2Class} onChange={e => setP2Class(e.target.value)} required className="w-full bg-white rounded-lg border border-slate-300 text-slate-900 px-4 py-3 outline-none focus:border-[#cc4f33] transition-colors" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-slate-600 text-[10px] uppercase font-bold tracking-widest mb-2 block">Status Inicial</label>
                  <select value={status} onChange={e => setStatus(e.target.value as any)} className="w-full bg-slate-50 rounded-lg border border-slate-300 text-slate-900 px-4 py-4 outline-none focus:border-[#cc4f33] transition-colors font-semibold cursor-pointer">
                    <option value="scheduled">Agendado (Aparece na lista de próximos jogos)</option>
                    <option value="in_progress">Ao Vivo (Ativa o placar em tempo real)</option>
                    <option value="finished">Finalizado (Mostra o placar final)</option>
                  </select>
                </div>

                <div className="flex gap-4 pt-6 border-t border-slate-200">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 rounded-xl border border-slate-300 text-slate-900 uppercase tracking-widest text-xs font-bold hover:bg-slate-100 transition-colors">
                    Cancelar
                  </button>
                  <button type="submit" className="flex-1 py-4 rounded-xl bg-[#cc4f33] text-white uppercase tracking-widest text-xs font-bold hover:bg-[#e06042] transition-colors hover:shadow-[0_0_20px_rgba(204,79,51,0.4)]">
                    Salvar Partida
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmId && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
              onClick={() => setDeleteConfirmId(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white border border-slate-200 p-8 rounded-2xl max-w-sm w-full shadow-2xl text-center"
            >
              <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={28} className="text-red-500" />
              </div>
              <h3 className="text-slate-900 text-xl font-bold mb-2">Excluir Partida?</h3>
              <p className="text-slate-600 text-sm mb-6">Esta ação não pode ser desfeita. A partida será removida permanentemente.</p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setDeleteConfirmId(null)} 
                  className="flex-1 py-3 rounded-xl border border-slate-300 text-slate-700 text-xs uppercase tracking-widest font-bold hover:bg-slate-100 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  onClick={() => { deleteLiveGame(deleteConfirmId); setDeleteConfirmId(null); }} 
                  className="flex-1 py-3 rounded-xl bg-red-500 text-white text-xs uppercase tracking-widest font-bold hover:bg-red-600 transition-colors active:scale-95"
                >
                  Excluir
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
