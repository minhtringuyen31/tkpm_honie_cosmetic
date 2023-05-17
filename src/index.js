const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const hbs = require('hbs');
require('dotenv').config();

//set router
const indexRouter = require('./components/home');
const productRouter = require('./components/products/productRouter');
const authRouter = require('./components/auth/authRouter');
const passport = require('./components/auth/passport');
const accountRouter = require('./components/account/accountRouter');
const cartRouter = require('./components/cart/cartRouter');
const orderRouter = require('./components/order/orderRouter');
const storeRouter = require('./components/store/storeRouter');



const app = express();

// view engine setup   
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


var blocks = {};

hbs.registerHelper('extend', function (name, context) {
  var block = blocks[name];
  if (!block) {
    block = blocks[name] = [];
  }

  block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
});

hbs.registerHelper('block', function (name) {
  var val = (blocks[name] || []).join('\n');

  // clear the block
  blocks[name] = [];
  return val;
});


app.use(session({
  secret: 'very secret keyboard cat',
  resave: false,
  saveUninitialized: false,
}))

app.use(passport.authenticate('session'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function (req, res, next) {
  // console.log("res.user");
  // console.log(req.user);
  res.locals.user = req.user;
  next();
});


app.use('/index', indexRouter);
app.use('/product', productRouter);
app.use('/auth', authRouter);
app.use('/account', accountRouter);
app.use('/cart', cartRouter);
app.use('/order', orderRouter);


app.use('/store',storeRouter);



//passport


// app.use(passport.initialize());



// catch 404 and forward to error handler
app.use(function (req,
  res,
  next) {
  next(createError(404));
});

// error handler
app.use(function (err,
  req,
  res,
  next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

// create new branch
