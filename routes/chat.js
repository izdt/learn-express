const express = require('express');
const router = express.Router();
module.exports = router;
const dblib = require('../lib/dblib');

const getMessages = function(uid){
  return dblib.connect()
  .then((conn)=>{
    return dblib.queryAll('chat',conn);
  });
};

router.get('/',(req,res)=>{
  res.render('chat/chat',{title:'Chat App'});
});

router.get('/messages/:uid',(req,res)=>{
  let uid = req.params.uid;
  getMessages(uid).then((result)=>{
      res.send(JSON.stringify(result));
  });
});

router.get('/:num',(req,res)=>{
  res.render('chat/chat',{title:'Chat App at'+req.params.num, number:req.params.num});
});