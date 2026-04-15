import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEventById } from '../services/api';
import Loader from '../components/Loader';
import './Booking.css';

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // Generate next 7 days for the calendar
  const generateDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  const dates = generateDates();
  const timeSlots = ['11:30 AM', '12:00 PM', '01:30 PM', '03:00 PM', '05:00 PM', '07:30 PM'];

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await getEventById(id);
        setEvent(eventData);
      } catch (error) {
        console.error("Error loading event details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select both a date and a time to book.");
      return;
    }

    const newBooking = {
      id: Date.now().toString(),
      eventId: event.id || event._id,
      eventName: event.name,
      address: event.address,
      city: event.city,
      state: event.state,
      rating: event.rating || '4.5',
      date: new Date(selectedDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }),
      time: selectedTime,
      image: event.image
    };

    const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    existingBookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(existingBookings));

    navigate('/mybooking');
  };

  if (loading) return <Loader />;
  if (!event) return <div className="container"><h2>Event not found</h2></div>;

  return (
    <div className="booking-container container">
      <div className="booking-card">
        <div className="event-info-header">
          <img 
            src={event.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80'} 
            alt={event.name} 
            className="booking-image" 
          />
          <div className="event-info-text">
            <h2>{event.name}</h2>
            <p>{event.address ? `${event.address}, ` : ''}{event.city}, {event.state}</p>
            {event.rating && <p className="event-rating-solid">Rating: ⭐ {event.rating}</p>}
          </div>
        </div>

        <div className="booking-selection">
          <h3>Select Date</h3>
          <div className="dates-grid">
            {dates.map((date) => (
              <div 
                key={date} 
                className={`date-box ${selectedDate === date ? 'selected' : ''}`}
                onClick={() => setSelectedDate(date)}
              >
                {new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </div>
            ))}
          </div>

          <h3>Select Time</h3>
          <div className="times-grid">
            {timeSlots.map((time) => (
              <div 
                key={time} 
                className={`time-box ${selectedTime === time ? 'selected' : ''}`}
                onClick={() => setSelectedTime(time)}
              >
                <p>{time}</p>
              </div>
            ))}
          </div>

          <button className="primary-btn confirm-btn" onClick={handleConfirm}>
            Book FREE Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default Booking;
