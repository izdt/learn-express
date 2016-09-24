const socketio = require('socket.io');
const dblib = require('../lib/dblib');
module.exports = (server)=>{
  const io = socketio(server).of('chat');
  io.on('connection', (socket) => {
    let req = socket.request;
    //console.log(req);
    //console.log(req.headers);
    console.log('a user connected'+socket.id);
    //console.log(Object.keys(io.sockets.connected).length);
    socket.send(socket.id);
    socket.on('join room', (room) =>{
      socket.join(room);
    });
    socket.on('disconnect', () => {
      console.log('user disconnected'+socket.id);
    });
    socket.on('chat message', (id, msg)=>{
      console.log("room:"+id);
      console.log(msg);
      dblib.connect()
      .then((conn)=>{
        return dblib.insert('chat',{date:Date.now(), room:id, message:msg},conn);
      })
      .catch((error)=>{
          console.log(error);
      });
      //io.emit('chat message', msg);
      socket.broadcast.to(id).emit('chat message', msg);
    }); 
    socket.on('user unload',(id, msg)=>{
      console.log("user unload:"+ JSON.stringify(msg));
      // dblib.connect()
      // .then((conn)=>{
      //   return dblib.insert('chat',{date:Date.now(), message:msg},conn);
      // })
      // .catch((error)=>{
      //     console.log(error);
      // });
    });
    socket.on('user disconnect',()=>{
      console.log("user disconnnet");
    });
  });
};

