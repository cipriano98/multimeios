const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'youremail@address.com',
        pass: 'yourpassword'
    }
});
const mailOptions = {
    from: 'sender@email.com',
    to: 'to@email.com',
    subject: 'Subject of your email',
    html: '<p>Your html here</p>'
};
transporter.sendMail(mailOptions, function (err, info) {
    if (err)
        console.log(err);
    else
        console.log(info);
});
//# sourceMappingURL=mailerConfig.js.map