import express from 'express'
import dotenv from 'dotenv';
import registerRoute from './routes/authentication/registration.js';
import loginRoute from './routes/authentication/login.js';
import logoutRoute from './routes/authentication/logout.js';
import mongoose from './config/db.js';
import cookieParser  from 'cookie-parser'
import regenerateToken from './routes/authentication/regenerateAccessToken.js';
import googleSignRoute from './routes/authentication/googleSign.js';
import forgotPassRoute from './routes/authentication/forgotPassword.js';
import resetPassRoute from './routes/authentication/resetPassword.js';
import updateFieldRoute from './routes/authentication/updateFields.js';
import verifyEmailRoute from './routes/authentication/verifyEmail.js';

const app = express()
dotenv.config();
app.use(express.json())
app.use(cookieParser())


app.use('/api',registerRoute)
app.use('/api',loginRoute)
app.use('/api',googleSignRoute)
app.use('/api',logoutRoute)
app.use('/api',regenerateToken)
app.use('/api',forgotPassRoute)
app.use('/api',resetPassRoute)
app.use('/api',updateFieldRoute)

app.use('/api',verifyEmailRoute)




let port = process.env.PORT  
app.listen(port,()=>{
    console.log('srever is running on port no '+ port);
})