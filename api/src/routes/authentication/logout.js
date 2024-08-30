import express from 'express'
import logoutController from '../../controllers/logoutController.js';
const logoutRoute = express.Router();

logoutRoute.post('/logout',logoutController)

export default logoutRoute