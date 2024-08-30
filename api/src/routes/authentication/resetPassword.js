import express from 'express'
import resetPassController from '../../controllers/resetPassController.js'
const resetPassRoute = express.Router();

resetPassRoute.post('/reset-password',resetPassController)

export default resetPassRoute