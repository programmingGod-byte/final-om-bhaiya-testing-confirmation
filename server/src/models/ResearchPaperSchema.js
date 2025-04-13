const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for the paper submission
const paperSchema = new Schema({
  imageUri: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  authors: {
    type: [String], // Array of authors
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  researchPaperLink:{
    type:String,
    required:true
  },
  paperType: {
    type: String,
    enum: ['IEEE', 'ACM', 'SPRINGER', 'arXiv', 'Elsevier'], // Valid paper types
    required: true,
  },
  whatItCovers: {
    type: [String], // Array of "What it covers" fields
    required: true,
  },
  source: {
    type: String,
    enum: ['IEEE', 'ACM', 'SPRINGER', 'arXiv', 'Elsevier'], // Valid sources
    required: true,
  },
  submissionDate: {
    type: Date,
    default: Date.now, // Automatically sets the submission date
  },
  // Optional: You can also store the month and year separately if you want them explicitly
  submissionMonth: {
    type: String,
    default: () => new Date().toLocaleString('default', { month: 'long' }), // e.g., "January"
  },
  submissionYear: {
    type: Number,
    default: () => new Date().getFullYear(), // Current year
  },
});

// Create and export the model based on the schema
const ResearchPaper = mongoose.model('ResearchPaper', paperSchema);
module.exports = ResearchPaper;
