const express = require('express');
const router = express.Router();
module.exports = router;

router.get('/',(req,res)=>{
    console.log('Cookies: ', req.cookies);
    res.render('index');
    //res.send('Hello world!');
});

router.get('/toBook', function(req, res) {
  res.redirect('/book');
});

router.get('/hi',(req,res)=>{
	res.render('hi',{
		title:'hello world',
		content:'render content by ejs'
	});
});

router.get('/book',(req,res)=>{
    res.send('Book!');
});

router.get(/.*test$/,(req,res)=>{
    res.send('Regex that match /.*test$/');
});

router.get('/users/:userId/books/:bookId',(req,res)=>{
    res.send(req.params);
});

router.get('/abc/:p1.:p2',(req, res, next) => {
  console.log('the response will be sent by the next function ...');
  next();
},(req, res) => {
  res.send('p1:'+req.params.p1+",p2:"+req.params.p2);
});

router.route('/api')
  .get((req, res) => {
    res.send('Get method');
  })
  .post((req, res) => {
    res.send(req.body);
    //res.send('Post method');
  })
  .put((req, res) => {
    console.log(req);
    //res.send(req);
    res.send('Put method');
  })
  .delete((req,res) => {
      res.send('Delete method');
});

router.post('/',(req,res)=>{
    res.send('POST recieved!');
});

router.all('/secret', (req, res, next)=>{
	console.log('access secret section');
	next();
});
