import ChatApp from './chat';
import io from '../../node_modules/socket.io-client';

(function(io,document,window,undefined){
    const socket = io("http://localhost:5000");
    window.onload = (e)=>{ 
         const chatApp = new ChatApp(document,socket);
         chatApp.addSocketListeners();
         chatApp.addInputListeners();
    };
})(io,document,window);
