import ChatApp from './chat';
import io from '../../node_modules/socket.io-client';
//import QrCode from './qrcode.min.js';

(function (io, document, window, undefined) {
    const socket = io("/chat");
    //console.log(QrCode);
    //NOTES: arrow function ()=>{} this will be fixed.
    //function expression use a dynamic this 
    //Object prototype shouldn't use arrow function
    window.Element.prototype.hide = function(){
        this.style.display = 'none';
    };

    window.Element.prototype.bind = function(events, callback){
        if(events.indexOf('touch')>=0 && !('ontouchstart' in window)) events = events.replace(/touch\w+/g,'click');
        events.split(' ').forEach((v, i, a) => {
            this.addEventListener(v, callback);
        });
    };

    window.onload = (e) => {
        let room = location.pathname.substring(location.pathname.lastIndexOf('/')+1);
        const chatApp = new ChatApp(document, socket, room);
        chatApp.addSocketListeners();
        chatApp.addInputListeners();
        chatApp.addActionPanelLinsteners();
    };
})(io, document, window);
