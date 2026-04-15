import React from 'react';
import { Check } from 'lucide-react';
import './AppDownload.css'; /* will move css here */

const AppDownload = () => {
  return (
      <section className="app-download-section">
         <div className="container app-download-container">
            <div className="app-mockup">
               <img src="https://images.unsplash.com/photo-1556656793-062ff9f1b262?w=500&q=80" alt="App Preview" className="phone-hand-img" />
            </div>
            <div className="app-content">
               <div className="app-content-header">
                  <h2>Download the <br/><span className="highlight-text">Event Tracker</span> App</h2>
               </div>
               <p className="app-input-label">Get the link to download the app</p>
               <div className="app-input-group">
                  <div className="phone-input-wrapper">
                    <span className="country-code">+91</span>
                    <input type="text" placeholder="Enter phone number" className="app-input" id="phoneInput" />
                  </div>
                  <button className="app-send-btn primary-btn" id="sendSmsBtn">Send SMS</button>
               </div>
               <div className="app-store-badges">
                  <a href="#" className="store-link">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="store-badge" />
                  </a>
                  <a href="#" className="store-link">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="store-badge" />
                  </a>
               </div>
            </div>
         </div>
      </section>
  );
};

export default AppDownload;
