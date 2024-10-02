import express from 'express'
import regenerateAccessToken from '../../controllers/authControllers/regenerateController.js';
const regenerateToken = express.Router();

regenerateToken.get('/reg_token',regenerateAccessToken);

export default regenerateToken