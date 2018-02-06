require('dotenv').config();
const express = require('express');
const proxy = require('express-http-proxy');
const path = require('path');

if (process.env.PORT) {
  const app = express();
  const port = process.env.PORT;
  const baseImageUrl = process.env.BASE_IMAGE_URL;
  const localBaseImageUrl = express.static(
    path.join(__dirname, '../public/images')
  );

  const proxyReqPathResolver = req => baseImageUrl + req.path;

  const proxyOptions = { proxyReqPathResolver };
  const proxyBaseImage = baseImageUrl
    ? proxy(baseImageUrl, proxyOptions)
    : localBaseImageUrl;

  app.use('/images', proxyBaseImage);

  app.get('/ping', (req, res) => res.send('pong'));

  app.listen(port, () => {
    console.info('App is running on port:', port);
  });
} else {
  console.error('Please Create a .env file');
  process.exit(0);
}
