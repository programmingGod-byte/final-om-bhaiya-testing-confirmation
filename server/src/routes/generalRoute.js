// routes/research-papers.js
const express = require('express');
const router = express.Router();
const ResearchPaper = require('../models/ResearchPaperSchema');
const BlogPaper = require("../models/BlogSchema")
const moduleSchema = require("../models/ModuleSchema");
const { routes } = require('../../server');
// GET /api/admin/research-papers
// Returns all research papers in JSON


router.get("/all-modules",async (req,res)=>{
  try {
    const papers = await moduleSchema.find().sort({ submissionDate: -1 });
    // Optionally: .select('-__v') to remove the __v field
    
    res.status(200).json(papers);
  } catch (err) {
    console.error('Error fetching research papers:', err);
    res.status(500).json({ message: 'Server error while fetching papers' });
  }
})

router.get('/get-module/:id', async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'Document ID is required' });
  }

  try {
    const document = await moduleSchema.findById(id);
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }
    res.json(document);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});


router.get('/research-papers', async (req, res) => {
  try {
    const papers = await ResearchPaper.find().sort({ submissionDate: -1 });
    // Optionally: .select('-__v') to remove the __v field
    let sendingData =[] 
    console.log(papers)
    Array.from(papers).forEach((element)=>{
      let authorsStr = ''
      element.authors.map((a)=>{
        authorsStr+=a

      })
      authorsStr+=" "
      sendingData.push({
        id:element._id,
        title:element.title,
        abstract:element.description,
        authors:authorsStr,
        source:element.paperType[0],
        publishDate:element.submissionDate,
        category:element.whatItCovers[0],
        tags:element.whatItCovers,
        link:element.researchPaperLink,
        citations:12,
        image:element.imageUri,
        feature:false

      })
    })
    res.status(200).json(sendingData);
  } catch (err) {
    console.error('Error fetching research papers:', err);
    res.status(500).json({ message: 'Server error while fetching papers' });
  }
});


router.get('/blogs', async (req, res) => {
    try {
      const papers = await BlogPaper.find().sort({ submissionDate: -1 });
      let finalSend = []
      Array.from(papers).forEach((element)=>{
        finalSend.push({
          id:element._id,
          title:element.title,
          description:element.description,
          link:element.paperLink,
          image:element.imageUrl,
          source:element.spectrum[0],
          category:element.tags[0],
          pubDate:element.submissionDate
        })
      })
      // Optionally: .select('-__v') to remove the __v field
      res.status(200).json(finalSend);
    } catch (err) {
      console.error('Error fetching research papers:', err);
      res.status(500).json({ message: 'Server error while fetching papers' });
    }
  });
  
module.exports = router;
