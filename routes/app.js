const express = require('express');
const router = express.Router();
const db = require('../lib/db');

module.exports = router;
const callback = (res)=>{
    console.log(res);
};
router.get('/testdb',(req,res)=>{
    db.testConnect(callback);
    res.send('Hello Api from ' + req.params.id);
});

