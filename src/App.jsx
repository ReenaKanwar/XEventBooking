import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AboutTracking from './components/AboutTracking';
import AppDownload from './components/AppDownload';
import Home from './pages/Home';
import Events from './pages/Events';

import MyBookings from './pages/MyBookings';

function App() {
  const location = useLocation();
  const showAbout = location.pathname === '/' || location.pathname === '/search';

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Events />} />

        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
      {showAbout && <AboutTracking />}
      <AppDownload />
      <Footer />
    </>
  );
}

export default App;
