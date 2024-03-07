import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
    title:{type:String},
    description:{type:String},
    labels:[{type:String}],
    projectid:{type: mongoose.Schema.Types.ObjectId},
    author:{type:String},
    authorid:{type: mongoose.Schema.Types.ObjectId},
    status:{type:String, default:"open", enum:["open", "closed"]},
    timestamp:{type:Date, default:Date.now()}
})

const IssueModel = mongoose.model("Issue", issueSchema);
export default IssueModel;