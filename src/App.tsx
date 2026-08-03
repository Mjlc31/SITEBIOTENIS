/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Reservas from './pages/Reservas';
import Aulas from './pages/Aulas';
import ProShopPage from './pages/ProShopPage';
import LiveGames from './pages/LiveGames';
import AdminGames from './pages/AdminGames';
import AdminCoaches from './pages/AdminCoaches';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ResetPassword from './pages/ResetPassword';
import BlobCursor from './components/BlobCursor';

function AppInner() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) {
      setIsMobile(true);
    }
  }, []);

  return (
    <div className="min-h-[100dvh] bg-[#050505] text-white font-sans selection:bg-[#cc4f33] selection:text-white">
      {!isMobile && <BlobCursor />}
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reservas" element={<Reservas />} />
          <Route path="/aulas" element={<Aulas />} />
          <Route path="/pro-shop" element={<ProShopPage />} />
          <Route path="/jogos-ao-vivo" element={<LiveGames />} />
          <Route path="/admin/jogos" element={<AdminGames />} />
          <Route path="/admin/professores" element={<AdminCoaches />} />
          <Route path="/login" element={<Login />} />
          <Route path="/perfil" element={<Profile />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </main>
      {!isHome && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}
