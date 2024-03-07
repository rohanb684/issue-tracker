import ProjectModel from "./project.schema.js";
import mongoose from "mongoose";

export default class ProjectRepo{

    async createProjectRepo(title, description, author, authorid){
        const newProject = new ProjectModel({title, description, author, authorid})
        return await newProject.save();
    }

    async getAllProjectsRepo(){
        return await ProjectModel.find().exec();
    }


    async findProjectRepo(_id){
        return await ProjectModel.findById(new mongoose.Types.ObjectId(_id));
    }

    async addLablesToProjectRepo(_id, labels){
        return await ProjectModel.findByIdAndUpdate(_id, {$set:{labels}})
    }

    async getProjectByKeywordRepo(keyword){
        return await ProjectModel.find({ title: { $regex: new RegExp(keyword, 'i') } });
    }
}