const express = require('express');
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
  dislikePost,
  getModulePosts,
  getComments,
  createComment,
  updateComment,
  deleteComment,
  likeComment,
  dislikeComment,
  markAsAccepted,
  markAsResolved
} = require('../controllers/forumController');

const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router({ mergeParams: true });

// Post routes
router.route('/')
  .get(getPosts)
  .post(protect, createPost);

router.route('/:id')
  .get(getPost)
  .put(protect, updatePost)
  .delete(protect, deletePost);

router.get('/module/:moduleId', getModulePosts);
router.post('/:id/like', protect, likePost);
router.post('/:id/dislike', protect, dislikePost);
router.post('/:id/resolve', protect, markAsResolved);

// Comment routes
router.get('/:postId/comments', getComments);
router.post('/:postId/comments', protect, createComment);
router.put('/comments/:id', protect, updateComment);
router.delete('/comments/:id', protect, deleteComment);
router.post('/comments/:id/like', protect, likeComment);
router.post('/comments/:id/dislike', protect, dislikeComment);
router.post('/comments/:id/accept', protect, markAsAccepted);

module.exports = router; 