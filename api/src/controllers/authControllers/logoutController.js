
let logoutController = (req, res) => {
  // Clear both the access and refresh tokens
  res.clearCookie('accessToken', { httpOnly: true, secure: true });
  res.clearCookie('refreshToken', { httpOnly: true, secure: true });

  // Send a success response
  res.json({ message: 'Successfully logged out' });
}

export default logoutController