import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title:{type:String},
    description:{type:String},
    labels:[{type:String}],
    author:{type:String},
    authorid:{type: mongoose.Schema.Types.ObjectId},
    status:{type:String, default:"open", enum:["open", "closed"]},
    timestamp:{type:Date, default:Date.now()}
})

const ProjectModel = mongoose.model('Project', projectSchema);
export default ProjectModel;