import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  port:process.env.PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOtpEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP for Password Reset',
    text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
  };

  await transporter.sendMail(mailOptions);
};

export default sendOtpEmail;
