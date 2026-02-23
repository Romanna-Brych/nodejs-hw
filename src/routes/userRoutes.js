import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { upload } from '../middleware/multer.js';
import {
  updateUserAvatar,
  getUser,
  updateUser,
} from '../controllers/userController.js';
import { celebrate } from 'celebrate';
import { updateUserSchema } from '../validations/userValidation.js';

const router = Router();

router.patch(
  '/users/me/avatar',
  authenticate,
  upload.single('avatar'),
  updateUserAvatar,
);

router.get('/users/me', authenticate, getUser);

router.patch(
  '/users/me',
  authenticate,
  celebrate(updateUserSchema),
  updateUser,
);

export default router;
