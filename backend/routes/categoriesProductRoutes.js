import express from 'express';
import { getProductByCategory } from '../controllers/productController.js';
const router = express.Router();

router.route('/:category').get(getProductByCategory);

export default router;
