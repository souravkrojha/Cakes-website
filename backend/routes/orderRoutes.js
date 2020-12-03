import express from 'express';
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getLoggedInUserOrders,
  getOrders,
  updateOrderToDelivered,
} from '../controllers/orderController.js';
import { protect, adminProtect } from '../middleware/authMiddleware.js';
const router = express.Router();

router
  .route('/')
  .post(protect, addOrderItems)
  .get(protect, adminProtect, getOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router
  .route('/:id/delivery')
  .put(protect, adminProtect, updateOrderToDelivered);
router.route('/myorders/:id').get(protect, getLoggedInUserOrders);
export default router;
