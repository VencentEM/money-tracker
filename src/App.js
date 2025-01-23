
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import './App.css';
import Contact from './components/Contact';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import Home from './components/Home';
import MyTransactions from './components/MyTransactions';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is already logged in (session persistence)
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token); // Convert token presence to boolean
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/contact">Contact Us</Link>
        {!isLoggedIn && <Link to="/login">Login</Link>}
        {!isLoggedIn && <Link to="/create-account">Create Account</Link>}
        {isLoggedIn && <Link to="/my-transactions">My Transactions</Link>}
        {isLoggedIn && <button onClick={handleLogout} className="logout-button">Logout</button>}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        {!isLoggedIn && <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />}
        {!isLoggedIn && <Route path="/create-account" element={<CreateAccount />} />}
        {isLoggedIn && <Route path="/my-transactions" element={<MyTransactions />} />}
        {/* Redirect users who try to access restricted routes */}
        <Route path="*" element={<Navigate to={isLoggedIn ? "/my-transactions" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;