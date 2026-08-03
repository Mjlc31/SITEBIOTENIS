import { useState, useEffect } from 'react';
import { Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import BiotenisLogo from './BiotenisLogo';
import { useStore } from '../store/useStore';
import { supabase } from '../lib/supabase';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  const isAdmin = useStore(state => state.isAdmin);
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) useStore.getState().logoutAdmin();
    });
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) useStore.getState().logoutAdmin();
    });
    
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'A Academia', href: '/' },
    { label: 'Reservar Quadra', href: '/reservas' },
    { label: 'Aulas', href: '/aulas' },
    { label: 'Pro Shop', href: '/pro-shop' },
    { label: 'Ao Vivo', href: '/jogos-ao-vivo' },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center">
      <header
        className={`w-full px-4 sm:px-6 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm' 
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <BiotenisLogo className="h-8 w-auto group-hover:opacity-80 transition-opacity duration-200" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`text-xs font-semibold tracking-widest uppercase transition-colors duration-200 ${
                    isActive ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            
            <div className="w-px h-4 bg-slate-200 mx-2"></div>

            {session && isAdmin && (
              <Link to="/admin/jogos" className="group flex items-center gap-2 text-xs font-bold tracking-widest uppercase bg-[#cc4f33] text-white px-5 py-2 rounded-lg hover:bg-[#e06042] active:scale-95 transition-all duration-200">
                <User size={16} />
                Admin
              </Link>
            )}
            
            {session ? (
              <Link to="/perfil" className="group flex items-center gap-2 text-xs font-bold tracking-widest uppercase bg-slate-100 hover:bg-slate-200 px-5 py-2 rounded-lg border border-slate-200 active:scale-95 transition-all duration-200 text-slate-900">
                <User size={16} />
                Perfil
              </Link>
            ) : (
              <Link to="/login" className="group flex items-center gap-2 text-xs font-bold tracking-widest uppercase bg-slate-100 hover:bg-slate-200 px-5 py-2 rounded-lg border border-slate-200 active:scale-95 transition-all duration-200 text-slate-900">
                <User size={16} />
                Login
              </Link>
            )}
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-slate-900 p-2 rounded-full hover:bg-slate-100 active:scale-95 transition-all"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 10, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-2xl border border-slate-200 rounded-3xl flex flex-col items-center py-8 gap-6 md:hidden shadow-xl overflow-hidden mt-4 mx-2"
            >
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={`text-xs font-semibold tracking-widest uppercase transition-colors duration-200 ${
                      isActive ? 'text-[#cc4f33]' : 'text-slate-500 hover:text-slate-900'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
              
              <div className="w-12 h-px bg-slate-200 my-2"></div>

              {session && isAdmin && (
                <Link to="/admin/jogos" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center gap-2 text-xs font-bold tracking-widest uppercase bg-[#cc4f33] text-white px-8 py-3 rounded-lg w-[80%] max-w-xs hover:bg-[#e06042] active:scale-95 transition-all duration-200">
                  <User size={16} />
                  Painel Admin
                </Link>
              )}
              
              {session ? (
                <Link to="/perfil" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center gap-2 text-xs font-bold tracking-widest uppercase bg-slate-100 text-slate-900 border border-slate-200 px-8 py-3 rounded-lg w-[80%] max-w-xs hover:bg-slate-200 active:scale-95 transition-all duration-200">
                  <User size={16} />
                  Perfil
                </Link>
              ) : (
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center gap-2 text-xs font-bold tracking-widest uppercase bg-slate-100 text-slate-900 border border-slate-200 px-8 py-3 rounded-lg w-[80%] max-w-xs hover:bg-slate-200 active:scale-95 transition-all duration-200">
                  <User size={16} />
                  Login
                </Link>
              )}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
}
