const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true,
  },
  codeSnippet: {
    type: String,
    trim: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tags: [{
    type: String,
    trim: true,
  }],
  codeSnippet: {
    type: String,
    trim: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  comments: [commentSchema],
  difficulty: {
    type: Number,
    min: 1,
    max: 5,
    default: 3,
  },
  views: {
    type: Number,
    default: 0,
  },
  isSolved: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

// Add text index for search functionality
questionSchema.index({ title: 'text', content: 'text', tags: 'text' });

// Virtual for comment count
questionSchema.virtual('commentCount').get(function() {
  return this.comments.length;
});

// Method to increment view count
questionSchema.methods.incrementViews = async function() {
  this.views += 1;
  await this.save();
};

const Question = mongoose.model('Question', questionSchema);

module.exports = Question; 