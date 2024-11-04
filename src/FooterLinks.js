import React from 'react';
import './FooterLinks.css';

function FooterLinks() {
  return (
    <div className="footer-links">
      <div className="link-item">
        <img src="./image/user.png" alt="TechConnect" />
        <p>About Us</p>
        <small>TechConnect by Aarti, Deep, Nikita, Vibhasha</small>
      </div>
      <div className="link-item">
        <img src="./image/phone.png" alt="Contact Us" />
        <p>Contact Us</p>
        <small>Contact Us +91 82379339936</small>
      </div>
      <div className="link-item">
        <img src="./image/add-friend.png" alt="Follow Us On" />
        <p>Follow Us</p>
        <a href='https://www.instagram.com/'>@TechConnect</a>
      </div>
    </div>
  );
}

{/* <a href="https://www.flaticon.com/free-icons/follow" title="follow icons">Follow icons created by Handicon - Flaticon</a>
    <a href="https://www.flaticon.com/free-icons/contact" title="contact icons">Contact icons created by Taufik - Flaticon</a>
    <a href="https://www.flaticon.com/free-icons/profile" title="profile icons">Profile icons created by Freepik - Flaticon</a>*/}
export default FooterLinks;
