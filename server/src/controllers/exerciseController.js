const Exercise = require('../models/Exercise');

// @desc    Get all exercises
// @route   GET /api/exercises
// @access  Public
exports.getExercises = async (req, res) => {
  try {
    // Placeholder response for now
    res.status(200).json({
      success: true,
      count: 0,
      pagination: {
        page: 1,
        limit: 10,
        pages: 0
      },
      data: []
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get single exercise
// @route   GET /api/exercises/:id
// @access  Public
exports.getExercise = async (req, res) => {
  try {
    // Placeholder response
    res.status(200).json({
      success: true,
      data: {
        _id: '5f8a7b6c4e3d2c1b0a9e8d7e',
        title: 'Implement a Full Adder',
        description: 'Create a full adder module in Verilog',
        module: {
          _id: '5f8a7b6c4e3d2c1b0a9e8d7c',
          title: 'Full Adder'
        },
        difficulty: 'beginner',
        instructions: 'Create a Verilog module for a full adder with inputs a, b, cin and outputs sum, cout...',
        starterCode: 'module full_adder(\n  input a, b, cin,\n  output sum, cout\n);\n  // Your code here\nendmodule',
        testCases: [
          {
            input: 'a=0, b=0, cin=0',
            expectedOutput: 'sum=0, cout=0',
            description: 'All inputs 0',
            isHidden: false
          }
        ],
        timeLimit: 60,
        points: 10,
        completionRate: 75,
        createdAt: '2023-07-15T10:30:00.000Z'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Create new exercise
// @route   POST /api/exercises
// @access  Private (Admin/Publisher)
exports.createExercise = async (req, res) => {
  try {
    // Placeholder response
    res.status(201).json({
      success: true,
      data: {
        _id: '5f8a7b6c4e3d2c1b0a9e8d7f',
        title: req.body.title || 'New Exercise',
        description: req.body.description || 'Exercise description',
        module: req.body.module || '5f8a7b6c4e3d2c1b0a9e8d7c',
        createdAt: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update exercise
// @route   PUT /api/exercises/:id
// @access  Private (Admin/Publisher)
exports.updateExercise = async (req, res) => {
  try {
    // Placeholder response
    res.status(200).json({
      success: true,
      data: {
        _id: req.params.id,
        title: req.body.title || 'Updated Exercise',
        updatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Delete exercise
// @route   DELETE /api/exercises/:id
// @access  Private (Admin)
exports.deleteExercise = async (req, res) => {
  try {
    // Placeholder response
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get exercises by module
// @route   GET /api/exercises/module/:moduleId
// @access  Public
exports.getModuleExercises = async (req, res) => {
  try {
    // Placeholder response
    res.status(200).json({
      success: true,
      count: 0,
      data: []
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Submit solution for exercise
// @route   POST /api/exercises/:id/submit
// @access  Private
exports.submitSolution = async (req, res) => {
  try {
    // Placeholder response simulating code submission evaluation
    const code = req.body.code || '';
    const isPassing = code.includes('assign sum') && code.includes('assign cout');
    
    res.status(200).json({
      success: true,
      data: {
        score: isPassing ? 10 : 0,
        passedTests: isPassing ? 8 : 0,
        totalTests: 8,
        results: [
          {
            testCase: {
              input: 'a=0, b=0, cin=0',
              expectedOutput: 'sum=0, cout=0'
            },
            passed: isPassing,
            output: isPassing ? 'sum=0, cout=0' : 'undefined',
            message: isPassing ? 'Test passed!' : 'Output did not match expected result'
          }
        ],
        feedback: isPassing 
          ? 'Great job! Your implementation is correct and efficient.' 
          : 'Your solution does not correctly implement the full adder logic.',
        executionTime: 0.05
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}; 