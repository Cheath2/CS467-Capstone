// ── Load environment variables from server/.env ───────────────────────────────
require('dotenv').config();
const uploadRoutes = require('./routes/upload');
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
  origin: 'http://localhost:5173',
  credentials: true
}));


app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(cookieParser());

const path = require('path'); // ← Add to your top-level imports if not already present
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/upload', uploadRoutes);               // Handle image upload requests

// ── PUBLIC ROUTES ─────────────────────────────────────────────────────────────
app.get('/', (req, res) => res.send('✅ Job Tracker API is up and running'));
app.use('/api/auth', authRoutes);

// ── PROTECTED ROUTES ──────────────────────────────────────────────────────────
app.use('/api/skills', verifyToken, skillRoutes);
app.use('/api/user',   verifyToken, userRoutes);
app.use('/api/jobs',   verifyToken, jobRoutes);
app.use('/api/contacts', verifyToken, contactRoutes);

app.get('/api/protected', verifyToken, (req, res) => {
  res.json({ message: `Hello user ${req.userId}, you have access!` });
});

// ── DATABASE CONNECTION & SERVER STARTUP ───────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: 'test'
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
