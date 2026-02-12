const express = require('express');
const { Resend } = require('resend');
const cors = require('cors');
require('dotenv').config({ path: '.env.local' });

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(express.json());
app.use(cors()); // Allow your frontend to talk to this server

app.post('/api/apply', async (req, res) => {
    const { name, email, organization, objective, vision } = req.body;

    // Basic validation
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required.' });
    }

    try {
        // 1. Send the "Welcome/Confirmation" Email to the User
        const { data, error } = await resend.emails.send({
            from: 'Elite Experience <concierge@resend.dev>', // Using default domain for testing if verified domain not set
            to: [email],
            subject: 'Regarding your inquiry: The Elite Experience',
            html: `
        <div style="background-color: #020617; color: #E2E8F0; padding: 40px; font-family: sans-serif;">
          <h1 style="font-style: italic; color: #ffffff;">Elite Experience</h1>
          <p>Dear ${name},</p>
          <p>Your application for membership has been successfully logged.</p>
          <p>Our executive team will review your vision${organization ? ` for <strong>${organization}</strong>` : ''} regarding <strong>${objective || 'your strategic goals'}</strong>.</p>
          <hr style="border-color: #1e293b; margin: 20px 0;" />
          <p style="font-size: 10px; color: #64748b; text-transform: uppercase;">Strictly Confidential</p>
        </div>
      `,
        });

        if (error) {
            console.error("Resend Error:", error);
            return res.status(400).json({ error });
        }

        // 2. Optional: Send a notification to YOURSELF
        // Using a placeholder email or the same email for testing purposes
        // In production, this would be the admin email
        await resend.emails.send({
            from: 'System <onboarding@resend.dev>',
            to: ['delivered@resend.dev'], // Send to Resend's test address or configured admin
            subject: `New Elite Application: ${name}`,
            text: `New lead from ${organization || 'N/A'}. Objective: ${objective || 'N/A'}. Vision: ${vision || 'N/A'}`,
        });

        res.status(200).json({ message: 'Application processed successfully', id: data.id });

    } catch (err) {
        console.error("Server Error:", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Executive server running on port ${PORT}`));
