const mongoose = require('mongoose');

const ModuleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    unique: true,
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  slug: {
    type: String,
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: [
      'basic',
      'intermediate',
      'advanced',
      'combinational-circuits',
      'sequential-circuits',
      'memory',
      'interview-prep'
    ]
  },
  moduleType: {
    type: String,
    required: [true, 'Please specify the module type'],
    enum: [
      'adder',
      'subtractor',
      'multiplier',
      'divider',
      'comparator',
      'multiplexer',
      'demultiplexer',
      'encoder',
      'decoder',
      'd-flip-flop',
      'jk-flip-flop',
      't-flip-flop',
      'sr-flip-flop',
      'counter',
      'shift-register',
      'other'
    ]
  },
  content: {
    introduction: {
      type: String,
      required: [true, 'Please add an introduction section']
    },
    functionality: {
      type: String,
      required: [true, 'Please add a functionality description']
    },
    truthTable: {
      type: String,
      default: ''
    },
    logicDiagram: {
      type: String,
      default: ''
    },
    exampleCode: {
      type: String,
      required: [true, 'Please add example code']
    },
    codingTips: {
      type: String,
      default: ''
    },
    applications: {
      type: String,
      default: ''
    }
  },
  difficulty: {
    type: String,
    required: [true, 'Please add a difficulty level'],
    enum: ['beginner', 'intermediate', 'advanced']
  },
  prerequisites: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Module'
  }],
  relatedModules: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Module'
  }],
  thumbnailImage: {
    type: String,
    default: 'default-module.jpg'
  },
  averageRating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5']
  },
  ratingsCount: {
    type: Number,
    default: 0
  },
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
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create module slug from the title
ModuleSchema.pre('save', function(next) {
  this.slug = this.title
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
  
  this.updatedAt = Date.now();
  next();
});

// Reverse populate with exercises
ModuleSchema.virtual('exercises', {
  ref: 'Exercise',
  localField: '_id',
  foreignField: 'module',
  justOne: false
});

module.exports = mongoose.model('Module', ModuleSchema); 