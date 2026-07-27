import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Lock, Mail, ArrowRight } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const loginAdmin = useStore(state => state.loginAdmin);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Credenciais mockadas para o admin
    if (email === 'admin@biotenis.com' && password === 'admin123') {
      loginAdmin();
      navigate('/admin/jogos');
    } else {
      setError('Credenciais inválidas. Tente admin@biotenis.com / admin123');
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#0D0D0D] border border-white/10 p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#C89B3C]/10 via-transparent to-transparent pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="mb-8 text-center">
            <span className="text-[#C89B3C] text-xs uppercase tracking-widest font-semibold mb-2 block">Área Restrita</span>
            <h1 className="font-serif text-3xl text-white">Login</h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs p-3 text-center">
                {error}
              </div>
            )}
            
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="email" 
                required
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-white/10 text-white pl-12 pr-4 py-4 outline-none focus:border-[#C89B3C] transition-colors rounded-none font-light text-sm"
              />
            </div>
            
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="password" 
                required
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-white/10 text-white pl-12 pr-4 py-4 outline-none focus:border-[#C89B3C] transition-colors rounded-none font-light text-sm"
              />
            </div>

            <button 
              type="submit"
              className="group w-full flex items-center justify-center gap-2 bg-[#C89B3C] text-black py-4 uppercase tracking-widest text-xs font-semibold hover:bg-[#b08732] transition-all duration-300 rounded-none"
            >
              Entrar
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div className="text-center mt-6">
              <p className="text-gray-500 text-xs">Credenciais de Teste: admin@biotenis.com / admin123</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
