import express from 'express';
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
} from '../controllers/productController.js';
import { protect, adminProtect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').get(getProducts).post(protect, adminProtect, createProduct);
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, adminProtect, deleteProduct)
  .put(protect, adminProtect, updateProduct);
router.route('/:id/reviews').post(protect, createProductReview);
export default router;
