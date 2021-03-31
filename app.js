const //createError   = require('http-errors'),
      express       = require('express'),
      path          = require('path'),
      bodyParser    = require('body-parser');

var app = express();
app.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
});

/***************************************************************************
 *        BodyParser / Session / CookieParser / Static Assets / Logger Setup
 ***************************************************************************/
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(bodyParser.text());
app.use(express.json());


/**************************************************
 *        Cors Setup
 *************************************************/


/**************************************************
 *        Route Setup
 *************************************************/
const main = require('./routes/index');
app.use('/', main);
app.get('/favicon.ico', (req, res) => res.status(204));


/**************************************************
 *        Http Error
 *************************************************/
// 404 page
app.use(function(req, res, next){
  res.status(404);
  var config = {
      layout: 'layouts/layout_default',
      page_title: '404',
      menu_title: '404'
  };
  res.render("404", config);
});

//Http error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.type('txt').sendStatus('Something went wrong');
  next(err);
});

const port = process.env.PORT || 3003;

/* heroku hosting */
var http = require('http').Server(app);
const socketio = require('socket.io')(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
  }
});
const socketNotify = require('./helper/socket-notify');
socketNotify.init(socketio);
http.listen(port);