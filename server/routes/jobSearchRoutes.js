const express = require('express');
const { fetchJobsFromAI } = require('../controllers/jobSearchController');

//debug
 console.log('🔍 Received AI job search request with body:', req.body);

const router = express.Router();

router.post('/job-search', fetchJobsFromAI);

module.exports = router;