import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import './App.css';
import Contact from './components/Contact';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import Home from './components/Home';
import MyTransactions from './components/MyTransactions'; // Import new component

function App() {
  return (
    <Router>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/contact">Contact Us</Link>
        <Link to="/login">Login</Link>
        <Link to="/create-account">Create Account</Link>
        <Link to="/my-transactions">My Transactions</Link> {/* New Link */}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/my-transactions" element={<MyTransactions />} /> {/* New Route */}
      </Routes>
    </Router>
  );
}

export default App;
