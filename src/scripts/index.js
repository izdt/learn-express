import ChatApp from './chat';
import io from '../../node_modules/socket.io-client/socket.io.js';

(function(io,document,window,undefined){
    const socket = io("http://192.168.8.8:5000");
    window.onload = (e)=>{ 
         const chatApp = new ChatApp(document,socket);
         chatApp.addSocketListeners();
         chatApp.addInputListeners();
    };
})(io,document,window);
