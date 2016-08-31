const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const app = express();
const logger = require('morgan');
const socketio = require('socket.io');
const dblib = require('./lib/dblib');
const port = 5000;

const server = app.listen(port,(err)=>{
    console.log('server listen at ' + port);
});
const io = socketio(server);

//app.use(express.static('public'));
app.use('/static', express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
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

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.send(socket.id);
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat message', (msg)=>{
    console.log(msg);
    dblib.connect()
    .then((conn)=>{
      return dblib.insert('chat',{date:Date.now(), message:msg},conn);
    })
    .catch((error)=>{
        console.log(error);
    });
    io.emit('chat message', msg);
  });
});

module.exports = app;