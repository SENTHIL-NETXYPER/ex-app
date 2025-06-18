const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const leaveRoutes = require('./routes/leave');
const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route for health check
app.get('/', (req, res) => {
  res.send('API is running');
});

// API routes
app.use('/api/leave', leaveRoutes);
app.use('/api/auth', authRoutes);

// MongoDB connection (no deprecated options)
mongoose.connect('mongodb://localhost:27017/attendance')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});