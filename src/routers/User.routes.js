import express from 'express';
import UserController from '../controllers/User.controller';
import { validateToken } from '../helpers/JWT';

const router = express.Router();

router.get('/users', UserController.getUsers);
router.get('/users/:id', UserController.getUserById);
router.post('/users', UserController.createUser);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);
router.post('/login', UserController.loginUser);
// router.put('/users/:id/password', UserController.changePassword);


router.post('/logout', validateToken, UserController.logoutUser); // Nueva ruta de logout
// router.put('/users/:id/password', UserController.changePassword);
export default router;