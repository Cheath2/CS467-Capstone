// routes/jobRoutes.js
const express = require('express');
const router = express.Router();
const {
  createJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob
} = require('../controllers/jobController');
const verifyToken = require('../middleware/verifyToken');

// Protect all routes below
router.use(verifyToken);

router.route('/')
  .post(createJob)
  .get(getJobs);

router.route('/:id')
  .get(getJob)
  .put(updateJob)
  .delete(deleteJob);

module.exports = router;