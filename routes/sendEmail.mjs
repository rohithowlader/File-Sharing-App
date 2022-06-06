import express from 'express';
var sendEmailRouter = express.Router();
import nodemailer from 'nodemailer';
import File from '../models/Schema.mjs';

sendEmailRouter.post('/', (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user:  process.env.EMAIL,
            pass: process.env.PASSWORD,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN
        }
        });
        
        const mailConfigurations = {
            from: 'rohithowlader2017@gmail.com',
            to: 'rohithowlader2017@gmail.com',
            subject: 'Sending Email using Node.js',
            text: 'Hi! There, You know I am using the NodeJS '
            + 'Code along with NodeMailer to send this email.'
        };
            
        transporter.sendMail(mailConfigurations, function(error, info){
            if (error) throw Error(error);
            console.log('Email Sent Successfully');
        });
        
})

export default sendEmailRouter;