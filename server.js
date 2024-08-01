const express = require('express');
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Generate RTC token
app.post('/api/generate-token', (req, res) => {
  console.log('Received request body:', req.body);  // Log request body

  const { channelName, certificate, appId } = req.body;
  if (!channelName) {
    return res.status(400).json({ error: 'Channel name is required' });
  }

  const uid = req.body.uid || 0; // Use 0 for the default UID
  const role = RtcRole.PUBLISHER;
  const expirationTimeInSeconds = 3600;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  const token = RtcTokenBuilder.buildTokenWithUid(
    appId,
    certificate,
    channelName,
    uid,
    role,
    privilegeExpiredTs
  );

  res.json({ token });
});

module.exports = app;  // Export the app for use in vercel.json
