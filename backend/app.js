const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController.js');
const userRouter = require('./routes/userRoutes');
const genreRouter = require('./routes/genreRoutes');
const movieRouter = require('./routes/movieRoutes');
const cinemaRouter = require('./routes/cinemaRoutes');
const hallRouter = require('./routes/hallRoutes');
const barRouter = require('./routes/barRoutes');
const showtimeRouter = require('./routes/showtimeRoutes');
const ticketRouter = require('./routes/ticketRoutes');
const backupRouter = require('./routes/backupRoutes');

const ticketController = require('./controllers/ticketController');

const app = express();

app.enable('trust proxy');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(cors());
app.options('*', cors());
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: {
      allowOrigins: [
        'https://res.cloudinary.com',
        'https://maps.googleapis.com',
      ],
    },
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        'img-src': [
          "'self'",
          'blob:',
          'data:',
          'https://res.cloudinary.com',
          'https://maps.googleapis.com',
          'https://maps.gstatic.com',
        ],
        'script-src': [
          "'self'",
          'https://maps.googleapis.com',
          'https://js.stripe.com/v3',
        ],
        'connect-src': ["'self'", 'https://maps.googleapis.com'],
        'frame-src': [
          "'self'",
          'https://www.youtube-nocookie.com',
          'https://www.youtube.com/',
          'https://js.stripe.com',
        ],
      },
    },
  })
);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

app.post(
  '/webhook-checkout',
  express.raw({ type: 'application/json' }),
  ticketController.webhookCheckout
);

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

app.use(
  mongoSanitize({
    allowDots: true,
  })
);

app.use(xss());

app.use(hpp());

app.use(compression());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/genres', genreRouter);
app.use('/api/v1/movies', movieRouter);
app.use('/api/v1/cinemas', cinemaRouter);
app.use('/api/v1/halls', hallRouter);
app.use('/api/v1/bars', barRouter);
app.use('/api/v1/showtimes', showtimeRouter);
app.use('/api/v1/tickets', ticketRouter);
app.use('/api/v1/backups', backupRouter);

app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.all('*', (req, res, next) => {
  if (req.originalUrl.includes('api'))
    return next(
      new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
    );
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.use(globalErrorHandler);

module.exports = app;
