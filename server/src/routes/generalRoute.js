// routes/research-papers.js
const express = require('express');
const router = express.Router();
const ResearchPaper = require('../models/ResearchPaperSchema');
const BlogPaper = require("../models/BlogSchema")
const moduleSchema = require("../models/ModuleSchema");
const User = require("../models/User")
const { routes } = require('../../server');
// GET /api/admin/research-papers
const Chapter = require("../models/Chapters");
const PostQuestion = require("../models/PostQuestion");
const CourseContentModel = require('../models/Chapters');
// Returns all research papers in JSON


router.get("/all-question",async(req,res)=>{
  try {
    const questions = await PostQuestion.find().sort({ createdAt: -1 }); // Fetch all users
    res.json(questions); // Send as JSON response
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
})



router.post("/post-reply",async(req,res)=>{
  let {content,questionID,author} = req.body;
  console.log(req.body)
  // console.log(data)
  try {
    // let question = new PostQuestion(data)
    // await question.save();
    const reply = {
      author:author.toString(),
      content:content.toString(),
    }
    const updatedUser = await PostQuestion.findByIdAndUpdate(
      questionID,
      { $push: { replies: reply } }, // push to hobbies array
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.status(200).json(updatedUser);
    
    // res.status(200).json({"message":"question posted succesfully"})
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  } 
})


router.post("/upload-question",async(req,res)=>{
  let data = req.body;
  console.log(data)
  try {
    let question = new PostQuestion(data)
    await question.save();
    res.status(200).json({"message":"question posted succesfully"})
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error fetching user', error: err.message });
  } 
})

// GET route to fetch user by ID
router.get('/chapter/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Chapter.findById(id); // Search in schema by ID

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user); // Return found document
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err.message });
  }
});

router.post('/update-chapter',async(req,res)=>{
  console.log("############## chapter updated ###########")
  console.log(req.body)
  try {
    const updatedCourse = await Chapter.findByIdAndUpdate(
      req.body._id,
      {
        $set: {
          codeExamples: req.body.codeExamples,
          sections: req.body.sections,
          title:req.body.title,
          description:req.body.description
        },
      },
      { new: true } // returns the updated document
    );

    console.log('Updated course:', updatedCourse);
    res.status(200).json({
      message:"updated succesfully"
    })
  } catch (err) {
    res.status(401).json({
      error:err,
      message:err
    })
    console.error('Error updating course:', err);
  }
  
})

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
        source:element.source,
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
  


  router.post('/user-by-email', async (req, res) => {
    const { email } = req.body;
  
    if (!email) {
      return res.status(400).json({ error: 'Email is required in request body' });
    }
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json(user);
    } catch (err) {
      console.error('Error fetching user:', err);
      res.status(500).json({ error: 'Server error' });
    }
  });



  router.put('/updatechapter/:id', async (req, res) => {
  const { id } = req.params;
  const { editorContent, isNewEditorUsed } = req.body;
    console.log("update chaptr")
    console.log(editorContent)
  try {
    const updatedChapter = await CourseContentModel.findByIdAndUpdate(
      id,
      {
        editorContent,
        isNewEditorUsed,
      },
      { new: true } // returns the updated document
    );

    if (!updatedChapter) {
      return res.status(404).json({ message: 'Chapter not found' });
    }

    res.status(200).json({ message: 'Chapter updated successfully', chapter: updatedChapter });
  } catch (error) {
    console.error('Error updating chapter:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

  
module.exports = router;
