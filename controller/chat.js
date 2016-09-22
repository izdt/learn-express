const socketio = require('socket.io');
const dblib = require('../lib/dblib');
module.exports = (server)=>{
  const io = socketio(server);
  io.on('connection', (socket) => {
    console.log('a user connected'+socket.id);
    console.log(Object.keys(io.sockets.connected).length);
    socket.send(socket.id);
    socket.on('disconnect', () => {
      console.log('user disconnected'+socket.id);
    });
    socket.on('chat message', (msg)=>{
      console.log(msg);
      dblib.connect()
      .then((conn)=>{
        return dblib.insert('chat',{date:Date.now(), message:msg},conn);
      })
      .catch((error)=>{
          console.log(error);
      });
      //io.emit('chat message', msg);
      socket.broadcast.emit('chat message', msg);
    }); 
    socket.on('user unload',(msg)=>{
      console.log(msg);
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

