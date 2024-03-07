import express from 'express';
import UserController from '../controllers/user.controller.js';
import jwtAuth from '../middlewares/jwtAuth.js';

const userRouter = express.Router();

const userController = new UserController();

//routes
userRouter.get('/signup', (req, res, next)=>{
    userController.getSignup(req, res, next);
})

userRouter.post('/signup', (req, res, next)=>{
    userController.userSignup(req, res, next);
})

userRouter.get('/login', (req, res, next)=>{
    userController.getLogin(req, res, next);
})

userRouter.post('/login', (req, res, next)=>{
    userController.userLogin(req, res, next);
})

userRouter.get('/logout', jwtAuth, (req, res,next)=>{
    userController.userLogout(req, res, next);
})
export default userRouter;