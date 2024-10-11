import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';  // Import CORS middleware
import sgMail from '@sendgrid/mail';

// Initialize Express and use body-parser to parse the request body
const app = express();

// Enable CORS for all origins
app.use(cors({
    origin: 'http://localhost:5173',  // Allow requests from this frontend origin
    methods: ['GET', 'POST'],  // Allow GET and POST requests
    allowedHeaders: ['Content-Type', 'Authorization']  // Allow these headers in requests
}));

app.use(bodyParser.json());

// Set the SendGrid API key
sgMail.setApiKey('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');

// Define the route for sending emails
app.post('/send-email', async (req, res) => {
    const { to, subject, text, attachment } = req.body;

    // Define the email content
    const msg = {
        to: to, // Recipient email
        from: 'johnmarkbee@gmail.com', // Replace with your verified SendGrid email
        subject: subject,
        text: text,
        attachments: [
            {
                content: attachment, // base64-encoded attachment content
                filename: 'attachment.pdf', // Replace with the actual filename
                type: 'application/pdf', // MIME type of the attachment
                disposition: 'attachment'
            }
        ]
    };

    try {
        await sgMail.send(msg);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred while sending email');
    }
});

// Start the server on port 3001
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
