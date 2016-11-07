const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const port = process.argv[2] || process.env.PORT || 3000;

app.listen(port, () => console.log('Server running on Port', port));

const isDev = !('NODE_ENV' in process.env) && require('dotenv').config() && true;

app.use(logger(isDev ? 'dev' : 'common'));

app.use(bodyParser.json());

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Something Broke');
});
