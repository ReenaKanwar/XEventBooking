import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star, CalendarDays, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import './EventCard.css';

const EventCard = ({ event, layout = 'vertical' }) => {
  const navigate = useNavigate();
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // Generate next 7 days for the calendar
  const generateDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
        const dateObj = new Date();
        dateObj.setDate(dateObj.getDate() + i);
        
        // Formatting to match design "Sat, 18 Jan" or "Today" or "Tomorrow"
        let label = '';
        if (i === 0) label = "Today";
        else if (i === 1) label = "Tomorrow";
        else {
            label = dateObj.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
        }
        
        dates.push({
            fullDate: dateObj.toISOString().split('T')[0],
            label: label,
            slots: i === 0 ? "10 Slots Available" : `${10 + i * 2} Slots Available` // mock slot availability
        });
    }
    return dates;
  };

  const dates = generateDates();
  // Using explicit strings required by prompt
  const timeCategories = ['Morning', 'Afternoon', 'Evening'];
  const mockTimes = {
      'Morning': ['11:30 AM'],
      'Afternoon': ['12:00 PM', '12:30 PM', '01:30 PM', '02:00 PM', '02:30 PM'],
      'Evening': ['06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM']
  };

  const handleBookSlot = (timeSlot) => {
    console.log("handleBookSlot called with:", timeSlot);
    const selectedDateObj = dates.find(d => d.fullDate === selectedDate);
    const dateLabel = selectedDateObj ? selectedDateObj.label : selectedDate;

    // Use a unique ID for each booking
    const bookingId = `${event.id || event._id || 'evt'}-${Date.now()}`;

    const newBooking = {
      id: bookingId,
      eventName: event.name || event.eventName || event.title || 'Event',
      city: event.city || '',
      state: event.state || '',
      address: event.address || `${event.city}, ${event.state}`,
      rating: event.rating || "4.5",
      date: dateLabel,
      time: timeSlot,
      image: event.image
    };

    console.log("Creating new booking:", newBooking);

    try {
      const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      existingBookings.push(newBooking);
      localStorage.setItem('bookings', JSON.stringify(existingBookings));
      console.log("Successfully saved to localStorage. Current bookings count:", existingBookings.length);
      
      // Navigate slightly after to ensure storage is committed
      setTimeout(() => {
        navigate('/my-bookings');
      }, 100);
    } catch (error) {
      console.error("Error saving booking:", error);
      alert("Failed to save booking. Please try again.");
    }
  };

  const handleBookClick = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    console.log("handleBookClick called. selectedDate:", selectedDate, "selectedTime:", selectedTime);
    if (!selectedDate || !selectedTime) {
      alert("Please select both a date and a time slot.");
      return;
    }
    handleBookSlot(selectedTime);
  };

  if (layout === 'horizontal') {
      return (
         <div className="event-card-horizontal-container">
             <div className="event-card-horizontal">
                <div className="event-card-icon-box">
                    <CalendarDays size={32} color="white" />
                    <Star size={16} color="white" fill="white" className="star-overlay" />
                </div>
                <div className="event-horizontal-details">
                    <h3 style={{color: '#3b82f6', marginBottom: '4px'}}>{event.name}</h3>
                    <div style={{color: '#1e293b', fontWeight: '600', fontSize: '0.9rem', marginBottom: '2px'}}>
                        {event.city}, {event.state}
                    </div>
                    <div style={{color: '#64748b', fontSize: '0.85rem', marginBottom: '12px'}}>
                        {event.address ? `${event.address}, ` : ''}{event.city}, {event.state}
                    </div>
                    <div className="event-pricing-row">
                        <span className="badge-free">FREE</span>
                        <span className="strikethrough-price">₹500</span>
                        <span className="registration-label">Registration fee</span>
                    </div>
                    <div className="rating-badge-container">
                        <div className="rating-badge-green">
                           <Star size={12} color="white" fill="white" className="rating-star"/>
                           <span>{event.rating || "4.5"}</span>
                        </div>
                    </div>
                </div>
                <div className="event-horizontal-action">
                    <p className="available-text">Available Today</p>
                    <button 
                      className={`primary-btn book-btn inline-book-btn ${showCalendar ? 'btn-active' : ''}`}
                      onClick={() => setShowCalendar(!showCalendar)}
                    >
                      {showCalendar ? "Hide Booking Calendar" : "Book FREE Event"}
                    </button>
                </div>
             </div>

             {/* Expandable Calendar Area */}
             {showCalendar && (
                 <div className="inline-calendar-area">
                     <div className="date-carousel">
                         <button className="carousel-nav-btn"><ChevronLeft size={16}/></button>
                         <div className="date-tabs">
                              {dates.slice(0, 3).map(d => (
                                  <button 
                                     type="button"
                                     key={d.fullDate} 
                                     className={`date-tab ${selectedDate === d.fullDate ? 'selected-date' : ''}`}
                                     onClick={(e) => {
                                         e.preventDefault();
                                         e.stopPropagation();
                                         console.log("Date selected:", d.fullDate);
                                         setSelectedDate(d.fullDate);
                                     }}
                                  >
                                      <p className="date-label">{d.label}</p>
                                      <p className="slots-label">{d.slots}</p>
                                  </button>
                              ))}
                         </div>
                         <button className="carousel-nav-btn"><ChevronRight size={16}/></button>
                     </div>

                     <div className="time-slots-container">
                         {timeCategories.map(period => (
                             <div className="time-period-row" key={period}>
                                 <p className="time-period-label">{period}</p>
                                 <div className="time-pills">
                                     {mockTimes[period].map(time => (
                                         <button 
                                            type="button"
                                            key={time} 
                                            className={`time-pill ${selectedTime === time && selectedDate ? 'selected-pill' : ''}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                console.log("Time selected:", time);
                                                setSelectedTime(time);
                                            }}
                                         >
                                             {time}
                                         </button>
                                     ))}
                                 </div>
                             </div>
                         ))}
                     </div>

                     {selectedDate && selectedTime && (
                          <div className="calendar-booking-action" style={{padding: '0 1rem'}}>
                              <button 
                                className="primary-btn book-btn" 
                                onClick={handleBookClick}
                                style={{ width: '100%', marginTop: '1.5rem', padding: '12px' }}
                              >
                                Book FREE Event
                              </button>
                          </div>
                      )}
                 </div>
             )}
         </div>
      );
  }

  // Fallback to vertical for home page layout
  return (
    <div className="event-card">
      <div className="event-image-container">
        <img 
          src={event.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80'} 
          alt={event.name} 
          className="event-image"
        />
        {event.rating && (
          <div className="event-rating">
            ⭐ {event.rating}
          </div>
        )}
      </div>
      
      <div className="event-details">
        <h3>{event.name}</h3>
        <p className="event-location">
          {event.address ? `${event.address}, ` : ''}{event.city}, {event.state}
        </p>
        
        <div className="event-actions">
          <button 
            className="primary-btn book-btn"
            onClick={() => navigate(`/search?state=${event.state}&city=${event.city}`)}
          >
            Book FREE Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;

