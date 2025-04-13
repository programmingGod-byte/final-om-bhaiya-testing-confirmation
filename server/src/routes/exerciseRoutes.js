const express = require('express');
const {
  getExercises,
  getExercise,
  createExercise,
  updateExercise,
  deleteExercise,
  getModuleExercises,
  submitSolution
} = require('../controllers/exerciseController');

const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router({ mergeParams: true });

// Exercise routes
router.route('/')
  .get(getExercises)
  .post(protect, authorize('publisher', 'admin'), createExercise);

router.route('/:id')
  .get(getExercise)
  .put(protect, authorize('publisher', 'admin'), updateExercise)
  .delete(protect, authorize('admin'), deleteExercise);

router.get('/module/:moduleId', getModuleExercises);
router.post('/:id/submit', protect, submitSolution);

module.exports = router; 