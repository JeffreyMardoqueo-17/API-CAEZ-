import { Router } from 'express';
import UserController from '../controllers/User.controller';

const userRouter = Router();

userRouter.get('/users', UserController.getUsers);
userRouter.get('/users/:id', UserController.getUserById);
userRouter.post('/users', UserController.createUser);
userRouter.put('/users/:id', UserController.updateUser);
userRouter.delete('/users/:id', UserController.deleteUser);
userRouter.post('/login', UserController.login);
userRouter.put('/users/change-password/:id', UserController.changePassword);

export default userRouter;
