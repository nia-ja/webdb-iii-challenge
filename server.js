const express = require('express');
const helmet = require('helmet');

const CohortsRouter = require('./cohorts/cohortsRouter.js');

const server = express();
server.use(express.json());
server.use(helmet());

server.use('/api/cohorts', CohortsRouter);

server.get('/', (req, res) => {
    res.send(`<h2>Lambda API!</h2>`)
  });

module.exports = server;