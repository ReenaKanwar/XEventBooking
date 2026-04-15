import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, CalendarDays, Star } from 'lucide-react';
import './MyBookings.css';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    setBookings(savedBookings);
  }, []);

  const handleDelete = (index) => {
    const updatedBookings = bookings.filter((_, i) => i !== index);
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
  };

  const filteredBookings = bookings.filter(b => {
    const name = b.eventName || b.name || b.title || '';
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="my-bookings-page-container">
      <div className="my-bookings-banner">
        <div className="container">
          <h1>My Bookings</h1>
        </div>
      </div>

      <div className="container main-content-wrapper">
        <div className="search-box-card search-banner-card">
          <form className="search-dropdowns-row">
            <div className="search-input-group">
              <input 
                type="text" 
                placeholder="Search By Event" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="my-bookings-search-input"
              />
            </div>
            <button type="button" className="primary-btn search-submit-btn">
              <Search size={18} /> Search
            </button>
          </form>
        </div>

        <div className="bookings-layout">
          <div className="bookings-list-side">
            {filteredBookings.length > 0 ? (
              <div className="events-list-vertical">
                {filteredBookings.map((booking, index) => (
                  <div key={index} className="event-card-horizontal-container">
                    <div className="event-card-horizontal">
                      <div className="event-card-icon-box" style={{ overflow: 'hidden', padding: 0 }}>
                          {booking.image ? (
                              <img src={booking.image} alt={booking.eventName || 'Event'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                              <>
                                  <CalendarDays size={35} color="white" />
                                  <Star size={16} color="white" fill="white" className="star-overlay" />
                              </>
                          )}
                      </div>
                      
                      <div className="event-horizontal-details">
                          <h3 className="event-title-blue">{booking.eventName}</h3>
                          <div className="event-location-bold">
                               {booking.city}, {booking.state}
                          </div>
                          <div className="event-address-small">
                               {booking.address}
                          </div>
                          <div className="event-pricing-row">
                               <span className="badge-free">FREE</span>
                               <span className="strikethrough-price">₹500</span>
                               <span className="fee-label">Registration fee</span>
                          </div>
                          <div className="rating-badge-container">
                               <div className="rating-badge-green">
                                  <Star size={12} color="white" fill="white" className="rating-star"/>
                                  <span>{booking.rating || "4.5"}</span>
                               </div>
                          </div>
                      </div>
                      
                      <div className="booked-datetime-column">
                          <div className="datetime-pill time-pill-outline">{booking.time}</div>
                          <div className="datetime-pill date-pill-outline">{booking.date}</div>
                          <button 
                            className="cancel-booking-btn"
                            onClick={() => handleDelete(index)}
                          >
                            Cancel Booking
                          </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-bookings-card">
                <p>You have no bookings yet.</p>
                <Link to="/" className="primary-btn">Find Events</Link>
              </div>
            )}
          </div>
          
          <div className="search-advertisement-side">
              <div className="ad-card">
                 <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80" alt="Advertisement" className="ad-image" />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;

