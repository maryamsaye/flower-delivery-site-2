const express = require('express');
const flowersRouter = require('./routes/flowers');
const userRouter = require('./routes/users');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4002;

// ✅ Enable CORS
app.use(cors());

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ Log requests
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});


const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// ✅ Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ API routes
app.use('/api/flowers', flowersRouter);
app.use('/api/users', userRouter);

// ✅ Serve frontend build
// app.use(express.static(path.join(__dirname, '../frontend/build')));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// ✅ Catch-all route to serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
