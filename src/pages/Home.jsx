import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStates, getCities } from '../services/api';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Search, MapPin, Calendar, Building2, Ticket, Presentation, Mic2, CheckCircle2, ChevronRight, Check } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Home.css';

const Home = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [loadingStates, setLoadingStates] = useState(true);
  const [loadingCities, setLoadingCities] = useState(false);
  const [isStateOpen, setIsStateOpen] = useState(false);
  const [isCityOpen, setIsCityOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const data = await getStates();
        setStates(data);
      } catch (error) {
        console.error('Failed to load states');
      } finally {
        setLoadingStates(false);
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
      setSelectedCity('');
    }
  }, [selectedState]);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    console.log("Search triggered:", selectedState, selectedCity);
    if (selectedState && selectedCity) {
      const url = `/search?state=${encodeURIComponent(selectedState)}&city=${encodeURIComponent(selectedCity)}`;
      console.log("Navigating to:", url);
      navigate(url);
    } else {
      alert("Please select both a state and a city.");
    }
  };

  const featuredImages = [
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&q=80",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&q=80",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&q=80"
  ];

  return (
    <div className="home-container">
      {/* Top Banner & Navbar are handled in App layout or inside Home if we want, but let's assume Navbar is global. Wait, we need to update Navbar component separately. */}

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-content-wrapper">
          <div className="hero-text-content">
            <span className="hero-subtitle">Skip the hassle! Track Online</span>
            <h1 className="hero-title">
              Event <span className="text-primary">Tracker</span>
            </h1>
            <p className="hero-description">
              Connect instantly with your ideal event manager and track your events efficiently.
            </p>
            <button className="primary-btn hero-btn">Get Started</button>
          </div>
          <div className="hero-image-content">
            {/* Person Image placeholder */}
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80" 
              alt="Singer at event" 
              className="hero-person-img"
            />
          </div>
        </div>
      </section>

      {/* Floating Search Container */}
      <section className="search-floating-section">
        <div className="container">
          <div className="search-box-card">
            
            <form className="search-dropdowns-row" onSubmit={handleSearch}>
              <div className="search-input-group" style={{ position: 'relative' }}>
                <MapPin className="input-icon" size={20} />
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
                <MapPin className="input-icon" size={20} />
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

              <button 
                type="submit" 
                id="searchBtn" 
                className="primary-btn search-submit-btn"
                onClick={handleSearch}
              >
                <Search size={18} /> Search
              </button>
            </form>

            <div className="categories-section">
              <p className="categories-title">You may be looking for</p>
              <div className="categories-grid">
                <div className="category-box">
                  <Calendar size={28} className="category-icon" />
                  <span>Parties</span>
                </div>
                <div className="category-box">
                  <Building2 size={28} className="category-icon" />
                  <span>Venues</span>
                </div>
                <div className="category-box active">
                  <Ticket size={28} className="category-icon" />
                  <span>Tickets</span>
                </div>
                <div className="category-box">
                  <Presentation size={28} className="category-icon" />
                  <span>Workshops</span>
                </div>
                <div className="category-box">
                  <Mic2 size={28} className="category-icon" />
                  <span>Speakers</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Swiper Section */}
      <section className="featured-section container">
        <div className="featured-carousel-wrapper">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
          >
            {featuredImages.map((img, idx) => (
                <SwiperSlide key={idx}>
                   <div className="featured-tall-card">
                      <img src={img} alt="Featured event" />
                      <div className="featured-card-overlay">
                         <h4>FEBRUARY 16, 2024</h4>
                         <h3>KREATOR WITH SPECIAL GUEST</h3>
                         <p>Live In Concert • Full Tour Setup</p>
                      </div>
                   </div>
                </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>



      {/* Latest News Section */}
      <section className="news-section container">
         <div className="section-header-center">
            <span className="section-pretitle">Blog & News</span>
            <h2>Read Our Latest News</h2>
         </div>
         <div className="news-grid">
            {[1, 2, 3].map((item) => (
               <div key={item} className="news-card">
                  <img src={`https://images.unsplash.com/photo-1531058020387-3be344556be6?w=500&q=80`} alt="News" className="news-img" />
                  <div className="news-content">
                     <p className="news-date">MARCH 14, 2024</p>
                     <h4>5 Strategies to Help Host Your Event Like a Pro</h4>
                     <div className="news-author">
                        <img src="https://i.pravatar.cc/100?img=11" alt="Author" className="author-avatar" />
                        <span>John Doe</span>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </section>

      {/* Traditional vs Event Tracker Section */}
      <section className="comparison-section">
         <div className="container comparison-container">
            <div className="comparison-text">
               <span className="section-pretitle">TRADITIONAL WAYS VS EVENT TRACKER</span>
               <h2>Event <span className="text-primary">Tracker</span></h2>
               <p>
                 We provide a simple platform that allows you to easily track all your events effortlessly. Whether it's a small meeting or a large conference, our platform ensures everything stays organized on a unified UI. Track event statuses and attendees seamlessly.
               </p>
            </div>
            <div className="comparison-image">
               <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80" alt="Team" className="team-img" />
            </div>
         </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section container">
         <div className="faq-image-side">
            <img src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&q=80" alt="Concert crowd" className="faq-img" />
         </div>
         <div className="faq-text-side">
            <span className="section-pretitle">FAQ's & Support</span>
            <h2>Frequently Asked Questions</h2>
            <div className="faq-list">
               <div className="faq-item">
                  <p>Why choose our event tracking platform?</p>
                  <ChevronRight size={20} className="text-primary" />
               </div>
               <div className="faq-item">
                  <p>What makes us different from others?</p>
                  <ChevronRight size={20} className="text-primary" />
               </div>
               <div className="faq-item">
                  <p>How do we ensure safe security?</p>
                  <ChevronRight size={20} className="text-primary" />
               </div>
               <div className="faq-item">
                  <p>How can I get support for my events?</p>
                  <ChevronRight size={20} className="text-primary" />
               </div>
            </div>
         </div>
      </section>


    </div>
  );
};

export default Home;
