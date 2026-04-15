import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { getEvents, getStates, getCities } from '../services/api';
import EventCard from '../components/EventCard';
import Loader from '../components/Loader';
import { Search, CheckCircle2 } from 'lucide-react';
import './Events.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract query parameters
  const queryParams = new URLSearchParams(location.search);
  const initialState = queryParams.get('state') || '';
  const initialCity = queryParams.get('city') || '';

  const [selectedState, setSelectedState] = useState(initialState);
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [loadingCities, setLoadingCities] = useState(false);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const data = await getStates();
        setStates(data);
      } catch (error) {
        console.error('Failed to load states');
      }
    };
    fetchStates();
  }, []);

  useEffect(() => {
    if (selectedState) {
      const fetchCities = async () => {
        setLoadingCities(true);
        try {
          const data = await getCities(selectedState);
          setCities(data);
        } catch (error) {
          console.error(`Failed to load cities for ${selectedState}`);
        } finally {
          setLoadingCities(false);
        }
      };
      fetchCities();
    } else {
      setCities([]);
    }
  }, [selectedState]);

  useEffect(() => {
    const fetchEventData = async () => {
      setLoading(true);
      try {
        const data = await getEvents(initialState, initialCity);
        setEvents(data);
      } catch (error) {
        console.error('Failed to fetch events', error);
      } finally {
        setLoading(false);
      }
    };

    if (initialState && initialCity) {
      fetchEventData();
    } else {
      setLoading(false);
    }
  }, [initialState, initialCity]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (selectedState && selectedCity) {
      navigate(`/search?state=${encodeURIComponent(selectedState)}&city=${encodeURIComponent(selectedCity)}`);
    } else {
      alert("Please select both a state and a city.");
    }
  };

  return (
    <div className="events-container">
      {/* Search Header Banner matching Home overlapping style slightly modified for a horizontal bar */}
      <div className="search-banner">
         <div className="container">
            <div className="search-box-card search-banner-card">
              <form className="search-dropdowns-row" onSubmit={handleSearch}>
                <div className="search-input-group">
                  <Search className="input-icon" size={16} />
                  <select 
                    id="state" 
                    value={selectedState} 
                    onChange={(e) => setSelectedState(e.target.value)}
                    required
                  >
                    <option value="">State</option>
                    {states.map((state, index) => (
                      <option key={index} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                <div className="search-input-group">
                  <Search className="input-icon" size={16} />
                  <select 
                    id="city" 
                    value={selectedCity} 
                    onChange={(e) => setSelectedCity(e.target.value)}
                    disabled={!selectedState || loadingCities}
                    required
                  >
                    <option value="">{loadingCities ? 'Loading...' : 'City'}</option>
                    {cities.map((city, index) => (
                      <option key={index} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                <button type="submit" id="searchBtn" className="primary-btn search-submit-btn">
                  <Search size={18} /> Search
                </button>
              </form>
            </div>
         </div>
      </div>

      <div className="container main-content-wrapper">
         {loading ? (
             <Loader />
         ) : (
             <div className="search-layout">
                <div className="search-results-side">
                   <div className="events-header">
                       <h1>{events.length} events available in {initialCity}</h1>
                       <div className="events-header-subtitle">
                          <CheckCircle2 size={16} color="#64748b"/>
                          <p>Book tickets with minimum wait-time & verified event details</p>
                       </div>
                   </div>

                   {events.length > 0 ? (
                       <div className="events-list-vertical">
                           {events.map((event) => (
                               <EventCard key={event.id || event._id} event={event} layout="horizontal" />
                           ))}
                       </div>
                   ) : (
                       <div className="no-events">
                           <p>No events found for this location.</p>
                           <Link to="/" className="primary-btn">Go Back</Link>
                       </div>
                   )}
                </div>
                
                <div className="search-advertisement-side">
                    <div className="ad-card">
                       <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80" alt="Advertisement" className="ad-image" />
                    </div>
                </div>
             </div>
         )}
      </div>
    </div>
  );
};

export default Events;
