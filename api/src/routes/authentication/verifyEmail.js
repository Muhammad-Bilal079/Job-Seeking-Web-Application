import express from 'express';
import verifyEmail from '../../controllers/authControllers/verifyemailController.js'
const verifyEmailRoute = express.Router();


verifyEmailRoute.post('/verifyemail', verifyEmail);

export default verifyEmailRoute
