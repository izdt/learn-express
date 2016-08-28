const express = require('express');
const router = express.Router();
module.exports = router;

router.get('/',(req,res)=>{
  res.render('chat/chat',{title:'Chat App'});
});

router.get('/:num',(req,res)=>{
  res.render('chat/chat',{title:'Chat App at'+req.pramas.num, number:req.pramas.num});
});