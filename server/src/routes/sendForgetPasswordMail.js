const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Generate random 6-digit verification code
function generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Read template and replace placeholders
function getHtmlTemplate(name, verificationCode, htmlTemplate = "forgetPassword.html") {
    const filePath = path.join(__dirname, htmlTemplate);
    let html = fs.readFileSync(filePath, 'utf-8');
    html = html.replace('{{name}}', name);
    html = html.replace('{{verificationCode}}', verificationCode);
    
    // Optional: Replace other placeholders if they exist in your template
    html = html.replace('{{unsubscribeLink}}', '#'); // Replace with actual unsubscribe link
    html = html.replace('{{privacyPolicyLink}}', '#'); // Replace with actual privacy policy link
    
    return html;
}

// Configure and send verification code email
async function sendVerificationCodeEmail(toEmail, name, verificationCode = null, htmlTemplate = "forgetPassword.html") {
    // Generate code if not provided
    if (!verificationCode) {
        verificationCode = generateVerificationCode();
    }
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'verigeektech@gmail.com',
            pass: process.env.PASSWORD_EMAIL // ⚠️ WARNING: Never hardcode credentials! Use environment variables instead.
        }
    });

    const html = getHtmlTemplate(name, verificationCode, htmlTemplate);
    console.log(`Sending verification code to: ${toEmail}`);
    console.log(`Generated verification code: ${verificationCode}`); // For debugging - remove in production

    const mailOptions = {
        from: 'Verigeek <verigeektech@gmail.com>',
        to: toEmail,
        subject: 'Your Password Reset Verification Code',
        html
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Verification code email sent:', info.messageId);
        return {
            success: true,
            messageId: info.messageId,
            verificationCode: verificationCode // Return the code for server-side verification
        };
    } catch (error) {
        console.error('Error sending verification email:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// Alternative function name for backward compatibility
async function sendVerificationForgetEmail(toEmail, name, verificationCode = null, htmlTemplate = "forgetPassword.html") {
    return await sendVerificationCodeEmail(toEmail, name, verificationCode, htmlTemplate);
}

// Function specifically for forgot password flow
async function sendForgotPasswordEmail(toEmail, name) {
    const verificationCode = generateVerificationCode();
    const result = await sendVerificationCodeEmail(toEmail, name, verificationCode, "forgetPassword.html");
    
    return {
        ...result,
        verificationCode: result.success ? verificationCode : null
    };
}

// ✅ Export the functions
module.exports = { 
    sendVerificationForgetEmail,
    sendVerificationCodeEmail, 
    sendForgotPasswordEmail,
    generateVerificationCode 
};