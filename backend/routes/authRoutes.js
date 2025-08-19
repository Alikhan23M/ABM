const express=require('express');
const authController=require('./../controllers/authController');
const { authenticateUser, authorizeRoles } = require('../middelware/authMiddelware');

const route=express.Router();

route.post('/register', authController.register);
route.post('/addUser',authenticateUser,authorizeRoles(['admin']), authController.addUser);
route.post('/login', authController.login);
route.post('/logout', authController.logout);
route.post('/forgotPassword',authController.forgotPassword);
route.post('/resetPassword/:token',authController.resetPassword);
route.get('/getAllUsers',authenticateUser,authorizeRoles(['admin', 'editor','moderator']),authController.getAllUsers)
route.get('/getUserById',authenticateUser,authorizeRoles(['admin','user', 'editor','moderator']),authController.getUserById)
route.delete('/:id',authenticateUser,authorizeRoles(['admin', 'editor','moderator']), authController.deleteUserById);
route.put('/updatePassword',authenticateUser, authController.updatePassword);
route.put('/updatePasswordSelf',authenticateUser, authController.updatePasswordSelf);
route.get('/getPic',authenticateUser, authController.getPic);


module.exports=route