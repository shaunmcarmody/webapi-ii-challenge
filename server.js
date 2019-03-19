const express = require('express');

const postsRouter = require('./posts/postsRouter.js');

const server = express();
server.use(express.json());

server.all('/', (req, res, next) => {
  console.log('Params:', req.params);
  console.log('Query:', req.query);
  next();
});

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Posts API</h>
    <p>Welcome to the Lambda Posts API</p>
  `);
});

server.use('/api/posts', postsRouter);

module.exports = server;