const express = require('express');
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors({
  origin: 'https://vdot-pt.web.app',
  methods: 'POST',
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());  // Ensure that the body is parsed as JSON

// Proxy endpoint to call the external token generation API
app.post('/api/proxy-generate-token', async (req, res) => {
  const { channelName, certificate, appId } = req.body;
  try {
    const response = await axios.post('https://token-neon.vercel.app/api/generate-token', {
      channelName,
      certificate,
      appId
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error generating token' });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port', process.env.PORT || 3000);
});
