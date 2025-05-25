const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Read template and replace placeholders
function getHtmlTemplate(name, verifyLink) {
  const filePath = path.join(__dirname, 'verifyEmail.html');
  let html = fs.readFileSync(filePath, 'utf-8');
  html = html.replace('{{name}}', name);
  html = html.replace('{{verifyLink}}', verifyLink);
  return html;
}

// Configure and send email
async function sendVerificationEmail(toEmail, name, verifyLink) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'verigeektech@gmail.com',
      pass: process.env.PASSWORD_EMAIL // ⚠️ WARNING: Never hardcode credentials! Use environment variables instead.
    }
  });

  const html = getHtmlTemplate(name, verifyLink);
  console.log(toEmail)
  const mailOptions = {
    from: 'verigeek <verigeektech@gmail.com>',
    to: toEmail,
    subject: 'Verify your email address',
    html
  };

  const info = await transporter.sendMail(mailOptions);
  console.log('Verification email sent:', info.messageId);
}

// ✅ Export the function
module.exports = { sendVerificationEmail };
