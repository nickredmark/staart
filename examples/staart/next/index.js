require('dotenv').config();
const next = require('next');
const express = require('express');
const cookieParser = require('cookie-parser');

const start = async () => {
  try {
    const app = express();
    app.use(cookieParser());

    const nextApp = next({
      dev: process.env.NODE_ENV !== 'production',
    });
    const handle = nextApp.getRequestHandler();

    await nextApp.prepare();

    app.get('*', (req, res) => {
      return handle(req, res);
    });

    await app.listen(process.env.PORT, process.env.HOST);

    console.log(`Next online at ${process.env.HOST}:${process.env.PORT}`);
  } catch (e) {
    console.error(e);
  }
};

start();
