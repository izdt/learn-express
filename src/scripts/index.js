import ChatApp from './chat';
import io from '../../node_modules/socket.io-client';

(function (io, document, window, undefined) {
    const socket = io("http://localhost:5000");

    //NOTES: arrow function ()=>{} this will be fixed.
    //function expression use a dynamic this 
    //Object prototype shouldn't use arrow function
    window.Element.prototype.hide = function(){
        this.style.display = 'none';
    };

    window.Element.prototype.bind = function(events, callback){
        events.split(' ').forEach((v, i, a) => {
            this.addEventListener(v, callback);
        });
    };

    window.onload = (e) => {
        const chatApp = new ChatApp(document, socket);
        chatApp.addSocketListeners();
        chatApp.addInputListeners();
    };
})(io, document, window);
