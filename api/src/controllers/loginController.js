import User from "../models/user.js";
import bcrypt from 'bcrypt'
import { body, validationResult } from 'express-validator';
import { generateToken,setTokenCookie} from '../services/jwtToken.js'

let loginController = async (req, res) => {

     // 1. user ka data mangao pehlay login form say 
     const { email, password } = req.body //destructure

    // Extract validation errors
    const errors = validationResult(req);

    // If errors are found, return them to the client
    if (!errors.isEmpty()) {
        // Get the first error message
        const firstError = errors.array()[0];

        return res.status(400).json({
            field: firstError.param,
            message: firstError.msg,
        });
    }
    
    //find user in database
    const user = await User.findOne({ email: email });

    if (user !== null) {
        
        //bcrypt compare is used for compare the plain password and hash password
        bcrypt.compare(password, user.password, function (err, result) {
            if (err) {
                // Handle error, e.g., send a server error response
                return res.status(500).json({
                    msg: "Error occurred during password comparison",
                    error: err
                });
            }

            if (result) {
                // Passwords match generate token and send response
                const { accessToken, refreshToken } = generateToken({ email: user.email ,role:user.role});
                setTokenCookie(res, refreshToken,accessToken)
               
                res.status(200).json({
                    msg: "Login successful",
                    accessToken,
                    refreshToken,
                    data: user
                });
            }
            else {
                // Passwords do not match
                res.status(401).json({
                    msg: "Invalid credientials"
                });
            }
        });

    }
    else {
        res.status(404).json({
            msg: "invalid email and password"
        })
    }

}


export default loginController