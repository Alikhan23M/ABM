const express=require('express');
const partnerController=require('./../controllers/partnerController');
const { authenticateUser, authorizeRoles } = require('../middelware/authMiddelware');


const route=express.Router();

route.post('/createPartner',authenticateUser,authorizeRoles(['admin', 'editor','moderator']), partnerController.addPartner);
route.put('/:id',authenticateUser,authorizeRoles(['admin', 'editor','moderator']), partnerController.updatePartner);
route.get('/getTeam', partnerController.getPartners);
route.delete('/:id',authenticateUser,authorizeRoles(['admin', 'editor','moderator']),partnerController.deletePartner);
route.get('/:id',partnerController.getPartnersById);  

module.exports=route