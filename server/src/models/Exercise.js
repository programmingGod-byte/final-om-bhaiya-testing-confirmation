const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  module: {
    type: mongoose.Schema.ObjectId,
    ref: 'Module',
    required: true
  },
  difficulty: {
    type: String,
    required: [true, 'Please add a difficulty level'],
    enum: ['beginner', 'intermediate', 'advanced']
  },
  instructions: {
    type: String,
    required: [true, 'Please add instructions']
  },
  starterCode: {
    type: String,
    required: [true, 'Please add starter code']
  },
  solutionCode: {
    type: String,
    required: [true, 'Please add solution code']
  },
  testCases: [{
    input: {
      type: String,
      required: [true, 'Please add input for test case']
    },
    expectedOutput: {
      type: String,
      required: [true, 'Please add expected output for test case']
    },
    description: {
      type: String,
      default: ''
    },
    isHidden: {
      type: Boolean,
      default: false
    }
  }],
  hints: [{
    text: String,
    cost: {
      type: Number,
      default: 0
    }
  }],
  timeLimit: {
    type: Number,
    default: 60 // seconds
  },
  points: {
    type: Number,
    required: [true, 'Please add points value'],
    min: [1, 'Points must be at least 1']
  },
  completionRate: {
    type: Number,
    default: 0
  },
  averageAttempts: {
    type: Number,
    default: 0
  },
  tags: [String],
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamps on save
ExerciseSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Exercise', ExerciseSchema); 