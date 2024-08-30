import express from 'express'
import googleSignController from '../../controllers/googleSignController.js';
const googleSignRoute = express.Router();

googleSignRoute.post('/google-sign',googleSignController)

export default googleSignRoute