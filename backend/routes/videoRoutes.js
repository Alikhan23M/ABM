const express=require('express');
const videoController=require('./../controllers/videoController');
const { authenticateUser, authorizeRoles } = require('../middelware/authMiddelware');


const route=express.Router();


route.get('/videos', videoController.getAllVideos);
route.get('/:id', videoController.getVideoById);
route.post('/addVideos',authenticateUser,authorizeRoles(['admin', 'editor','moderator']), videoController.addNewVideo);
route.put('/:id',authenticateUser,authorizeRoles(['admin', 'editor','moderator']), videoController.updateVideoById);
route.delete('/:id',authenticateUser,authorizeRoles(['admin', 'editor','moderator']), videoController.deleteVideoById);


module.exports=route