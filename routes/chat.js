const express = require('express');
const router = express.Router();
module.exports = router;
const dblib = require('../lib/dblib');

const getMessages = function(uid,start,end){
  return dblib.connect()
  .then((conn)=>{
    return dblib.queryWith('chat',start,end,conn);
  });
};

router.get('/',(req,res)=>{
  res.render('chat/chat',{title:'Chat App'});
});

router.get('/messages/:uid',(req,res)=>{
  res.redirect(req.params.uid+'/1');
});

router.get('/messages/:uid/:num',(req,res)=>{
  let uid = req.params.uid;
  let index = (req.params.num-1)*20;
  getMessages(uid,index,20).then((result)=>{
      res.send(JSON.stringify(result));
  });
});

router.get('/:num',(req,res)=>{
  res.render('chat/chat',{title:'Chat App at'+req.params.num, number:req.params.num});
});