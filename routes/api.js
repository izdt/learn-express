const express = require('express');
const router = express.Router();
module.exports = router;
router.get('/hello/:id',(req,res)=>{
    res.send('Hello Api from ' + req.params.id);
});
