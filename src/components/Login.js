Login.js

import { useState } from "react";

function Login({ setIsLoggedIn }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    function handleLogin(ev) {
        ev.preventDefault();

        const url = process.env.REACT_APP_API_URL
            ? ${ process.env.REACT_APP_API_URL }/login
      : 'http://localhost:5000/api/login'; // Replace with your backend endpoint

        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Login failed.');
                }
                return response.json();
            })
            .then((data) => {
                localStorage.setItem("authToken", data.token); // Save the token
                setIsLoggedIn(true); // Update the login state
                setMessage('Login successful!');
            })
            .catch((error) => {
                console.error('Error:', error);
                setMessage('Invalid credentials. Please try again.');
            });
    }

    return (
        <main>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                {message && <p>{message}</p>}
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
            </form>
        </main>
    );
}

export default Login;