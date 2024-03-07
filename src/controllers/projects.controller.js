import ProjectRepo from "../models/projectModel/project.repo.js";
import ApplicationError from "../utils/errorHandler.js";
import IssueRepo from "../models/issueModel/issue.repo.js";

export default class ProjectController{

    constructor(){
        this.projectRepo = new ProjectRepo();
        this.issueRepo = new IssueRepo();
    }

    async renderLandingPage (req, res, next){
        try{
            const username = req.username;
        const projects  = await this.projectRepo.getAllProjectsRepo();
        if(projects.length > 0){
            return res.render('projects', {projects, user: username});
        }else{
            return res.render('projects', {projects:null, user: username});
        }        
        }catch(error){
           return next(new ApplicationError(error,400));
        }
        
    }

    //Create new Project
    async createProject(req, res, next){
        const {title, description} = req.body;
        const username = req.username;
        const userid = req.userId;
        try{
            const project = await this.projectRepo.createProjectRepo(title, description, username, userid);
            // console.log(project);
            if(project){
                return res.redirect('/');
            }else{
                return next(new ApplicationError("Something went wrong",400));
            }
        }catch(error){
            return next(new ApplicationError(error,400));
         }
    }


//Get single project
    async getProjectById(req, res, next){
        const projectId = req.params.id;
        const username = req.username;
        // console.log(projectId);
        try{
            const project = await this.projectRepo.findProjectRepo(projectId);
            if(!project){
                return next(new ApplicationError("project not found",400));
            }
            const issues = await this.issueRepo.getAllIssuesRepo(projectId);
            // console.log(issues);
            if(issues.length>0){
                return res.render('singleProject', {project,issues, isFiltered:false, labels:null, user:username});
            }else{
                return res.render('singleProject', {project,issues:null, isFiltered:false, labels:null, user:username});
            }
        }catch(error){
            return next(new ApplicationError(error,400));
         }
    }

//Search project by keyword
 async getProjectsByKeyword(req, res, next){
    const keyword = req.query.keyword;
    const username = req.username;
    try{
        const projects = await this.projectRepo.getProjectByKeywordRepo(keyword);
        if(projects){
            return res.render('projects', {projects, user: username});
        }else{
            return res.render('projects', {projects:null, user: username});
        }
    }catch(error){
            return next(new ApplicationError(error,400));
         }
 }

//Create issue for a specific project
async addissue(req, res, next){
    const projectid = req.params.id;
    const username = req.username;
    const {title, description, labels} = req.body;
    const author = req.username;
    const authorid = req.userId;

    const labelArray = labels.split(',').map(label => label.trim());

    try{
        const newIssue = await this.issueRepo.createIssueRepo(title, description,labelArray,projectid, author, authorid);
        if(newIssue){
            const uniqueLabels = await this.issueRepo.getUniqueLablesRepo(projectid);
            // console.log(uniqueLabels);
             const addLables = await this.projectRepo.addLablesToProjectRepo(projectid, uniqueLabels);
            //  console.log(addLables);

            return res.redirect(`/project/${projectid}`);
        }else{
            return next(new ApplicationError("Something went wrong",400));
        }
    }catch(error){
            return next(new ApplicationError(error,400));
         }
}

//Remove an issue 
    async deleteIssue(req, res, next){
        const projectid = req.params.projectid;
        const issueid = req.params.id;
        const username = req.username;
        try{
            const deleteIssue = await this.issueRepo.deleteIssueRepo(issueid)

            const uniqueLabels = await this.issueRepo.getUniqueLablesRepo(projectid);
            const addLables = await this.projectRepo.addLablesToProjectRepo(projectid, uniqueLabels);
            return res.redirect(`/project/${projectid}`);

        }catch(error){
            return next(new ApplicationError(error,400));
         }
    }

//filterIssueByLabel
async filterIssueByLabel(req, res, next){
    const labels = req.query.label;
    const projectid = req.params.id;
    const username = req.username;
    // console.log(labels);
    try{
        const project = await this.projectRepo.findProjectRepo(projectid);
            if(!project){
                return next(new ApplicationError("project not found",400));
            }
        const issues = await this.issueRepo.filterIssueByLabel(projectid, labels,);
        // console.log(filter);
        return res.render('singleProject', {project, issues, isFiltered:true, labels, user:username});
    }catch(error){
        return next(new ApplicationError(error,400));
     }
}



}