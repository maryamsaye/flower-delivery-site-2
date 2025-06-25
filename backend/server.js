const express = require('express'); 
const flowersRouter = require('./routes/flowers');
const userRouter = require('./routes/users');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
const cors = require('cors');

const app = express();

// CORS setup (secure and compatible with credentials)
const cors = require('cors');

const allowedOrigins = [
  'http://localhost:3000',
  'https://flower-delivery-site-2-1.onrender.com',  // ✅ frontend on Render
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow Postman etc.
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('CORS not allowed for this origin'));
    }
  },
  credentials: false, // Only true if you use cookies or session auth
}));

app.options('*', cors()); // handles preflight OPTIONS requests


// JSON parser
app.use(express.json());

// Simple request logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Serve static image files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/flowers', flowersRouter);
app.use('/api/users', userRouter);

// Optional: serve frontend in production
/*
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
  });
}
*/

// Start the server
const PORT = process.env.PORT || 4002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed due to app termination');
    process.exit(0);
  } catch (err) {
    console.error('Error during shutdown:', err);
    process.exit(1);
  }
});
