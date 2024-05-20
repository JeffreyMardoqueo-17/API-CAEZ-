import express from 'express';
import UserController from '../controllers/User.controller';
import { validateToken } from '../helpers/JWT';

const router = express.Router();

router.get('/users', validateToken, UserController.getUsers);
router.get('/users/:id', validateToken, UserController.getUserById);
router.post('/users', UserController.createUser);
router.put('/users/:id', validateToken, UserController.updateUser);
router.delete('/users/:id', validateToken, UserController.deleteUser);
router.post('/login', UserController.loginUser);
router.put('/users/:id/password', validateToken, UserController.changePassword);

export default router;