import express from 'express'
import loginController from '../../controllers/loginController.js';
import loginValidationRules from '../../validationRules/loginValidationRules.js'
const loginRoute = express.Router();

loginRoute.post('/login',loginValidationRules(),loginController)

export default loginRoute