const r = require('rethinkdb');
const dbconfig = require('../config/rethinkdb');

//const dblib = module.exports = {};

class DBlib{
  constructor() {
    console.log('create an instance of DBlib!');
  }
  connect(){
     return r.connect(dbconfig);
  }
  insert(table,obj,conn){
    //console.log(table,obj,conn);
    return r.table(table).insert(obj).run(conn);
    /*
    return new Promise((resovle,reject)=>{
      if (1==1) {
        resolve("worked!");
      }
      else {
        reject(Error("It broke"));
      }
    });
    */
  }

  testConnect(callback){
    r.connect(dbconfig).then((conn)=>{
    r.db(dbconfig.db).tableCreate('tv_shows').run(conn, function(err, res) {
      if(err) throw err;
      callback(res);
      //console.log(res);
      r.table('tv_shows').insert({ name: 'Star Trek TNG' }).run(conn, function(err, res)
      {
        if(err) throw err;
        //console.log(res);
        callback(res);
      });
    });
    }).error((err)=>{
    throw err;
    });  
  }
}

const dblib = module.exports = new DBlib();
