import express from 'express'
import registrationController from '../../controllers/authControllers/registrationController.js';
import registerValidationRules from '../../validationRules/authValidationRules/registerValidation.js'
const registerRoute = express.Router();


// yahan per express ki routing use ki hai 
registerRoute.post('/register',registerValidationRules(),registrationController)

export default registerRoute
