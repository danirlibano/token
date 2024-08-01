const express = require('express');
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');
const app = express();
const PORT = process.env.PORT || 3000;

// Replace with your Agora App ID and App Certificate
const APP_ID = '341ac0f2105347e2bfbec5eba4016f07';
const APP_CERTIFICATE = '43bafbbc5384487a898658b2fa2b2240';

app.use(express.json());

app.post('/api/generate-token', (req, res) => {
  const channelName = req.body.channelName;
  const uid = req.body.uid || 0; // Use 0 for the default UID
  const role = RtcRole.PUBLISHER;
  const expirationTimeInSeconds = 3600;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  const token = RtcTokenBuilder.buildTokenWithUid(
    APP_ID,
    APP_CERTIFICATE,
    channelName,
    uid,
    role,
    privilegeExpiredTs
  );

  res.json({ token });
});

module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
