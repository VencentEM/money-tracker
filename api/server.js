import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import TransactionModel from './models/Transaction.js';
import UserModel from './models/User.js';

import bcrypt from 'bcrypt';

import cors from 'cors';
import jwt from 'jsonwebtoken';
import authMiddleware from './middleware/auth.js'; // Middleware to verify the user

// Allow requests from your frontend's origin
const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your frontend URL
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allow the 'Authorization' header

};

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors(corsOptions));


// Middleware to parse JSON
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Test Route
app.get('/', (req, res) => {
  res.send('Node.js and Mongoose Project is Running!');
});

// Route to Create a Transaction
// app.post('/transaction', async (req, res) => {
//   try {
//     const { name, price, description, datetime } = req.body;
//     const newTransaction = await TransactionModel.create({  price, description, datetime });
//     res.status(201).json(newTransaction);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: error.message });
//   }
// });

app.post('/transaction', authMiddleware, async (req, res) => {
  try {
    const { price, description, datetime } = req.body;

    // Ensure the logged-in user is available in the middleware
    const userId = req.user.id;

    // Validate request data
    if (!price || !description || !datetime) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Create and save the transaction
    const transaction = new TransactionModel({
      user: userId,
      price,
      description,
      datetime,
    });

    await transaction.save();

    return res.status(201).json({
      message: 'Transaction created successfully!',
      transaction,
    });
  } catch (error) {
    console.error('Error creating transaction:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
});




// Registration API
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ message: 'Email already registered.' });
      }

      const newUser = new UserModel({ username, email, password });
      await newUser.save();

      res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});


// Login API
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
      const user = await UserModel.findOne({ email });
      if (!user) {
          return res.status(400).json({ message: 'Invalid email or password.' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
          return res.status(400).json({ message: 'Invalid email or password.' });
      }

      const token = jwt.sign(
          { userId: user._id, username: user.username },
          process.env.JWT_SECRET || 'secretkey',
          { expiresIn: '1h' }
      );

      res.status(200).json({
          message: 'Login successful.',
          token,
          user: { id: user._id, username: user.username, email: user.email },
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});


// Route to Fetch All Transactions
// app.get('/transaction', async (req, res) => {
//   try {
//     const transactions = await TransactionModel.find();
//     res.status(200).json(transactions);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

app.get('/transaction', authMiddleware, async (req, res) => {
  try {
    // The user ID is extracted from the decoded JWT token (attached to req.user by the authMiddleware)
    const userId = req.user.id;

    // Find transactions for the authenticated user
    const transactions = await TransactionModel.find({ user: userId });

    // Check if transactions exist
    if (!transactions) {
      return res.status(404).json({ message: 'No transactions found for this user.' });
    }

    // Send the transactions as a response
    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});


// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
