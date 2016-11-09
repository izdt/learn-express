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

const getRoomMessage = function(room,timestamp,start,end){
  return dblib.connect()
  .then((conn)=>{
    return dblib.queryWithFilter('chat',(c)=>{return c('date').lt(timestamp).and(c('room').eq(room));},start,end,conn);
    //return dblib.queryWithFilter('chat',{room:room},start,end,conn);
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

router.get('/:room/messages/:num/:timestamp',(req,res)=>{
  let room = req.params.room;
  let timestamp = req.params.timestamp;
  let index = (req.params.num-1)*20;
  getRoomMessage(room,timestamp,index,20).then((result)=>{
      res.send(JSON.stringify(result));
  });
});

router.get('/:room',(req,res)=>{
  res.render('chat/chat',{title:'Chat App at '+req.params.room, room:req.params.room});
});