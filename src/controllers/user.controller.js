
import UserRepo from "../models/userModel/user.repo.js";
import ApplicationError from "../utils/errorHandler.js";
import { sendToken } from "../utils/sendToken.js";
import jwt from 'jsonwebtoken';

export default class UserController{

    constructor(){
        this.userRepo = new UserRepo();
    }

    async getSignup(req, res, next){
        res.render('signupPage');
    }

    async userSignup(req, res, next){
        const {username, email, password} = req.body;
        try{
            const result = this.userRepo.userSignupRepo(username, email, password);
            if(result){
                res.redirect('/user/login');
            }
        }catch(error){
            next(new ApplicationError(error,400));
        }
    }

    async getLogin(req, res, next){
        res.render('loginPage');
    }

    async userLogin(req, res, next){
        try{
            const {email, password} = req.body;
            if (!email || !password) {
                return next(new ApplicationError("please enter email/password", 400));
              }

              const user = await this.userRepo.findUserRepo(email)
            //   console.log(user);
              if(!user){
                return next(new ApplicationError("email not registered",400));
              }
              const passwordMatch =  await user.comparePassword(password);
              if(!passwordMatch){
                return next(new ApplicationError("Incorrect Password, try again", 400));
              }
              const token = jwt.sign(
                {
                    userId: user._id,
                    emailId: user.email,
                    username: user.username
                },
                process.env.SECRET_KEY,
                {
                    expiresIn: '1h'
                }
                
            )
            return res.status(200).cookie("jwtToken", token, { maxAge: 1 * 60 * 60 * 1000, httpOnly: true }).redirect('/');

        }catch(error){
            return next(new ApplicationError(error,400));
        }
    }

    //User Logout
    async userLogout(req, res, next){
        const email = req.emailId;
        res.clearCookie("jwtToken").redirect('/');
    }


}