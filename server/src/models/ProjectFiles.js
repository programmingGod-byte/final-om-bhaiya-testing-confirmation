const mongoose = require('mongoose');

const ProjectFilesSchema = new mongoose.Schema({
  projectId:mongoose.Types.ObjectId,
  title:String,
  email:String ,
    files: [
      {
        fileName: String,
        content: String,
        
      }
    ],
    createdAt: { type: Date, default: Date.now },
  });
  
module.exports = mongoose.model('ProjectFiles', ProjectFilesSchema); 
