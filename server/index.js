// server/index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors    = require('cors');

const authRoutes   = require('./routes/auth');
const verifyToken  = require('./middleware/verifyToken');

const app = express();
app.use(cors());
app.use(express.json());

// Unprotected
app.get('/', (req, res) => res.send('API running'));

// Auth routes
app.use('/api/auth', authRoutes);

// Example protected route
app.get('/api/protected', verifyToken, (req, res) => {
  res.json({ message: `Hello, ${req.user.email}` });
});

// Connect & start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch(err => console.error('DB connection error:', err));
