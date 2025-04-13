const mongoose = require('mongoose');
const { Schema } = mongoose;

// Section schema
const SectionSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

// Main course content schema
const CourseContentSchema = new Schema({
    id: {
        type: String,
        required: true,
      },
      moduleId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
      },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  estimatedTime: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  codeExamples:{
    type:[],
    default:[]
  },
  sections: [SectionSchema], // Array of sections
}, { timestamps: true });

// Creating the model for the course content
const CourseContentModel = mongoose.model('CourseContent', CourseContentSchema);

module.exports = CourseContentModel;
