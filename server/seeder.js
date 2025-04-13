const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');

// Load models
const User = require('./models/User');
const Question = require('./models/Question');

// Load sample data
const questions = require('./data/questions');

// Load env vars
dotenv.config();

// Connect to DB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/verilog_forum';
mongoose.connect(MONGODB_URI);

// Import data
const importData = async () => {
  try {
    // Clear existing data
    await Question.deleteMany();
    
    // Create test user if it doesn't exist
    let testUser = await User.findOne({ email: 'test@example.com' });
    
    if (!testUser) {
      testUser = await User.create({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        role: 'user',
        bio: 'This is a test user account for development'
      });
      console.log('Test user created:'.green.inverse);
      console.log({
        email: 'test@example.com',
        password: 'password123'
      });
    } else {
      console.log('Test user already exists'.yellow);
    }
    
    // Add user to questions
    const sampleQuestions = questions.map(question => {
      return { ...question, author: testUser._id };
    });
    
    // Insert sample questions
    await Question.insertMany(sampleQuestions);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// Delete data
const destroyData = async () => {
  try {
    await Question.deleteMany();
    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// Run command based on arg
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
} 