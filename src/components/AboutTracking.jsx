import React from 'react';
import { Building2, CheckCircle2 } from 'lucide-react';
import './AboutTracking.css'; /* Will move CSS here */

const AboutTracking = () => {
  return (
    <section className="about-tracking-section">
      <div className="container about-tracking-container">
        <div className="about-logo-side">
          <div className="large-logo-display">
            <Building2 size={60} color="#555" /> 
            <span style={{fontSize: '3rem', fontWeight: 300, letterSpacing: '4px'}}>EVENT</span>
          </div>
        </div>
        <div className="about-text-side">
          <span className="section-pretitle">CONNECTING PEOPLE THROUGH EVENTS</span>
          <h2>Event <span className="text-primary">Tracking</span></h2>
          <p className="about-desc">
            We guide you to discover your amazing local events and connect your accounts seamlessly. Managing your events with our tracking forms reduces manual hours and keeps everything organized and in one place.
          </p>
          <ul className="about-features-list">
            <li><CheckCircle2 color="#2563eb" size={20} /> Find the Best Event Venues</li>
            <li><CheckCircle2 color="#2563eb" size={20} /> Book event tickets online</li>
            <li><CheckCircle2 color="#2563eb" size={20} /> Manage Your Bookings</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutTracking;
