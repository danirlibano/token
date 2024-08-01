const express = require('express');
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');
const config = require('../config');

const router = express.Router();

router.post('/generate-token', (req, res) => {
  const channelName = req.body.channelName;
  const uid = req.body.uid || 0; // Use 0 for the default UID
  const role = RtcRole.PUBLISHER;
  const expirationTimeInSeconds = 3600;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  const token = RtcTokenBuilder.buildTokenWithUid(
    config.APP_ID,
    config.APP_CERTIFICATE,
    channelName,
    uid,
    role,
    privilegeExpiredTs
  );

  res.json({ token });
});

module.exports = router;
