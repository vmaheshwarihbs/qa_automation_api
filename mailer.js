var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
service: 'gmail',
auth: {
user: 'user@gmail.com',
pass: 'password'
}
});

var mailOptions = {
from: 'sender@gmail.com',
to: 'receiver@gmail.com',
subject: 'Sending Email using Node.js',
text: 'Hi, This email is send using NodeMailer.....',
attachments: [
{
path: '/report/filename'
}
]
};

transporter.sendMail(mailOptions, function(error, info){
if (error) {
console.log(error);
} else {
console.log('Email sent: ' + info.response);
}
});
