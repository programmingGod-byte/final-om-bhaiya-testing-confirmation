const express = require('express');
const {
  getModules,
  getModule,
  createModule,
  updateModule,
  deleteModule,
  getModulesByCategory,
  getModulesByType,
  rateModule
} = require('../controllers/moduleController');

const { protect, authorize } = require('../middleware/authMiddleware');

// Include other resource routers
const exerciseRouter = require('./exerciseRoutes');
const forumRouter = require('./forumRoutes');

const router = express.Router();

// Re-route into other resource routers
router.use('/:moduleId/exercises', exerciseRouter);
router.use('/:moduleId/forum', forumRouter);

// Module routes
router.route('/')
  .get(getModules)
  .post(protect, authorize('publisher', 'admin'), createModule);

router.route('/:id')
  .get(getModule)
  .put(protect, authorize('publisher', 'admin'), updateModule)
  .delete(protect, authorize('admin'), deleteModule);

router.get('/category/:category', getModulesByCategory);
router.get('/type/:type', getModulesByType);
router.post('/:id/rate', protect, rateModule);

module.exports = router; 