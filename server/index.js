// server/index.js

// ── Load environment variables from server/.env ───────────────────────────────
require('dotenv').config();

const express    = require('express');   // Express framework
const mongoose   = require('mongoose');  // MongoDB ODM
const cors       = require('cors');      // Enable CORS
const cookieParser = require('cookie-parser'); // ← Import for parsing cookies

// ── Import route modules (CommonJS) ───────────────────────────────────────────
const authRoutes  = require('./routes/auth');
const skillRoutes = require('./routes/skillRoutes');
const userRoutes  = require('./routes/user');
const jobRoutes   = require('./routes/jobRoutes');
const contactRoutes = require('./routes/contactRoutes');


// ── JWT auth middleware ───────────────────────────────────────────────────────
const verifyToken = require('./middleware/verifyToken');

const app = express();

// ── GLOBAL MIDDLEWARE ─────────────────────────────────────────────────────────
app.use(cors({
  origin: 'http://localhost:5173',    // ← your client URL
  credentials: true                   // ← allow cookies to be sent
}));
app.use(express.json());               // parse JSON bodies
app.use(cookieParser());               // ← parse cookies on incoming requests

// ── PUBLIC ROUTES ─────────────────────────────────────────────────────────────
// Health‑check endpoint
app.get('/', (req, res) => res.send('✅ Job Tracker API is up and running'));

// Auth routes (register & login)—no token required
app.use('/api/auth', authRoutes);

// ── PROTECTED ROUTES ──────────────────────────────────────────────────────────
// Skill and user routes require a valid JWT
app.use('/api/skills', verifyToken, skillRoutes);
app.use('/api/user',   verifyToken, userRoutes);

// Job routes for CRUD operations—also protected
app.use('/api/jobs', verifyToken, jobRoutes);

//Contact Routes for CRUD operations also protected
app.use('/api/contacts', verifyToken, contactRoutes);

// Example inline protected endpoint
app.get('/api/protected', verifyToken, (req, res) => {
  res.json({ message: `Hello user ${req.userId}, you have access!` });
});

// ── DATABASE CONNECTION & SERVER STARTUP ───────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: 'test'     // explicitly use the 'test' database
  })
  .then(() => {
    const PORT = process.env.PORT || 5009;
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });
