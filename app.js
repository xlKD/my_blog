var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var lessMiddleware = require('less-middleware');

var index = require('./routes/index');
var postAdmin = require('./routes/postAdmin');
var slideAdmin = require('./routes/slideAdmin');
var posts = require('./routes/posts');
var tags = require('./routes/tags');
var categories = require('./routes/categories');

const expressHandlebars  = require('express-handlebars');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', expressHandlebars({
  extname: '.hbs',
  helpers: require('./handlebarHelpers'),
  defaultLayout: 'masterLayout',
  layoutsDir: 'views/'
}));
app.set('view engine', 'hbs');
// Set layout root file as views/masterLayout.hbs
app.set('view options', { layout: 'masterLayout' });

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// https://expressjs.com/en/4x/api.html#app.use
// routers
app.use('/', index);
app.use('/posts/', postAdmin);
app.use('/slides/', slideAdmin);
app.use('/api/posts/', posts);
app.use('/api/tags/', tags);
app.use('/api/categories/', categories);

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
