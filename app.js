require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const { limiter } = require('./middlewares/rate-limit');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./errors/ErrorHandler');
const router = require('./routes/index');
const { MONGO_URL, PORT } = require('./utils/constants');

const app = express();

mongoose.connect(MONGO_URL,
  {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(requestLogger);

app.use(
  cors({
    origin: [
      'https://ya-diploma-backend.nomoredomains.club',
      'http://localhost:3000',
    ],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH'],
    allowedHeaders: ['Authorization', 'Content-Type'],
    credentials: true,
    optionsSuccesStatus: 200,
  }),
);

app.use(limiter);
app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
