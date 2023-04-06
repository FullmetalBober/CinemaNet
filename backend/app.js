const path = require('path');
const express = require('express');
const expressWs = require('express-ws');
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
const reviewRouter = require('./routes/reviewRoutes');
const cinemaRouter = require('./routes/cinemaRoutes');
const hallRouter = require('./routes/hallRoutes');
const barRouter = require('./routes/barRoutes');
const showtimeRouter = require('./routes/showtimeRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
expressWs(app);

app.enable('trust proxy');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(cors());
app.options('*', cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

app.use(mongoSanitize());

app.use(xss());

// app.use(hpp({
//     whitelist: [
//         'duration'
//
//  ]
// }));

app.use(compression());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/genres', genreRouter);
app.use('/api/v1/movies', movieRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/cinemas', cinemaRouter);
app.use('/api/v1/halls', hallRouter);
app.use('/api/v1/bars', barRouter);
app.use('/api/v1/showtimes', showtimeRouter);
app.use('/api/v1/tickets', ticketRoutes);
app.use('/api/v1/orders', orderRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
