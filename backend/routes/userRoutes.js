import express from 'express';
import {
  authUser,
  getUserProfile,
  getUsers,
  registerUser,
  updateUserProfile,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js';
import { protect, adminProtect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').post(registerUser).get(protect, adminProtect, getUsers);
router.post('/login', authUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route('/:id')
  .delete(protect, adminProtect, deleteUser)
  .get(protect, adminProtect, getUserById)
  .put(protect, adminProtect, updateUser);
export default router;
