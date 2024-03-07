import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import validator from "validator";
import ApplicationError from "../../utils/errorHandler.js";
const userSchema = new mongoose.Schema({
    username:{type:String,
              required:[true, "username is required"]},
    email:{
            type: String,
            required: [true, "user email is requires"]
          },
    password: {
            type: String,
            required: [true, "Please enter your password"]}
})

userSchema.pre('save', async function(next){
    if (this.isModified("password")) { 
        try {
          this.password =  await bcrypt.hash(this.password, 12);
          return this.password;
        } catch (error) {
          next(new ApplicationError(error , 400));
        }
    }
})

// JWT Token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_Secret, {
      expiresIn: process.env.JWT_Expire,
    });
  };
  // user password compare
  userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };


const UserModel = mongoose.model("User", userSchema);
export default UserModel;