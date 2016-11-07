const express = require('express');
const homeRouter = express.Router();

homeRouter.get('/', (req, res) => {
  res.json('home');
});

module.exports = homeRouter;
