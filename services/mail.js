require("dotenv").config();

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  port: 465,
  auth: {
    user: process.env.MY_EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendmail = async (token_for_verify, EMAIL) => {
  try {
    await transporter.sendMail({
      from: "ezSell",
      to: EMAIL,
      subject: "Confirm Your Signup",
      text: "Please confirm your signup by clicking the link below.",
      html: `
      <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; line-height: 1.6;">
        <h1 style="color: #5D9CEC;">Welcome to ezSell!</h1>
        <p>Thank you for signing up with us. Please confirm your email address by clicking the button below:</p>
        <a href="https://ezsell-backend.vercel.app/log/confirm/${token_for_verify}" 
          style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #5D9CEC; color: white; text-decoration: none; font-size: 16px; border-radius: 5px;">
          Confirm Signup
        </a>
        <p>If you did not sign up for an account, please disregard this email.</p>
        <p style="margin-top: 40px;">Thanks,<br/>The ezSell Team</p>
      </div>
      `,
    });
    return 1;
  } catch (error) {
    console.log("nodemailer error---SG-->", error);
  }
};

const mail_for_password = async (token_for_verify, EMAIL) => {
  try {
    await transporter.sendMail({
      from: "ezSell",
      to: EMAIL,
      subject: "Reset Your Password",
      text: "Please use the link below to reset your password.",
      html: `
      <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; line-height: 1.6;">
        <h1 style="color: #5D9CEC;">Reset Your Password</h1>
        <p>We received a request to reset your password. Click the button below to reset it:</p>
        <a href="https://ezsell-backend.vercel.app/user/updatepass/${token_for_verify}" 
          style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #5D9CEC; color: white; text-decoration: none; font-size: 16px; border-radius: 5px;">
          Set Password
        </a>
        <p>If you didn't request a password reset, you can ignore this email. Your password won't change.</p>
        <p style="margin-top: 40px;">Thanks,<br/>The ezSell Team</p>
      </div>
      `,
    });
    return 1;
  } catch (error) {
    console.log("nodemailer error---SG-->", error);
  }
};

module.exports = { sendmail, mail_for_password };
