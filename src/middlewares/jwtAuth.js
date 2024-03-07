import jwt from 'jsonwebtoken';
import ApplicationError from '../utils/errorHandler.js';

const jwtAuth =  async(req, res, next)=>{
    const {jwtToken} = req.cookies;

    if(!jwtToken){
        console.log("jwt token not found");
       return res.render('landingpage')
    }

    try{
        const payload = jwt.verify(jwtToken, process.env.SECRET_KEY);
        req.emailId = payload.emailId;
        req.userId =  payload.userId;
        req.username = payload.username;

    }catch(error){
        console.log(error);
        next(new ApplicationError(error, 400));
    }
    next();
}

export default jwtAuth;