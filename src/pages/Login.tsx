import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn, signUp, resetPasswordForEmail } from '../services/api';
import { Lock, Mail, ArrowRight, User, Loader2, Phone } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Login() {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot_password'>('login');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      if (mode === 'signup') {
        const { error } = await signUp(email, password, name, phone);
        if (error) throw error;
        setMode('login');
        setSuccessMsg('Cadastro realizado com sucesso! Faça login para continuar.');
      } else if (mode === 'forgot_password') {
        const { error } = await resetPasswordForEmail(email);
        if (error) throw error;
        setMode('login');
        setSuccessMsg('E-mail de recuperação enviado! Verifique sua caixa de entrada.');
      } else {
        const { data, error } = await signIn(email, password);
        if (error) throw error;
        
        // Se for admin, atualiza o estado local
        if (data.role === 'ADMIN' || data.role === 'admin') {
          useStore.getState().loginAdmin();
        }
        
        // Sucesso
        navigate('/reservas');
      }
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao processar sua solicitação.');
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
              {mode === 'signup' ? 'Junte-se ao Clube' : mode === 'forgot_password' ? 'Recuperar Conta' : 'Bem-vindo de volta'}
            </span>
            <h1 className="text-3xl text-slate-900 font-heading font-bold tracking-tight">
              {mode === 'signup' ? 'Criar Conta' : mode === 'forgot_password' ? 'Esqueci minha senha' : 'Acessar Plataforma'}
            </h1>
            <p className="text-slate-600 text-sm mt-3 font-medium">
              {mode === 'signup' 
                ? 'Preencha os dados para começar' 
                : mode === 'forgot_password' 
                  ? 'Digite seu e-mail para receber um link de recuperação'
                  : 'Insira suas credenciais para continuar'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-4 rounded-xl border text-sm text-center transition-all bg-red-500/10 border-red-500/20 text-red-600 font-medium">
                {error}
              </div>
            )}
            
            {successMsg && (
              <div className="p-4 rounded-xl border text-sm text-center transition-all bg-emerald-500/10 border-emerald-500/20 text-emerald-600 font-medium">
                {successMsg}
              </div>
            )}
            
            {mode === 'signup' && (
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#cc4f33] transition-colors" size={20} />
                <input 
                  type="text" 
                  required
                  placeholder="Nome Completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 pl-12 pr-4 py-4 rounded-2xl outline-none focus:border-[#cc4f33]/50 focus:bg-white transition-all font-medium text-sm placeholder:text-slate-400 shadow-sm"
                />
              </div>
            )}

            {mode === 'signup' && (
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#cc4f33] transition-colors" size={20} />
                <input 
                  type="tel" 
                  required
                  placeholder="Seu WhatsApp"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 pl-12 pr-4 py-4 rounded-2xl outline-none focus:border-[#cc4f33]/50 focus:bg-white transition-all font-medium text-sm placeholder:text-slate-400 shadow-sm"
                />
              </div>
            )}

            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#cc4f33] transition-colors" size={20} />
              <input 
                type="email" 
                required
                placeholder="Seu E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 pl-12 pr-4 py-4 rounded-2xl outline-none focus:border-[#cc4f33]/50 focus:bg-white transition-all font-medium text-sm placeholder:text-slate-400 shadow-sm"
              />
            </div>
            
            {mode !== 'forgot_password' && (
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#cc4f33] transition-colors" size={20} />
                <input 
                  type="password" 
                  required
                  placeholder="Sua Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 pl-12 pr-4 py-4 rounded-2xl outline-none focus:border-[#cc4f33]/50 focus:bg-white transition-all font-medium text-sm placeholder:text-slate-400 shadow-sm"
                />
              </div>
            )}

            {mode === 'login' && (
              <div className="flex justify-end">
                <button 
                  type="button"
                  onClick={() => {
                    setMode('forgot_password');
                    setError('');
                    setSuccessMsg('');
                  }}
                  className="text-[#cc4f33] text-xs font-bold hover:underline transition-all"
                >
                  Esqueceu a senha?
                </button>
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="group w-full flex items-center justify-center gap-2 bg-[#cc4f33] hover:bg-[#e06042] text-white py-4 rounded-2xl font-bold tracking-wider uppercase text-[11px] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-2 shadow-[0_0_20px_rgba(204,79,51,0.2)] hover:shadow-[0_0_25px_rgba(204,79,51,0.4)] active:scale-[0.98]"
            >
              {loading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  {mode === 'signup' ? 'Cadastrar' : mode === 'forgot_password' ? 'Enviar Link' : 'Entrar'}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
            
            <div className="text-center mt-6">
              <button 
                type="button"
                onClick={() => {
                  setMode(mode === 'login' ? 'signup' : 'login');
                  setError('');
                  setSuccessMsg('');
                }}
                className="text-slate-500 text-sm font-semibold hover:text-[#cc4f33] transition-colors"
              >
                {mode === 'login' ? 'Não tem conta? Cadastre-se' : 'Voltar para o Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
