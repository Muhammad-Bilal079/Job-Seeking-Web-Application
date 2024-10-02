import express from 'express'
import logoutController from '../../controllers/authControllers/logoutController.js';
const logoutRoute = express.Router();

logoutRoute.post('/logout',logoutController)

export default logoutRoute