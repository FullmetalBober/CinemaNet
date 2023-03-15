const express = require('express');
const rateLimiters = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController.js');
// const movieRouter = require('./routes/movieRoutes');
// const placeRouter = require('./routes/placeRoutes');
// const scheduleRouter = require('./routes/scheduleRoutes');
// const userRouter = require('./routes/userRoutes');

const app = express();

app.use(helmet());

const limiter = rateLimiters({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

app.use(express.json({ limit: '10kb' }));

app.use(mongoSanitize());

app.use(xss());

// app.use(hpp({
//     whitelist: [
//         'duration'
//     ]
// }));

// app.use('/api/v1/movies', movieRouter);
// app.use('/api/v1/places', placeRouter);
// app.use('/api/v1/schedules', scheduleRouter);
// app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;