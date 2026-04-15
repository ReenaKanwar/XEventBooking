import React from 'react';
import { Building2 } from 'lucide-react';
import './Footer.css'; /* will move css here */

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container footer-container">
          <div className="footer-brand">
              <div className="footer-logo">
                  <Building2 size={24}/> <span>EVENT</span>
              </div>
              <div className="social-links">
                  <a href="#" className="social-icon facebook">
                    <img src="https://img.icons8.com/ios-filled/50/ffffff/facebook-new.png" alt="FB" />
                  </a>
                  <a href="#" className="social-icon twitter">
                    <img src="https://img.icons8.com/ios-filled/50/ffffff/twitter.png" alt="TW" />
                  </a>
                  <a href="#" className="social-icon youtube">
                    <img src="https://img.icons8.com/ios-filled/50/ffffff/youtube-play.png" alt="YT" />
                  </a>
                  <a href="#" className="social-icon instagram">
                    <img src="https://img.icons8.com/ios-filled/50/ffffff/instagram-new.png" alt="IG" />
                  </a>
              </div>
          </div>
          <div className="footer-links-grid">
              <div className="footer-column">
                  <ul>
                      <li><a href="#">About Us</a></li>
                      <li><a href="#">Pricing</a></li>
                      <li><a href="#">Gallery</a></li>
                      <li><a href="#">Contact Us</a></li>
                      <li><a href="#">Privacy Policy</a></li>
                  </ul>
              </div>
              <div className="footer-column">
                  <ul>
                      <li><a href="#">Event Management</a></li>
                      <li><a href="#">Real-time Tracking</a></li>
                      <li><a href="#">Customizable Features</a></li>
                      <li><a href="#">Support</a></li>
                      <li><a href="#">Security</a></li>
                  </ul>
              </div>
              <div className="footer-column">
                  <ul>
                      <li><a href="#">About Us</a></li>
                      <li><a href="#">Pricing</a></li>
                      <li><a href="#">Gallery</a></li>
                      <li><a href="#">Contact Us</a></li>
                      <li><a href="#">Privacy Policy</a></li>
                  </ul>
              </div>
          </div>
      </div>
      <div className="footer-bottom container">
          <p>Copyright ©2025 EventTracker.com. All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
