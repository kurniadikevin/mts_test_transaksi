const express = require('express');
const router = express.Router();
const user_controller= require('../controller/user');

//GET user all user list
router.get('/all', user_controller.get_user_list)

//POST Create new user for admin
router.post('/sign-up',user_controller.create_new_user)

//POST User sign in 
router.post('/sign-in',user_controller.generateTokenMiddleware,user_controller.user_sign_in)



module.exports = router;
