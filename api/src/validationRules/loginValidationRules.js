// validators/userValidator.js

import { body , validationResult } from 'express-validator';

const loginValidationRules = () => {
    return [

     body('email')
        .notEmpty()
        .withMessage('Email is required.')
        .isEmail()
        .withMessage('Please provide a valid email address.'),
  
      body('password')
        .notEmpty()
        .withMessage('Password is required.')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long.'),
  
      
    ];
  };
  

export default loginValidationRules