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
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center">
      <header
        className={`w-full px-4 sm:px-6 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/5' 
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
                    isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            
            <div className="w-px h-4 bg-white/10 mx-2"></div>

            {isAdmin ? (
              <Link to="/admin/jogos" className="group flex items-center gap-2 text-xs font-bold tracking-widest uppercase bg-[#cc4f33] text-white px-5 py-2 rounded-lg hover:bg-[#e06042] active:scale-95 transition-all duration-200">
                <User size={16} />
                Admin
              </Link>
            ) : (
              <Link to="/login" className="group flex items-center gap-2 text-xs font-bold tracking-widest uppercase bg-[#1c1c1e] hover:bg-[#2c2c2e] px-5 py-2 rounded-lg border border-white/10 active:scale-95 transition-all duration-200 text-white">
                <User size={16} />
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
                    className={`text-xs font-semibold tracking-widest uppercase transition-colors duration-200 ${
                      isActive ? 'text-[#cc4f33]' : 'text-gray-400 hover:text-white'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
              
              <div className="w-12 h-px bg-white/10 my-2"></div>

              {isAdmin ? (
                <Link to="/admin/jogos" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center gap-2 text-xs font-bold tracking-widest uppercase bg-[#cc4f33] text-white px-8 py-3 rounded-lg w-[80%] max-w-xs hover:bg-[#e06042] active:scale-95 transition-all duration-200">
                  <User size={16} />
                  Painel Admin
                </Link>
              ) : (
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center gap-2 text-xs font-bold tracking-widest uppercase bg-[#1c1c1e] text-white border border-white/10 px-8 py-3 rounded-lg w-[80%] max-w-xs hover:bg-[#2c2c2e] active:scale-95 transition-all duration-200">
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
