import express from 'express';
import ProjectController from '../controllers/projects.controller.js';
import jwtAuth from '../middlewares/jwtAuth.js';

const projectRouter = express.Router();
const projectController = new ProjectController();

//if the user is logged in the projects page will be displayed else landing page
projectRouter.get('/',jwtAuth,(req, res, next)=>{
    projectController.renderLandingPage(req, res, next);
})

projectRouter.post('/',jwtAuth,(req, res, next)=>{
    projectController.createProject(req, res, next)
})


projectRouter.get('/project/search-keyword',jwtAuth,(req, res, next)=>{
    projectController.getProjectsByKeyword(req, res, next)
})

projectRouter.get('/project/:id',jwtAuth,(req, res, next)=>{
    projectController.getProjectById(req, res, next)
})

// ---Paths related to issues--

projectRouter.post('/project/:id/create-issue', jwtAuth, (req, res, next)=>{
    projectController.addissue(req, res, next)
})

projectRouter.delete('/project/:projectid/delete-issue/:id', jwtAuth, (req, res, next)=>{
    projectController.deleteIssue(req, res, next)
})

projectRouter.get('/project/:id/filter-label',jwtAuth,(req, res, next)=>{
    projectController.filterIssueByLabel(req, res, next)
})

// ---Paths related to issues--


export default projectRouter;