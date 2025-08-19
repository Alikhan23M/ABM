const express=require('express');
const aboutController=require('./../controllers/aboutController');
const {authorizeRoles,authenticateUser}=require('./../middelware/authMiddelware')

const route=express.Router();

// **************************ABOUT,MISSION,VISION***************************

route.patch('/updateAbout',authenticateUser,authorizeRoles(['admin', 'editor','moderator']),aboutController.updateAboutUs );
route.get('/getAbout/:category', aboutController.getAboutUs);
route.patch('/updateVision',aboutController.updateAboutUs );
route.get('/getVision', aboutController.getAboutUs);
route.patch('/updateMission',aboutController.updateAboutUs );
route.get('/getVision', aboutController.getAboutUs);





module.exports=route