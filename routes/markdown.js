const express = require('express');
const router = express.Router();
const escapeHtml = require('escape-html');
const path = require('path');
const fs = require('fs');
const marked = require('marked');

module.exports = router;
router.get('/:file',(req,res)=>{
    let docpath = path.join(__dirname, '../doc/'+req.params.file+'.md');
    fs.readFile(docpath, 'utf8', function(err, data){
        if (err) res.send(err);
        let html = marked.parse(data).replace(/\{([^}]+)\}/g, function(_, name){
            return escapeHtml( '');
        });
        res.send(html);
    });
});