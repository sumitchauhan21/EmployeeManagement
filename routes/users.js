// USER CONTROLLER ROUTER
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const passport = require('passport');
router.get('/sign-up',userController.signup);
router.get('/sign-in',userController.signin);
router.get('/profile',passport.checkAuthentication,userController.profile);
router.post('/create',userController.create);
router.post('/create-session',passport.authenticate(
   'local',
   {failureRedirect:'/users/sign-in'},),
    userController.createSession);
router.get('/sign-out',userController.destroySession);
router.get('/create-employee-form',userController.createEmployee);
router.post('/create-employee',userController.createEmployeeDone);
router.get('/delete-employee',userController.deleteEmployee);
router.get('/update-employee/:id',userController.updateEmployee);
router.get('/update-user/:id',userController.updateUser);
router.post('/updated/:id',userController.updated);
router.post('/updateduser/:id',userController.userUpdated);
// router.get('/profile',userController.profile);
module.exports = router;