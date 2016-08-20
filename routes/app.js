const express = require('express');
const router = express.Router();
const dblib = require('../lib/dblib');

module.exports = router;
const callback = (res)=>{
    console.log(res);
};
router.get('/testdb',(req,res)=>{
    dblib.testConnect(callback);
    res.send('Hello Api from ' + req.params.id);
});

