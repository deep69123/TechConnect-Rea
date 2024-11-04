import React, { useState } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword ,  GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc}  from "firebase/firestore";
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './LoginSignup.css';
import { getDoc } from "firebase/firestore";
import '@fortawesome/fontawesome-free/css/all.min.css';


const firebaseConfig = {
  apiKey: "AIzaSyB5HqR_YX0jWkNpO3v_VWLCf9JwMna__PQ",
  authDomain: "techconnect-e1e16.firebaseapp.com",
  projectId: "techconnect-e1e16",
  storageBucket: "techconnect-e1e16.appspot.com",
  messagingSenderId: "724188834907",
  appId: "1:724188834907:web:42ffe97c2e4aa68f44e37e",
  measurementId: "G-2EV14R5YFT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

const LoginSignup = () => {
  const [isActive, setIsActive] = useState(false);
  const [signupData, setSignupData] = useState({ fullName: '', email: '', password: '', role: 'customer' });
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const navigate = useNavigate(); // Initialize navigate for routing

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData(prev => ({ ...prev, [name]: value }));
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { fullName, email, password, role } = signupData;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: fullName,
        email: email,
        role: role
      });

      alert("Account created successfully!");
    } catch (error) {
      console.error("Error creating account:", error);
      alert("Error creating account: " + error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginData;

    try {
        // Sign in with email and password
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Retrieve user role from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userRole = userDoc.data().role;

        // Redirect based on role
        if (userRole === "retailer") {
            alert("Login successful! Redirecting to Admin Page...");
            navigate('/Retailer'); // Redirect to Admin page
        } else if(userRole === "customer") {
            alert("Login successful! Redirecting to Home Page...");
            navigate('/home'); // Redirect to Home page for other roles
        }
        else if(userRole === "admin") {
          alert("Login successful! Redirecting to Admin Page...");
          navigate('/admin');
        }
    }
     catch (error) {
        console.error("Error logging in:", error);
        alert("Login failed: " + error.message);
    }
};
  // Google sign-in function
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user exists in Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        // New user: add to Firestore
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          role: "customer"
        });
      }

      alert("Login successful!");
      navigate('/home'); // Redirect to home or relevant page
    } catch (error) {
      console.error("Error with Google sign-in:", error);
      alert("Google sign-in failed: " + error.message);
    }
  };

  return (
    <div className='body1'>
    <div className={`container ${isActive ? 'active' : ''}`} id="container">
      <div className="sign-up">
        <form id="signup-form" onSubmit={handleSignup}>
          <h1>Create Account</h1>
          <div className="icons">
  <a href="https://www.facebook.com" className="icon" target="_blank" rel="noopener noreferrer">
    <i className="fab fa-facebook"></i>
  </a>
  <a href="https://www.instagram.com" className="icon" target="_blank" rel="noopener noreferrer">
    <i className="fab fa-instagram"></i>
  </a>
  <a href="https://www.google.com" className="icon" target="_blank" rel="noopener noreferrer">
    <i className="fab fa-google"></i>
  </a>
  <a href="https://www.github.com" className="icon" target="_blank" rel="noopener noreferrer">
    <i className="fab fa-github"></i>
  </a>
  <a href="https://www.linkedin.com" className="icon" target="_blank" rel="noopener noreferrer">
    <i className="fab fa-linkedin"></i>
  </a>
</div>

          <input type="text" name="fullName" placeholder="Full Name" value={signupData.fullName} onChange={handleSignupChange} required />
          <input type="email" name="email" placeholder="Email" value={signupData.email} onChange={handleSignupChange} required />
          <input type="password" name="password" placeholder="Password" value={signupData.password} onChange={handleSignupChange} required />
          <select name="role" value={signupData.role} onChange={handleSignupChange}>
            <option value="customer">Customer</option>
            <option value="retailer">Retailer</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" id="signup-button">Sign Up</button>
        </form>
      </div>

      <div className="sign-in">
        <form id="login-form" onSubmit={handleLogin}>
          <h1>Sign In</h1>
          <div className="icons">
  <a href="https://www.facebook.com" className="icon" target="_blank" rel="noopener noreferrer">
    <i className="fab fa-facebook"></i>
  </a>
  <a href="https://www.instagram.com" className="icon" target="_blank" rel="noopener noreferrer">
    <i className="fab fa-instagram"></i>
  </a>
  <a href="https://www.google.com" className="icon" target="_blank" rel="noopener noreferrer">
    <i className="fab fa-google"></i>
  </a>
  <a href="https://www.github.com" className="icon" target="_blank" rel="noopener noreferrer">
    <i className="fab fa-github"></i>
  </a>
  <a href="https://www.linkedin.com" className="icon" target="_blank" rel="noopener noreferrer">
    <i className="fab fa-linkedin"></i>
  </a>
</div>

          <input type="email" name="email" placeholder="Email" value={loginData.email} onChange={handleLoginChange} required />
          <input type="password" name="password" placeholder="Password" value={loginData.password} onChange={handleLoginChange} required />
          <select name="role" value={signupData.role} onChange={handleSignupChange}>
            <option value="customer">Customer</option>
            <option value="retailer">Retailer</option>
            <option value="admin">Admin</option>
           
          </select>
          
          <button type="submit" id="login-button">Sign In</button>
          <button type="button" onClick={handleGoogleSignIn} className="google-sign-in">
            <i className="fab fa-google"></i> Sign in with Google</button>
            
        </form>
      </div>

      <div className="toogle-container">
        <div className="toogle">
          <div className="toogle-panel toogle-left">
            <div className="logo-container">
              <h1 id="techconnect1">TechConnect</h1>
              <img src="/images/logo-transparent-png.png" className="img1" alt="mobileimg" />
            </div>
            <h6 id="techconnect2">Mobiles at the best price</h6>
            <p id="dacc">If you already have an account</p>
            <button className="hidden" onClick={() => setIsActive(false)} id="login">Sign In</button>
          </div>
          <div className="toogle-panel toogle-right">
            <div className="logo-container">
              <h1 id="techconnect1">TechConnect</h1>
              <img src="/images/logo-transparent-png.png" className="img1" alt="mobileimg" />
            </div>
            <h6 id="techconnect2">Mobiles at the best price</h6>
            <p id="dacc">If you don't have an account</p>
            <button className="hidden" onClick={() => setIsActive(true)} id="register">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default LoginSignup;
