const sgMail = require("@sendgrid/mail");
const { getPasswordResetHtml } = require("./html-generator-service");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, subject, token) => {
  const msg = {
    to, // Change to your recipient
    from: "info@bizbook365.com", // Change to your verified sender
    subject,
    text: token,
    html: getPasswordResetHtml(token),
  };

  const response = await sgMail.send(msg);
  console.log(response);
  return response;
};

module.exports = { sendEmail };
