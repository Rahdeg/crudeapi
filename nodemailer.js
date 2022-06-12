const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user:'crudeguys@outlook.com',
        pass:'diamond2022'
    }
});






module.exports = transporter;