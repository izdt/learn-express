import ChatApp from './chat';
import io from '../../node_modules/socket.io-client';

(function (io, document, window, undefined) {
    const socket = io("/chat");
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
        // new QrCode(document.getElementById("messageBox"), "http://www.baidu.com");
        const chatApp = new ChatApp(document, socket, room);
        chatApp.addSocketListeners();
        chatApp.addInputListeners();
        chatApp.addActionPanelLinsteners();
    };
})(io, document, window);
