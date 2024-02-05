const express = require('express');

const emojis = require('./emojis');
const sendMail = require('./mails');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.post('/send', sendMail);

router.use('/emojis', emojis);

module.exports = router;
