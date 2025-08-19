const nodemailer = require('nodemailer');
const config = require('../config');

const transporter = nodemailer.createTransport({
    host: 'demo.abmpakistan.org',
    port: 465,
    secure: true, // Use true for 465, false for other ports
    auth: {
        user: config.emailUser,
        pass: config.emailPass
    }
});

const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: config.emailUser,
        to,
        subject,
        text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

module.exports = sendEmail;
