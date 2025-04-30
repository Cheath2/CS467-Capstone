// Importing required packages 
const express = require('express');    // Web framework for building APIs
const mongoose = require('mongoose');  // Object Data Modeling (ODM) library for MongoDB
const cors = require('cors');          // Middleware for enabling CORS (Cross-Origin Resource Sharing)
require('dotenv').config();            // Load environment variables from .env file

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const contactRoutes = require('./routes/contactRoutes');
app.use('/api/contacts', contactRoutes);

// Test endpoint to check if the server is running
app.get('/', (req, res) => {
  res.send('📇 Contacts API is running');
});

// MongoDB Connection using credentials in .env file 
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected for Contacts API'); // Success message
  const PORT = process.env.PORT || 4001;
  app.listen(PORT, () => {
    console.log(`Contacts Server running on http://localhost:${PORT}`);
  });
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});
