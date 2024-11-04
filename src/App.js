import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSignup from './LoginSignup';
import Home from './home'; // Ensure proper casing for component imports
import Admin from './admin';
import Retailer from './Retailer';
import Comparison from './Comparison'; // Import Comparison component
import { auth } from './firebase';
import HomePage from './HomePage';

const App = () => {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUserId(user.uid);
            } else {
                setUserId(null);
            }
        });

        return unsubscribe;
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginSignup />} />
                <Route path="/home" element={<Home />} />
                <Route path="/Retailer" element={<Retailer />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/comparison/:productName" element={<Comparison />} />
                <Route path="/HomePage" element={<HomePage />} /> 
            </Routes>
        </Router>
    );
};

export default App;
