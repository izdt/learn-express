const express = require('express');
const router = express.Router();

router.get('/hello/:id',(req,res)=>{
    res.send('Hello Api from ' + req.params.id);
});


module.exports = router;