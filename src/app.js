/* eslint-disable no-console */
const express = require('express');
const morgan = require('morgan');
const nodemailer = require('nodemailer');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈',
  });
});

app.post('/send', (req, res) => {
  const output = `
  <p>You have a new contact request</p>
  <h3>Contact Details</h3>
  <ul>
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
    <li>State of Residence: ${req.body.state}</li>
    <li>Phone Number: ${req.body.number}</li>
  </ul>
  <h3>Message</h3>
  <p>${req.body.message}</p>
  `;
  console.log(req);
  console.log(output);
  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.eu',
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: 'jude@sidarr.com',
      pass: 'Henryperp1&',
    },
  });

  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Nodemailer Contact" <jude@sidarr.com>', // sender address
      to: 'jude58005@gmail.com, contact@topfundcapitalltd.com', // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: output, // html body
    });

    console.log('Message sent: %s', info.messageId);
    res.send('Response Successfully received');
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  }

  // eslint-disable-next-line no-console
  main().catch(console.error);
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
