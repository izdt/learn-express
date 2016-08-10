const express = require('express');

const app = express();
const port = 5000;

app.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
})

app.listen(port,(err)=>{
    console.log('server listen at ' + port);
});

app.get('/',(req,res)=>{
    res.send('Hello world!');
});

app.get('/book',(req,res)=>{
    res.send('Book!');
});

app.get(/.*test$/,(req,res)=>{
    res.send('Regex that match /.*test$/');
});

app.get('/users/:userId/books/:bookId',(req,res)=>{
    res.send(req.params);
});

app.get('/:p1.:p2',(req, res, next) => {
  console.log('the response will be sent by the next function ...');
  next();
},(req, res) => {
  res.send('p1:'+req.params.p1+",p2:"+req.params.p2);
});

app.route('/api')
  .get((req, res) => {
    res.send('Get method');
  })
  .post((req, res) => {
    res.send('Post method');
  })
  .put((req, res) => {
    console.log(req);
    //res.send(req);
    res.send('Put method');
  })
  .delete((req,res) => {
      res.send('Delete method');
});

app.post('/',(req,res)=>{
    res.send('POST recieved!');
});

app.all('/secret', (req, res, next)=>{
	console.log('access secret section');
	next();
});

