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
  const [isStateOpen, setIsStateOpen] = useState(false);
  const [isCityOpen, setIsCityOpen] = useState(false);

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
                <div className="search-input-group" style={{ position: 'relative' }}>
                  <Search className="input-icon" size={16} />
                  <div 
                    id="state" 
                    className="custom-select"
                    onClick={() => setIsStateOpen(!isStateOpen)}
                    style={{ width: '100%', padding: '10px 10px 10px 35px', cursor: 'pointer', border: '1px solid #e2e8f0', borderRadius: '8px', minHeight: '42px', display: 'flex', alignItems: 'center', background: 'white' }}
                  >
                    {selectedState || 'State'}
                  </div>
                  {isStateOpen && (
                    <ul className="custom-options" style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', zIndex: 10, maxHeight: '200px', overflowY: 'auto', listStyle: 'none', padding: 0, margin: '4px 0 0 0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
                      <li onClick={() => { setSelectedState(''); setIsStateOpen(false); }} style={{ padding: '8px 15px', cursor: 'pointer', borderBottom: '1px solid #f1f5f9' }}>State</li>
                      {states.map((state, index) => (
                        <li key={index} onClick={() => { setSelectedState(state); setIsStateOpen(false); }} style={{ padding: '8px 15px', cursor: 'pointer', borderBottom: '1px solid #f1f5f9' }}>{state}</li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="search-input-group" style={{ position: 'relative' }}>
                  <Search className="input-icon" size={16} />
                  <div 
                    id="city" 
                    className={`custom-select ${!selectedState ? 'disabled' : ''}`}
                    onClick={() => (!selectedState) ? null : setIsCityOpen(!isCityOpen)}
                    style={{ width: '100%', padding: '10px 10px 10px 35px', cursor: (!selectedState) ? 'not-allowed' : 'pointer', border: '1px solid #e2e8f0', borderRadius: '8px', minHeight: '42px', display: 'flex', alignItems: 'center', background: (!selectedState) ? '#f8fafc' : 'white', color: (!selectedState) ? '#94a3b8' : 'inherit' }}
                  >
                    {loadingCities ? 'Loading...' : (selectedCity || 'City')}
                  </div>
                  {isCityOpen && (
                    <ul className="custom-options" style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', zIndex: 10, maxHeight: '200px', overflowY: 'auto', listStyle: 'none', padding: 0, margin: '4px 0 0 0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
                      <li onClick={() => { setSelectedCity(''); setIsCityOpen(false); }} style={{ padding: '8px 15px', cursor: 'pointer', borderBottom: '1px solid #f1f5f9' }}>City</li>
                      {cities.map((city, index) => (
                        <li key={index} onClick={() => { setSelectedCity(city); setIsCityOpen(false); }} style={{ padding: '8px 15px', cursor: 'pointer', borderBottom: '1px solid #f1f5f9' }}>{city}</li>
                      ))}
                    </ul>
                  )}
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
