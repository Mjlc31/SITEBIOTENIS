import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updatePassword } from '../services/api';
import { Lock, ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is actually on the reset password flow
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        setError('Link inválido ou expirado. Por favor, solicite a recuperação de senha novamente.');
      }
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await updatePassword(password);
      if (error) throw error;
      
      setSuccess(true);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err: any) {
      setError(err.message || 'Erro ao redefinir a senha.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-xl transition-all duration-500 hover:border-slate-300">
          
          <div className="mb-10 text-center">
            <span className="text-[#cc4f33] text-[10px] uppercase tracking-[0.25em] font-bold mb-3 block">
              Nova Senha
            </span>
            <h1 className="text-3xl text-slate-900 font-heading font-bold tracking-tight">
              Redefinir Senha
            </h1>
            <p className="text-slate-600 text-sm mt-3 font-medium">
              Digite a sua nova senha abaixo.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-4 rounded-xl border text-sm text-center transition-all bg-red-500/10 border-red-500/20 text-red-600 font-medium">
                {error}
              </div>
            )}
            
            {success && (
              <div className="p-4 rounded-xl border text-sm text-center transition-all bg-emerald-500/10 border-emerald-500/20 text-emerald-600 font-medium">
                Senha redefinida com sucesso! Redirecionando para o login...
              </div>
            )}
            
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#cc4f33] transition-colors" size={20} />
              <input 
                type="password" 
                required
                placeholder="Sua Nova Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                disabled={success || !!error}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 pl-12 pr-4 py-4 rounded-2xl outline-none focus:border-[#cc4f33]/50 focus:bg-white transition-all font-medium text-sm placeholder:text-slate-400 shadow-sm disabled:opacity-50"
              />
            </div>

            <button 
              type="submit"
              disabled={loading || success || !!error}
              className="group w-full flex items-center justify-center gap-2 bg-[#cc4f33] hover:bg-[#e06042] text-white py-4 rounded-2xl font-bold tracking-wider uppercase text-[11px] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-2 shadow-[0_0_20px_rgba(204,79,51,0.2)] hover:shadow-[0_0_25px_rgba(204,79,51,0.4)] active:scale-[0.98]"
            >
              {loading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  Salvar Nova Senha
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
