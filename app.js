const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const app = express();
const port = 5000;

//app.use(express.static('public'));
app.use('/static', express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.set('views', 'views');
app.set('view engine', 'ejs');

app.use((req, res, next) => {
  //console.log('Time: ', Date.now());
  console.log('Time: ',new Date());
  next();
});

app.listen(port,(err)=>{
    console.log('server listen at ' + port);
});

app.use('/', routes.pages);
app.use('/api',routes.api);
app.use('/doc',routes.markdown);
app.use('/app',routes.app);

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err // {}
  });
});

module.exports = app;