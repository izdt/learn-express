const express = require('express');
const router = express.Router();
const dblib = require('../lib/dblib');

module.exports = router;

router.get('/',(req,res)=>{
  dblib.connect()
  .then((conn)=>{
    return dblib.queryAll('chat',conn);
  })
  .then((result)=>{
      res.render('io',{title:'Socket.IO',messages:result});
  });
});