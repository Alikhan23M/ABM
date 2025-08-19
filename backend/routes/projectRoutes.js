const express=require('express');
const projectController=require('./../controllers/projectController');
const { authenticateUser, authorizeRoles } = require('../middelware/authMiddelware');


const route=express.Router();

route.post('/addProject',authenticateUser,authorizeRoles(['admin', 'editor','moderator']), projectController.addNewProject);
route.put('/:id',authenticateUser,authorizeRoles(['admin', 'editor','moderator']), projectController.updateProjectById);
route.get('/getProject', projectController.getAllProjects);
route.delete('/:id',authenticateUser,authorizeRoles(['admin', 'editor','moderator']),projectController.deleteProjectById);
route.get('/:id',projectController.getProjectById);  

module.exports=route