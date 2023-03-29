const express = require('express');

const UserController = require('../../controllers/user-controller');
const {AuthRequestValidators} = require('../../middlewares/index');

const router = express.Router();

router.post('/signup',AuthRequestValidators.validateUserAuth,UserController.create);
router.post('/signin',AuthRequestValidators.validateUserAuth,UserController.signIn);
router.get('/isAuthenticated',UserController.isAuthenticated);
// router.get('/d',(req,res)=>{
//     return res.status(200).json({
//         message:'ok'
//     });
// })

module.exports=router;