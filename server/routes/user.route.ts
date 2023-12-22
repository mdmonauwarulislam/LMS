import { activateUserAccount } from './../controller/user.controller';
import express from 'express';
import { registrationUser } from '../controller/user.controller';
const userRouter = express.Router();

userRouter.post('/registration', registrationUser);
userRouter.post('/activate-user', activateUserAccount);

export default userRouter;
