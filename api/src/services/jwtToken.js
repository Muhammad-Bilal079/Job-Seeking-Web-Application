import jwt from 'jsonwebtoken'

// Function to generate tokens

export const generateToken = (payload) => {
  const accessToken = jwt.sign(payload, process.env.ACCESS_JWT_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
  const refreshToken = jwt.sign(payload, process.env.REFRESH_JWT_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });

  return { accessToken, refreshToken };
}

// store  tokens in cookies 

export const setTokenCookie = (res, refreshToken,accessToken)=>{

  res.cookie('refreshToken', refreshToken, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'strict', 
  });

  res.cookie('accessToken', accessToken, {
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production', 
    sameSite: 'strict', 
});
}



