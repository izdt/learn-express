const express = require('express');
const router = express.Router();
const dblib = require('../lib/dblib');

module.exports = router;
const callback = (res)=>{
    console.log(res);
};

router.get('/',(req,res)=>{
    res.render('user/index',{title:'user',user:{}});
});

router.get('/testdb',(req,res)=>{
    dblib.connect()
    .then((conn)=>{
        return dblib.insert('test',{name:'hello',age:12,gender:'M'},conn);
    })
    .then((response)=>{
        res.send(response);
    })
    .catch((error)=>{
        console.log(error);
        res.send(error);
    });
    //dblib.testConnect(callback);
    //res.send('Hello Api from ' + req.params.id);
});
router.get('/showData',(req,res)=>{
    dblib.connect()
    .then((conn)=>{
       return dblib.queryAll('test',conn);
    })
    .then((result)=>{
        res.send(JSON.stringify(result, null, 2));
        //res.send(result);
    })
    .catch((error)=>{
        res.send(error);
    });
});
