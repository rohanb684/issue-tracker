import UserModel from "./user.schema.js";

export default class UserRepo{

    async userSignupRepo(username, email, password){
        const newUser = new UserModel({username, email, password});
        return await newUser.save();
    }

    async findUserRepo(email){
        return await UserModel.findOne({email});
    }

    
}