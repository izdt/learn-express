const express = require('express');

const app = express();
const port = 5000;

app.listen(port,(err)=>{
    console.log('server listen at ' + port);
});
