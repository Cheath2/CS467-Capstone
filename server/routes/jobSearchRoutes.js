const express = require('express');
const { fetchJobsFromAI } = require('../controllers/jobSearchController');
const router = express.Router();

router.post('/job-search', fetchJobsFromAI);

module.exports = router;