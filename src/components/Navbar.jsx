import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building2 } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <>
      <div className="top-banner">
         <p>Explore the world full of Events Offline. <a href="#">Learn More &rarr;</a></p>
      </div>
      <header className="navbar-header">
        <div className="container navbar-container">
          <Link to="/" className="navbar-brand" style={{display: 'flex', alignItems: 'center', gap: '8px', color: '#1e293b'}}>
             <Building2 size={24} color="#3b82f6" /> 
             <span>Event</span>
          </Link>
          
          <nav className="navbar-links">
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Find Events</Link>
            <Link to="/">Venues</Link>
            <Link to="/">Tickets</Link>
            <Link to="/">Workshops</Link>
            <Link to="/">Event Management Software</Link>
            <Link to="/">Services</Link>
            <Link to="/mybooking" className={location.pathname === '/mybooking' ? 'active' : ''}>My Bookings</Link>
          </nav>

          <div className="navbar-actions">
             <button className="primary-btn">Post an Event</button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
