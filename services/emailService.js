import nodemailer from'nodemailer';
import { google } from 'googleapis';


function sendEmail({from,to,subject,text,html}){

	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
		  type: 'OAuth2',
		  user: secure_configuration.EMAIL_USERNAME,
		  pass: secure_configuration.PASSWORD,
		  clientId: secure_configuration.CLIENT_ID,
		  clientSecret: secure_configuration.CLIENT_SECRET,
		  refreshToken: secure_configuration.REFRESH_TOKEN
		}
	  });	

	  const mailConfigurations = {

		// It should be a string of sender email
		from: 'mrtwinklesharma@gmail.com',
		
		// Comma Separated list of mails
		to: 'smtwinkle451@gmail.com',
	
		// Subject of Email
		subject: 'Sending Email using Node.js',
		
		// This would be the text of email body
		text: 'Hi! There, You know I am using the'
		+ ' NodeJS Code along with NodeMailer '
		+ 'to send this email.'
	};
}