// routes/research-papers.js
const express = require('express');
const router = express.Router();
const ResearchPaper = require('../models/ResearchPaper');

// GET /api/admin/research-papers
// Returns all research papers in JSON
router.post('/research-papers', async (req, res) => {
  try {
    const papers = await ResearchPaper.find().sort({ submissionDate: -1 });
    // Optionally: .select('-__v') to remove the __v field
    res.status(200).json(papers);
  } catch (err) {
    console.error('Error fetching research papers:', err);
    res.status(500).json({ message: 'Server error while fetching papers' });
  }
});

module.exports = router;
