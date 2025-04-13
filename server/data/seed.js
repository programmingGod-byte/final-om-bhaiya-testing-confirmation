const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const verilogFundamentals = require('./verilog-fundamentals-module');

// Load models
const Module = mongoose.model('Module') || require('../src/models/Module');
const Exercise = mongoose.model('Exercise') || require('../src/models/Exercise');
const User = mongoose.model('User') || require('../src/models/User');

// Load env vars
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/verilog_learning')
  .then(() => console.log('MongoDB Connected'.green.bold))
  .catch(err => console.error(`Error connecting to MongoDB: ${err.message}`.red.bold));

// Import Verilog Fundamentals Module
const importVerilogModule = async () => {
  try {
    console.log('Importing Verilog Fundamentals module...'.yellow);

    // Find or create admin user
    let adminUser = await User.findOne({ role: 'admin' });
    
    if (!adminUser) {
      adminUser = await User.create({
        name: 'Admin User',
        email: 'admin@verigeek.com',
        password: 'admin123',
        role: 'admin'
      });
      console.log('Admin user created'.green);
    }

    // Check if module already exists
    const existingModule = await Module.findOne({ slug: verilogFundamentals.slug });
    
    if (existingModule) {
      console.log(`Module "${verilogFundamentals.title}" already exists, skipping...`.yellow);
      return;
    }

    // Create the module
    const moduleData = {
      ...verilogFundamentals,
      createdBy: adminUser._id
    };

    const module = await Module.create(moduleData);
    console.log(`Module "${module.title}" created successfully`.green);

    // Create exercises for the module
    if (verilogFundamentals.exercises && verilogFundamentals.exercises.length > 0) {
      console.log(`Creating ${verilogFundamentals.exercises.length} exercises...`.yellow);
      
      for (const exerciseData of verilogFundamentals.exercises) {
        const exercise = await Exercise.create({
          ...exerciseData,
          module: module._id,
          createdBy: adminUser._id
        });
        
        console.log(`Exercise "${exercise.title}" created`.green);
      }
    }

    console.log('Data import complete!'.green.bold);
  } catch (error) {
    console.error(`Error importing data: ${error.message}`.red.bold);
    console.error(error);
  }
};

// Delete existing data
const destroyData = async () => {
  try {
    await Module.deleteOne({ slug: verilogFundamentals.slug });
    await Exercise.deleteMany({ module: { $in: await Module.find({ slug: verilogFundamentals.slug }).distinct('_id') } });
    
    console.log('Verilog Fundamentals module and exercises deleted'.red.bold);
  } catch (error) {
    console.error(`Error deleting data: ${error.message}`.red.bold);
  }
};

// Execute based on command line args
if (process.argv[2] === '-d') {
  destroyData().then(() => process.exit());
} else {
  importVerilogModule().then(() => process.exit());
} 