// server/index.js

// ── Load environment variables from server/.env ───────────────────────────────
require('dotenv').config();

const express    = require('express');   // Express framework
const mongoose   = require('mongoose');  // MongoDB ODM
const cors       = require('cors');      // Enable CORS

// ── Import route modules (CommonJS) ───────────────────────────────────────────
const authRoutes  = require('./routes/auth');
const skillRoutes = require('./routes/skills');
const userRoutes  = require('./routes/user');

// ── JWT auth middleware ───────────────────────────────────────────────────────
const verifyToken = require('./middleware/verifyToken');

const app = express();

// ── GLOBAL MIDDLEWARE ─────────────────────────────────────────────────────────
// Allow React (or any origin) to talk to this API—adjust origin in production
app.use(cors());

// Parse incoming JSON requests into req.body
app.use(express.json());


// ── PUBLIC ROUTES ─────────────────────────────────────────────────────────────
// Health‑check endpoint
app.get('/', (req, res) => res.send('✅ Job Tracker API is up and running'));

// Auth routes (register & login)—no token required
app.use('/api/auth', authRoutes);


// ── PROTECTED ROUTES ──────────────────────────────────────────────────────────
// All routes under /api/skills and /api/user require a valid JWT
app.use('/api/skills', verifyToken, skillRoutes);
app.use('/api/user',   verifyToken, userRoutes);

// Example inline protected endpoint
app.get('/api/protected', verifyToken, (req, res) => {
  res.json({ message: `Hello user ${req.userId}, you have access!` });
});


// ── DATABASE CONNECTION & SERVER STARTUP ───────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser:    true,
    useUnifiedTopology: true,
    dbName:             'test'     // ← explicitly use the 'test' database
  })
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });
