import express from 'express';
import {
  createFood,
  deleteFood,
  getFoodById,
  getFoods,
  updateFood
} from '../controllers/foodController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.route('/').get(getFoods).post(protect, authorize('admin'), upload.single('image'), createFood);
router
  .route('/:id')
  .get(getFoodById)
  .put(protect, authorize('admin'), upload.single('image'), updateFood)
  .delete(protect, authorize('admin'), deleteFood);

export default router;
