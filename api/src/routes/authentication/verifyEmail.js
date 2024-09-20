import express from 'express'
import verifyemailController from '../../controllers/verifyemailController.js';
const verifyEmailRoute = express.Router();

verifyEmailRoute.post('/verify-email',verifyemailController)

export default verifyEmailRoute