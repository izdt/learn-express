const r = require('rethinkdb');
const db = require('../config/rethinkdb');

const dblib = module.exports = {};

dblib.testConnect = ()=>{
  let returnInfo;
  r.connect({ host: db.address, port: db.port }, function(err, conn) {
    if(err) throw err;
    r.db('test').tableCreate('tv_shows').run(conn, function(err, res) {
      if(err) throw err;
      returnInfo+=res;
      console.log(res);
      r.table('tv_shows').insert({ name: 'Star Trek TNG' }).run(conn, function(err, res)
      {
        if(err) throw err;
        returnInfo+=res;
        console.log(res);
      });
    });
  });
  return returnInfo;
}; 
