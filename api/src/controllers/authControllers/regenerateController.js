import jwt from 'jsonwebtoken'

let regenerateAccessToken =  (req, res, payload) => {
    //  Get the access token from cookies
    const accessToken = req.cookies.accessToken;

    // Verify the access token
    jwt.verify(accessToken, process.env.ACCESS_JWT_SECRET, (err) => {
        if (!err) {
            // If no error, the token is still valid
            return res.json({ message: 'Access token is still valid.' });
        }

        // If the token has expired or is invalid
        if (err.name === 'TokenExpiredError') {

            const refreshToken = req.cookies.refreshToken;

            if (!refreshToken) return res.sendStatus(403); // Forbidden if no refresh token

            // Verify the refresh token
            jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET, (err, user) => {
                if (err) return res.sendStatus(403);

                const newAccessToken = jwt.sign({ payload }, process.env.ACCESS_JWT_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });

                res.cookie('accessToken', newAccessToken, { httpOnly: true, secure: true });

                res.json({ msg: "Token generated" });
            });
        } else {
            res.sendStatus(403);
        }
    });
}

export default regenerateAccessToken