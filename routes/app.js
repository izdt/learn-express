const express = require('express');
const router = express.Router();
const dblib = require('../lib/dblib');

module.exports = router;
const callback = (res)=>{
    console.log(res);
};

router.get('/',(req,res)=>{
    dblib.connect()
    .then((conn)=>{
       return dblib.queryAll('test',conn);
    })
    .then((result)=>{
       res.render('user/index', Object.assign({title:'List of Users'},{users:result}));
    })
    .catch((error)=>{
        res.status(error.status || 500);
        res.send(error);
    });
    
});

router.get('/user',(req,res)=>{
    res.render('user/edit',{title:'user',user:{}});
});

router.get('/user/:id',(req,res)=>{
    dblib.connect()
    .then((conn)=>{
        return dblib.getById('test',req.params.id,conn);
    })
    .then((user)=>{
        res.send(user);
    })
    .catch((e)=>{
        res.send(e);
    });
});

router.get('/user/:id/edit',(req,res)=>{
    dblib.connect()
    .then((conn)=>{
        return dblib.getById('test',req.params.id,conn);
    })
    .then((user)=>{
        res.render('user/edit',{title:'user',user:user});
    })
    .catch((e)=>{
        res.send(e);
    });
});

router.get('/user/name/:name',(req,res)=>{
    dblib.connect()
    .then((conn)=>{
        return dblib.filter('test',{name : req.params.name},conn);
    })
    .then((users)=>{
        res.send(users);
    })
    .catch((e)=>{
        console.log("ERROR"+e);
        res.send(e);
    });
});
router.post(/.*create$/,(req,res)=>{
    dblib.connect()
    .then((conn)=>{
        return dblib.insert('test',req.body,conn);
    })
    .then((response)=>{
        res.redirect('/app');
        //res.send(response);
    })
    .catch((error)=>{
        console.log(error);
        res.send(error);
    });
});
router.get('/testdb',(req,res)=>{
    dblib.connect()
    .then((conn)=>{
        return dblib.insert('test',{name:'hello',age:12,gender:'M'},conn);
    })
    .then((response)=>{
        res.send(response);
    })
    .catch((error)=>{
        console.log(error);
        res.send(error);
    });
    //dblib.testConnect(callback);
    //res.send('Hello Api from ' + req.params.id);
});
router.get('/showData',(req,res)=>{
    dblib.connect()
    .then((conn)=>{
       return dblib.queryAll('test',conn);
    })
    .then((result)=>{
        res.send(JSON.stringify(result, null, 2));
        //res.send(result);
    })
    .catch((error)=>{
        res.send(error);
    });
});
