import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import nodemailer from 'nodemailer';  

const app = express();

// Enable CORS
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
  }));
  

app.use(bodyParser.json());

// Define the route for sending emails
app.post('/send-email', async (req, res) => {
    const { to, subject, text, attachment } = req.body;
  
    // Configure nodemailer with Gmail SMTP settings
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'johnmarkbee@gmail.com',
        pass: 'fmnvivnpczzbzisw'
      }
    });
  
    const mailOptions = {
      from: 'johnmarkbee@gmail.com',
      to: to,
      subject: subject,
      text: text,
      attachments: [
        {
          content: attachment, // base64-encoded content
          filename: 'attachment.pdf',
          type: 'application/pdf',
          disposition: 'attachment'
        }
      ]
    };
  
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).send('Email sent successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error occurred while sending email');
    }
  });
  
  // Start the server
  app.listen(3001, () => {
    console.log('Server is running on port 3001');
  });