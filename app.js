const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const companyRouter = require('./routes/company');
const staffRouter = require('./routes/staff');
const shopRouter = require('./routes/shop');

const passport = require('passport');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const config = require('./config/index');

const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());

app.set('trust proxy', 1);

const limiter = rateLimit({
	windowMs: 10 * 1000, // 15*60*1000 15 minutes
	max: 10, //100 Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Apply the rate limiting middleware to all requests
app.use(limiter);

app.use(helmet()); //default

mongoose.connect(config.MONGODB_URI,{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

app.use(logger('dev'));
app.use(express.json({
    limit: '50mb'
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//init passport
app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/company', companyRouter);
app.use('/staff', staffRouter);
app.use('/shop', shopRouter);

app.use(errorHandler);

module.exports = app;
