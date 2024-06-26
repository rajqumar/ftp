const { setConfig } = require('next/config');
setConfig(require('../next.config'));

const express = require('express');
const next = require('next');
const { Signale } = require('signale');

const dev = process.env.NODE_ENV !== 'production';

const port = process.env.PORT || 3000;
const app = next({ dev });

const handle = app.getRequestHandler();

const options = {
  scope: 'app server',
};
const signale = new Signale(options);

(async () => {
  await app.prepare();
  const server = express();

  server.use('/static', express.static('public/static'));

  server.get('*', (req, res) => handle(req, res));

  await server.listen(port);
  signale.success(`<> React Next Boilerplate ready on localhost:${port}`);
})();
