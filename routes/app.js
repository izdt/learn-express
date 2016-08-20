const express = require('express');
const router = express.Router();
const dblib = require('../lib/dblib');

module.exports = router;
const callback = (res)=>{
    console.log(res);
};
router.get('/testdb',(req,res)=>{
    dblib.connect().then((conn)=>{
        dblib.insert('test',{name:'hello',age:12,gender:'M'},conn).then((response)=>{
        console.log(response);
        });
    }).error((error)=>{
        console.log(error);
    });
    //dblib.testConnect(callback);
    res.send('Hello Api from ' + req.params.id);
});

