// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const verifyToken = require('./middleware/verifyToken');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.get('/', (req, res) => res.send('API running'));
app.get('/api/protected', verifyToken, (req, res) => {
  res.json({ message: `Hello, user ${req.user.userId}` });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch(err => console.error('DB connection error:', err));
