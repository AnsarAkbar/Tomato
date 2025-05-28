const Email = require("../../models/email.models.js");
const { sendEmail } = require("../../utils/transport.js");

exports.sendContactEmail = async (req, res) => {
    try {
        const { email, subject, message } = req.body;
        
        if (!email || !subject || !message) {
            return res.status(400).json({ 
                message: 'All fields are required' 
            });
        }

        // First save to database
        const emailRecord = new Email({
            subject,
            message,
            status: "pending",
            senderId: req.user._id,
        });
        await emailRecord.save();

        // Then send the email
        const mailOptions = {
            from: req.body.email, // or use the user's email
            to: process.env.ADMIN_EMAIL, // your company email
            subject: `New Contact: ${subject}`,
            text: `From: ${name} <${email}>\n\nSubject: ${subject}\n\nMessage: ${message}`,
            html: `
                <h3>New Contact Form Submission</h3>
                <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `
        };

        const info = await sendEmail(mailOptions);
        
        // Update status if sent successfully
        emailRecord.status = "sent";
        await emailRecord.save();

        res.status(200).json({ 
            message: 'Message sent successfully', 
            info: info.messageId 
        });

    } catch (error) {
        // Update status if failed
        if (emailRecord) {
            emailRecord.status = "failed";
            await emailRecord.save();
        }
        
        console.error('Error sending email:', error);
        res.status(500).json({ 
            message: 'Error sending message', 
            error: error.message 
        });
    }
};

// Get all emails (for admin)
exports.getEmails = async (req, res) => {
    try {
        const emails = await Email.find().sort({ createdAt: -1 });
        res.status(200).json(emails);
    } catch (error) {
        console.error('Error fetching emails:', error);
        res.status(500).json({ 
            message: 'Error fetching messages', 
            error: error.message 
        });
    }
};