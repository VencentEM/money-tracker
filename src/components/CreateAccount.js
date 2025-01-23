import { useState } from "react";

function CreateAccount() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  function handleRegister(ev) {
    ev.preventDefault();

    // Basic validation
    if (!username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setMessage('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    const url = process.env.REACT_APP_API_URL
      ? ${ process.env.REACT_APP_API_URL }/register
      : 'http://localhost:5000/api/register'; // Replace with your backend endpoint

    // Call the API
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Registration failed.');
        }
        return response.json();
      })
      .then((data) => {
        setMessage('Account created successfully!');
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      })
      .catch((error) => {
        console.error('Error:', error);
        setMessage('An error occurred. Please try again.');
      });
  }

  return (
    <main>
      <h1>Create Account</h1>
      <form onSubmit={handleRegister}>
        {message && <p>{message}</p>}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
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
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
        />
        <button type="submit">Create Account</button>
      </form>
    </main>
  );
}

export default CreateAccount;