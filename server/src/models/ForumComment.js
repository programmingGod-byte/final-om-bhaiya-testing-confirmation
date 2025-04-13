const mongoose = require('mongoose');

const ForumCommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Please add content']
  },
  post: {
    type: mongoose.Schema.ObjectId,
    ref: 'ForumPost',
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
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
  parentComment: {
    type: mongoose.Schema.ObjectId,
    ref: 'ForumComment'
  },
  isAcceptedAnswer: {
    type: Boolean,
    default: false
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
ForumCommentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Calculate vote score
ForumCommentSchema.virtual('score').get(function() {
  return this.upvotes.length - this.downvotes.length;
});

// Populate child comments (replies)
ForumCommentSchema.virtual('replies', {
  ref: 'ForumComment',
  localField: '_id',
  foreignField: 'parentComment',
  justOne: false
});

module.exports = mongoose.model('ForumComment', ForumCommentSchema); 