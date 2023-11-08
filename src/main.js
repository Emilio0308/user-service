const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const hpp = require('hpp');
require('dotenv').config();
const path = require('path');

const userRouter = require('./routes/users.routes');
const AppError = require('./utils/AppError');
const globalErrorHandle = require('./controller/error.controller');

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(hpp());

//morgan debe ir antes de las rutas//
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}


app.use('/public', express.static(path.join(__dirname, '/public')));
//rutas//
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`Cant find ${req.originalUrl} on this server!`, 404)
  );
});

app.use(globalErrorHandle);

module.exports = app;
