const express=require('express');
const pictureController=require('./../controllers/mediaController');
const {authenticateUser,authorizeRoles}=require('../middelware/authMiddelware');

const route=express.Router();

route.get('/pictures', pictureController.getAllPictures);
route.get('/:id', pictureController.getPictureById);
route.post('/addPictures',authenticateUser,authorizeRoles(['admin', 'editor','moderator']), pictureController.addNewPicture);
route.put('/:id',authenticateUser,authorizeRoles(['admin', 'editor','moderator']), pictureController.updatePictureById);
route.delete('/:id',authenticateUser,authorizeRoles(['admin', 'editor','moderator']), pictureController.deletePictureById);


module.exports=route