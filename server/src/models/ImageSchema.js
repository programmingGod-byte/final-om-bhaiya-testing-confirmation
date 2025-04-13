const mongoose = require('mongoose');

const uploadedFileSchema = new mongoose.Schema({
  
  signedUrl: {
    type: String,
    required: true,
  },
  
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('UploadedFile', uploadedFileSchema);
