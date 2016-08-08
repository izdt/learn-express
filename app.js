const express = require('express');

const app = express();
const port = 5000;

app.listen(port,(err)=>{
    console.log('server listen at ' + port);
});

app.get('/',(req,res)=>{
    res.send('Hello world!');
});

app.get('/book',(req,res)=>{
    res.send('Book!');
});

app.post('/',(req,res)=>{
    res.send('POST recieved!');
});

app.all('/secret', (req, res, next)=>{
	console.log('access secret section');
	next();
});

