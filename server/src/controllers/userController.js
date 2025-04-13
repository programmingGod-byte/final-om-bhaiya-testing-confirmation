const User = require('../models/User');
const jwt = require('jsonwebtoken');

// @desc    Register user
// @route   POST /api/users/register
// @access  Public
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        error: 'User already exists'
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password
    });

    // Generate JWT token
    const token = user.getSignedJwtToken();

    res.status(201).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide an email and password'
      });
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Generate JWT token
    const token = user.getSignedJwtToken();

    res.status(200).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get current logged in user
// @route   GET /api/users/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Placeholder functions for other user endpoints
exports.updateProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Profile updated successfully'
  });
};

exports.updatePassword = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Password updated successfully'
  });
};

exports.forgotPassword = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Password reset email sent'
  });
};

exports.resetPassword = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Password reset successful'
  });
};

exports.getUserProgress = async (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      completedModules: [],
      completedExercises: [],
      totalModules: 0,
      totalExercises: 0,
      totalPoints: 0,
      earnedPoints: 0,
      progressByCategory: {}
    }
  });
};

exports.getUserBookmarks = async (req, res) => {
  res.status(200).json({
    success: true,
    count: 0,
    data: []
  });
};

exports.addBookmark = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Bookmark added successfully'
  });
};

exports.removeBookmark = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Bookmark removed successfully'
  });
}; 