const mongoose = require('mongoose');
const { Schema } = mongoose;

// Section schema
const SectionSchema = new Schema({
  id: {
    type: String,
   
  },
  title: {
    type: String,
   
  },
  content: {
    type: String,
   
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
  editorContent:{
    type:String,
    default:""
  },
  codeExamples:{
    type:[],
    default:[]
  },
  isNewEditorUsed:{
    default:false,
    type:Boolean
  }
  ,
  sections: {
    type:[SectionSchema],
    default:[{
      id:"",
      title:"",
      content:""
    }]
  }, // Array of sections
}, { timestamps: true });

// Creating the model for the course content
const CourseContentModel = mongoose.model('CourseContent', CourseContentSchema);

module.exports = CourseContentModel;
