/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Reservas from './pages/Reservas';
import Aulas from './pages/Aulas';
import ProShopPage from './pages/ProShopPage';
import LiveGames from './pages/LiveGames';
import AdminGames from './pages/AdminGames';
import Login from './pages/Login';

function AppInner() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#cc4f33] selection:text-white">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reservas" element={<Reservas />} />
          <Route path="/aulas" element={<Aulas />} />
          <Route path="/pro-shop" element={<ProShopPage />} />
          <Route path="/jogos-ao-vivo" element={<LiveGames />} />
          <Route path="/admin/jogos" element={<AdminGames />} />
          <Route path="/login" element={<Login />} />
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
