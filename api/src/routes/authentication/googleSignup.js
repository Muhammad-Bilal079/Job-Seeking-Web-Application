import express from 'express'
const googlesignup = express.Router();
import  {googleAuth}  from '../../controllers/googleSignupController.js';

googlesignup.get("/google", googleAuth);

export default googlesignup




