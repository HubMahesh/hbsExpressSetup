var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require("fs");

var index = require('./routes/index');
var users = require('./routes/users');
var hbs = require("hbs");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);



hbs.compile(__dirname + 'views/layouts');
hbs.registerPartial('header',fs.readFileSync(__dirname+'/views/layouts/header.html', 'utf8'));
hbs.registerPartial('footer',fs.readFileSync(__dirname+'/views/layouts/footer.html', 'utf8'));
hbs.registerPartial('menu',fs.readFileSync(__dirname+'/views/layouts/menu.html', 'utf8'));
hbs.registerPartial('header-intro',fs.readFileSync(__dirname+'/views/layouts/header-intro.html', 'utf8'));

var myHelpers= require(path.resolve('components/helpers'));
hbs.registerHelper('alert',myHelpers);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
   // res.locals.message = req.flash('message') || null;
   res.locals.user = "mahesh22u";
   next();
});

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
