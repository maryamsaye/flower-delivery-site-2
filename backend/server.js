const express = require('express');
const flowersRouter = require('./routes/flowers');
const userRouter = require('./routes/users');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4002;

// Enable CORS for all origins (you can restrict this if needed)
app.use(cors({
  origin: [
    'http://localhost:4002',
    'http://localhost:3000',
  ],
  credentials: true
}));

// Middleware to parse incoming JSON requests
app.use(express.json());

// Simple request logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Serve static files from uploads folder
// This allows accessing uploaded images via URLs like /uploads/filename.png
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes
app.use('/api/flowers', flowersRouter);
app.use('/api/users', userRouter);

// Serve React frontend build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Optional: Handle graceful shutdown
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed due to app termination');
    process.exit(0);
  });
});
