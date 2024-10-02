import User from "../../models/user.js";
import bcrypt from 'bcrypt'
import { body, validationResult } from 'express-validator';
import { generateToken, setTokenCookie} from '../../services/jwtToken.js'

let registrationController = async (req, res) => {

    // Find a user by email
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
        // If user exists, respond with the user data
        return res.status(200).json({
            msg: "User already exixst"
        });
    }

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
    // bcrypt password 
    let saltRounds = 10
    let encryptedpassword = bcrypt.hashSync(req.body.password, saltRounds);
    req.body.password = encryptedpassword

    // db code here 
    const user = new User(req.body);
    // console.log(user);

    try {
        // JWT Token
        const { accessToken, refreshToken } = generateToken({ email: user.email });
        setTokenCookie(res, refreshToken,accessToken)
        
        user.save()
        .then(d => {
            return res.status(201).json({
                msg: "Account has been created",
                accessToken,
                refreshToken
            });
        }).catch((error) => {
            return res.status(500).json({
                msg: "Internal server error",
                error: error.message || 'Unknown error' // Ensure error message is sent
            });
        });

    } catch (error) {
        // error in jwt it will work
        return res.status(400).json({
            msg: "JWT generation failed",
            error: error.message || 'Unknown error' // Ensure error message is sent
        });
    }


}

export default registrationController