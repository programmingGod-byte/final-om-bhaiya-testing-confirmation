const express = require('express');
const {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
  updatePassword,
  forgotPassword,
  resetPassword,
  getUserProgress,
  getUserBookmarks,
  addBookmark,
  removeBookmark
} = require('../controllers/userController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Auth routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.put('/password', protect, updatePassword);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);

// Progress and bookmarks
router.get('/progress', protect, getUserProgress);
router.get('/bookmarks', protect, getUserBookmarks);
router.post('/bookmarks/:moduleId', protect, addBookmark);
router.delete('/bookmarks/:moduleId', protect, removeBookmark);

module.exports = router; 