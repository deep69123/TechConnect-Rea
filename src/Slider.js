import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Slider.css';

const sliderItems = [
  { id: 1, image: './images/slider1.jpg', title: 'Apple 15 Pro Max', subtitle: 'Only at ₹1,03,999', button: 'Shop Now' },
  { id: 2, image: './images/slider2.jpg', title: 'Apple 12 Pro', subtitle: 'Only at ₹59,900', button: 'Shop Now' },
  { id: 3, image: './images/slider3.jpg', title: 'OnePlus 9RT', subtitle: 'Only at ₹39,5999', button: 'Shop Now' }
];

function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderItems.length);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const handleButtonClick = () => {
    navigate('/home'); // Navigate to /home when Shop Now is clicked
  };

  return (
    <div className="slider">
      {sliderItems.map((item, index) => (
        <div
          key={item.id}
          className={`slide ${index === currentIndex ? 'active' : ''}`}
          style={{ backgroundImage: `url(${item.image})` }}
        >
          <div className="text-content">
            <h2>{item.title}</h2>
            <p>{item.subtitle}</p>
            <button className="cta-button" onClick={handleButtonClick}>{item.button}</button>
          </div>
        </div>
      ))}
      <div className="navigation-arrows">
        <span onClick={() => setCurrentIndex((currentIndex - 1 + sliderItems.length) % sliderItems.length)}>&#10094;</span>
        <span onClick={() => setCurrentIndex((currentIndex + 1) % sliderItems.length)}>&#10095;</span>
      </div>
    </div>
  );
}

export default Slider;
