import User from "../models/user.js";
import sendOtpEmail from "../services/nodemailer.js";


const forgotPassController = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
  
    if (!user) {
      return res.status(404).send('User not found');
    }
  
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpiration = Date.now() + 300000; // 5 minutes
    await user.save();
  
    await sendOtpEmail(email, otp);
    res.send('OTP sent to your email');
  }



export default forgotPassController