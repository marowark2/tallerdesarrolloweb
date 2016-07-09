var express =       require('express');
var path =          require('path');
var favicon =       require('serve-favicon');
var logger =        require('morgan');
var cookieParser =  require('cookie-parser');
var bodyParser =    require('body-parser');
var db =            require('./api');
var routes =        require('./routes/index'); //Ruta al índice
//var users = require('./routes/users'); no se usa

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes); // nos lleva a la index.html
app.get('/index',db.getPersonasByFilter); //** OK
app.get('/update',db.updatePersona);      //** HACIENDO
app.get('/delete',db.deletePersona);
app.post('/insert',db.insertPersona);
//app.get('/search',db.searchPersona);  


// app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//puerto del localhost donde se va a correr el sitio
app.listen(3000, function () {
  console.log('Listening at http://localhost:3000 exporting the directory');
});

module.exports = app;