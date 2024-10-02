import User from "../../models/user.js";
import bcrypt from 'bcrypt'

const resetPassController = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ email });
  
    if (!user || user.otp !== otp || user.otpExpiration < Date.now()) {
      return res.status(400).send('Invalid or expired OTP');
    }
  
    user.password = await bcrypt.hash(newPassword, 10);
    user.otp = undefined;
    user.otpExpiration = undefined;
    await user.save();
  
    res.send('Password has been reset successfully');
  }

  export default resetPassController