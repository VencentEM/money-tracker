import { useState, useEffect } from "react";
import './MyTransactions.css'; // CSS file for styles

// Component for displaying a single transaction
function Transaction({ price, description, datetime }) {
    const priceClass = price > 0 ? 'green' : 'red';
    const formattedDate = new Date(datetime).toLocaleString();

    return (
        <div className="transaction">
            <div className="left">
                <div className="description">{description}</div>
            </div>
            <div className="right">
                <div className={`price ${priceClass}`}>
                    {price > 0 ? `+$${price}` : `-$${Math.abs(price)}`}
                </div>
                <div className="datetime">{formattedDate}</div>
            </div>
        </div>
    );
}

function MyTransactions() {
    const [price, setPrice] = useState('');
    const [datetime, setDatetime] = useState('');
    const [description, setDescription] = useState('');
    const [transactions, setTransactions] = useState([]); // State to manage the list of transactions

    // Fetch transactions from the server when the component mounts
    useEffect(() => {
        const url = process.env.REACT_APP_API_URL
            ? `${process.env.REACT_APP_API_URL}/transaction`
            : 'http://localhost:5000/api/transaction'; // Backend endpoint

        const token = localStorage.getItem('authToken'); // Get token from localStorage

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Pass the token
            },
        })
            .then((response) => response.json())
            .then((data) => setTransactions(data)) // Set transactions in state
            .catch((error) => {
                console.error('Error fetching transactions:', error);
                alert('An error occurred while fetching transactions.');
            });
    }, []);

    function addNewTransaction(ev) {
        ev.preventDefault();

        if (!price || !description || !datetime) {
            alert('All fields are required.');
            return;
        }

        const url = process.env.REACT_APP_API_URL
            ? `${process.env.REACT_APP_API_URL}/transaction`
            : 'http://localhost:5000/api/transaction'; // Backend endpoint

        const token = localStorage.getItem('authToken'); // Get token from localStorage
        console.log("token", token)

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Pass the token
            },
            body: JSON.stringify({ price: Number(price), description, datetime }), // Ensure price is a number
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to create transaction.');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Transaction created:', data);
                alert('Transaction created successfully!');
                setTransactions(prev => [data.transaction, ...prev]); // Add the new transaction at the top
                setPrice(''); // Clear input fields after successful submission
                setDatetime('');
                setDescription('');
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            });
    }

    return (
        <main>
            <h1>$200<span>.00</span></h1>
            <form onSubmit={addNewTransaction}>
                <div className="basic">
                    <input
                        type="number" // Change to 'number' type for price
                        value={price}
                        onChange={(ev) => setPrice(ev.target.value)}
                        placeholder="+200 new phone"
                        aria-label="Transaction Price"
                    />
                    <input
                        type="datetime-local"
                        value={datetime}
                        onChange={(ev) => setDatetime(ev.target.value)}
                        aria-label="Transaction Date and Time"
                    />
                </div>
                <div className="description">
                    <input
                        type="text"
                        value={description}
                        onChange={(ev) => setDescription(ev.target.value)}
                        placeholder="Description"
                        aria-label="Transaction Description"
                    />
                </div>
                <button type="submit">Add new transaction</button>
            </form>
            <div className="transactions">
                {transactions.map((transaction, index) => (
                    <Transaction
                        key={transaction._id || index} // Use transaction._id if available
                        price={transaction.price}
                        description={transaction.description}
                        datetime={transaction.datetime}
                    />
                ))}
            </div>
        </main>
    );
}

export default MyTransactions;