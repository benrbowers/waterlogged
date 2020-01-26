var createError = require('http-errors');
var express = require('express');
const admin = require('./firebase-admin/admin');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cors = require('cors')

var app = express();

app.use(cors({credentials: true, origin: true}))
app.use(express.json()) 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/pub', indexRouter);
app.use('/api', verifyToken);
app.use('/api', usersRouter);

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

// verify firebase token
async function verifyToken(req, res, next) {
  const idToken = req.headers.authorization;

  if(req.method === 'OPTIONS') {
    return next();
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    if(decodedToken) {
      req.body.uid = decodedToken.uid;

      return next();
    } else {
      return res.status(401).send('You are not authorized!');
    }
  } catch (e) {
    return res.status(401).send('You are not authorized!');
  }
}

module.exports = app;
