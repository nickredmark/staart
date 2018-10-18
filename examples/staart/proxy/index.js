require('dotenv').config();
const httpProxy = require('express-http-proxy');
const express = require('express');

const app = express();

const proxy = (host, root) =>
  httpProxy(host, {
    proxyReqPathResolver: (req) => `${root}${req.url}`,
  });

app.get('/isalive', (req, res) => res.sendStatus(204));
app.use('/api', proxy(process.env.API_HOST, '/api'));
app.use('/auth', proxy(process.env.AUTH_HOST, '/auth'));
app.use('/', httpProxy(process.env.APP_HOST));

app.listen(process.env.PORT, process.env.HOST, () =>
  console.log(`Proxy running at ${process.env.HOST}:${process.env.PORT}`),
);
