const express=require('express');
const teamController=require('./../controllers/teamController');
const { authenticateUser, authorizeRoles } = require('../middelware/authMiddelware');

const route=express.Router();

route.post('/createMember',authenticateUser,authorizeRoles(['admin', 'editor','moderator']), teamController.addMember);
route.put('/:id',authenticateUser,authorizeRoles(['admin', 'editor','moderator']), teamController.updateMember);
route.get('/getTeam', teamController.getMembers);
route.get('/getTeam/:teamType', teamController.getMembersByType);
route.delete('/:id',authenticateUser,authorizeRoles(['admin', 'editor','moderator']),teamController.deleteMember);
route.get('/:id',teamController.getMemberById);  

module.exports=route