const express = require('express');
const router = express.Router();
const dblib = require('../lib/dblib');

module.exports = router;

router.get('/',(req,res)=>{
    dblib.connect()
    .then((conn)=>{
       return dblib.queryAll('test',conn);
    })
    .then((result)=>{
       res.render('user/index', Object.assign({title:'List of Users'},{users:result}));
    })
    .catch((error)=>{
        res.status(error.status || 500);
        res.send(error);
    });
    
});