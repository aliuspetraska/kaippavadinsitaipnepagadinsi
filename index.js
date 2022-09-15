const rateLimit = require('express-rate-limit');
const compression = require('compression');
const nocache = require('nocache');
const express = require('express');
const path =  require('path');
const cors = require('cors');

(async () => {
  const app = express();

  app.enable('strict routing');
  app.enable('trust proxy');

  app.use(cors());
  app.use(compression());
  app.use(nocache());
  app.use(rateLimit({ max: 0 }));

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(express.text());

  app.use(express.static(path.join(__dirname, 'dist')));

  app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });

  app.listen(process.env.PORT || 4200, () => {
    console.log(`[WORKER] ${process.pid} is running.`);
  });
})();
