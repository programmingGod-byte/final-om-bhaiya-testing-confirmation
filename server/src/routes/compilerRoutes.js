const express = require('express');
const {
  compileCode,
  validateCode,
  runSimulation,
  analyzeErrors
} = require('../controllers/compilerController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Compiler routes
router.post('/compile', protect, compileCode);
router.post('/validate', protect, validateCode);
router.post('/simulate', protect, runSimulation);
router.post('/analyze-errors', protect, analyzeErrors);

module.exports = router; 