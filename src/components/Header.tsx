import { useState, useEffect } from 'react';
import { Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import BiotenisLogo from './BiotenisLogo';
import { useStore } from '../store/useStore';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isAdmin = useStore(state => state.isAdmin);
  const location = useLocation();

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
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 sm:px-6">
      <header
        className={`w-full max-w-7xl transition-all duration-500 rounded-full ${
          isScrolled 
            ? 'bg-[#0a0a0a]/60 backdrop-blur-2xl border border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.8)]' 
            : 'bg-transparent border border-transparent'
        }`}
      >
        <div className="px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <BiotenisLogo className="h-10 w-auto group-hover:scale-105 transition-transform duration-300" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`text-xs font-semibold tracking-[0.15em] uppercase transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-gray-400 hover:text-[#C89B3C]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            
            <div className="w-px h-6 bg-white/10 mx-2"></div>

            {isAdmin ? (
              <Link to="/admin/jogos" className="group flex items-center gap-2 text-xs font-bold tracking-[0.15em] uppercase bg-gradient-to-r from-[#C89B3C] to-[#e0af45] text-black px-6 py-2.5 rounded-full shadow-[0_0_20px_rgba(200,155,60,0.2)] hover:shadow-[0_0_30px_rgba(200,155,60,0.4)] active:scale-95 transition-all duration-300">
                <User size={16} className="group-hover:translate-x-0.5 transition-transform" />
                Admin
              </Link>
            ) : (
              <Link to="/login" className="group flex items-center gap-2 text-xs font-bold tracking-[0.15em] uppercase bg-white/5 hover:bg-white/10 px-6 py-2.5 rounded-full border border-white/5 hover:border-white/20 active:scale-95 transition-all duration-300 backdrop-blur-sm">
                <User size={16} className="group-hover:translate-x-0.5 transition-transform" />
                Login
              </Link>
            )}
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white p-2 rounded-full hover:bg-white/10 active:scale-95 transition-all"
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
              className="absolute top-full left-0 right-0 bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/5 rounded-3xl flex flex-col items-center py-8 gap-6 md:hidden shadow-2xl overflow-hidden mt-4 mx-2"
            >
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={`text-xs font-semibold tracking-[0.15em] uppercase transition-colors duration-200 ${
                      isActive ? 'text-[#C89B3C]' : 'text-gray-300 hover:text-white'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
              
              <div className="w-12 h-px bg-white/10 my-2"></div>

              {isAdmin ? (
                <Link to="/admin/jogos" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center gap-2 text-xs font-bold tracking-[0.15em] uppercase bg-gradient-to-r from-[#C89B3C] to-[#e0af45] text-black px-8 py-3.5 rounded-full w-[80%] max-w-xs shadow-[0_0_20px_rgba(200,155,60,0.3)] hover:shadow-[0_0_30px_rgba(200,155,60,0.5)] active:scale-95 transition-all duration-300">
                  <User size={16} />
                  Painel Admin
                </Link>
              ) : (
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center gap-2 text-xs font-bold tracking-[0.15em] uppercase bg-white/5 text-white border border-white/10 px-8 py-3.5 rounded-full w-[80%] max-w-xs hover:bg-white/10 active:scale-95 transition-all duration-300">
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
