const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const routes = require('./routes');
const dblib = require('./lib/dblib');
const chat = require('./controller/chat');

const app = express();
const port = 5000;

const server = app.listen(port,(err)=>{
    console.log('server listen at ' + port);
});

//app.use(express.static('public'));
app.use('/static', express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(cookieParser());
app.set('views', 'views');
app.set('view engine', 'ejs');

app.use((req, res, next) => {
  //console.log('Time: ', Date.now());
  console.log('Time: ',new Date());
  next();
});

app.use('/', routes.pages);
app.use('/api',routes.api);
app.use('/doc',routes.markdown);
app.use('/app',routes.app);
app.use('/io',routes.io);
app.use('/c',routes.chat);

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err // {}
  });
});

chat(server);

module.exports = app;