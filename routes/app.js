const express = require('express');
const router = express.Router();
const db = require('../lib/db');

module.exports = router;
router.get('/testdb',(req,res)=>{
    res.send(db.testConnect());
});

