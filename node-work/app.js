var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');
var session = require('express-session');

var indexRouter = require('./routes/index');
var siginRouter = require('./routes/signin');
var siginupRouter = require('./routes/siginup');
var aboutRouter = require('./routes/about');
var mandRouter = require('./routes/mand');
var shopRouter = require('./routes/shopping');
var addRouter = require('./routes/add');
var checkRouter = require('./routes/check');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html',ejs.__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("123"));
app.use(session({
  secret:"123",
  cookie:{
    maxAge:600000
  }
  }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/signin',siginRouter);
app.use('/siginup',siginupRouter);
app.use('/about-startup',aboutRouter);
app.use('/mand',mandRouter);
app.use('/shopping',shopRouter);
app.use('/add',addRouter);
app.use('/check',checkRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
