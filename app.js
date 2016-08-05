const express = require('express');

const app = express();
const port = 5000;

app.listen(port,(err)=>{
    console.log('server listen at ' + port);
});

app.get('/',(req,res)=>{
    res.send('Hello world!');
});

app.post('/',(req,res)=>{
    res.send('POST recieved!');
});