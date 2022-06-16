const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user:process.env.user,
        pass:process.env.pass
    }
});

module.exports = transporter;