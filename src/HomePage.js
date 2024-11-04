import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Slider from './Slider';
import './HomesPage.css';
import FooterLinks from './FooterLinks';

function HomePage() {
  const navigate = useNavigate();

  const handleShopNowClick = () => {
    navigate('/home'); // Navigate to /home when Shop Now is clicked
  };

  return (
    <div className="home-page">
      <Navbar />
      <Slider />
      <div className="content">
        <h1>Welcome to TechConnect</h1>
        <button className="shop-now-btn" onClick={handleShopNowClick}>Shop Now</button>
      </div>
      <FooterLinks />
    </div>
  );
}

export default HomePage;
