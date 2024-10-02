import express from 'express'
import loginController from '../../controllers/authControllers/loginController.js';
import loginValidationRules from '../../validationRules/authValidationRules/loginValidationRules.js'
const loginRoute = express.Router();

loginRoute.post('/login',loginValidationRules(),loginController)

export default loginRoute