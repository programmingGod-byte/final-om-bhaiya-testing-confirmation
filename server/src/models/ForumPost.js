const mongoose = require('mongoose');

const ForumPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  content: {
    type: String,
    required: [true, 'Please add content']
  },
  module: {
    type: mongoose.Schema.ObjectId,
    ref: 'Module'
  },
  exercise: {
    type: mongoose.Schema.ObjectId,
    ref: 'Exercise'
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  tags: [String],
  upvotes: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }],
  downvotes: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }],
  codeSnippet: {
    type: String,
    default: ''
  },
  isResolved: {
    type: Boolean,
    default: false
  },
  acceptedAnswer: {
    type: mongoose.Schema.ObjectId,
    ref: 'ForumComment'
  },
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Update timestamps on save
ForumPostSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Reverse populate with comments
ForumPostSchema.virtual('comments', {
  ref: 'ForumComment',
  localField: '_id',
  foreignField: 'post',
  justOne: false
});

// Calculate vote score
ForumPostSchema.virtual('score').get(function() {
  return this.upvotes.length - this.downvotes.length;
});

module.exports = mongoose.model('ForumPost', ForumPostSchema); 