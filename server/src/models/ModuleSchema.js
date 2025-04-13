const mongoose = require('mongoose');
const { Schema } = mongoose;

// Resource schema for the PDF resources
const ResourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

// Code sample schema for the overview code samples
const OverviewCodeSampleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
});

// Code example schema for exercises
const CodeExampleSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  code: {
    type: String,
    required: true,
  },
  testbench:{
    type:String,
    require:true
  }
});

// Main course schema
const CourseSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  studentsCount: {
    type: String,
    required: true,
  },
  completed: {
    type: String,
    required: true,
  },
  totalChapters: {
    type: String,
    required: true,
  },
  chapters: {
    type: [], // This will store an array of CourseContent models
    default: [],
  },
  progress: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: String,
    required: true,
  },
  lessons: {
    type: String,
    required: true,
  },
  exercises: {
    type: String,
    required: true,
  },
  students: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },
  learnItems: [
    {
      type: String,
    },
  ],
  skills: [
    {
      type: String,
    },
  ],
  prerequisites: [
    {
      type: String,
    },

  ],
  resources: [ResourceSchema],
  overviewCodeSamples: [OverviewCodeSampleSchema],
  codeExamples: [CodeExampleSchema],
}, { timestamps: true });

// Creating the course model
const CourseModel = mongoose.model('Course', CourseSchema);

module.exports = CourseModel;
