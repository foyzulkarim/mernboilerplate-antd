const sgMail = require("@sendgrid/mail");
const {
  getPasswordResetHtml,
  getPasswordResetSuccessfulHtml,
  getAccountCreatedHtml,
} = require("./html-generator-service");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendPasswordResetEmail = async (to, subject, token) => {
  let recipient = to;
  if (to.endsWith("mernboilerplate.com")) {
    recipient = process.env.DEFAULT_EMAIL_RECEIVER;
  }

  const msg = {
    to: recipient, // Change to your recipient
    from: process.env.EMAIL_SENDER || "info@bizbook365.com", // Change to your verified sender
    subject,
    text: token,
    html: getPasswordResetHtml(token),
  };

  const response = await sgMail.send(msg);
  return response;
};

const sendPasswordResetSuccessfulEmail = async (to, subject) => {
  let recipient = to;
  if (to.endsWith("mernboilerplate.com")) {
    recipient = process.env.DEFAULT_EMAIL_RECEIVER;
  }

  const msg = {
    to: recipient, // Change to your recipient
    from: process.env.EMAIL_SENDER || "info@bizbook365.com", // Change to your verified sender
    subject,
    text: "Password reset successful",
    html: getPasswordResetSuccessfulHtml(),
  };

  const response = await sgMail.send(msg);
  return response;
};

const sendAccountCreatedEmail = async (to, subject, token, user) => {
  let recipient = to;
  if (to.endsWith("mernboilerplate.com")) {
    recipient = process.env.DEFAULT_EMAIL_RECEIVER;
  }

  const msg = {
    to: recipient, // Change to your recipient
    from: process.env.EMAIL_SENDER || "info@bizbook365.com", // Change to your verified sender
    subject,
    text: token,
    html: getAccountCreatedHtml(user, token),
  };

  const response = await sgMail.send(msg);
  return response;
};

module.exports = {
  sendPasswordResetEmail,
  sendPasswordResetSuccessfulEmail,
  sendAccountCreatedEmail,
};
