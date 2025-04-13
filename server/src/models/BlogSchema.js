const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the blog schema
const blogSchema = new Schema(
  {
    imageUrl: {
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
    tags: {
      type: [String],
      required: true,
    },
    spectrum: {
      type: [String],
      required: true,
    },
    paperLink: {
      type: String,
      required: true,
    },
    submissionDate: {
        type: Date,
        default: Date.now, // Automatically sets the submission date
      },
      // Optional: You can also store the month and year separately if you want them explicitly
      submissionMonth: {
        type: String,
        default: () => new Date().toLocaleString('default', { month: 'long' }), // e.g., "January"
      },
      submissionYear: {
        type: Number,
        default: () => new Date().getFullYear(), // Current year
      },
      
  },
  {
    timestamps: true, // Automatically adds 'createdAt' and 'updatedAt' fields
  }
);

// Create and export the Blog model
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
