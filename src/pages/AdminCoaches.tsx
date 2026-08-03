import { useState, useEffect } from 'react';
import { useStore, Coach } from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import { Edit2, Save, X, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AdminCoaches() {
  const navigate = useNavigate();
  const isAdmin = useStore(state => state.isAdmin);
  const coaches = useStore(state => state.coaches);
  const updateCoach = useStore(state => state.updateCoach);

  const [editingCoachId, setEditingCoachId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Coach>>({});

  useEffect(() => {
    if (!isAdmin) {
      navigate('/login');
    }
  }, [isAdmin, navigate]);

  const handleEdit = (coach: Coach) => {
    setEditingCoachId(coach.id);
    setFormData(JSON.parse(JSON.stringify(coach))); // deep copy
  };

  const handleCancel = () => {
    setEditingCoachId(null);
    setFormData({});
  };

  const handleSave = () => {
    if (editingCoachId && formData) {
      updateCoach(editingCoachId, formData);
      setEditingCoachId(null);
      setFormData({});
    }
  };

  const handleAttributeChange = (index: number, value: number) => {
    if (formData.attributes) {
      const newAttrs = [...formData.attributes];
      newAttrs[index].value = value;
      setFormData({ ...formData, attributes: newAttrs });
    }
  };

  if (!isAdmin) return null;

  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <button 
              onClick={() => navigate('/admin/jogos')}
              className="flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-2 transition-colors text-sm"
            >
              <ArrowLeft size={16} />
              Voltar para Admin Jogos
            </button>
            <h1 className="text-3xl font-bold text-slate-900">Gerenciar Professores</h1>
            <p className="text-slate-600 mt-1">Atualize informações e estatísticas dos treinadores</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {coaches.map(coach => (
              <motion.div
                key={coach.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6"
              >
                {editingCoachId === coach.id ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold text-slate-900">Editando {coach.name}</h3>
                      <div className="flex gap-2">
                        <button onClick={handleCancel} className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                          <X size={20} />
                        </button>
                        <button onClick={handleSave} className="p-2 text-green-500 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-colors">
                          <Save size={20} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Nome</label>
                        <input
                          type="text"
                          value={formData.name || ''}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 text-sm focus:border-[#cc4f33] outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Cargo / Especialidade</label>
                        <input
                          type="text"
                          value={formData.role || ''}
                          onChange={e => setFormData({...formData, role: e.target.value})}
                          className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 text-sm focus:border-[#cc4f33] outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Caminho da Imagem</label>
                        <input
                          type="text"
                          value={formData.img || ''}
                          onChange={e => setFormData({...formData, img: e.target.value})}
                          className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 text-sm focus:border-[#cc4f33] outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Biografia</label>
                        <textarea
                          value={formData.bio || ''}
                          onChange={e => setFormData({...formData, bio: e.target.value})}
                          className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 text-sm focus:border-[#cc4f33] outline-none transition-colors min-h-[80px]"
                        />
                      </div>
                      
                      <div className="pt-4 border-t border-slate-200">
                        <h4 className="text-sm font-bold text-slate-900 mb-3">Estatísticas</h4>
                        <div className="grid grid-cols-2 gap-4">
                          {formData.attributes?.map((attr, idx) => (
                            <div key={attr.name}>
                              <label className="block text-xs font-medium text-slate-600 mb-1">{attr.name}</label>
                              <input
                                type="number"
                                min="0"
                                max="100"
                                value={attr.value}
                                onChange={e => handleAttributeChange(idx, parseInt(e.target.value) || 0)}
                                className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 text-sm focus:border-[#cc4f33] outline-none transition-colors"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      <button onClick={handleSave} className="w-full mt-4 bg-[#cc4f33] hover:bg-[#e06042] text-white py-3 rounded-xl font-bold text-sm transition-colors">
                        Salvar Alterações
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-4">
                    <img src={coach.img} alt={coach.name} className="w-24 h-24 rounded-xl object-cover border border-slate-200" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-slate-900">{coach.name}</h3>
                          <p className="text-[#cc4f33] text-xs font-bold uppercase tracking-wider">{coach.role}</p>
                        </div>
                        <button onClick={() => handleEdit(coach)} className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                          <Edit2 size={18} />
                        </button>
                      </div>
                      <p className="text-slate-600 text-sm mt-2 line-clamp-2">{coach.bio}</p>
                      
                      <div className="grid grid-cols-4 gap-2 mt-4">
                        {coach.attributes.map(attr => (
                          <div key={attr.name} className="bg-slate-50 border border-slate-200 rounded-lg p-2 text-center">
                            <span className="block text-[10px] text-slate-500 font-semibold mb-1 truncate">{attr.name}</span>
                            <span className="block text-slate-900 font-bold">{attr.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
