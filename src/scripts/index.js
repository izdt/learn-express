import ChatApp from './chat';
import io from '../../node_modules/socket.io-client';

(function (io, document, window, undefined) {
    const socket = io("http://localhost:5000");

    window.Element.prototype.hide = function(){
        //works!
        console.log(this);
        this.style.display = 'none';
    };

    window.Element.prototype.bind = (events, callback) => {
        //not works！
        const _this = this;
        console.log(_this);
        events.split(' ').forEach((v, i, a) => {
            _this.addEventListener(v, callback);
        });
    };

    window.onload = (e) => {
        const chatApp = new ChatApp(document, socket);
        chatApp.addSocketListeners();
        chatApp.addInputListeners();
    };
})(io, document, window);
