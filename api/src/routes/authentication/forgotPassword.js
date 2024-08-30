import express from 'express'
import forgotPassController from '../../controllers/forgotPassController.js';
const forgotPassRoute = express.Router();

forgotPassRoute.post('/forgot-password',forgotPassController)

export default forgotPassRoute