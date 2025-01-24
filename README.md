

# Money Tracker App

## Overview

The Money Tracker App is a robust application built with React for the frontend, Node.js and Express.js for the backend, and MongoDB as the database. The app allows users to track, manage, and analyze their finances, providing a seamless experience for personal or business financial tracking.

## Features

- User authentication and authorization.
- Record and update transactions.
- Categorize income and expenses.
- Generate detailed financial reports.
- Responsive design for a smooth user experience on all devices.

---

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14.x or higher)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/VencentEM/money-tracker.git
   cd money-tracker-app/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory and add the following:
   ```env
   PORT=5000
   MONGO_URI==mongodb://localhost:27017/
   JWT_SECRET=123
   ```
4. Start the backend server:
   ```bash
   npm start
   ```
   The backend server will run on `http://localhost:5000`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm start
   ```
   The frontend will run on `http://localhost:3000`.

---

## Usage Guidelines

### Running the Application

1. Ensure MongoDB is running and accessible via the connection string in your `.env` file.
2. Start the backend and frontend servers as described in the setup instructions.
3. Open your browser and navigate to `http://localhost:3000`.

### API Endpoints

The backend provides the following key API endpoints for managing users and transactions:

#### Authentication

- **Register User**: `POST /register`

  - Request Body: `{ username, email, password }`
  - Response: Confirmation of successful registration or an error message.

- **Login User**: `POST /login`

  - Request Body: `{ email, password }`
  - Response: JWT token and user details upon successful login.

#### Transactions

- **Create Transaction**: `POST /transaction`

  - Requires: Authentication (via JWT in `Authorization` header).
  - Request Body: `{ price, description, datetime }`
  - Response: Confirmation of transaction creation.

- **Get Transactions**: `GET /transaction`

  - Requires: Authentication.
  - Response: List of transactions for the authenticated user.

---

## Project Architecture

### Frontend

- Built with React.
- State management using Context API.
- Styled with CSS-in-JS or traditional CSS/SCSS modules.

### Backend

- Built with Node.js and Express.js.
- RESTful API structure.
- Middleware for authentication, validation, and error handling.

### Database

- MongoDB for data storage.
- Mongoose for schema modeling and interactions with MongoDB.

### Folder Structure

```
money-tracker-app/
|-- api/                         # Backend API logic
|   |-- routes/                  # API route definitions
|   |-- controllers/             # Route handlers and controllers
|   |-- models/                  # Database models
|   |-- middleware/              # Middleware (e.g., auth, validation)
|-- public/                      # Public static assets
|-- src/                         # Frontend source code
|   |-- components/              # Reusable UI components
|   |-- pages/                   # Page components
|   |-- context/                 # Context API for state management
|   |-- App.js                   # Main React app entry point
|   |-- index.js                 # React DOM rendering
|-- .env                         # Environment variables
|-- .gitignore                   # Git ignored files and directories
|-- README.md                    # Project documentation
|-- package-lock.json            # Dependency lock file for npm
|-- package.json                 # Project dependencies and scripts
|-- yarn.lock                    # Dependency lock file for Yarn
```

---
