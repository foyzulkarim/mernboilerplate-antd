const sgMail = require("@sendgrid/mail");
const {
  getPasswordResetHtml,
  getPasswordResetSuccessfulHtml,
} = require("./html-generator-service");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendPasswordResetEmail = async (to, subject, token) => {
  const msg = {
    to, // Change to your recipient
    from: process.env.EMAIL_SENDER || "info@bizbook365.com", // Change to your verified sender
    subject,
    text: token,
    html: getPasswordResetHtml(token),
  };

  const response = await sgMail.send(msg);
  console.log(response);
  return response;
};

const sendPasswordResetSuccessfulEmail = async (to, subject) => {
  const msg = {
    to, // Change to your recipient
    from: process.env.EMAIL_SENDER || "info@bizbook365.com", // Change to your verified sender
    subject,
    text: "Password reset successful",
    html: getPasswordResetSuccessfulHtml(),
  };

  const response = await sgMail.send(msg);
  console.log(response);
  return response;
};

module.exports = { sendPasswordResetEmail, sendPasswordResetSuccessfulEmail };
