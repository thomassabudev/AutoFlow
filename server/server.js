const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ----------------------------------------------------
// N8N WEBHOOK URL (Production)
// ----------------------------------------------------
const N8N_WEBHOOK_URL = "http://localhost:5678/webhook/autoflow";
// ----------------------------------------------------

// API Route: Trigger Automation
app.post('/api/trigger', async (req, res) => {
    try {
        console.log("Received data from Frontend:", req.body);

        // 1. Send data to n8n Webhook
        const n8nResponse = await axios.post(N8N_WEBHOOK_URL, req.body);

        console.log("Sent to n8n, Status:", n8nResponse.status);

        // 2. Send Success back to Frontend
        res.status(200).json({
            message: "Automation Triggered Successfully!",
            n8nStatus: n8nResponse.status
        });

    } catch (error) {
        console.error("Error sending to n8n:", error.message);
        res.status(500).json({ message: "Failed to trigger automation", error: error.message });
    }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Backend Server running on http://localhost:${PORT}`);
});