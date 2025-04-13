const express = require('express');
const router = express.Router();
const Paper = require('../models/ResearchPaperSchema');
const Blog  = require("../models/BlogSchema")
const uploadedFileSchema = require("../models/ImageSchema")
const multer = require("multer")
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const path = require('path');
const crypto = require('crypto');








const upload = multer(); // Memory storage

const s3 = new S3Client({
  region: 'ap-south-1',
  credentials: {
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
  },
});

const bucketName = 'om-bhaiya-testing';

function generateFileName(originalName) {
  const ext = path.extname(originalName);
  const randomName = crypto.randomBytes(32).toString('hex');
  return `${randomName}${ext}`;
}

router.post('/upload-file', upload.single('file'), async (req, res) => {
  const file = req.file;
  const fileName = generateFileName(file.originalname);

  try {
    const putCommand = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await s3.send(putCommand);

    // Construct public URL
    const publicUrl = `https://${bucketName}.s3.ap-south-1.amazonaws.com/${fileName}`;
    let imageUpload = new uploadedFileSchema({
      signedUrl:publicUrl
    })
    await imageUpload.save()
    res.json({ url: publicUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload failed' });
  }
});






































router.post('/research-paper-upload', async (req, res) => {
  try {
    const {
      imageUri,
      title,
      authors,
      description,
      paperType,
      whatItCovers,
      source,
      researchPaperLink
      
    } = req.body;
    console.log(req.body)

    // Validate required fields
    if (!imageUri || !title || !authors || !description || !paperType || !whatItCovers || !source) {
      return res.status(400).json({ success: false, message: 'Please fill all required fields' });
    }

    // Create paper
    const paper = new Paper({
      imageUri,
      title,
      authors,
      description,
      paperType,
      whatItCovers,
      source,
      researchPaperLink
    
    });

    await paper.save();

    return res.status(201).json({ success: true, message: 'Research paper submitted successfully', paper });
  } catch (error) {
    console.log(error)
    console.error('Error uploading paper:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});


router.post('/blog-upload',async (req, res) => {
    try {
      const { imageUrl, title, description, tags, spectrum, paperLink } = req.body;
  
      // Create a new blog document
      const newBlog = new Blog({
        imageUrl,
        title,
        description,
        tags,
        spectrum,
        paperLink,
      });
  
      // Save the blog to the database
      await newBlog.save();
  
      res.status(200).json({ message: 'Blog created successfully', blog: newBlog });
    } catch (err) {
        console.log(err)
      res.status(500).json({ message: 'Error creating blog', error: err.message });
    }
  }
)

module.exports = router;
