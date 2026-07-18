import { Router } from 'express';
import { getAllUsers, signUp, signIn } from '../controllers/user.controller.js';
import { validateBody, signUpSchema, signInSchema } from '../middlewares/validation.middleware.js';

const router = Router();

router.get('/', getAllUsers);
router.post('/sign-up', validateBody(signUpSchema), signUp);
router.post('/sign-in', validateBody(signInSchema), signIn);

export default router;