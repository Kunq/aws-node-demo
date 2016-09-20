var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var routes = require('./routes/index');

/**
 * Create the Express application.
 */
var app = express();

/**
 * Application settings.
 */
app.set('trust proxy',true);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.locals.siteName = 'Heroku Demo';


/**
 * Route initialization.
 */
app.use('/', routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});

console.log('environment ' + app.get('env'));

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    if (err.status == '404') {
    	res.render('404', {
              message: err.message,
              error: err
    	});
    } else {	
        res.render('error', {
          message: err.message,
          error: err.stacktrace
	  });
   }
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  if (err.status == '404') {
	  res.render('404', {
    message: err.message,
    error: {} 
	});
  } else {	
     res.render('error', {
     message: err.message,
     error: {} 
	});
  }
});



  /**
   * Start the web server.
   */
  var port = normalizePort(process.env.PORT || '3000');
  app.set('port', port);


  app.listen(port, function () {
    console.log('Server listening on http://localhost:' + port);
  });


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

