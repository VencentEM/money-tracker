import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Assuming you have styles for the Home page
function Home() {
    return (
        <main className="home-container">
            <section className="hero-section">
                <h1>Welcome to Money Tracker Pro</h1>
                <p>Your go-to solution for managing transactions effortlessly.</p>
                <Link to="/create-account">
                    <button className="cta-button">Get Started Now</button>
                </Link>
            </section>

            <section className="features-section">
                <h2>Why Choose Us?</h2>
                <ul className="features-list">
                    <li>✅ Easy and intuitive transaction tracking.</li>
                    <li>✅ Secure and reliable platform.</li>
                    <li>✅ Detailed insights and analytics.</li>
                </ul>
            </section>
        </main>
    );
}

export default Home;
