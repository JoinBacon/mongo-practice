const express = require('express');
const userController = require('../contorllers/userController');

const userRouter = express.Router();

userRouter.get('/', userController.addUser);
userRouter.post('/', userController.postUser);
userRouter.get('/inform', userController.getUser);

module.exports = userRouter;