import express from 'express';
var sendEmailRouter = express.Router();
import nodemailer from 'nodemailer';
import File from '../models/Schema.mjs';


sendEmailRouter.post('/',async (req,res) => {
try{
    const filter = { downloadLink: req.body.downloadLink };
    const update = { sender: req.body.sender,
                    receiver: req.body.receiver };

    let doc = await File.findOneAndUpdate(filter, update);
    const file = await File.findOne({ downloadLink: req.body.downloadLink });
     
console.log(req.body.sender);
console.log(req.body.receiver);
console.log(req.body.downloadLink);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN
        }
    });

    const mailConfigurations = {
        from: `${req.body.sender}`,
        to: `${req.body.receiver}`,
        subject: `File shared by ${req.body.sender}`,
        text: `Hi! ${req.body.sender} Shared a file. Link is 
            ${req.body.downloadLink} `
    };

    transporter.sendMail(mailConfigurations, function (error, info) {
        if (error) throw Error(error);
        console.log('Email Sent Successfully');
    });
    return res.render('emailSent', {
        sender:req.body.sender,
        fileName: req.body.downloadLink
    });
}
catch(e)
{
    console.log(e);
}
})

export default sendEmailRouter;