const mongoose = require('mongoose');
const { Schema } = mongoose;

const AnswersSchema  = new Schema({
  author:{
    type:String,
    required:true
  },
    date:{
        type:String,
        default:  new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
    },
    content:{
        type:String,
        required:true
    },
    votes:{
        type:Number,
        default:0
    },
    dislikes:{
        type:Number,
        default:0
    },

})

const questionSchema = new Schema({
    title: {
        type: String,
        required: true,
      },

      description: {
        type: String,
        required: true,
      },
      code: {
        type: String,
        
      },
      tags:{
        type:Array,
        default:[]
      },
      author:{
        type:String,
        required:true
      },
      votes:{
        type:Number,
        default:0
      },
      email:{
        type:String,
        required:true
      },
      date:{
        type:String,
        default:new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      },
      replies:[AnswersSchema]

},{timestamps:true})

module.exports = mongoose.model('postQuestion', questionSchema); 