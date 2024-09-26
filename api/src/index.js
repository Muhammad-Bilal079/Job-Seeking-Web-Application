import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors'
import registerRoute from './routes/authentication/registration.js';
import loginRoute from './routes/authentication/login.js';
import logoutRoute from './routes/authentication/logout.js';
import './config/db.js';
import cookieParser  from 'cookie-parser'
import regenerateToken from './routes/authentication/regenerateAccessToken.js';
import forgotPassRoute from './routes/authentication/forgotPassword.js';
import resetPassRoute from './routes/authentication/resetPassword.js';
import updateFieldRoute from './routes/authentication/updateFields.js';
import verifyEmailRoute from './routes/authentication/verifyEmail.js';
import googlesignup from './routes/authentication/googleSignup.js';

const app = express()
dotenv.config();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:'http://localhost:5173',
    optionsSuccessStatus: 200 ,
    credentials: true,
}));


app.use('/api',registerRoute)
app.use('/api',loginRoute)
app.use('/api',logoutRoute)
app.use('/api',regenerateToken)
app.use('/api',forgotPassRoute)
app.use('/api',resetPassRoute)
app.use('/api',updateFieldRoute)
app.use('/api',googlesignup)


app.use('/api',verifyEmailRoute)


app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});


let port = process.env.PORT  
app.listen(port,()=>{
    console.log('srever is running on port no '+ port);
})