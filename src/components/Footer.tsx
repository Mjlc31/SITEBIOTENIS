import { useState } from 'react';
import { Instagram, Facebook, MapPin, Mail, Phone, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import BiotenisLogo from './BiotenisLogo';

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="bg-[#121212] border-t border-white/5 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <BiotenisLogo className="h-10 w-auto" />
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            A tradição do saibro em Maceió. Estrutura de alto padrão para quem exige o melhor do tênis.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-[#cc4f33] transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-[#cc4f33] transition-colors">
              <Facebook size={20} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-sans text-sm tracking-widest uppercase text-white mb-6">Contato</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="flex items-start gap-3 hover:text-white transition-colors cursor-pointer">
              <MapPin size={18} className="text-[#cc4f33] shrink-0 mt-0.5" />
              <span>Av. Menino Marcelo, S/N - Serraria<br/>Maceió - AL</span>
            </li>
            <li className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer">
              <Phone size={18} className="text-[#cc4f33] shrink-0" />
              <span>(82) 3328-0000</span>
            </li>
            <li className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer">
              <Mail size={18} className="text-[#cc4f33] shrink-0" />
              <span>contato@biotenis.com.br</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-sans text-sm tracking-widest uppercase text-white mb-6">Navegação</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link to="/" className="hover:text-[#cc4f33] transition-colors">A Academia</Link></li>
            <li><Link to="/reservas" className="hover:text-[#cc4f33] transition-colors">Reservar Quadra</Link></li>
            <li><Link to="/aulas" className="hover:text-[#cc4f33] transition-colors">Aulas</Link></li>
            <li><Link to="/pro-shop" className="hover:text-[#cc4f33] transition-colors">Pro Shop</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-sans text-sm tracking-widest uppercase text-white mb-6">Newsletter</h4>
          <p className="text-gray-400 text-sm mb-4">Receba novidades sobre torneios e clínicas.</p>
          <form className="flex relative" onSubmit={handleSubscribe}>
            <input 
              type="email" 
              placeholder="Seu melhor e-mail" 
              className="bg-[#050505] border border-white/10 px-4 py-2 text-sm w-full focus:outline-none focus:border-[#cc4f33] transition-colors pr-24"
              required
            />
            <button type="submit" className="absolute right-0 top-0 bottom-0 bg-[#cc4f33] hover:bg-[#e06042] text-white px-4 font-medium transition-colors flex items-center justify-center">
              {subscribed ? <CheckCircle size={18} /> : 'Assinar'}
            </button>
          </form>
          {subscribed && <p className="text-[#cc4f33] text-xs mt-2 font-medium">Inscrito com sucesso!</p>}
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} Biotenis Academia. Todos os direitos reservados.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Privacidade</a>
          <a href="#" className="hover:text-white transition-colors">Termos</a>
        </div>
      </div>
    </footer>
  );
}
