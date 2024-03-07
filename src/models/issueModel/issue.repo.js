import IssueModel from "./issue.schema.js";
import mongoose from "mongoose";

export default class IssueRepo{
    async createIssueRepo(title, description,labels, projectid, author, authorid){
        const newIssue = new IssueModel({title, description,labels,projectid, author, authorid});
        return await newIssue.save();
    }
    
    async getAllIssuesRepo(projectid){
        return await IssueModel.find({projectid:new mongoose.Types.ObjectId(projectid)}).exec();
    }

    async getUniqueLablesRepo(projectId){
        return await IssueModel.distinct('labels', {projectid:new mongoose.Types.ObjectId(projectId)});
    }

    async deleteIssueRepo(issueid){
        return await IssueModel.findByIdAndDelete(issueid);
    }

    async filterIssueByLabel(projectid, labels){
        return await IssueModel.find({projectid: new mongoose.Types.ObjectId(projectid), labels:{$in:labels}})
    }
}