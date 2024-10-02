import express from 'express'
import updateFieldController from '../../controllers/authControllers/updateFieldController.js'
const updateFieldRoute = express.Router();

updateFieldRoute.put('/updatefields/:id',updateFieldController)

export default updateFieldRoute