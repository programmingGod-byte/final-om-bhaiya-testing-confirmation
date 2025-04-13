const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  email:String,
  title:String,
    description:String,
    
    createdAt: { type: Date, default: Date.now },
  });
  
module.exports = mongoose.model('Projects', ProjectSchema); 
