const config = require('./utils/config');
const express = require('express');
const app = express();

const cors = require('cors');
const personsRouter = require('./controllers/persons');

const { info, error } = require('./utils/logger');
const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
} = require('./utils/middleware');
const mongoose = require('mongoose');


info('connecting to', config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    info('connected to MongoDB');
  })
  .catch((error) => {
    error('error connection to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(requestLogger);

app.use('/api/notes', personsRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
