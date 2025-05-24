const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// ✅ Resolve absolute path to server/uploads
const uploadDir = path.join(__dirname, '..', 'uploads');

// ✅ Ensure the directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// ✅ Configure destination and filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // absolute path to server/uploads
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

// ✅ Apply a 10MB file size limit and file filter
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (['.jpg', '.jpeg', '.png'].includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPG, JPEG, and PNG are allowed'));
    }
  }
});

// ✅ POST /api/upload
router.post('/', upload.single('profileImage'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // this path must match the one used in express.static in index.js
  const imageUrl = `/uploads/${req.file.filename}`;
  res.status(200).json({ imageUrl });
});

module.exports = router;
